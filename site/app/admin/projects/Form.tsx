"use client";

import {
  TextField,
  TagsField,
  SelectField,
  ImpactField,
  CheckboxGroup,
} from "@/components/admin/Fields";
import { MultiLangField } from "@/components/admin/MultiLangField";
import { FormActions } from "@/components/admin/PageHeader";
import { useT } from "@/components/admin/AdminI18n";

type Project = {
  id?: string;
  name: unknown;
  short: unknown;
  problem: unknown;
  solution: unknown;
  technologies: string[];
  impact: { label: string; value: string }[];
  direction: string;
  status: string;
  order: number;
  team: { id: string; name: string }[];
};

type DirectionKey = "Risk" | "Credit Scoring" | "Automation" | "NLP / Chatbots" | "Computer Vision";
type StatusKey = "PoC" | "Production";

const DIRECTION_KEYS: DirectionKey[] = [
  "Risk",
  "Credit Scoring",
  "Automation",
  "NLP / Chatbots",
  "Computer Vision",
];
const STATUS_KEYS: StatusKey[] = ["PoC", "Production"];

export function ProjectForm({
  defaultValue,
  teamOptions,
  action,
  isEdit,
}: {
  defaultValue?: Project;
  teamOptions: { value: string; label: string }[];
  action: (form: FormData) => Promise<void>;
  isEdit?: boolean;
}) {
  const t = useT();
  const DIRECTIONS = DIRECTION_KEYS.map((k) => ({ value: k, label: t.enums.direction[k] }));
  const STATUSES = STATUS_KEYS.map((k) => ({ value: k, label: t.enums.status[k] }));
  return (
    <form action={action}>
      <MultiLangField
        name="name"
        label={t.form.title}
        defaultValue={defaultValue?.name}
        required
      />
      <MultiLangField
        name="short"
        label={t.form.short}
        defaultValue={defaultValue?.short}
        required
        multiline
        rows={2}
      />
      <MultiLangField
        name="problem"
        label={t.form.problem}
        defaultValue={defaultValue?.problem}
        required
        multiline
      />
      <MultiLangField
        name="solution"
        label={t.form.solution}
        defaultValue={defaultValue?.solution}
        required
        multiline
      />

      <TagsField
        name="technologies"
        label={t.form.technologies}
        defaultValue={defaultValue?.technologies}
        placeholder={t.form.techPlaceholder}
      />

      <ImpactField name="impact" label={t.form.impact} defaultValue={defaultValue?.impact} />

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          name="direction"
          label={t.form.direction}
          options={DIRECTIONS}
          defaultValue={defaultValue?.direction}
          required
        />
        <SelectField
          name="status"
          label={t.form.status}
          options={STATUSES}
          defaultValue={defaultValue?.status}
          required
        />
      </div>

      <CheckboxGroup
        name="team"
        label={t.form.teamMembers}
        options={teamOptions}
        defaultValue={defaultValue?.team.map((m) => m.id)}
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
      <FormActions cancelHref="/admin/projects" />
    </form>
  );
}
