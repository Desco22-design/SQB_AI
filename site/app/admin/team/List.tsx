"use client";

import { AdminTable } from "@/components/admin/AdminTable";
import { useT, useLocale } from "@/components/admin/AdminI18n";
import { pickLang } from "@/lib/i18n-content";
import { deleteTeamMember } from "./actions";

type Row = {
  id: string;
  name: string;
  role: unknown;
  photo: string;
  order: number;
};

export function TeamList({ rows }: { rows: Row[] }) {
  const t = useT();
  const locale = useLocale();
  return (
    <AdminTable
      rows={rows}
      editHrefBase="/admin/team"
      deleteAction={deleteTeamMember}
      columns={[
        {
          header: t.table.photo,
          cell: (r) =>
            r.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={r.photo}
                alt=""
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1px solid var(--border)",
                }}
              />
            ) : (
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "1px dashed var(--border)",
                  background: "var(--bg)",
                }}
              />
            ),
          className: "w-16",
        },
        {
          header: t.table.name,
          cell: (r) => <span style={{ fontWeight: 600, color: "var(--text)" }}>{r.name}</span>,
        },
        {
          header: t.table.role,
          cell: (r) => (
            <span style={{ color: "var(--text-muted)" }}>
              {pickLang(r.role, locale)}
            </span>
          ),
        },
        {
          header: t.table.no,
          cell: (_r, i) => <span style={{ color: "var(--text-subtle)" }}>{i + 1}</span>,
          className: "w-12",
        },
      ]}
    />
  );
}
