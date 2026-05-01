import { FormShell } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { DirectionForm } from "../Form";
import { createDirection } from "../actions";

export default function NewDirection() {
  const t = getStrings(getServerLocale());
  return (
    <FormShell title={t.form.new.directions} backHref="/admin/directions">
      <DirectionForm action={createDirection} />
    </FormShell>
  );
}
