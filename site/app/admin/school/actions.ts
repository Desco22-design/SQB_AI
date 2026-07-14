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

export async function deleteSchoolApplication(id: string) {
  await requireAuth();
  const existing = await prisma.schoolApplication.findUnique({ where: { id } });
  await prisma.schoolApplication.delete({ where: { id } });
  await logAudit({
    action: "delete",
    entity: "school",
    entityId: id,
    summary: existing ? `${existing.name} <${existing.email}>` : id,
  });
  revalidatePath("/admin/school");
}

export async function deleteSchoolApplicationAndReturn(
  id: string,
  _formData: FormData
) {
  await deleteSchoolApplication(id);
  redirect("/admin/school");
}

/**
 * Send a message to the pupil through the bot. Only possible once they have
 * opened the deep link and pressed Start - that handshake is what gives us a
 * chat id we are allowed to message.
 */
export async function sendSchoolReply(
  applicationId: string,
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

  let application;
  try {
    application = await prisma.schoolApplication.findUnique({
      where: { id: applicationId },
    });
  } catch {
    return { ok: false, error: "Bazadan o'qishda xatolik." };
  }

  if (!application) {
    return { ok: false, error: "Ariza topilmadi." };
  }

  if (!application.telegramChatId) {
    return {
      ok: false,
      error: "Bu o'quvchi hali Telegram botga ulanmagan.",
    };
  }

  try {
    await sendTelegramMessage(token, application.telegramChatId, trimmed);
  } catch {
    return { ok: false, error: "Telegramga yuborishda xatolik." };
  }

  // The pupil already has the message; failing to store the history copy must
  // not report the send as failed.
  try {
    await prisma.schoolMessage.create({
      data: {
        applicationId,
        direction: "out",
        text: trimmed,
        read: true,
      },
    });
  } catch {
    /* non-fatal */
  }

  await logAudit({
    action: "update",
    entity: "school",
    entityId: applicationId,
    summary: `Telegram javob: ${trimmed.slice(0, 80)}`,
  });

  revalidatePath(`/admin/school/${applicationId}`);
  return { ok: true };
}

/** Mark the pupil's incoming messages as read when the admin opens the thread. */
export async function markSchoolMessagesRead(applicationId: string) {
  try {
    await requireAuth();
  } catch {
    return;
  }
  await prisma.schoolMessage.updateMany({
    where: { applicationId, direction: "in", read: false },
    data: { read: true },
  });
  revalidatePath("/admin/school");
}
