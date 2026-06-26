import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { sendTelegramMessage, escapeHtml } from "@/lib/telegram";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const LINK_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

type Lang = "uz" | "ru" | "en";

type Payload = {
  type?: string;
  name?: string;
  email?: string;
  company?: string;
  direction?: string;
  phone?: string;
  message?: string;
  website?: string;
  lang?: string;
};

const DIVIDER = "──────────────────────";

const LABELS = {
  uz: {
    partner: "🤝 Yangi hamkorlik so'rovi",
    intern: "🎓 Yangi stajyorlik arizasi",
    name: "Ism",
    email: "Email",
    phone: "Telefon",
    company: "Kompaniya",
    university: "Universitet",
    direction: "Yo'nalish",
    about: "O'zi haqida",
    message: "Xabar",
    footer: "sqb.uz saytidan yuborildi",
  },
  ru: {
    partner: "🤝 Новый запрос на партнёрство",
    intern: "🎓 Новая заявка на стажировку",
    name: "Имя",
    email: "Email",
    phone: "Телефон",
    company: "Компания",
    university: "Университет",
    direction: "Направление",
    about: "О себе",
    message: "Сообщение",
    footer: "Отправлено с сайта sqb.uz",
  },
  en: {
    partner: "🤝 New partnership inquiry",
    intern: "🎓 New internship application",
    name: "Name",
    email: "Email",
    phone: "Phone",
    company: "Company",
    university: "University",
    direction: "Direction",
    about: "About",
    message: "Message",
    footer: "Submitted via sqb.uz",
  },
} as const;

function firstNameOf(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? fullName.trim();
}

function buildMessage(params: {
  lang: Lang;
  isIntern: boolean;
  name: string;
  email: string;
  phone: string;
  company: string;
  direction: string;
  message: string;
}): string {
  const { lang, isIntern, name, email, phone, company, direction, message } =
    params;
  const L = LABELS[lang];
  const firstName = escapeHtml(firstNameOf(name));

  const rows: (string | false)[] = [
    `🏦 <b>SQB AI</b>`,
    DIVIDER,
    `<b>${isIntern ? L.intern : L.partner}</b>`,
    ``,
    `👤 <b>${L.name}:</b> ${escapeHtml(name)}`,
    `📧 <b>${L.email}:</b> ${escapeHtml(email)}`,
    !!phone && `📱 <b>${L.phone}:</b> ${escapeHtml(phone)}`,
    !!company &&
      `${isIntern ? "🎓" : "🏢"} <b>${isIntern ? L.university : L.company}:</b> ${escapeHtml(company)}`,
    !!(isIntern && direction) &&
      `🔬 <b>${L.direction}:</b> ${escapeHtml(direction)}`,
    ``,
    DIVIDER,
    `💬 <b>${isIntern ? L.about : L.message}, ${firstName}:</b>`,
    escapeHtml(message),
    ``,
    DIVIDER,
    `<i>📍 ${L.footer}</i>`,
  ];

  return rows.filter((r): r is string => r !== false).join("\n");
}

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

  // Honeypot — silently accept bots without notifying Telegram.
  if (data.website && data.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const ip = clientIp(req);

  if (!rateLimit(`contact:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again in a minute." },
      { status: 429 }
    );
  }

  const name = (data.name ?? "").trim().slice(0, 200);
  const email = (data.email ?? "").trim().slice(0, 200);
  const company = (data.company ?? "").trim().slice(0, 200);
  const phone = (data.phone ?? "").trim().slice(0, 50);
  const message = (data.message ?? "").trim().slice(0, 4000);
  const type = data.type === "intern" ? "intern" : "partner";
  const direction = (data.direction ?? "").trim().slice(0, 200);
  const isIntern = type === "intern";
  const rawLang = (data.lang ?? "ru").toLowerCase();
  const lang: Lang = rawLang === "uz" || rawLang === "en" ? rawLang : "ru";

  if (!name || !email || !phone || !message) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Invalid email." },
      { status: 400 }
    );
  }

  const linkToken = randomBytes(32).toString("base64url");
  const linkTokenExpiresAt = new Date(Date.now() + LINK_TOKEN_TTL_MS);

  let submissionCreated = false;
  try {
    await prisma.contactSubmission.create({
      data: {
        type,
        name,
        email,
        company: company || null,
        direction: direction || null,
        phone,
        message,
        linkToken,
        linkTokenExpiresAt,
      },
    });
    submissionCreated = true;
  } catch {
    // Don't fail the request if DB insert fails — still send Telegram notification.
  }

  const text = buildMessage({
    lang,
    isIntern,
    name,
    email,
    phone,
    company,
    direction,
    message,
  });

  try {
    await sendTelegramMessage(token, chatId, text, "HTML");
  } catch {
    // Telegram unreachable/slow — submission already persisted above.
  }

  const telegramUrl =
    botUsername && submissionCreated
      ? `https://t.me/${botUsername}?start=${linkToken}`
      : null;

  return NextResponse.json({ ok: true, telegramUrl });
}
