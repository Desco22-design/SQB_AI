import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FormShell } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { FaqForm } from "../Form";
import { updateFaq } from "../actions";

export default async function EditFaq({ params }: { params: { id: string } }) {
  const t = getStrings(getServerLocale());
  const row = await prisma.faqItem.findUnique({ where: { id: params.id } });
  if (!row) notFound();
  return (
    <FormShell title={t.form.edit.faq} backHref="/admin/faq">
      <FaqForm defaultValue={row} action={updateFaq.bind(null, row.id)} />
    </FormShell>
  );
}
