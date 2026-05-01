import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { TeamList } from "./List";

export default async function TeamPage() {
  const t = getStrings(getServerLocale());
  const rows = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });
  return (
    <div>
      <PageHeader
        title={t.page.team.title}
        description={t.page.team.sub}
        actionHref="/admin/team/new"
      />
      <TeamList rows={rows} />
    </div>
  );
}
