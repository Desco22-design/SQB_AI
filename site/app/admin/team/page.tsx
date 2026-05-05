import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { getSetting } from "@/lib/site-settings";
import { TeamList } from "./List";
import { HeadlineForm } from "./HeadlineForm";

export default async function TeamPage() {
  const t = getStrings(getServerLocale());
  const [rows, headlineValue] = await Promise.all([
    prisma.teamMember.findMany({ orderBy: { order: "asc" } }),
    getSetting("team.headlineValue"),
  ]);
  return (
    <div>
      <PageHeader
        title={t.page.team.title}
        description={t.page.team.sub}
        actionHref="/admin/team/new"
      />
      <HeadlineForm initial={headlineValue ?? ""} />
      <TeamList rows={rows} />
    </div>
  );
}
