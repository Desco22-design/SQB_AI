import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { SectionHeadingForm } from "@/components/admin/SectionHeadingForm";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { getSectionHeading } from "@/lib/section-headings";
import { FaqList } from "./List";

export default async function FaqPage() {
  const t = getStrings(getServerLocale());
  const [rows, heading] = await Promise.all([
    prisma.faqItem.findMany({ orderBy: { order: "asc" } }),
    getSectionHeading("faq"),
  ]);
  return (
    <div>
      <PageHeader
        title={t.page.faq.title}
        description={t.page.faq.sub}
        actionHref="/admin/faq/new"
      />
      <SectionHeadingForm section="faq" adminPath="/admin/faq" defaultValue={heading} />
      <FaqList rows={rows} />
    </div>
  );
}
