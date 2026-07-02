import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { requireAdmin } from "@/lib/require-admin";
import { SubmissionsList } from "./List";

export default async function SubmissionsPage() {
  await requireAdmin();
  const t = getStrings(getServerLocale());
  const rows = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Unread incoming-message counts per submission for the row badges.
  const unreadGroups = await prisma.contactMessage.groupBy({
    by: ["submissionId"],
    where: { direction: "in", read: false },
    _count: { _all: true },
  });
  const unreadMap: Record<string, number> = {};
  for (const g of unreadGroups) {
    unreadMap[g.submissionId] = g._count._all;
  }

  return (
    <div>
      <PageHeader
        title={t.page.submissions.title}
        description={t.page.submissions.sub}
      />
      <SubmissionsList rows={rows} unreadMap={unreadMap} />
    </div>
  );
}
