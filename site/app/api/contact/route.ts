import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { sendTelegramMessage, escapeHtml } from "@/lib/telegram";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
// Link token expires 7 days after submission.
const LINK_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

type Payload = {
  type?: string;
  name?: string;
  email?: string;
  company?: string;
  direction?: string;
  phone?: string;
  message?: string;
  website?: string;
};

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

  // Generate a high-entropy single-use token for the Telegram deep link.
  // This is separate from the submission id so that knowing the id does not
  // allow hijacking the Telegram account link.
  const linkToken = randomBytes(32).toString("base64url");
  const linkTokenExpiresAt = new Date(Date.now() + LINK_TOKEN_TTL_MS);

  // Persist submission to DB first to get the record before sending anything.
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

  const text = [
    isIntern
      ? "<b>🎓 New SQB AI internship application</b>"
      : "<b>🤝 New SQB AI partnership inquiry</b>",
    "",
    `<b>Name:</b> ${escapeHtml(name)}`,
    `<b>Email:</b> ${escapeHtml(email)}`,
    phone ? `<b>Phone:</b> ${escapeHtml(phone)}` : "",
    company
      ? `<b>${isIntern ? "University" : "Company"}:</b> ${escapeHtml(company)}`
      : "",
    isIntern && direction
      ? `<b>Direction:</b> ${escapeHtml(direction)}`
      : "",
    "",
    `<b>${isIntern ? "About" : "Message"}:</b>`,
    escapeHtml(message),
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await sendTelegramMessage(token, chatId, text, "HTML");
  } catch {
    // Telegram unreachable/slow — submission already persisted above.
  }

  // Only build the deep link when the submission was persisted and the bot
  // username is configured. The token is what the webhook looks up — never
  // expose the submission id in the deep link.
  const telegramUrl =
    botUsername && submissionCreated
      ? `https://t.me/${botUsername}?start=${linkToken}`
      : null;

  return NextResponse.json({ ok: true, telegramUrl });
}
