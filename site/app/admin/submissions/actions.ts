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

  await logAudit({
    action: "update",
    entity: "submissions",
    entityId: submissionId,
    summary: `Telegram javob: ${trimmed.slice(0, 80)}`,
  });

  revalidatePath(`/admin/submissions/${submissionId}`);
  return { ok: true };
}
