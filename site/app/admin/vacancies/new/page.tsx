import { FormShell } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { VacancyForm } from "../Form";
import { createVacancy } from "../actions";

export default function NewVacancy() {
  const t = getStrings(getServerLocale());
  return (
    <FormShell title={t.form.new.careers} backHref="/admin/vacancies">
      <VacancyForm action={createVacancy} />
    </FormShell>
  );
}
