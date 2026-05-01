import { FormShell } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { FaqForm } from "../Form";
import { createFaq } from "../actions";

export default function NewFaq() {
  const t = getStrings(getServerLocale());
  return (
    <FormShell title={t.form.new.faq} backHref="/admin/faq">
      <FaqForm action={createFaq} />
    </FormShell>
  );
}
