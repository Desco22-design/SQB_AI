import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendTelegramMessage } from "@/lib/telegram";

export const runtime = "nodejs";

// Telegram Update types (minimal subset we care about)
type TelegramChat = {
  id: number;
  username?: string;
  first_name?: string;
};

type TelegramMessage = {
  chat: TelegramChat;
  text?: string;
};

type TelegramUpdate = {
  message?: TelegramMessage;
};

const WELCOME_NO_LINK =
  "Salom! 👋\n\nSQB AI botiga xush kelibsiz.\nBiz bilan bog'lanish uchun sqb.uz saytidagi formani to'ldiring.";

const WELCOME_LINKED =
  "✅ Tabriklaymiz! Sizning murojaat ankeatingiz muvaffaqiyatli ulandi.\n\n" +
  "Tez orada SQB AI jamoasi siz bilan bog'lanadi. 🚀";

export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET;

  if (!token) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  // Verify the secret token Telegram sends in the header (optional but recommended).
  if (webhookSecret) {
    const incomingSecret = req.headers.get("x-telegram-bot-api-secret-token");
    if (incomingSecret !== webhookSecret) {
      return NextResponse.json({ ok: false }, { status: 403 });
    }
  }

  let update: TelegramUpdate;
  try {
    update = (await req.json()) as TelegramUpdate;
  } catch {
    // Malformed body — acknowledge anyway so Telegram stops retrying.
    return NextResponse.json({ ok: true });
  }

  const message = update.message;
  if (!message?.text) {
    return NextResponse.json({ ok: true });
  }

  const chat = message.chat;
  const chatId = chat.id;
  const text = message.text.trim();

  if (!text.startsWith("/start")) {
    return NextResponse.json({ ok: true });
  }

  // Extract the start param (submission id) that follows "/start ".
  const parts = text.split(" ");
  const startParam = parts[1]?.trim() ?? "";

  if (!startParam) {
    // Generic /start without deep link param.
    await sendTelegramMessage(token, chatId, WELCOME_NO_LINK).catch(() => {});
    return NextResponse.json({ ok: true });
  }

  // Link this Telegram account to the matching ContactSubmission.
  try {
    const existing = await prisma.contactSubmission.findUnique({
      where: { id: startParam },
    });

    if (!existing) {
      await sendTelegramMessage(token, chatId, WELCOME_NO_LINK).catch(() => {});
      return NextResponse.json({ ok: true });
    }

    // Only link if not already linked to prevent overwrite.
    if (!existing.telegramChatId) {
      await prisma.contactSubmission.update({
        where: { id: startParam },
        data: {
          telegramChatId: String(chatId),
          telegramUsername: chat.username ?? null,
          telegramLinkedAt: new Date(),
        },
      });
    }

    await sendTelegramMessage(token, chatId, WELCOME_LINKED).catch(() => {});
  } catch {
    // DB error — still acknowledge to Telegram.
  }

  return NextResponse.json({ ok: true });
}
