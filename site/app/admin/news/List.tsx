"use client";

import { AdminTable } from "@/components/admin/AdminTable";
import { useT, useLocale } from "@/components/admin/AdminI18n";
import { pickLang } from "@/lib/i18n-content";
import { deleteNews } from "./actions";

type Row = {
  id: string;
  title: unknown;
  excerpt: unknown;
  date: Date;
  category: string;
  image: string;
  order: number;
};

export function NewsList({ rows }: { rows: Row[] }) {
  const t = useT();
  const locale = useLocale();
  return (
    <AdminTable
      rows={rows}
      editHrefBase="/admin/news"
      deleteAction={deleteNews}
      columns={[
        {
          header: t.table.cover,
          cell: (r) =>
            r.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={r.image}
                alt=""
                style={{
                  width: 64,
                  height: 40,
                  borderRadius: 8,
                  objectFit: "cover",
                  border: "1px solid var(--border)",
                }}
              />
            ) : (
              <div
                style={{
                  width: 64,
                  height: 40,
                  borderRadius: 8,
                  border: "1px dashed var(--border)",
                  background: "var(--bg)",
                }}
              />
            ),
          className: "w-20",
        },
        {
          header: t.table.date,
          cell: (r) => (
            <span style={{ color: "var(--text-muted)" }}>
              {new Date(r.date).toISOString().slice(0, 10)}
            </span>
          ),
          className: "w-28",
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
          header: t.table.category,
          cell: (r) => {
            const tx = (t.enums.category as Record<string, string>)[r.category] ?? r.category;
            return <span className="ad-pill ad-pill-success">{tx}</span>;
          },
          className: "w-32",
        },
      ]}
    />
  );
}
