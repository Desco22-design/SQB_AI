import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { SectionHeadingForm } from "@/components/admin/SectionHeadingForm";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { getSectionHeading } from "@/lib/section-headings";
import { DirectionsList } from "./List";

export default async function DirectionsPage() {
  const t = getStrings(getServerLocale());
  const [rows, heading] = await Promise.all([
    prisma.aiDirection.findMany({ orderBy: { order: "asc" } }),
    getSectionHeading("features"),
  ]);
  return (
    <div>
      <PageHeader
        title={t.page.directions.title}
        description={t.page.directions.sub}
        actionHref="/admin/directions/new"
      />
      <SectionHeadingForm section="features" adminPath="/admin/directions" defaultValue={heading} />
      <DirectionsList rows={rows} />
    </div>
  );
}
