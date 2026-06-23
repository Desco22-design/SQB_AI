import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FormShell } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { TeamForm } from "../Form";
import { updateTeamMember } from "../actions";

const label = (n: unknown): string =>
  typeof n === "string"
    ? n
    : n && typeof n === "object"
      ? (n as Record<string, string>).ru ||
        (n as Record<string, string>).en ||
        (n as Record<string, string>).uz ||
        ""
      : "";

export default async function EditTeamMember({
  params,
}: {
  params: { id: string };
}) {
  const t = getStrings(getServerLocale());
  const [row, projects] = await Promise.all([
    prisma.teamMember.findUnique({
      where: { id: params.id },
      include: { projects: { select: { id: true } } },
    }),
    prisma.project.findMany({
      orderBy: { order: "asc" },
      select: { id: true, name: true },
    }),
  ]);
  if (!row) notFound();
  const projectOptions = projects.map((p) => ({ value: p.id, label: label(p.name) }));
  return (
    <FormShell title={t.form.edit.team} backHref="/admin/team">
      <TeamForm
        defaultValue={row}
        action={updateTeamMember.bind(null, row.id)}
        isEdit
        projectOptions={projectOptions}
      />
    </FormShell>
  );
}
