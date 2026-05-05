import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { SectionHeadingForm } from "@/components/admin/SectionHeadingForm";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { getSectionHeading } from "@/lib/section-headings";
import { EventsList } from "./List";

export default async function EventsAdminPage() {
  const t = getStrings(getServerLocale());
  const [rows, heading] = await Promise.all([
    prisma.eventItem.findMany({ orderBy: [{ date: "desc" }] }),
    getSectionHeading("events"),
  ]);
  return (
    <div>
      <PageHeader
        title={t.page.events.title}
        description={t.page.events.sub}
        actionHref="/admin/events/new"
      />
      <SectionHeadingForm section="events" adminPath="/admin/events" defaultValue={heading} />
      <EventsList rows={rows} />
    </div>
  );
}
