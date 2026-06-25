import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

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

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const TELEGRAM_TIMEOUT_MS = 4_000;

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

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
  // Run BEFORE the rate-limit check so bot traffic never consumes limiter slots.
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
    escapeHtml(message)
  ]
    .filter(Boolean)
    .join("\n");

  // Notify Telegram, but never block on it. If Telegram is slow or down we
  // time out, swallow the error, and still persist the submission below so it
  // is not lost.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TELEGRAM_TIMEOUT_MS);
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true
      }),
      signal: controller.signal
    });
  } catch {
    // Telegram unreachable/slow — do not lose the submission. It is still
    // persisted to the DB below and the request returns ok.
  } finally {
    clearTimeout(timeout);
  }

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
      },
    });
  } catch {
    // Don't fail the request if DB log fails.
  }

  return NextResponse.json({ ok: true });
}
