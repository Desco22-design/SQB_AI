"use client";

import { AdminTable } from "@/components/admin/AdminTable";
import { useT, useLocale } from "@/components/admin/AdminI18n";
import { pickLang } from "@/lib/i18n-content";
import { deleteKpi } from "./actions";

type Row = {
  id: string;
  label: unknown;
  value: number;
  suffix: string;
  decimals: number;
  order: number;
};

export function KpisList({ rows }: { rows: Row[] }) {
  const t = useT();
  const locale = useLocale();
  return (
    <AdminTable
      rows={rows}
      editHrefBase="/admin/kpis"
      deleteAction={deleteKpi}
      columns={[
        {
          header: t.table.no,
          cell: (_r, i) => <span style={{ color: "var(--text-subtle)" }}>{i + 1}</span>,
          className: "w-12",
        },
        {
          header: t.table.label,
          cell: (r) => (
            <span style={{ fontWeight: 600, color: "var(--text)" }}>
              {pickLang(r.label, locale)}
            </span>
          ),
        },
        {
          header: t.table.value,
          cell: (r) => (
            <span
              style={{
                fontWeight: 700,
                fontFamily: "var(--font-inter), Inter, sans-serif",
                color: "var(--primary-deep)",
                fontSize: 16,
              }}
            >
              {r.value}
              {r.suffix}
            </span>
          ),
          className: "w-32",
        },
      ]}
    />
  );
}
