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
const n = (f: FormData, k: string) => {
  const v = Number(f.get(k));
  return Number.isFinite(v) ? v : 0;
};

export async function createFaq(form: FormData) {
  await requireAuth();
  await prisma.faqItem.create({
    data: {
      question: collectI18n(form, "question"),
      answer: collectI18n(form, "answer"),
      order: n(form, "order"),
    },
  });
  revalidatePath("/admin/faq");
  revalidatePath("/");
  redirect("/admin/faq");
}

export async function updateFaq(id: string, form: FormData) {
  await requireAuth();
  await prisma.faqItem.update({
    where: { id },
    data: {
      question: collectI18n(form, "question"),
      answer: collectI18n(form, "answer"),
      order: n(form, "order"),
    },
  });
  revalidatePath("/admin/faq");
  revalidatePath("/");
  redirect("/admin/faq");
}

export async function deleteFaq(id: string) {
  await requireAuth();
  await prisma.faqItem.delete({ where: { id } });
  revalidatePath("/admin/faq");
  revalidatePath("/");
}
