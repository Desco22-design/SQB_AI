import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { SectionHeadingForm } from "@/components/admin/SectionHeadingForm";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { getSectionHeading } from "@/lib/section-headings";
import { VacanciesList } from "./List";

export default async function VacanciesAdminPage() {
  const t = getStrings(getServerLocale());
  const [rows, heading] = await Promise.all([
    prisma.vacancy.findMany({ orderBy: [{ order: "asc" }] }),
    getSectionHeading("careers"),
  ]);
  return (
    <div>
      <PageHeader
        title={t.page.careers.title}
        description={t.page.careers.sub}
        actionHref="/admin/vacancies/new"
      />
      <SectionHeadingForm
        section="careers"
        adminPath="/admin/vacancies"
        defaultValue={heading}
      />
      <VacanciesList rows={rows} />
    </div>
  );
}
