import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { SectionHeadingForm } from "@/components/admin/SectionHeadingForm";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { getSetting } from "@/lib/site-settings";
import { getSectionHeading } from "@/lib/section-headings";
import { TeamList } from "./List";
import { HeadlineForm } from "./HeadlineForm";

export default async function TeamPage() {
  const t = getStrings(getServerLocale());
  const [rows, headlineValue, heading] = await Promise.all([
    prisma.teamMember.findMany({ orderBy: { order: "asc" } }),
    getSetting("team.headlineValue"),
    getSectionHeading("team"),
  ]);
  return (
    <div>
      <PageHeader
        title={t.page.team.title}
        description={t.page.team.sub}
        actionHref="/admin/team/new"
      />
      <SectionHeadingForm section="team" adminPath="/admin/team" defaultValue={heading} />
      <HeadlineForm initial={headlineValue ?? ""} />
      <TeamList rows={rows} />
    </div>
  );
}
