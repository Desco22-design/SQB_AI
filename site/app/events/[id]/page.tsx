import { getEventById } from "@/lib/queries";
import EventDetail from "./EventDetail";

export default async function EventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const event = await getEventById(params.id);
  return <EventDetail event={event} />;
}
