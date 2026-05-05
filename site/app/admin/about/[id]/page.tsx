import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FormShell } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { AboutForm } from "../Form";
import { updateAboutBenefit } from "../actions";

export default async function EditAboutBenefit({
  params,
}: {
  params: { id: string };
}) {
  const t = getStrings(getServerLocale());
  const row = await prisma.aboutBenefit.findUnique({ where: { id: params.id } });
  if (!row) notFound();
  return (
    <FormShell title={t.form.edit.about} backHref="/admin/about">
      <AboutForm defaultValue={row} action={updateAboutBenefit.bind(null, row.id)} />
    </FormShell>
  );
}
