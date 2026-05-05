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

export async function createFaq(form: FormData) {
  await requireAuth();
  const question = collectI18n(form, "question");
  const created = await prisma.faqItem.create({
    data: {
      question,
      answer: collectI18n(form, "answer"),
      order: n(form, "order"),
    },
  });
  await logAudit({
    action: "create",
    entity: "faq",
    entityId: created.id,
    summary: pickLang(question, "ru") || created.id,
  });
  revalidatePath("/admin/faq");
  revalidatePath("/");
  redirect("/admin/faq");
}

export async function updateFaq(id: string, form: FormData) {
  await requireAuth();
  const question = collectI18n(form, "question");
  await prisma.faqItem.update({
    where: { id },
    data: {
      question,
      answer: collectI18n(form, "answer"),
      order: n(form, "order"),
    },
  });
  await logAudit({
    action: "update",
    entity: "faq",
    entityId: id,
    summary: pickLang(question, "ru") || id,
  });
  revalidatePath("/admin/faq");
  revalidatePath("/");
  redirect("/admin/faq");
}

export async function deleteFaq(id: string) {
  await requireAuth();
  const existing = await prisma.faqItem.findUnique({ where: { id } });
  await prisma.faqItem.delete({ where: { id } });
  await logAudit({
    action: "delete",
    entity: "faq",
    entityId: id,
    summary: pickLang(existing?.question, "ru") || id,
  });
  revalidatePath("/admin/faq");
  revalidatePath("/");
}
