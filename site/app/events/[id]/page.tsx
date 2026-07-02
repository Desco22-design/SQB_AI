import { notFound } from "next/navigation";
import { getEventById } from "@/lib/queries";
import EventDetail from "./EventDetail";

export const revalidate = 60;

export default async function EventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const event = await getEventById(params.id);
  if (!event) notFound();
  return <EventDetail event={event} />;
}
