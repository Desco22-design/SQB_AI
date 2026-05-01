"use client";

import { useState } from "react";
import { TextField, SelectField } from "@/components/admin/Fields";
import { MultiLangField } from "@/components/admin/MultiLangField";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { FormActions } from "@/components/admin/PageHeader";
import { useT } from "@/components/admin/AdminI18n";

type News = {
  id?: string;
  title: unknown;
  excerpt: unknown;
  date: Date | string;
  category: string;
  image: string;
  order: number;
};

type CategoryKey = "Update" | "Insight" | "Announcement";
const CATEGORY_KEYS: CategoryKey[] = ["Update", "Insight", "Announcement"];

function toDateInput(d: Date | string | undefined): string {
  if (!d) return "";
  const dt = typeof d === "string" ? new Date(d) : d;
  return dt.toISOString().slice(0, 10);
}

export function NewsForm({
  defaultValue,
  action,
  isEdit,
}: {
  defaultValue?: News;
  action: (form: FormData) => Promise<void>;
  isEdit?: boolean;
}) {
  const t = useT();
  const CATEGORIES = CATEGORY_KEYS.map((k) => ({ value: k, label: t.enums.category[k] }));
  const [image, setImage] = useState(defaultValue?.image ?? "");
  return (
    <form action={action}>
      <MultiLangField
        name="title"
        label={t.form.title}
        defaultValue={defaultValue?.title}
        required
      />
      <MultiLangField
        name="excerpt"
        label={t.form.short}
        defaultValue={defaultValue?.excerpt}
        required
        multiline
      />
      <div className="grid grid-cols-2 gap-4">
        <TextField
          name="date"
          label={t.form.date}
          type="date"
          defaultValue={toDateInput(defaultValue?.date)}
          required
        />
        <SelectField
          name="category"
          label={t.form.category}
          options={CATEGORIES}
          defaultValue={defaultValue?.category}
          required
        />
      </div>

      <input type="hidden" name="image" value={image} />
      <ImageUpload label={t.form.cover} value={image} onChange={setImage} className="mb-4" />

      {!isEdit && (
        <TextField
          name="id"
          label={t.form.idSlug}
          defaultValue={defaultValue?.id}
          placeholder={t.form.idPlaceholder}
        />
      )}
      <TextField
        name="order"
        label={t.form.order}
        type="number"
        defaultValue={defaultValue?.order ?? 0}
      />
      <FormActions cancelHref="/admin/news" />
    </form>
  );
}
