import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type Payload = {
  visitorId?: string;
  sessionId?: string;
  path?: string;
};

export async function POST(req: Request) {
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
