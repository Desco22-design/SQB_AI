import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { EventsList } from "./List";

export default async function EventsAdminPage() {
  const t = getStrings(getServerLocale());
  const rows = await prisma.eventItem.findMany({ orderBy: [{ date: "desc" }] });
  return (
    <div>
      <PageHeader
        title={t.page.events.title}
        description={t.page.events.sub}
        actionHref="/admin/events/new"
      />
      <EventsList rows={rows} />
    </div>
  );
}
