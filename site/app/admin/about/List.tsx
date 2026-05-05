"use client";

import { AdminTable } from "@/components/admin/AdminTable";
import { useT, useLocale } from "@/components/admin/AdminI18n";
import { pickLang } from "@/lib/i18n-content";
import { deleteAboutBenefit } from "./actions";

type Row = {
  id: string;
  title: unknown;
  body: unknown;
  order: number;
};

export function AboutList({ rows }: { rows: Row[] }) {
  const t = useT();
  const locale = useLocale();
  return (
    <AdminTable
      rows={rows}
      editHrefBase="/admin/about"
      deleteAction={deleteAboutBenefit}
      columns={[
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
            <span style={{ color: "var(--text-muted)" }}>
              {pickLang(r.body, locale).slice(0, 120)}
              {pickLang(r.body, locale).length > 120 ? "…" : ""}
            </span>
          ),
        },
      ]}
    />
  );
}
