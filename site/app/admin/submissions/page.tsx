import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { SubmissionsList } from "./List";

export default async function SubmissionsPage() {
  const t = getStrings(getServerLocale());
  const rows = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <div>
      <PageHeader
        title={t.page.submissions.title}
        description={t.page.submissions.sub}
      />
      <SubmissionsList rows={rows} />
    </div>
  );
}
