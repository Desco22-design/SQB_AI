import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendTelegramMessage, sendTelegramPhoto } from "@/lib/telegram";

export const runtime = "nodejs";

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

type Lang = "uz" | "ru" | "en";

const LOGO_URL =
  "https://sqb-ai-jx5a.vercel.app/brand/sqb-ai-logo.png";

const DIVIDER = "──────────────────────";

// Messages shown to the user after they open the bot via deep link
const WELCOME: Record<Lang, (name: string, isIntern: boolean) => string> = {
  uz: (name, isIntern) =>
    [
      `✅ <b>Assalomu alaykum, ${name}!</b>`,
      ``,
      isIntern
        ? `Stajyorlik arizangiz muvaffaqiyatli qabul qilindi.`
        : `Hamkorlik so'rovingiz muvaffaqiyatli qabul qilindi.`,
      ``,
      `⏱ <b>Javob muddati:</b> 1–2 ish kuni`,
      ``,
      DIVIDER,
      `<i>SQB AI jamoasi siz bilan tez orada bog'lanadi.</i>`,
      `🤖 SQB AI`,
    ].join("\n"),
  ru: (name, isIntern) =>
    [
      `✅ <b>Здравствуйте, ${name}!</b>`,
      ``,
      isIntern
        ? `Ваша заявка на стажировку успешно получена.`
        : `Ваш запрос на партнёрство успешно получен.`,
      ``,
      `⏱ <b>Срок ответа:</b> 1–2 рабочих дня`,
      ``,
      DIVIDER,
      `<i>Команда SQB AI свяжется с вами в ближайшее время.</i>`,
      `🤖 SQB AI`,
    ].join("\n"),
  en: (name, isIntern) =>
    [
      `✅ <b>Hello, ${name}!</b>`,
      ``,
      isIntern
        ? `Your internship application has been successfully received.`
        : `Your partnership inquiry has been successfully received.`,
      ``,
      `⏱ <b>Response time:</b> 1–2 business days`,
      ``,
      DIVIDER,
      `<i>The SQB AI team will contact you shortly.</i>`,
      `🤖 SQB AI`,
    ].join("\n"),
};

// Message when user writes anything to the bot (not /start)
const WAITING: Record<Lang, string> = {
  uz: `⏳ So'rovingiz ko'rib chiqilmoqda. SQB AI jamoasi siz bilan tez orada bog'lanadi.`,
  ru: `⏳ Ваша заявка обрабатывается. Команда SQB AI свяжется с вами в ближайшее время.`,
  en: `⏳ Your request is being processed. The SQB AI team will contact you soon.`,
};

// Fallback when /start is used without a valid token
const NO_TOKEN: Record<Lang, string> = {
  uz: `👋 Assalomu alaykum! SQB AI botiga xush kelibsiz.\n\nMurojaat yuborish uchun SQB AI saytidagi aloqa formasidan foydalaning.`,
  ru: `👋 Здравствуйте! Добро пожаловать в бот SQB AI.\n\nЧтобы оставить заявку, воспользуйтесь формой связи на сайте SQB AI.`,
  en: `👋 Hello! Welcome to the SQB AI bot.\n\nTo send a request, please use the contact form on the SQB AI website.`,
};

const TOKEN_EXPIRED: Record<Lang, string> = {
  uz: `⚠️ Havola muddati tugagan. Iltimos, SQB AI saytidagi formani qayta yuboring.`,
  ru: `⚠️ Срок действия ссылки истёк. Пожалуйста, отправьте форму на сайте SQB AI ещё раз.`,
  en: `⚠️ This link has expired. Please submit the form on the SQB AI website again.`,
};

function detectLang(raw?: string | null): Lang {
  if (raw === "uz" || raw === "en") return raw;
  return "ru";
}

async function sendWelcome(
  token: string,
  chatId: number,
  lang: Lang,
  name: string,
  isIntern: boolean
): Promise<void> {
  const caption = WELCOME[lang](name, isIntern);
  try {
    await sendTelegramPhoto(token, chatId, LOGO_URL, caption, "HTML");
  } catch {
    // Photo failed (e.g. dev environment) — fall back to plain text
    await sendTelegramMessage(token, chatId, caption, "HTML").catch(() => {});
  }
}

export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET;

  if (!token) return NextResponse.json({ ok: false }, { status: 500 });

  if (webhookSecret) {
    const incoming = req.headers.get("x-telegram-bot-api-secret-token");
    if (incoming !== webhookSecret)
      return NextResponse.json({ ok: false }, { status: 403 });
  }

  let update: TelegramUpdate;
  try {
    update = (await req.json()) as TelegramUpdate;
  } catch {
    return NextResponse.json({ ok: true });
  }

  const message = update.message;
  if (!message?.text) return NextResponse.json({ ok: true });

  const chat = message.chat;
  const chatId = chat.id;
  const text = message.text.trim();

  // ── /start [token] ──────────────────────────────────────────────────────
  if (text.startsWith("/start")) {
    const startParam = text.split(" ")[1]?.trim() ?? "";

    if (!startParam) {
      await sendTelegramMessage(token, chatId, NO_TOKEN["ru"]).catch(() => {});
      return NextResponse.json({ ok: true });
    }

    try {
      const submission = await prisma.contactSubmission.findUnique({
        where: { linkToken: startParam },
      });

      if (!submission) {
        await sendTelegramMessage(token, chatId, NO_TOKEN["ru"]).catch(
          () => {}
        );
        return NextResponse.json({ ok: true });
      }

      const lang = detectLang(submission.lang);

      // Check token expiry
      if (
        submission.linkTokenExpiresAt &&
        submission.linkTokenExpiresAt < new Date()
      ) {
        await sendTelegramMessage(token, chatId, TOKEN_EXPIRED[lang]).catch(
          () => {}
        );
        return NextResponse.json({ ok: true });
      }

      // Link Telegram account to the submission (only once)
      if (!submission.telegramChatId) {
        await prisma.contactSubmission.update({
          where: { id: submission.id },
          data: {
            telegramChatId: String(chatId),
            telegramUsername: chat.username ?? null,
            telegramLinkedAt: new Date(),
          },
        });
      }

      const firstName = submission.name.trim().split(/\s+/)[0] ?? submission.name;
      await sendWelcome(token, chatId, lang, firstName, submission.type === "intern");
    } catch {
      // DB error — still respond
    }

    return NextResponse.json({ ok: true });
  }

  // ── Any other message from user ─────────────────────────────────────────
  // Look up their submission by chatId to reply in the right language
  try {
    const submission = await prisma.contactSubmission.findFirst({
      where: { telegramChatId: String(chatId) },
      orderBy: { createdAt: "desc" },
    });
    const lang = detectLang(submission?.lang);
    await sendTelegramMessage(token, chatId, WAITING[lang]).catch(() => {});
  } catch {
    await sendTelegramMessage(token, chatId, WAITING["ru"]).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
