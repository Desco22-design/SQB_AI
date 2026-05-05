"use client";

import { useT, useLocale } from "@/components/admin/AdminI18n";

type Row = {
  id: string;
  adminEmail: string;
  adminName: string;
  action: string;
  entity: string;
  entityId: string | null;
  summary: string;
  createdAt: Date;
};

const LOCALE_TAG: Record<string, string> = {
  uz: "uz-UZ",
  ru: "ru-RU",
  en: "en-US",
};

const ACTION_PILL: Record<string, string> = {
  create: "ad-pill-success",
  update: "ad-pill-info",
  delete: "ad-pill-danger",
};

export function AuditList({ rows }: { rows: Row[] }) {
  const t = useT();
  const locale = useLocale();
  const tag = LOCALE_TAG[locale] ?? "ru-RU";

  return (
    <div className="ad-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="ad-table">
          <thead>
            <tr>
              <th style={{ width: 170 }}>{t.page.audit.when}</th>
              <th style={{ width: 200 }}>{t.page.audit.who}</th>
              <th style={{ width: 110 }}>{t.page.audit.action}</th>
              <th style={{ width: 140 }}>{t.page.audit.entity}</th>
              <th>{t.page.audit.summary}</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    padding: "3rem 1rem",
                    textAlign: "center",
                    color: "var(--text-subtle)",
                  }}
                >
                  {t.page.audit.empty}
                </td>
              </tr>
            )}
            {rows.map((row) => {
              const pill = ACTION_PILL[row.action] ?? "ad-pill";
              const actionLabel =
                (t.page.audit.actions as Record<string, string>)[row.action] ??
                row.action;
              const entityLabel =
                (t.page.audit.entities as Record<string, string>)[row.entity] ??
                row.entity;
              return (
                <tr key={row.id}>
                  <td
                    style={{ color: "var(--text-muted)", whiteSpace: "nowrap" }}
                  >
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
                      {row.adminName}
                    </div>
                    <div style={{ color: "var(--text-muted)", fontSize: 12 }}>
                      {row.adminEmail}
                    </div>
                  </td>
                  <td>
                    <span className={`ad-pill ${pill}`}>{actionLabel}</span>
                  </td>
                  <td style={{ color: "var(--text)" }}>{entityLabel}</td>
                  <td style={{ color: "var(--text)" }}>{row.summary}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
