"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteImageByUrl } from "@/lib/storage";
import { slugify } from "@/lib/slug";
import { collectI18n, pickLang } from "@/lib/i18n-content";
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

export async function createNews(form: FormData) {
  await requireAuth();
  const title = collectI18n(form, "title");
  const id = s(form, "id") || slugify(pickLang(title, "ru") || pickLang(title, "en")).slice(0, 60) || "news";
  await prisma.newsItem.create({
    data: {
      id,
      title,
      excerpt: collectI18n(form, "excerpt"),
      body: collectI18n(form, "body"),
      date: new Date(s(form, "date")),
      category: s(form, "category"),
      image: s(form, "image"),
      order: n(form, "order"),
    },
  });
  await logAudit({
    action: "create",
    entity: "news",
    entityId: id,
    summary: pickLang(title, "ru") || id,
  });
  revalidatePath("/admin/news");
  revalidatePath("/");
  revalidatePath("/news");
  redirect("/admin/news");
}

export async function updateNews(id: string, form: FormData) {
  await requireAuth();
  const existing = await prisma.newsItem.findUnique({ where: { id } });
  const newImage = s(form, "image");
  if (existing?.image && existing.image !== newImage) {
    await deleteImageByUrl(existing.image);
  }
  const title = collectI18n(form, "title");
  await prisma.newsItem.update({
    where: { id },
    data: {
      title,
      excerpt: collectI18n(form, "excerpt"),
      body: collectI18n(form, "body"),
      date: new Date(s(form, "date")),
      category: s(form, "category"),
      image: newImage,
      order: n(form, "order"),
    },
  });
  await logAudit({
    action: "update",
    entity: "news",
    entityId: id,
    summary: pickLang(title, "ru") || id,
  });
  revalidatePath("/admin/news");
  revalidatePath("/");
  revalidatePath("/news");
  redirect("/admin/news");
}

export async function deleteNews(id: string) {
  await requireAuth();
  const existing = await prisma.newsItem.findUnique({ where: { id } });
  if (existing?.image) await deleteImageByUrl(existing.image);
  await prisma.newsItem.delete({ where: { id } });
  await logAudit({
    action: "delete",
    entity: "news",
    entityId: id,
    summary: pickLang(existing?.title, "ru") || id,
  });
  revalidatePath("/admin/news");
  revalidatePath("/");
  revalidatePath("/news");
}
