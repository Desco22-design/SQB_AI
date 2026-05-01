import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FormShell } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { EventForm } from "../Form";
import { updateEvent } from "../actions";

export default async function EditEvent({
  params,
}: {
  params: { id: string };
}) {
  const t = getStrings(getServerLocale());
  const row = await prisma.eventItem.findUnique({ where: { id: params.id } });
  if (!row) notFound();
  return (
    <FormShell title={t.form.edit.events} backHref="/admin/events">
      <EventForm defaultValue={row} action={updateEvent.bind(null, row.id)} isEdit />
    </FormShell>
  );
}
