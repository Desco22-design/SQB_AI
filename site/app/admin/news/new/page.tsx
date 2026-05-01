import { FormShell } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { NewsForm } from "../Form";
import { createNews } from "../actions";

export default function NewNews() {
  const t = getStrings(getServerLocale());
  return (
    <FormShell title={t.form.new.news} backHref="/admin/news">
      <NewsForm action={createNews} />
    </FormShell>
  );
}
