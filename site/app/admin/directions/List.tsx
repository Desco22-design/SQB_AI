"use client";

import { AdminTable } from "@/components/admin/AdminTable";
import { useT } from "@/components/admin/AdminI18n";
import { useLocale } from "@/components/admin/AdminI18n";
import { pickLang } from "@/lib/i18n-content";
import { deleteDirection } from "./actions";

type Row = {
  id: string;
  title: unknown;
  description: unknown;
  order: number;
};

export function DirectionsList({ rows }: { rows: Row[] }) {
  const t = useT();
  const locale = useLocale();
  return (
    <AdminTable
      rows={rows}
      editHrefBase="/admin/directions"
      deleteAction={deleteDirection}
      columns={[
        {
          header: t.table.no,
          cell: (_r, i) => <span style={{ color: "var(--text-subtle)" }}>{i + 1}</span>,
          className: "w-12",
        },
        {
          header: t.table.title,
          cell: (r) => (
            <span style={{ fontWeight: 600, color: "var(--text)" }}>
              {pickLang(r.title, locale)}
            </span>
          ),
        },
        {
          header: t.table.description,
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
              {pickLang(r.description, locale)}
            </span>
          ),
        },
      ]}
    />
  );
}
