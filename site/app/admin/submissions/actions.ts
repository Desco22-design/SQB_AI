"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";

async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
}

export async function deleteSubmission(id: string) {
  await requireAuth();
  const existing = await prisma.contactSubmission.findUnique({ where: { id } });
  await prisma.contactSubmission.delete({ where: { id } });
  await logAudit({
    action: "delete",
    entity: "submissions",
    entityId: id,
    summary: existing ? `${existing.name} <${existing.email}>` : id,
  });
  revalidatePath("/admin/submissions");
}

export async function deleteSubmissionAndReturn(id: string, _formData: FormData) {
  await deleteSubmission(id);
  redirect("/admin/submissions");
}
