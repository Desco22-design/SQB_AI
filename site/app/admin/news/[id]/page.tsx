import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FormShell } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { NewsForm } from "../Form";
import { updateNews } from "../actions";

export default async function EditNews({
  params,
}: {
  params: { id: string };
}) {
  const t = getStrings(getServerLocale());
  const row = await prisma.newsItem.findUnique({ where: { id: params.id } });
  if (!row) notFound();
  return (
    <FormShell title={t.form.edit.news} backHref="/admin/news">
      <NewsForm defaultValue={row} action={updateNews.bind(null, row.id)} isEdit />
    </FormShell>
  );
}
