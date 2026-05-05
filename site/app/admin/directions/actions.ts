"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { collectI18n, pickLang } from "@/lib/i18n-content";
import { logAudit } from "@/lib/audit";

async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
}

function parseOrder(v: FormDataEntryValue | null): number {
  const n = Number(v ?? 0);
  return Number.isFinite(n) ? n : 0;
}

function isI18nEmpty(value: { uz?: string; ru?: string; en?: string }) {
  return (
    !value.uz?.trim() && !value.ru?.trim() && !value.en?.trim()
  );
}

export async function createDirection(form: FormData) {
  await requireAuth();
  const title = collectI18n(form, "title");
  const eyebrow = collectI18n(form, "eyebrow");
  const details = collectI18n(form, "details");
  const created = await prisma.aiDirection.create({
    data: {
      title,
      description: collectI18n(form, "description"),
      eyebrow: isI18nEmpty(eyebrow) ? Prisma.JsonNull : eyebrow,
      details: isI18nEmpty(details) ? Prisma.JsonNull : details,
      order: parseOrder(form.get("order")),
    },
  });
  await logAudit({
    action: "create",
    entity: "directions",
    entityId: created.id,
    summary: pickLang(title, "ru") || created.id,
  });
  revalidatePath("/admin/directions");
  revalidatePath("/");
  redirect("/admin/directions");
}

export async function updateDirection(id: string, form: FormData) {
  await requireAuth();
  const title = collectI18n(form, "title");
  const eyebrow = collectI18n(form, "eyebrow");
  const details = collectI18n(form, "details");
  await prisma.aiDirection.update({
    where: { id },
    data: {
      title,
      description: collectI18n(form, "description"),
      eyebrow: isI18nEmpty(eyebrow) ? Prisma.JsonNull : eyebrow,
      details: isI18nEmpty(details) ? Prisma.JsonNull : details,
      order: parseOrder(form.get("order")),
    },
  });
  await logAudit({
    action: "update",
    entity: "directions",
    entityId: id,
    summary: pickLang(title, "ru") || id,
  });
  revalidatePath("/admin/directions");
  revalidatePath("/");
  redirect("/admin/directions");
}

export async function deleteDirection(id: string) {
  await requireAuth();
  const existing = await prisma.aiDirection.findUnique({ where: { id } });
  await prisma.aiDirection.delete({ where: { id } });
  await logAudit({
    action: "delete",
    entity: "directions",
    entityId: id,
    summary: pickLang(existing?.title, "ru") || id,
  });
  revalidatePath("/admin/directions");
  revalidatePath("/");
}
