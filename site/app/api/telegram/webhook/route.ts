import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  LESSON_LOCATION,
  LESSON_TIME,
  formatLessonDate,
  getTopicById,
  type SchoolTopic,
} from "@/lib/school-program";
import {
  sendTelegramMessage,
  sendTelegramPhoto,
  escapeHtml,
} from "@/lib/telegram";

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
  "https://sqb-ai-jx5a.vercel.app/brand/bot-banner.jpg";

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
      `⏱ <b>Javob muddati:</b> 1-2 ish kuni`,
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
      `⏱ <b>Срок ответа:</b> 1-2 рабочих дня`,
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
      `⏱ <b>Response time:</b> 1-2 business days`,
      ``,
      DIVIDER,
      `<i>The SQB AI team will contact you shortly.</i>`,
      `🤖 SQB AI`,
    ].join("\n"),
};

// Sent to a schoolchild the moment they open the bot from the signup form.
// This is the whole point of the deep link: it is the first (and only) moment we
// are allowed to message them, so it must carry the full lesson details.
const SCHOOL_WELCOME: Record<
  Lang,
  (name: string, topic: SchoolTopic) => string
> = {
  uz: (name, topic) =>
    [
      `✅ <b>Assalomu alaykum, ${name}!</b>`,
      ``,
      `Siz <b>SQB AI Maktab</b> dasturiga muvaffaqiyatli yozildingiz.`,
      ``,
      DIVIDER,
      `📚 <b>Mavzu:</b> ${topic.title.uz}`,
      `📅 <b>Sana:</b> ${formatLessonDate(topic.date, "uz")}`,
      `🕒 <b>Vaqt:</b> ${LESSON_TIME}`,
      `📍 <b>Manzil:</b> ${LESSON_LOCATION.uz}`,
      DIVIDER,
      ``,
      `<i>Sizni darsda kutamiz! Savollaringiz bo'lsa, shu yerga yozing.</i>`,
      `🤖 SQB AI`,
    ].join("\n"),
  ru: (name, topic) =>
    [
      `✅ <b>Здравствуйте, ${name}!</b>`,
      ``,
      `Вы успешно записались на программу <b>SQB AI Школа</b>.`,
      ``,
      DIVIDER,
      `📚 <b>Тема:</b> ${topic.title.ru}`,
      `📅 <b>Дата:</b> ${formatLessonDate(topic.date, "ru")}`,
      `🕒 <b>Время:</b> ${LESSON_TIME}`,
      `📍 <b>Адрес:</b> ${LESSON_LOCATION.ru}`,
      DIVIDER,
      ``,
      `<i>Ждём вас на занятии! Если есть вопросы - напишите сюда.</i>`,
      `🤖 SQB AI`,
    ].join("\n"),
  en: (name, topic) =>
    [
      `✅ <b>Hello, ${name}!</b>`,
      ``,
      `You have successfully signed up for the <b>SQB AI School</b> programme.`,
      ``,
      DIVIDER,
      `📚 <b>Topic:</b> ${topic.title.en}`,
      `📅 <b>Date:</b> ${formatLessonDate(topic.date, "en")}`,
      `🕒 <b>Time:</b> ${LESSON_TIME}`,
      `📍 <b>Location:</b> ${LESSON_LOCATION.en}`,
      DIVIDER,
      ``,
      `<i>We look forward to seeing you! Any questions - just write here.</i>`,
      `🤖 SQB AI`,
    ].join("\n"),
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

// Photo first, plain text if the photo send fails (e.g. in dev). The caption is
// HTML parse_mode, so the user-supplied name must be escaped or a name
// containing "<" makes Telegram reject the whole message.
async function sendBanner(
  token: string,
  chatId: number,
  caption: string
): Promise<void> {
  try {
    await sendTelegramPhoto(token, chatId, LOGO_URL, caption, "HTML");
  } catch {
    await sendTelegramMessage(token, chatId, caption, "HTML").catch(() => {});
  }
}

async function sendWelcome(
  token: string,
  chatId: number,
  lang: Lang,
  name: string,
  isIntern: boolean
): Promise<void> {
  await sendBanner(token, chatId, WELCOME[lang](escapeHtml(name), isIntern));
}

async function sendSchoolWelcome(
  token: string,
  chatId: number,
  lang: Lang,
  name: string,
  topic: SchoolTopic
): Promise<void> {
  await sendBanner(token, chatId, SCHOOL_WELCOME[lang](escapeHtml(name), topic));
}

export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET;

  if (!token) return NextResponse.json({ ok: false }, { status: 500 });

  // Fail-closed: a webhook with no configured secret must NOT accept unverified
  // updates (that would let anyone forge Telegram messages). Require the secret.
  if (!webhookSecret) return NextResponse.json({ ok: false }, { status: 500 });
  const incoming = req.headers.get("x-telegram-bot-api-secret-token");
  if (incoming !== webhookSecret)
    return NextResponse.json({ ok: false }, { status: 403 });

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
      // School signups live in their own table. Both lookups are exact-match on
      // a unique column, so trying school first can never shadow a contact token.
      const school = await prisma.schoolApplication.findUnique({
        where: { linkToken: startParam },
      });

      if (school) {
        const lang = detectLang(school.lang);

        if (school.linkTokenExpiresAt && school.linkTokenExpiresAt < new Date()) {
          await sendTelegramMessage(token, chatId, TOKEN_EXPIRED[lang]).catch(
            () => {}
          );
          return NextResponse.json({ ok: true });
        }

        // Bind the chat once - this is what makes the student reachable later.
        if (!school.telegramChatId) {
          await prisma.schoolApplication.update({
            where: { id: school.id },
            data: {
              telegramChatId: String(chatId),
              telegramUsername: chat.username ?? null,
              telegramLinkedAt: new Date(),
            },
          });
        }

        const topic = getTopicById(school.topicId);
        const firstName = school.name.trim().split(/\s+/)[0] ?? school.name;
        if (topic) {
          await sendSchoolWelcome(token, chatId, lang, firstName, topic);
        } else {
          // Topic was removed from the schedule after signup - don't go silent.
          await sendTelegramMessage(token, chatId, NO_TOKEN[lang]).catch(() => {});
        }
        return NextResponse.json({ ok: true });
      }

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
      // DB error - still respond
    }

    return NextResponse.json({ ok: true });
  }

  // ── Any other message from user → store it (admin sees it in the panel) ──
  // We intentionally do NOT forward chat messages to the admin Telegram chat -
  // that chat is reserved for new form submissions. Replies live in the admin
  // panel conversation, flagged by the unread badge.
  try {
    const submission = await prisma.contactSubmission.findFirst({
      where: { telegramChatId: String(chatId) },
      orderBy: { createdAt: "desc" },
    });

    // User never linked through the form - give them the onboarding hint.
    if (!submission) {
      await sendTelegramMessage(token, chatId, NO_TOKEN["ru"]).catch(() => {});
      return NextResponse.json({ ok: true });
    }

    // Persist the incoming message as part of the conversation (unread).
    await prisma.contactMessage.create({
      data: {
        submissionId: submission.id,
        direction: "in",
        text: text.slice(0, 4000),
        read: false,
      },
    });
  } catch {
    // Swallow - Telegram must get a 200 so it stops retrying.
  }

  return NextResponse.json({ ok: true });
}
