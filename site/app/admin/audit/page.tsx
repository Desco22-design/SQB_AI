import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { AuditList } from "./List";

export default async function AuditPage() {
  const t = getStrings(getServerLocale());
  const rows = await prisma.adminAuditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });
  return (
    <div>
      <PageHeader
        title={t.page.audit.title}
        description={t.page.audit.sub}
      />
      <AuditList rows={rows} />
    </div>
  );
}
