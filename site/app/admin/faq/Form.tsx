"use client";

import { TextField } from "@/components/admin/Fields";
import { MultiLangField } from "@/components/admin/MultiLangField";
import { FormActions } from "@/components/admin/PageHeader";
import { useT } from "@/components/admin/AdminI18n";

type Faq = { id?: string; question: unknown; answer: unknown; order: number };

export function FaqForm({
  defaultValue,
  action,
}: {
  defaultValue?: Faq;
  action: (form: FormData) => Promise<void>;
}) {
  const t = useT();
  return (
    <form action={action}>
      <MultiLangField
        name="question"
        label={t.form.question}
        defaultValue={defaultValue?.question}
        required
      />
      <MultiLangField
        name="answer"
        label={t.form.answer}
        defaultValue={defaultValue?.answer}
        required
        multiline
        rows={5}
      />
      <TextField
        name="order"
        label={t.form.order}
        type="number"
        defaultValue={defaultValue?.order ?? 0}
      />
      <FormActions cancelHref="/admin/faq" />
    </form>
  );
}
