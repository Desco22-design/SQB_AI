import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { SectionHeadingForm } from "@/components/admin/SectionHeadingForm";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { getSectionHeading } from "@/lib/section-headings";
import { GalleryManager } from "./GalleryManager";

export default async function GalleryAdminPage() {
  const t = getStrings(getServerLocale());
  const [items, heading] = await Promise.all([
    prisma.galleryImage.findMany({ orderBy: { order: "asc" } }),
    getSectionHeading("gallery"),
  ]);
  return (
    <div>
      <PageHeader title={t.page.gallery.title} description={t.page.gallery.sub} />
      <SectionHeadingForm section="gallery" adminPath="/admin/gallery" defaultValue={heading} />
      <GalleryManager items={items} />
    </div>
  );
}
