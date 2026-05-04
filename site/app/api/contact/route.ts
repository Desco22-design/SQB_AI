import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  message?: string;
  website?: string;
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const recentSubmissions = new Map<string, number[]>();

function checkRateLimit(ip: string) {
  const now = Date.now();
  const entries = (recentSubmissions.get(ip) ?? []).filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  );
  if (entries.length >= RATE_LIMIT_MAX) return false;
  entries.push(now);
  recentSubmissions.set(ip, entries);
  return true;
}

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

  const ip =
    req.headers.get("x-nf-client-connection-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again in a minute." },
      { status: 429 }
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

  const name = (data.name ?? "").trim().slice(0, 200);
  const email = (data.email ?? "").trim().slice(0, 200);
  const company = (data.company ?? "").trim().slice(0, 200);
  const phone = (data.phone ?? "").trim().slice(0, 50);
  const message = (data.message ?? "").trim().slice(0, 4000);

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
    "<b>📩 New SQB AI contact</b>",
    "",
    `<b>Name:</b> ${escapeHtml(name)}`,
    `<b>Email:</b> ${escapeHtml(email)}`,
    phone ? `<b>Phone:</b> ${escapeHtml(phone)}` : "",
    company ? `<b>Company:</b> ${escapeHtml(company)}` : "",
    "",
    "<b>Message:</b>",
    escapeHtml(message)
  ]
    .filter(Boolean)
    .join("\n");

  const tgRes = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true
      })
    }
  );

  if (!tgRes.ok) {
    return NextResponse.json(
      { ok: false, error: "Failed to send message." },
      { status: 502 }
    );
  }

  try {
    await prisma.contactSubmission.create({
      data: { name, email, company: company || null, phone, message },
    });
  } catch {
    // Submission was already sent to Telegram — don't fail the request if DB log fails.
  }

  return NextResponse.json({ ok: true });
}
