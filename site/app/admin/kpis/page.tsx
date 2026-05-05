import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { SectionHeadingForm } from "@/components/admin/SectionHeadingForm";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { getSectionHeading } from "@/lib/section-headings";
import { KpisList } from "./List";

export default async function KpisPage() {
  const t = getStrings(getServerLocale());
  const [rows, heading] = await Promise.all([
    prisma.kpi.findMany({ orderBy: { order: "asc" } }),
    getSectionHeading("impact"),
  ]);
  return (
    <div>
      <PageHeader
        title={t.page.kpis.title}
        description={t.page.kpis.sub}
        actionHref="/admin/kpis/new"
      />
      <SectionHeadingForm section="impact" adminPath="/admin/kpis" defaultValue={heading} />
      <KpisList rows={rows} />
    </div>
  );
}
