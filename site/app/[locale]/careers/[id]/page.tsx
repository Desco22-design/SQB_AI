import { notFound } from "next/navigation";
import { getVacancyById } from "@/lib/queries";
import VacancyDetail from "./VacancyDetail";

export const revalidate = 60;

export default async function VacancyPage({
  params,
}: {
  params: { id: string };
}) {
  const vacancy = await getVacancyById(params.id);
  if (!vacancy) notFound();
  return <VacancyDetail vacancy={vacancy} />;
}
