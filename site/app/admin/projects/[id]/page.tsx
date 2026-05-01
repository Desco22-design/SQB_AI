import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FormShell } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { ProjectForm } from "../Form";
import { updateProject } from "../actions";

export default async function EditProject({
  params,
}: {
  params: { id: string };
}) {
  const t = getStrings(getServerLocale());
  const [row, team] = await Promise.all([
    prisma.project.findUnique({
      where: { id: params.id },
      include: { team: true },
    }),
    prisma.teamMember.findMany({ orderBy: { order: "asc" } }),
  ]);
  if (!row) notFound();

  const teamOptions = team.map((m) => ({ value: m.id, label: m.name }));
  const project = {
    ...row,
    impact: row.impact as { label: string; value: string }[],
  };

  return (
    <FormShell title={t.form.edit.projects} backHref="/admin/projects">
      <ProjectForm
        defaultValue={project}
        teamOptions={teamOptions}
        action={updateProject.bind(null, row.id)}
        isEdit
      />
    </FormShell>
  );
}
