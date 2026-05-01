import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { DirectionsList } from "./List";

export default async function DirectionsPage() {
  const t = getStrings(getServerLocale());
  const rows = await prisma.aiDirection.findMany({ orderBy: { order: "asc" } });
  return (
    <div>
      <PageHeader
        title={t.page.directions.title}
        description={t.page.directions.sub}
        actionHref="/admin/directions/new"
      />
      <DirectionsList rows={rows} />
    </div>
  );
}
