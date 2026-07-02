"use client";

import { AdminTable } from "@/components/admin/AdminTable";
import { useT, useLocale } from "@/components/admin/AdminI18n";
import { pickLang } from "@/lib/i18n-utils";
import { deleteVacancy } from "./actions";

type Row = {
  id: string;
  title: unknown;
  location: unknown;
  type: string;
  order: number;
};

export function VacanciesList({ rows }: { rows: Row[] }) {
  const t = useT();
  const locale = useLocale();
  return (
    <AdminTable
      rows={rows}
      editHrefBase="/admin/vacancies"
      deleteAction={deleteVacancy}
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
          header: t.table.type,
          cell: (r) => {
            const tx =
              (t.enums.employment as Record<string, string>)[r.type] ?? r.type;
            return <span className="ad-pill ad-pill-success">{tx}</span>;
          },
          className: "w-40",
        },
        {
          header: t.table.place,
          cell: (r) => (
            <span style={{ color: "var(--text-muted)" }}>
              {pickLang(r.location, locale)}
            </span>
          ),
          className: "w-40",
        },
      ]}
    />
  );
}
