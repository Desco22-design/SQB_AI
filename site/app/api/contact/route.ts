import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { sendTelegramMessage, escapeHtml } from "@/lib/telegram";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 60_000;
// Applicants share IPs (a university lab, an office, a family), so a low cap
// made ordinary use look like a random failure.
const RATE_LIMIT_MAX = 10;
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
  /**
   * Honeypot. Deliberately not called "website" - browsers autofill that name
   * from the user's profile, which made real applicants look like bots.
   */
  hp?: string;
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

  // The flow ends in a redirect to the bot, so a missing bot username is a
  // broken config, not a degraded one. Fail loudly rather than returning a
  // success with nowhere to send the visitor.
  if (!token || !chatId || !botUsername) {
    console.error("[contact] misconfigured: missing Telegram env");
    return NextResponse.json(
      { ok: false, error: "not_configured" },
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

  // Honeypot - silently accept bots without notifying Telegram. Note this returns
  // no telegramUrl, so a false positive leaves a real user stranded: that is
  // exactly what happened while the field was named "website" and autofill kept
  // filling it in.
  if (data.hp && data.hp.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const ip = clientIp(req);

  if (!rateLimit(`contact:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
    // A code, not English prose - the form maps it to a translated message.
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
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

  // The row must exist before we hand out the deep link: the bot resolves the
  // token against it. Swallowing a DB error here produced the worst outcome - a
  // "success" with no link, so the visitor was never sent to the bot and saw
  // nothing happen. Retry once for a transient Neon hiccup, then fail loudly.
  let submissionCreated = false;
  for (let attempt = 0; attempt < 2 && !submissionCreated; attempt++) {
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
          lang,
          linkToken,
          linkTokenExpiresAt,
        },
      });
      submissionCreated = true;
    } catch (e) {
      if (attempt === 1) {
        console.error("[contact] insert failed after retry:", e);
      }
    }
  }

  if (!submissionCreated) {
    return NextResponse.json({ ok: false, error: "submit_failed" }, { status: 502 });
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

  // Admin notification is a side effect: the lead is already saved, so a Telegram
  // outage must not stop the visitor being sent to the bot.
  try {
    await sendTelegramMessage(token, chatId, text, "HTML");
  } catch (e) {
    console.error("[contact] admin notification failed:", e);
  }

  // We only get here when the row exists, so the token always resolves and the
  // link is always safe to hand out.
  const telegramUrl = `https://t.me/${botUsername}?start=${linkToken}`;

  return NextResponse.json({ ok: true, telegramUrl });
}
