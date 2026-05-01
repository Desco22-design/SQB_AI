"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { collectI18n } from "@/lib/i18n-content";

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
  await prisma.kpi.create({
    data: {
      label: collectI18n(form, "label"),
      value: n(form, "value"),
      suffix: s(form, "suffix"),
      decimals: n(form, "decimals"),
      order: n(form, "order"),
    },
  });
  revalidatePath("/admin/kpis");
  revalidatePath("/");
  redirect("/admin/kpis");
}

export async function updateKpi(id: string, form: FormData) {
  await requireAuth();
  await prisma.kpi.update({
    where: { id },
    data: {
      label: collectI18n(form, "label"),
      value: n(form, "value"),
      suffix: s(form, "suffix"),
      decimals: n(form, "decimals"),
      order: n(form, "order"),
    },
  });
  revalidatePath("/admin/kpis");
  revalidatePath("/");
  redirect("/admin/kpis");
}

export async function deleteKpi(id: string) {
  await requireAuth();
  await prisma.kpi.delete({ where: { id } });
  revalidatePath("/admin/kpis");
  revalidatePath("/");
}
