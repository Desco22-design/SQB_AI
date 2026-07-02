"use client";

import { TextField, SelectField } from "@/components/admin/Fields";
import { MultiLangField } from "@/components/admin/MultiLangField";
import { FormActions } from "@/components/admin/PageHeader";
import { useT } from "@/components/admin/AdminI18n";
import { VACANCY_ICON_OPTIONS } from "@/components/careers/vacancyIcons";

type Vacancy = {
  id?: string;
  title: unknown;
  location: unknown;
  type: string;
  icon?: string | null;
  description: unknown;
  responsibilities?: unknown;
  requirements?: unknown;
  offer?: unknown;
  order: number;
};

type EmploymentKey = "full-time" | "part-time" | "internship" | "contract";
const EMPLOYMENT_KEYS: EmploymentKey[] = [
  "full-time",
  "part-time",
  "internship",
  "contract",
];

export function VacancyForm({
  defaultValue,
  action,
  isEdit,
}: {
  defaultValue?: Vacancy;
  action: (form: FormData) => Promise<void>;
  isEdit?: boolean;
}) {
  const t = useT();
  const TYPES = EMPLOYMENT_KEYS.map((k) => ({
    value: k,
    label: t.enums.employment[k],
  }));
  return (
    <form action={action}>
      <MultiLangField
        name="title"
        label={t.form.title}
        defaultValue={defaultValue?.title}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <MultiLangField
          name="location"
          label={t.form.location}
          defaultValue={defaultValue?.location}
          required
        />
        <SelectField
          name="type"
          label={t.form.employmentType}
          options={TYPES}
          defaultValue={defaultValue?.type}
          required
        />
      </div>
      <SelectField
        name="icon"
        label={t.form.icon}
        options={VACANCY_ICON_OPTIONS}
        defaultValue={defaultValue?.icon ?? "briefcase"}
      />
      <MultiLangField
        name="description"
        label={t.form.description}
        defaultValue={defaultValue?.description}
        required
        multiline
        rows={5}
      />
      <MultiLangField
        name="responsibilities"
        label={t.form.responsibilities}
        defaultValue={defaultValue?.responsibilities}
        multiline
        rows={6}
        placeholder={t.form.multilineHint}
      />
      <MultiLangField
        name="requirements"
        label={t.form.requirements}
        defaultValue={defaultValue?.requirements}
        multiline
        rows={6}
        placeholder={t.form.multilineHint}
      />
      <MultiLangField
        name="offer"
        label={t.form.offer}
        defaultValue={defaultValue?.offer}
        multiline
        rows={6}
        placeholder={t.form.multilineHint}
      />

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
      <FormActions cancelHref="/admin/vacancies" />
    </form>
  );
}
