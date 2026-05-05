"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { collectI18n, pickLang } from "@/lib/i18n-content";
import { logAudit } from "@/lib/audit";

async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
}
const n = (f: FormData, k: string) => {
  const v = Number(f.get(k));
  return Number.isFinite(v) ? v : 0;
};

export async function createAboutBenefit(form: FormData) {
  await requireAuth();
  const title = collectI18n(form, "title");
  const created = await prisma.aboutBenefit.create({
    data: {
      title,
      body: collectI18n(form, "body"),
      order: n(form, "order"),
    },
  });
  await logAudit({
    action: "create",
    entity: "about",
    entityId: created.id,
    summary: pickLang(title, "ru") || created.id,
  });
  revalidatePath("/admin/about");
  revalidatePath("/");
  redirect("/admin/about");
}

export async function updateAboutBenefit(id: string, form: FormData) {
  await requireAuth();
  const title = collectI18n(form, "title");
  await prisma.aboutBenefit.update({
    where: { id },
    data: {
      title,
      body: collectI18n(form, "body"),
      order: n(form, "order"),
    },
  });
  await logAudit({
    action: "update",
    entity: "about",
    entityId: id,
    summary: pickLang(title, "ru") || id,
  });
  revalidatePath("/admin/about");
  revalidatePath("/");
  redirect("/admin/about");
}

export async function deleteAboutBenefit(id: string) {
  await requireAuth();
  const existing = await prisma.aboutBenefit.findUnique({ where: { id } });
  await prisma.aboutBenefit.delete({ where: { id } });
  await logAudit({
    action: "delete",
    entity: "about",
    entityId: id,
    summary: pickLang(existing?.title, "ru") || id,
  });
  revalidatePath("/admin/about");
  revalidatePath("/");
}
