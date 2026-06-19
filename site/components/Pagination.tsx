"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const SIBLINGS = 1;

/**
 * Build the list of page numbers to render, inserting "…" gaps when the
 * total page count is large (e.g. 1 … 4 5 6 … 12).
 */
function buildPageRange(current: number, total: number): (number | "dots")[] {
  const range: (number | "dots")[] = [];
  const left = Math.max(2, current - SIBLINGS);
  const right = Math.min(total - 1, current + SIBLINGS);

  range.push(1);
  if (left > 2) range.push("dots");
  for (let page = left; page <= right; page += 1) range.push(page);
  if (right < total - 1) range.push("dots");
  if (total > 1) range.push(total);

  return range;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = buildPageRange(currentPage, totalPages);
  const baseBtn =
    "grid h-9 min-w-9 place-items-center rounded-xl border px-3 text-sm font-medium transition-colors";

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex flex-wrap items-center justify-center gap-2"
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`${baseBtn} border-violet-400/30 text-violet-700 hover:bg-violet-500/10 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((page, i) =>
        page === "dots" ? (
          <span
            key={`dots-${i}`}
            className="grid h-9 min-w-9 place-items-center text-sm text-violet-700/50"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            aria-current={page === currentPage ? "page" : undefined}
            onClick={() => onPageChange(page)}
            className={
              page === currentPage
                ? `${baseBtn} border-transparent bg-violet-600 font-bold text-[#ffffff] shadow-[0_6px_18px_rgba(124,58,237,0.35)]`
                : `${baseBtn} border-violet-400/25 text-violet-800 hover:bg-violet-500/10`
            }
          >
            {page}
          </button>
        )
      )}

      <button
        type="button"
        aria-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`${baseBtn} border-violet-400/30 text-violet-700 hover:bg-violet-500/10 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
