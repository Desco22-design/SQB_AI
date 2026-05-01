import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { NewsList } from "./List";

export default async function NewsAdminPage() {
  const t = getStrings(getServerLocale());
  const rows = await prisma.newsItem.findMany({ orderBy: [{ date: "desc" }] });
  return (
    <div>
      <PageHeader
        title={t.page.news.title}
        description={t.page.news.sub}
        actionHref="/admin/news/new"
      />
      <NewsList rows={rows} />
    </div>
  );
}
