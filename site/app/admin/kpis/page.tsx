import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { KpisList } from "./List";

export default async function KpisPage() {
  const t = getStrings(getServerLocale());
  const rows = await prisma.kpi.findMany({ orderBy: { order: "asc" } });
  return (
    <div>
      <PageHeader
        title={t.page.kpis.title}
        description={t.page.kpis.sub}
        actionHref="/admin/kpis/new"
      />
      <KpisList rows={rows} />
    </div>
  );
}
