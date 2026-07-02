import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FormShell } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { VacancyForm } from "../Form";
import { updateVacancy } from "../actions";

export default async function EditVacancy({
  params,
}: {
  params: { id: string };
}) {
  const t = getStrings(getServerLocale());
  const row = await prisma.vacancy.findUnique({ where: { id: params.id } });
  if (!row) notFound();
  return (
    <FormShell title={t.form.edit.careers} backHref="/admin/vacancies">
      <VacancyForm
        defaultValue={row}
        action={updateVacancy.bind(null, row.id)}
        isEdit
      />
    </FormShell>
  );
}
