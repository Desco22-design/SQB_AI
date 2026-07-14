"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { sendTelegramMessage } from "@/lib/telegram";

async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
}

export async function deleteSubmission(id: string) {
  await requireAuth();
  const existing = await prisma.contactSubmission.findUnique({ where: { id } });
  await prisma.contactSubmission.delete({ where: { id } });
  await logAudit({
    action: "delete",
    entity: "submissions",
    entityId: id,
    summary: existing ? `${existing.name} <${existing.email}>` : id,
  });
  revalidatePath("/admin/submissions");
}

export async function deleteSubmissionAndReturn(id: string, _formData: FormData) {
  await deleteSubmission(id);
  redirect("/admin/submissions");
}

export async function sendTelegramReply(
  submissionId: string,
  text: string
): Promise<{ ok: boolean; error?: string }> {
  try {
    await requireAuth();
  } catch {
    return { ok: false, error: "Unauthorized" };
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    return { ok: false, error: "Telegram bot token sozlanmagan." };
  }

  const trimmed = text.trim().slice(0, 4000);
  if (!trimmed) {
    return { ok: false, error: "Xabar bo'sh bo'lishi mumkin emas." };
  }

  let submission;
  try {
    submission = await prisma.contactSubmission.findUnique({
      where: { id: submissionId },
    });
  } catch {
    return { ok: false, error: "Bazadan o'qishda xatolik." };
  }

  if (!submission) {
    return { ok: false, error: "Murojaat topilmadi." };
  }

  if (!submission.telegramChatId) {
    return {
      ok: false,
      error: "Bu foydalanuvchi hali Telegram botga ulanmagan.",
    };
  }

  try {
    await sendTelegramMessage(token, submission.telegramChatId, trimmed);
  } catch {
    return { ok: false, error: "Telegram ga yuborishda xatolik." };
  }

  // Persist the admin's reply as part of the conversation history.
  try {
    await prisma.contactMessage.create({
      data: {
        submissionId,
        direction: "out",
        text: trimmed,
        read: true,
      },
    });
  } catch {
    // Message sent to user already; history insert failing is non-fatal.
  }

  await logAudit({
    action: "update",
    entity: "submissions",
    entityId: submissionId,
    summary: `Telegram javob: ${trimmed.slice(0, 80)}`,
  });

  revalidatePath(`/admin/submissions/${submissionId}`);
  return { ok: true };
}

// Send one message to many users at once (broadcast).
// Each delivery is stored in that user's conversation history.
export async function broadcastTelegram(
  submissionIds: string[],
  text: string
): Promise<{ ok: boolean; sent: number; failed: number; error?: string }> {
  try {
    await requireAuth();
  } catch {
    return { ok: false, sent: 0, failed: 0, error: "Unauthorized" };
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    return { ok: false, sent: 0, failed: 0, error: "Bot token sozlanmagan." };
  }

  const trimmed = text.trim().slice(0, 4000);
  if (!trimmed) {
    return { ok: false, sent: 0, failed: 0, error: "Xabar bo'sh bo'lishi mumkin emas." };
  }
  if (submissionIds.length === 0) {
    return { ok: false, sent: 0, failed: 0, error: "Hech kim tanlanmagan." };
  }

  let targets: { id: string; telegramChatId: string | null }[];
  try {
    targets = await prisma.contactSubmission.findMany({
      where: { id: { in: submissionIds }, telegramChatId: { not: null } },
      select: { id: true, telegramChatId: true },
    });
  } catch {
    return { ok: false, sent: 0, failed: 0, error: "Bazadan o'qishda xatolik." };
  }

  let sent = 0;
  let failed = 0;
  // Send in parallel batches to stay under Telegram's flood limits.
  const BATCH = 15;
  for (let i = 0; i < targets.length; i += BATCH) {
    const batch = targets.slice(i, i + BATCH);
    await Promise.all(
      batch.map(async (s) => {
        if (!s.telegramChatId) {
          failed++;
          return;
        }
        try {
          await sendTelegramMessage(token, s.telegramChatId, trimmed);
          await prisma.contactMessage.create({
            data: {
              submissionId: s.id,
              direction: "out",
              text: trimmed,
              read: true,
            },
          });
          sent++;
        } catch {
          failed++;
        }
      })
    );
  }

  await logAudit({
    action: "update",
    entity: "submissions",
    entityId: "broadcast",
    summary: `Ommaviy xabar: ${sent} yuborildi, ${failed} xato - "${trimmed.slice(0, 60)}"`,
  });

  revalidatePath("/admin/submissions");
  return { ok: true, sent, failed };
}

// Mark all incoming (user→admin) messages of a submission as read.
export async function markMessagesRead(submissionId: string): Promise<void> {
  try {
    await requireAuth();
  } catch {
    return;
  }
  try {
    await prisma.contactMessage.updateMany({
      where: { submissionId, direction: "in", read: false },
      data: { read: true },
    });
    revalidatePath("/admin/submissions");
  } catch {
    /* noop */
  }
}
