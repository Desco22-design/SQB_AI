import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { SectionHeadingForm } from "@/components/admin/SectionHeadingForm";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { getSectionHeading } from "@/lib/section-headings";
import { AboutList } from "./List";

export default async function AboutPage() {
  const t = getStrings(getServerLocale());
  const [rows, heading] = await Promise.all([
    prisma.aboutBenefit.findMany({ orderBy: { order: "asc" } }),
    getSectionHeading("about"),
  ]);
  return (
    <div>
      <PageHeader
        title={t.page.about.title}
        description={t.page.about.sub}
        actionHref="/admin/about/new"
      />
      <SectionHeadingForm section="about" adminPath="/admin/about" defaultValue={heading} />
      <AboutList rows={rows} />
    </div>
  );
}
