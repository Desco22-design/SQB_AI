"use client";

import Link from "next/link";
import { useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useT } from "./AdminI18n";

type Column<T> = {
  header: string;
  cell: (row: T, index: number) => React.ReactNode;
  className?: string;
};

export function AdminTable<T extends { id: string }>({
  rows,
  columns,
  editHrefBase,
  deleteAction,
}: {
  rows: T[];
  columns: Column<T>[];
  editHrefBase: string;
  deleteAction: (id: string) => Promise<void>;
}) {
  const t = useT();
  const [pending, start] = useTransition();

  function handleDelete(id: string) {
    if (!confirm(t.common.confirmDelete)) return;
    start(async () => {
      await deleteAction(id);
    });
  }

  return (
    <div className="ad-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="ad-table">
          <thead>
            <tr>
              {columns.map((c, i) => (
                <th key={i} className={c.className ?? ""}>
                  {c.header}
                </th>
              ))}
              <th
                style={{ width: 110, textAlign: "right", paddingRight: 20 }}
              >
                {t.common.actions}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  style={{
                    padding: "3rem 1rem",
                    textAlign: "center",
                    color: "var(--text-subtle)",
                  }}
                >
                  {t.common.empty}
                </td>
              </tr>
            )}
            {rows.map((row, idx) => (
              <tr key={row.id}>
                {columns.map((c, i) => (
                  <td key={i} className={c.className ?? ""}>
                    {c.cell(row, idx)}
                  </td>
                ))}
                <td
                  className="whitespace-nowrap"
                  style={{ textAlign: "right" }}
                >
                  <div className="inline-flex items-center gap-1">
                    <Link
                      href={`${editHrefBase}/${row.id}`}
                      className="ad-icon-btn"
                      title={t.common.edit}
                      aria-label={t.common.edit}
                    >
                      <Pencil size={16} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(row.id)}
                      disabled={pending}
                      className="ad-icon-btn"
                      title={t.common.delete}
                      aria-label={t.common.delete}
                      style={{ color: "var(--danger)" }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
