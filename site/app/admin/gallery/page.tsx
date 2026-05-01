import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { GalleryManager } from "./GalleryManager";

export default async function GalleryAdminPage() {
  const t = getStrings(getServerLocale());
  const items = await prisma.galleryImage.findMany({ orderBy: { order: "asc" } });
  return (
    <div>
      <PageHeader title={t.page.gallery.title} description={t.page.gallery.sub} />
      <GalleryManager items={items} />
    </div>
  );
}
