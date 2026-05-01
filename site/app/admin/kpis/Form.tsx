"use client";

import { TextField } from "@/components/admin/Fields";
import { MultiLangField } from "@/components/admin/MultiLangField";
import { FormActions } from "@/components/admin/PageHeader";
import { useT } from "@/components/admin/AdminI18n";

type Kpi = {
  id?: string;
  label: unknown;
  value: number;
  suffix: string;
  decimals: number;
  order: number;
};

export function KpiForm({
  defaultValue,
  action,
}: {
  defaultValue?: Kpi;
  action: (form: FormData) => Promise<void>;
}) {
  const t = useT();
  return (
    <form action={action}>
      <MultiLangField
        name="label"
        label={t.form.label}
        defaultValue={defaultValue?.label}
        required
      />
      <div className="grid grid-cols-3 gap-4">
        <TextField
          name="value"
          label={t.form.valueNum}
          type="number"
          defaultValue={defaultValue?.value ?? 0}
          required
        />
        <TextField
          name="suffix"
          label={t.form.suffix}
          defaultValue={defaultValue?.suffix}
          placeholder="%"
        />
        <TextField
          name="decimals"
          label={t.form.decimals}
          type="number"
          defaultValue={defaultValue?.decimals ?? 0}
        />
      </div>
      <TextField
        name="order"
        label={t.form.order}
        type="number"
        defaultValue={defaultValue?.order ?? 0}
      />
      <FormActions cancelHref="/admin/kpis" />
    </form>
  );
}
