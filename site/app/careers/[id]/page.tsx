import { getVacancyById } from "@/lib/queries";
import VacancyDetail from "./VacancyDetail";

export const dynamic = "force-dynamic";

export default async function VacancyPage({
  params,
}: {
  params: { id: string };
}) {
  const vacancy = await getVacancyById(params.id);
  return <VacancyDetail vacancy={vacancy} />;
}
