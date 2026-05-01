"use client";

import { AdminTable } from "@/components/admin/AdminTable";
import { useT, useLocale } from "@/components/admin/AdminI18n";
import { pickLang } from "@/lib/i18n-content";
import { deleteFaq } from "./actions";

type Row = { id: string; question: unknown; answer: unknown; order: number };

export function FaqList({ rows }: { rows: Row[] }) {
  const t = useT();
  const locale = useLocale();
  return (
    <AdminTable
      rows={rows}
      editHrefBase="/admin/faq"
      deleteAction={deleteFaq}
      columns={[
        {
          header: t.table.no,
          cell: (_r, i) => <span style={{ color: "var(--text-subtle)" }}>{i + 1}</span>,
          className: "w-12",
        },
        {
          header: t.table.question,
          cell: (r) => (
            <span style={{ fontWeight: 600, color: "var(--text)" }}>
              {pickLang(r.question, locale)}
            </span>
          ),
        },
        {
          header: t.table.answer,
          cell: (r) => (
            <span
              style={{
                color: "var(--text-muted)",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {pickLang(r.answer, locale)}
            </span>
          ),
        },
      ]}
    />
  );
}
