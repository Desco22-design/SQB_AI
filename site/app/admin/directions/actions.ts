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

function parseOrder(v: FormDataEntryValue | null): number {
  const n = Number(v ?? 0);
  return Number.isFinite(n) ? n : 0;
}

export async function createDirection(form: FormData) {
  await requireAuth();
  await prisma.aiDirection.create({
    data: {
      title: collectI18n(form, "title"),
      description: collectI18n(form, "description"),
      order: parseOrder(form.get("order")),
    },
  });
  revalidatePath("/admin/directions");
  revalidatePath("/");
  redirect("/admin/directions");
}

export async function updateDirection(id: string, form: FormData) {
  await requireAuth();
  await prisma.aiDirection.update({
    where: { id },
    data: {
      title: collectI18n(form, "title"),
      description: collectI18n(form, "description"),
      order: parseOrder(form.get("order")),
    },
  });
  revalidatePath("/admin/directions");
  revalidatePath("/");
  redirect("/admin/directions");
}

export async function deleteDirection(id: string) {
  await requireAuth();
  await prisma.aiDirection.delete({ where: { id } });
  revalidatePath("/admin/directions");
  revalidatePath("/");
}
