"use client";

import { TextField } from "@/components/admin/Fields";
import { MultiLangField } from "@/components/admin/MultiLangField";
import { FormActions } from "@/components/admin/PageHeader";
import { useT } from "@/components/admin/AdminI18n";

type Benefit = {
  id?: string;
  title: unknown;
  body: unknown;
  order: number;
};

export function AboutForm({
  defaultValue,
  action,
}: {
  defaultValue?: Benefit;
  action: (form: FormData) => Promise<void>;
}) {
  const t = useT();
  return (
    <form action={action}>
      <MultiLangField
        name="title"
        label={t.form.title}
        defaultValue={defaultValue?.title}
        required
      />
      <MultiLangField
        name="body"
        label={t.form.description}
        defaultValue={defaultValue?.body}
        required
        multiline
      />
      <TextField
        name="order"
        label={t.form.order}
        type="number"
        defaultValue={defaultValue?.order ?? 0}
      />
      <FormActions cancelHref="/admin/about" />
    </form>
  );
}
