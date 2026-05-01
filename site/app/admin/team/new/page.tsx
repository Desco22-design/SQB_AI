import { FormShell } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { TeamForm } from "../Form";
import { createTeamMember } from "../actions";

export default function NewTeamMember() {
  const t = getStrings(getServerLocale());
  return (
    <FormShell title={t.form.new.team} backHref="/admin/team">
      <TeamForm action={createTeamMember} />
    </FormShell>
  );
}
