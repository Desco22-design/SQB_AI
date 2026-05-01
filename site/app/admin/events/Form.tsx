"use client";

import { useState } from "react";
import { TextField, GalleryField } from "@/components/admin/Fields";
import { MultiLangField } from "@/components/admin/MultiLangField";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { FormActions } from "@/components/admin/PageHeader";
import { useT } from "@/components/admin/AdminI18n";

type EventItem = {
  id?: string;
  name: unknown;
  date: Date | string;
  place: unknown;
  participants: unknown;
  image: string;
  gallery: string[];
  order: number;
};

function toDateInput(d: Date | string | undefined): string {
  if (!d) return "";
  const dt = typeof d === "string" ? new Date(d) : d;
  return dt.toISOString().slice(0, 10);
}

export function EventForm({
  defaultValue,
  action,
  isEdit,
}: {
  defaultValue?: EventItem;
  action: (form: FormData) => Promise<void>;
  isEdit?: boolean;
}) {
  const t = useT();
  const [image, setImage] = useState(defaultValue?.image ?? "");
  return (
    <form action={action}>
      <MultiLangField
        name="name"
        label={t.form.title}
        defaultValue={defaultValue?.name}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <TextField
          name="date"
          label={t.form.date}
          type="date"
          defaultValue={toDateInput(defaultValue?.date)}
          required
        />
      </div>
      <MultiLangField
        name="place"
        label={t.form.place}
        defaultValue={defaultValue?.place}
        required
      />
      <MultiLangField
        name="participants"
        label={t.form.participants}
        defaultValue={defaultValue?.participants}
        required
      />

      <input type="hidden" name="image" value={image} />
      <ImageUpload label={t.form.cover} value={image} onChange={setImage} className="mb-4" />

      <GalleryField name="gallery" label={t.form.gallery} defaultValue={defaultValue?.gallery} />

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
      <FormActions cancelHref="/admin/events" />
    </form>
  );
}
