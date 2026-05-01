import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FormShell } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { TeamForm } from "../Form";
import { updateTeamMember } from "../actions";

export default async function EditTeamMember({
  params,
}: {
  params: { id: string };
}) {
  const t = getStrings(getServerLocale());
  const row = await prisma.teamMember.findUnique({ where: { id: params.id } });
  if (!row) notFound();
  return (
    <FormShell title={t.form.edit.team} backHref="/admin/team">
      <TeamForm defaultValue={row} action={updateTeamMember.bind(null, row.id)} isEdit />
    </FormShell>
  );
}
