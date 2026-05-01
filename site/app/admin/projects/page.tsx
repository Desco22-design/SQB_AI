import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { ProjectsList } from "./List";

export default async function ProjectsAdminPage() {
  const t = getStrings(getServerLocale());
  const rows = await prisma.project.findMany({
    orderBy: { order: "asc" },
    include: { team: { select: { id: true } } },
  });
  return (
    <div>
      <PageHeader
        title={t.page.projects.title}
        description={t.page.projects.sub}
        actionHref="/admin/projects/new"
      />
      <ProjectsList rows={rows} />
    </div>
  );
}
