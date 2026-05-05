"use client";

import Link from "next/link";
import { useTransition } from "react";
import { Eye, Trash2 } from "lucide-react";
import { useT, useLocale } from "@/components/admin/AdminI18n";
import { deleteSubmission } from "./actions";

type Row = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  message: string;
  createdAt: Date;
};

const LOCALE_TAG: Record<string, string> = {
  uz: "uz-UZ",
  ru: "ru-RU",
  en: "en-US",
};

export function SubmissionsList({ rows }: { rows: Row[] }) {
  const t = useT();
  const locale = useLocale();
  const [pending, start] = useTransition();
  const tag = LOCALE_TAG[locale] ?? "ru-RU";

  function handleDelete(id: string) {
    if (!confirm(t.common.confirmDelete)) return;
    start(async () => {
      await deleteSubmission(id);
    });
  }

  return (
    <div className="ad-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="ad-table">
          <thead>
            <tr>
              <th style={{ width: 170 }}>{t.page.submissions.received}</th>
              <th style={{ width: 220 }}>{t.page.submissions.from}</th>
              <th>{t.form.body}</th>
              <th
                style={{ width: 110, textAlign: "right", paddingRight: 20 }}
              >
                {t.common.actions}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  style={{
                    padding: "3rem 1rem",
                    textAlign: "center",
                    color: "var(--text-subtle)",
                  }}
                >
                  {t.page.submissions.noMessage}
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={row.id}>
                <td style={{ color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                  {new Date(row.createdAt).toLocaleString(tag, {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: "var(--text)" }}>
                    {row.name}
                  </div>
                  <div style={{ color: "var(--text-muted)", fontSize: 12 }}>
                    {row.email}
                  </div>
                </td>
                <td>
                  <span
                    style={{
                      color: "var(--text)",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {row.message}
                  </span>
                </td>
                <td
                  className="whitespace-nowrap"
                  style={{ textAlign: "right" }}
                >
                  <div className="inline-flex items-center gap-1">
                    <Link
                      href={`/admin/submissions/${row.id}`}
                      className="ad-icon-btn"
                      title={t.page.submissions.detailTitle}
                      aria-label={t.page.submissions.detailTitle}
                    >
                      <Eye size={16} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(row.id)}
                      disabled={pending}
                      className="ad-icon-btn"
                      title={t.common.delete}
                      aria-label={t.common.delete}
                      style={{ color: "var(--danger)" }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
