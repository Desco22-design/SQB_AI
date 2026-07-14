import { randomBytes, randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import {
  GRADES,
  LESSON_CAPACITY,
  LESSON_LOCATION,
  LESSON_TIME,
  formatLessonDate,
  getTopicById,
} from "@/lib/school-program";
import { sendTelegramMessage, escapeHtml } from "@/lib/telegram";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 60_000;
// Pupils share IPs - a school computer lab, a family, or a class signing up
// together all look like one address. 3/min was low enough that ordinary use hit
// it and the signup appeared to fail at random.
const RATE_LIMIT_MAX = 10;
const LINK_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

// Prefixed so a token is recognisable as a school signup at a glance (in the DB
// and in bot logs). The webhook still resolves by exact string, so there is no
// prefix-collision risk with contact tokens.
const TOKEN_PREFIX = "sch_";

type Lang = "uz" | "ru" | "en";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  school?: string;
  grade?: string;
  topicId?: string;
  website?: string;
  lang?: string;
};

const DIVIDER = "──────────────────────";

const LABELS = {
  uz: {
    title: "🏫 Maktab dasturiga yangi ariza",
    name: "Ism",
    email: "Email",
    phone: "Telefon",
    school: "Maktab",
    grade: "Sinf",
    topic: "Mavzu",
    date: "Sana",
    time: "Vaqt",
    place: "Manzil",
    footer: "sqb.uz saytidan yuborildi",
  },
  ru: {
    title: "🏫 Новая заявка в Школу",
    name: "Имя",
    email: "Email",
    phone: "Телефон",
    school: "Школа",
    grade: "Класс",
    topic: "Тема",
    date: "Дата",
    time: "Время",
    place: "Адрес",
    footer: "Отправлено с сайта sqb.uz",
  },
  en: {
    title: "🏫 New School programme application",
    name: "Name",
    email: "Email",
    phone: "Phone",
    school: "School",
    grade: "Grade",
    topic: "Topic",
    date: "Date",
    time: "Time",
    place: "Location",
    footer: "Submitted via sqb.uz",
  },
} as const;

export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const botUsername = process.env.TELEGRAM_BOT_USERNAME;

  if (!token || !chatId) {
    return NextResponse.json(
      { ok: false, error: "Server is not configured." },
      { status: 500 }
    );
  }

  let data: Payload;
  try {
    data = (await req.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  // Honeypot - silently accept bots without notifying Telegram.
  if (data.website && data.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const ip = clientIp(req);
  if (!rateLimit(`school:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
    // A code, not prose: the form maps it to a translated message. Returning
    // English text here is why a rate-limited pupil used to see "fill in all the
    // fields" - the form could not tell this apart from a validation failure.
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 }
    );
  }

  const name = (data.name ?? "").trim().slice(0, 200);
  const email = (data.email ?? "").trim().slice(0, 200);
  const phone = (data.phone ?? "").trim().slice(0, 50);
  const school = (data.school ?? "").trim().slice(0, 200);
  const grade = (data.grade ?? "").trim();
  const topicId = (data.topicId ?? "").trim();
  const rawLang = (data.lang ?? "ru").toLowerCase();
  const lang: Lang = rawLang === "uz" || rawLang === "en" ? rawLang : "ru";

  if (!name || !email || !phone || !school || !grade || !topicId) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email." }, { status: 400 });
  }
  // Grade and topic come from fixed server-side lists - never trust the client.
  if (!(GRADES as readonly string[]).includes(grade)) {
    return NextResponse.json({ ok: false, error: "Invalid grade." }, { status: 400 });
  }
  const topic = getTopicById(topicId);
  if (!topic) {
    return NextResponse.json({ ok: false, error: "Invalid topic." }, { status: 400 });
  }

  const linkToken = TOKEN_PREFIX + randomBytes(32).toString("base64url");
  const linkTokenExpiresAt = new Date(Date.now() + LINK_TOKEN_TTL_MS);
  const id = randomUUID();

  // Capacity is enforced inside the INSERT itself. Counting first and inserting
  // second would let two concurrent signups both see 29 taken and both take the
  // 30th seat; the conditional SELECT makes the check and the write one atomic
  // statement, so the 31st request inserts 0 rows and is told the lesson is full.
  let created = false;
  let full = false;
  try {
    const inserted = await prisma.$executeRaw`
      INSERT INTO "SchoolApplication"
        ("id", "name", "email", "phone", "school", "grade", "topicId", "lang",
         "linkToken", "linkTokenExpiresAt", "createdAt")
      SELECT ${id}, ${name}, ${email}, ${phone}, ${school}, ${grade}, ${topicId},
             ${lang}, ${linkToken}, ${linkTokenExpiresAt}, NOW()
      WHERE (
        SELECT COUNT(*) FROM "SchoolApplication" WHERE "topicId" = ${topicId}
      ) < ${LESSON_CAPACITY}
    `;
    created = inserted > 0;
    full = inserted === 0;
  } catch {
    // Don't fail the request on a DB hiccup - still notify the admin chat below.
  }

  if (full) {
    return NextResponse.json({ ok: false, error: "lesson_full" }, { status: 409 });
  }

  const L = LABELS[lang];
  const text = [
    `🏦 <b>SQB AI</b>`,
    DIVIDER,
    `<b>${L.title}</b>`,
    ``,
    `👤 <b>${L.name}:</b> ${escapeHtml(name)}`,
    `📧 <b>${L.email}:</b> ${escapeHtml(email)}`,
    `📱 <b>${L.phone}:</b> ${escapeHtml(phone)}`,
    `🏫 <b>${L.school}:</b> ${escapeHtml(school)}`,
    `🎒 <b>${L.grade}:</b> ${escapeHtml(grade)}`,
    ``,
    DIVIDER,
    `📚 <b>${L.topic}:</b> ${escapeHtml(topic.title[lang])}`,
    `📅 <b>${L.date}:</b> ${escapeHtml(formatLessonDate(topic.date, lang))}`,
    `🕒 <b>${L.time}:</b> ${escapeHtml(LESSON_TIME)}`,
    `📍 <b>${L.place}:</b> ${escapeHtml(LESSON_LOCATION[lang])}`,
    ``,
    DIVIDER,
    `<i>📍 ${L.footer}</i>`,
  ].join("\n");

  let telegramSent = false;
  try {
    await sendTelegramMessage(token, chatId, text, "HTML");
    telegramSent = true;
  } catch {
    // Telegram unreachable - the row is already persisted above (if it was).
  }

  // If BOTH persistence and notification failed the signup is lost - surface an
  // error so the student can retry instead of seeing a false success.
  if (!created && !telegramSent) {
    console.error(
      "[school] signup lost: DB insert and Telegram delivery both failed"
    );
    return NextResponse.json({ ok: false, error: "submit_failed" }, { status: 502 });
  }

  // The bot cannot message the student until they start a chat with it, so send
  // them to the deep link; the webhook binds their chat id and replies with the
  // lesson details. Only offer it when the row exists - the token must resolve.
  const telegramUrl =
    botUsername && created
      ? `https://t.me/${botUsername}?start=${linkToken}`
      : null;

  return NextResponse.json({ ok: true, telegramUrl });
}
