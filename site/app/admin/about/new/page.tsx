import { FormShell } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { AboutForm } from "../Form";
import { createAboutBenefit } from "../actions";

export default function NewAboutBenefit() {
  const t = getStrings(getServerLocale());
  return (
    <FormShell title={t.form.new.about} backHref="/admin/about">
      <AboutForm action={createAboutBenefit} />
    </FormShell>
  );
}
