import { FormShell } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { EventForm } from "../Form";
import { createEvent } from "../actions";

export default function NewEvent() {
  const t = getStrings(getServerLocale());
  return (
    <FormShell title={t.form.new.events} backHref="/admin/events">
      <EventForm action={createEvent} />
    </FormShell>
  );
}
