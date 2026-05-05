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
const csv = (f: FormData, k: string) =>
  s(f, k)
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

export async function createEvent(form: FormData) {
  await requireAuth();
  const name = collectI18n(form, "name");
  const id =
    s(form, "id") ||
    slugify(pickLang(name, "ru") || pickLang(name, "en")).slice(0, 60) ||
    "event";
  await prisma.eventItem.create({
    data: {
      id,
      name,
      date: new Date(s(form, "date")),
      place: collectI18n(form, "place"),
      participants: collectI18n(form, "participants"),
      image: s(form, "image"),
      gallery: csv(form, "gallery"),
      order: n(form, "order"),
    },
  });
  await logAudit({
    action: "create",
    entity: "events",
    entityId: id,
    summary: pickLang(name, "ru") || id,
  });
  revalidatePath("/admin/events");
  revalidatePath("/");
  revalidatePath("/events");
  redirect("/admin/events");
}

export async function updateEvent(id: string, form: FormData) {
  await requireAuth();
  const existing = await prisma.eventItem.findUnique({ where: { id } });
  const newImage = s(form, "image");
  const newGallery = csv(form, "gallery");

  if (existing) {
    if (existing.image && existing.image !== newImage && !newGallery.includes(existing.image)) {
      await deleteImageByUrl(existing.image);
    }
    for (const g of existing.gallery) {
      if (!newGallery.includes(g) && g !== newImage) {
        await deleteImageByUrl(g);
      }
    }
  }

  const name = collectI18n(form, "name");
  await prisma.eventItem.update({
    where: { id },
    data: {
      name,
      date: new Date(s(form, "date")),
      place: collectI18n(form, "place"),
      participants: collectI18n(form, "participants"),
      image: newImage,
      gallery: newGallery,
      order: n(form, "order"),
    },
  });
  await logAudit({
    action: "update",
    entity: "events",
    entityId: id,
    summary: pickLang(name, "ru") || id,
  });
  revalidatePath("/admin/events");
  revalidatePath("/");
  revalidatePath("/events");
  redirect("/admin/events");
}

export async function deleteEvent(id: string) {
  await requireAuth();
  const existing = await prisma.eventItem.findUnique({ where: { id } });
  if (existing) {
    if (existing.image) await deleteImageByUrl(existing.image);
    for (const g of existing.gallery) await deleteImageByUrl(g);
  }
  await prisma.eventItem.delete({ where: { id } });
  await logAudit({
    action: "delete",
    entity: "events",
    entityId: id,
    summary: pickLang(existing?.name, "ru") || id,
  });
  revalidatePath("/admin/events");
  revalidatePath("/");
  revalidatePath("/events");
}
