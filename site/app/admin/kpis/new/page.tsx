import { FormShell } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { KpiForm } from "../Form";
import { createKpi } from "../actions";

export default function NewKpi() {
  const t = getStrings(getServerLocale());
  return (
    <FormShell title={t.form.new.kpis} backHref="/admin/kpis">
      <KpiForm action={createKpi} />
    </FormShell>
  );
}
