import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Phone, Building2, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { deleteSubmissionAndReturn } from "../actions";

const LOCALE_TAG: Record<string, string> = {
  uz: "uz-UZ",
  ru: "ru-RU",
  en: "en-US",
};

export default async function SubmissionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const locale = getServerLocale();
  const t = getStrings(locale);
  const row = await prisma.contactSubmission.findUnique({
    where: { id: params.id },
  });
  if (!row) notFound();

  const tag = LOCALE_TAG[locale] ?? "ru-RU";
  const deleteAction = deleteSubmissionAndReturn.bind(null, row.id);

  return (
    <div style={{ maxWidth: 760 }}>
      <Link
        href="/admin/submissions"
        className="ad-link-muted inline-flex items-center gap-1.5 mb-3"
      >
        <ArrowLeft size={16} />
        {t.common.back}
      </Link>
      <h1 className="ad-page-title mb-6">{t.page.submissions.detailTitle}</h1>

      <div className="ad-card" style={{ padding: 28 }}>
        <div
          className="flex items-start justify-between gap-4 flex-wrap mb-5 pb-5"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="min-w-0">
            <div
              style={{
                color: "var(--text-muted)",
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                fontWeight: 600,
              }}
            >
              {t.page.submissions.from}
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "var(--text)",
                marginTop: 4,
              }}
            >
              {row.name}
            </div>
            <div
              style={{
                color: "var(--text-muted)",
                fontSize: 13,
                marginTop: 6,
              }}
            >
              {t.page.submissions.received}:{" "}
              {new Date(row.createdAt).toLocaleString(tag, {
                year: "numeric",
                month: "long",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
          <form action={deleteAction}>
            <button
              type="submit"
              className="ad-btn ad-btn-secondary"
              style={{ color: "var(--danger)" }}
            >
              <Trash2 size={16} />
              {t.common.delete}
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <a
            href={`mailto:${row.email}`}
            className="ad-link-muted inline-flex items-center gap-2"
            style={{ fontSize: 14 }}
          >
            <Mail size={16} />
            {row.email}
          </a>
          <a
            href={`tel:${row.phone}`}
            className="ad-link-muted inline-flex items-center gap-2"
            style={{ fontSize: 14 }}
          >
            <Phone size={16} />
            {row.phone}
          </a>
          {row.company && (
            <div
              className="inline-flex items-center gap-2"
              style={{ color: "var(--text-muted)", fontSize: 14 }}
            >
              <Building2 size={16} />
              {row.company}
            </div>
          )}
        </div>

        <div
          style={{
            whiteSpace: "pre-wrap",
            color: "var(--text)",
            fontSize: 15,
            lineHeight: 1.6,
          }}
        >
          {row.message}
        </div>
      </div>
    </div>
  );
}
