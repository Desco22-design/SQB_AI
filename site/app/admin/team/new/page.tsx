import { prisma } from "@/lib/prisma";
import { FormShell } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { TeamForm } from "../Form";
import { createTeamMember } from "../actions";

const label = (n: unknown): string =>
  typeof n === "string"
    ? n
    : n && typeof n === "object"
      ? (n as Record<string, string>).ru ||
        (n as Record<string, string>).en ||
        (n as Record<string, string>).uz ||
        ""
      : "";

export default async function NewTeamMember() {
  const t = getStrings(getServerLocale());
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
    select: { id: true, name: true },
  });
  const projectOptions = projects.map((p) => ({ value: p.id, label: label(p.name) }));
  return (
    <FormShell title={t.form.new.team} backHref="/admin/team">
      <TeamForm action={createTeamMember} projectOptions={projectOptions} />
    </FormShell>
  );
}
