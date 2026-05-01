import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { FaqList } from "./List";

export default async function FaqPage() {
  const t = getStrings(getServerLocale());
  const rows = await prisma.faqItem.findMany({ orderBy: { order: "asc" } });
  return (
    <div>
      <PageHeader
        title={t.page.faq.title}
        description={t.page.faq.sub}
        actionHref="/admin/faq/new"
      />
      <FaqList rows={rows} />
    </div>
  );
}
