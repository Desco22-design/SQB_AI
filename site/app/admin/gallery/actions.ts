"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteImageByUrl } from "@/lib/storage";
import { logAudit } from "@/lib/audit";

async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
}

function urlTail(url: string) {
  const slash = url.lastIndexOf("/");
  return slash >= 0 ? url.slice(slash + 1) : url;
}

export async function addGalleryImage(url: string) {
  await requireAuth();
  if (!url) return;
  const max = await prisma.galleryImage.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  });
  const created = await prisma.galleryImage.create({
    data: { url, order: (max?.order ?? -1) + 1 },
  });
  await logAudit({
    action: "create",
    entity: "gallery",
    entityId: created.id,
    summary: urlTail(url),
  });
  revalidatePath("/admin/gallery");
  revalidatePath("/");
}

export async function deleteGalleryImage(id: string) {
  await requireAuth();
  const row = await prisma.galleryImage.findUnique({ where: { id } });
  if (row) await deleteImageByUrl(row.url);
  await prisma.galleryImage.delete({ where: { id } });
  await logAudit({
    action: "delete",
    entity: "gallery",
    entityId: id,
    summary: row ? urlTail(row.url) : id,
  });
  revalidatePath("/admin/gallery");
  revalidatePath("/");
}

export async function reorderGalleryImage(id: string, direction: "up" | "down") {
  await requireAuth();
  const all = await prisma.galleryImage.findMany({ orderBy: { order: "asc" } });
  const idx = all.findIndex((i) => i.id === id);
  if (idx < 0) return;
  const swapWith = direction === "up" ? idx - 1 : idx + 1;
  if (swapWith < 0 || swapWith >= all.length) return;
  const a = all[idx];
  const b = all[swapWith];
  await prisma.$transaction([
    prisma.galleryImage.update({ where: { id: a.id }, data: { order: b.order } }),
    prisma.galleryImage.update({ where: { id: b.id }, data: { order: a.order } }),
  ]);
  revalidatePath("/admin/gallery");
  revalidatePath("/");
}
