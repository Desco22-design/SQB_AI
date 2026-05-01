"use client";

import { AdminTable } from "@/components/admin/AdminTable";
import { useT, useLocale } from "@/components/admin/AdminI18n";
import { pickLang } from "@/lib/i18n-content";
import { deleteEvent } from "./actions";

type Row = {
  id: string;
  name: unknown;
  date: Date;
  place: unknown;
  image: string;
  gallery: string[];
};

export function EventsList({ rows }: { rows: Row[] }) {
  const t = useT();
  const locale = useLocale();
  return (
    <AdminTable
      rows={rows}
      editHrefBase="/admin/events"
      deleteAction={deleteEvent}
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
              {pickLang(r.name, locale)}
            </span>
          ),
        },
        {
          header: t.table.place,
          cell: (r) => (
            <span style={{ color: "var(--text-muted)" }}>
              {pickLang(r.place, locale)}
            </span>
          ),
        },
        {
          header: t.table.galleryCount,
          cell: (r) => (
            <span style={{ color: "var(--text-muted)" }}>
              {r.gallery.length} {t.table.photos}
            </span>
          ),
          className: "w-28",
        },
      ]}
    />
  );
}
