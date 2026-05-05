"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteImageByUrl } from "@/lib/storage";
import { slugify } from "@/lib/slug";
import { collectI18n } from "@/lib/i18n-content";
import { logAudit } from "@/lib/audit";

async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
}
const s = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const n = (f: FormData, k: string) => {
  const v = Number(f.get(k));
  return Number.isFinite(v) ? v : 0;
};
const csv = (f: FormData, k: string) =>
  s(f, k)
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

export async function createTeamMember(form: FormData) {
  await requireAuth();
  const name = s(form, "name");
  const id = s(form, "id") || slugify(name);
  await prisma.teamMember.create({
    data: {
      id,
      name,
      role: collectI18n(form, "role"),
      bio: collectI18n(form, "bio"),
      skills: csv(form, "skills"),
      photo: s(form, "photo"),
      order: n(form, "order"),
    },
  });
  await logAudit({
    action: "create",
    entity: "team",
    entityId: id,
    summary: name || id,
  });
  revalidatePath("/admin/team");
  revalidatePath("/");
  redirect("/admin/team");
}

export async function updateTeamMember(id: string, form: FormData) {
  await requireAuth();
  const existing = await prisma.teamMember.findUnique({ where: { id } });
  const newPhoto = s(form, "photo");
  if (existing && existing.photo && existing.photo !== newPhoto) {
    await deleteImageByUrl(existing.photo);
  }
  const name = s(form, "name");
  await prisma.teamMember.update({
    where: { id },
    data: {
      name,
      role: collectI18n(form, "role"),
      bio: collectI18n(form, "bio"),
      skills: csv(form, "skills"),
      photo: newPhoto,
      order: n(form, "order"),
    },
  });
  await logAudit({
    action: "update",
    entity: "team",
    entityId: id,
    summary: name || id,
  });
  revalidatePath("/admin/team");
  revalidatePath("/");
  redirect("/admin/team");
}

export async function deleteTeamMember(id: string) {
  await requireAuth();
  const existing = await prisma.teamMember.findUnique({ where: { id } });
  if (existing?.photo) await deleteImageByUrl(existing.photo);
  await prisma.teamMember.delete({ where: { id } });
  await logAudit({
    action: "delete",
    entity: "team",
    entityId: id,
    summary: existing?.name || id,
  });
  revalidatePath("/admin/team");
  revalidatePath("/");
}
