import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Polled by the admin chat view to surface new user messages in near-real-time.
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const submissionId = params.id;

  try {
    const messages = await prisma.contactMessage.findMany({
      where: { submissionId },
      orderBy: { createdAt: "asc" },
      select: { id: true, direction: true, text: true, createdAt: true },
    });

    // Admin is actively viewing - clear the unread flag on incoming messages.
    const hasUnread = messages.some((m) => m.direction === "in");
    if (hasUnread) {
      await prisma.contactMessage.updateMany({
        where: { submissionId, direction: "in", read: false },
        data: { read: true },
      });
    }

    return NextResponse.json({
      ok: true,
      messages: messages.map((m) => ({
        id: m.id,
        direction: m.direction,
        text: m.text,
        createdAt: m.createdAt.toISOString(),
      })),
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
