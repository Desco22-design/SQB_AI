import { prisma } from "@/lib/prisma";
import { FormShell } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { ProjectForm } from "../Form";
import { createProject } from "../actions";

export default async function NewProject() {
  const t = getStrings(getServerLocale());
  const team = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });
  const teamOptions = team.map((m) => ({ value: m.id, label: m.name }));
  return (
    <FormShell title={t.form.new.projects} backHref="/admin/projects">
      <ProjectForm action={createProject} teamOptions={teamOptions} />
    </FormShell>
  );
}
