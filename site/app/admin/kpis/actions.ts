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

const s = (form: FormData, key: string) => String(form.get(key) ?? "").trim();
const n = (form: FormData, key: string, def = 0): number => {
  const v = Number(form.get(key));
  return Number.isFinite(v) ? v : def;
};

export async function createKpi(form: FormData) {
  await requireAuth();
  const label = collectI18n(form, "label");
  const created = await prisma.kpi.create({
    data: {
      label,
      value: n(form, "value"),
      suffix: s(form, "suffix"),
      decimals: n(form, "decimals"),
      order: n(form, "order"),
    },
  });
  await logAudit({
    action: "create",
    entity: "kpis",
    entityId: created.id,
    summary: pickLang(label, "ru") || created.id,
  });
  revalidatePath("/admin/kpis");
  revalidatePath("/");
  redirect("/admin/kpis");
}

export async function updateKpi(id: string, form: FormData) {
  await requireAuth();
  const label = collectI18n(form, "label");
  await prisma.kpi.update({
    where: { id },
    data: {
      label,
      value: n(form, "value"),
      suffix: s(form, "suffix"),
      decimals: n(form, "decimals"),
      order: n(form, "order"),
    },
  });
  await logAudit({
    action: "update",
    entity: "kpis",
    entityId: id,
    summary: pickLang(label, "ru") || id,
  });
  revalidatePath("/admin/kpis");
  revalidatePath("/");
  redirect("/admin/kpis");
}

export async function deleteKpi(id: string) {
  await requireAuth();
  const existing = await prisma.kpi.findUnique({ where: { id } });
  await prisma.kpi.delete({ where: { id } });
  await logAudit({
    action: "delete",
    entity: "kpis",
    entityId: id,
    summary: pickLang(existing?.label, "ru") || id,
  });
  revalidatePath("/admin/kpis");
  revalidatePath("/");
}
