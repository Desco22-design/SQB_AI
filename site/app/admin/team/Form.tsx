"use client";

import { useState } from "react";
import { TextField, TagsField } from "@/components/admin/Fields";
import { MultiLangField } from "@/components/admin/MultiLangField";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { FormActions } from "@/components/admin/PageHeader";
import { useT } from "@/components/admin/AdminI18n";

type Member = {
  id?: string;
  name: string;
  role: unknown;
  bio: unknown;
  skills: string[];
  photo: string;
  order: number;
};

export function TeamForm({
  defaultValue,
  action,
  isEdit,
}: {
  defaultValue?: Member;
  action: (form: FormData) => Promise<void>;
  isEdit?: boolean;
}) {
  const t = useT();
  const [photo, setPhoto] = useState(defaultValue?.photo ?? "");
  return (
    <form action={action}>
      <TextField name="name" label={t.form.name} defaultValue={defaultValue?.name} required />
      <MultiLangField
        name="role"
        label={t.form.role}
        defaultValue={defaultValue?.role}
        required
      />
      <MultiLangField
        name="bio"
        label={t.form.bio}
        defaultValue={defaultValue?.bio}
        required
        multiline
      />
      <TagsField
        name="skills"
        label={t.form.skills}
        defaultValue={defaultValue?.skills}
        placeholder={t.form.skillsPlaceholder}
      />

      <input type="hidden" name="photo" value={photo} />
      <ImageUpload label={t.form.photo} value={photo} onChange={setPhoto} className="mb-4" />

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
      <FormActions cancelHref="/admin/team" />
    </form>
  );
}
