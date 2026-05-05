import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { AboutList } from "./List";

export default async function AboutPage() {
  const t = getStrings(getServerLocale());
  const rows = await prisma.aboutBenefit.findMany({ orderBy: { order: "asc" } });
  return (
    <div>
      <PageHeader
        title={t.page.about.title}
        description={t.page.about.sub}
        actionHref="/admin/about/new"
      />
      <AboutList rows={rows} />
    </div>
  );
}
