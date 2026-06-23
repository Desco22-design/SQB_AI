import { getTeamMemberById } from "@/lib/queries";
import TeamProfile from "./TeamProfile";

export const dynamic = "force-dynamic";

export default async function TeamProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const member = await getTeamMemberById(params.id);
  return <TeamProfile member={member} />;
}
