import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FormShell } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { DirectionForm } from "../Form";
import { updateDirection } from "../actions";

export default async function EditDirection({
  params,
}: {
  params: { id: string };
}) {
  const t = getStrings(getServerLocale());
  const row = await prisma.aiDirection.findUnique({ where: { id: params.id } });
  if (!row) notFound();
  return (
    <FormShell title={t.form.edit.directions} backHref="/admin/directions">
      <DirectionForm defaultValue={row} action={updateDirection.bind(null, row.id)} />
    </FormShell>
  );
}
