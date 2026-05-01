"use client";

import { AdminTable } from "@/components/admin/AdminTable";
import { useT, useLocale } from "@/components/admin/AdminI18n";
import { pickLang } from "@/lib/i18n-content";
import { deleteProject } from "./actions";

type Row = {
  id: string;
  name: unknown;
  direction: string;
  status: string;
  order: number;
  team: { id: string }[];
};

export function ProjectsList({ rows }: { rows: Row[] }) {
  const t = useT();
  const locale = useLocale();
  return (
    <AdminTable
      rows={rows}
      editHrefBase="/admin/projects"
      deleteAction={deleteProject}
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
              {pickLang(r.name, locale)}
            </span>
          ),
        },
        {
          header: t.table.direction,
          cell: (r) => {
            const tx = (t.enums.direction as Record<string, string>)[r.direction] ?? r.direction;
            return <span style={{ color: "var(--text-muted)" }}>{tx}</span>;
          },
        },
        {
          header: t.table.status,
          cell: (r) => {
            const tx = (t.enums.status as Record<string, string>)[r.status] ?? r.status;
            return (
              <span
                className={`ad-pill ${r.status === "Production" ? "ad-pill-success" : "ad-pill-warn"}`}
              >
                {tx}
              </span>
            );
          },
          className: "w-36",
        },
        {
          header: t.table.teamCount,
          cell: (r) => (
            <span style={{ color: "var(--text-muted)" }}>
              {r.team.length} {t.table.people}
            </span>
          ),
          className: "w-24",
        },
      ]}
    />
  );
}
