import "server-only";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type AuditAction = "create" | "update" | "delete";

export async function logAudit(params: {
  action: AuditAction;
  entity: string;
  entityId?: string | null;
  summary: string;
}) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user as
      | { id?: string; email?: string; name?: string }
      | undefined;
    if (!user?.email) return;
    await prisma.adminAuditLog.create({
      data: {
        adminId: user.id ?? null,
        adminEmail: user.email,
        adminName: user.name ?? user.email,
        action: params.action,
        entity: params.entity,
        entityId: params.entityId ?? null,
        summary: params.summary.slice(0, 200),
      },
    });
  } catch {
    // Logging must never break the parent action.
  }
}
