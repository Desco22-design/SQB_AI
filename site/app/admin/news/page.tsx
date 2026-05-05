import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { SectionHeadingForm } from "@/components/admin/SectionHeadingForm";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { getSectionHeading } from "@/lib/section-headings";
import { NewsList } from "./List";

export default async function NewsAdminPage() {
  const t = getStrings(getServerLocale());
  const [rows, heading] = await Promise.all([
    prisma.newsItem.findMany({ orderBy: [{ date: "desc" }] }),
    getSectionHeading("news"),
  ]);
  return (
    <div>
      <PageHeader
        title={t.page.news.title}
        description={t.page.news.sub}
        actionHref="/admin/news/new"
      />
      <SectionHeadingForm section="news" adminPath="/admin/news" defaultValue={heading} />
      <NewsList rows={rows} />
    </div>
  );
}
