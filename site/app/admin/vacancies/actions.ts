"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";
import { collectI18n, pickLang } from "@/lib/i18n-utils";
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

export async function createVacancy(form: FormData) {
  await requireAuth();
  const title = collectI18n(form, "title");
  const id =
    s(form, "id") ||
    slugify(pickLang(title, "en") || pickLang(title, "ru")).slice(0, 60) ||
    "vacancy";
  await prisma.vacancy.create({
    data: {
      id,
      title,
      location: collectI18n(form, "location"),
      type: s(form, "type"),
      icon: s(form, "icon") || null,
      description: collectI18n(form, "description"),
      responsibilities: collectI18n(form, "responsibilities"),
      requirements: collectI18n(form, "requirements"),
      offer: collectI18n(form, "offer"),
      order: n(form, "order"),
    },
  });
  await logAudit({
    action: "create",
    entity: "careers",
    entityId: id,
    summary: pickLang(title, "ru") || id,
  });
  revalidatePath("/admin/vacancies");
  revalidatePath("/");
  redirect("/admin/vacancies");
}

export async function updateVacancy(id: string, form: FormData) {
  await requireAuth();
  const title = collectI18n(form, "title");
  await prisma.vacancy.update({
    where: { id },
    data: {
      title,
      location: collectI18n(form, "location"),
      type: s(form, "type"),
      icon: s(form, "icon") || null,
      description: collectI18n(form, "description"),
      responsibilities: collectI18n(form, "responsibilities"),
      requirements: collectI18n(form, "requirements"),
      offer: collectI18n(form, "offer"),
      order: n(form, "order"),
    },
  });
  await logAudit({
    action: "update",
    entity: "careers",
    entityId: id,
    summary: pickLang(title, "ru") || id,
  });
  revalidatePath("/admin/vacancies");
  revalidatePath("/");
  redirect("/admin/vacancies");
}

export async function deleteVacancy(id: string) {
  await requireAuth();
  const existing = await prisma.vacancy.findUnique({ where: { id } });
  await prisma.vacancy.delete({ where: { id } });
  await logAudit({
    action: "delete",
    entity: "careers",
    entityId: id,
    summary: pickLang(existing?.title, "ru") || id,
  });
  revalidatePath("/admin/vacancies");
  revalidatePath("/");
}
