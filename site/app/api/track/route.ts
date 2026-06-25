import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

type Payload = {
  visitorId?: string;
  sessionId?: string;
  path?: string;
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 30;

export async function POST(req: Request) {
  const ip = clientIp(req);

  if (!rateLimit(`track:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  let data: Payload;
  try {
    data = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const visitorId = (data.visitorId ?? "").trim().slice(0, 100);
  const sessionId = (data.sessionId ?? "").trim().slice(0, 100);
  const path = (data.path ?? "/").trim().slice(0, 500);

  if (!visitorId || !sessionId) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    await prisma.pageView.create({
      data: { visitorId, sessionId, path },
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
