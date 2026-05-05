import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { SectionHeadingForm } from "@/components/admin/SectionHeadingForm";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { getSectionHeading } from "@/lib/section-headings";
import { ProjectsList } from "./List";

export default async function ProjectsAdminPage() {
  const t = getStrings(getServerLocale());
  const [rows, heading] = await Promise.all([
    prisma.project.findMany({
      orderBy: { order: "asc" },
      include: { team: { select: { id: true } } },
    }),
    getSectionHeading("projects"),
  ]);
  return (
    <div>
      <PageHeader
        title={t.page.projects.title}
        description={t.page.projects.sub}
        actionHref="/admin/projects/new"
      />
      <SectionHeadingForm section="projects" adminPath="/admin/projects" defaultValue={heading} />
      <ProjectsList rows={rows} />
    </div>
  );
}
