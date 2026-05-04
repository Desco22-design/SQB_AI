"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, X, ArrowUpRight, LayoutGrid, Table2 } from "lucide-react";
import {
  type Project,
  type ProjectDirection,
  type ProjectStatus
} from "@/lib/data";
import { useT } from "../LanguageProvider";

const DIRECTIONS: (ProjectDirection | "All")[] = [
  "All",
  "Risk",
  "Credit Scoring",
  "Automation",
  "NLP / Chatbots",
  "Computer Vision"
];
const STATUSES: (ProjectStatus | "All")[] = ["All", "Production", "PoC"];

export default function Projects({ projects }: { projects: Project[] }) {
  const t = useT();
  const [direction, setDirection] = useState<(typeof DIRECTIONS)[number]>("All");
  const [status, setStatus] = useState<(typeof STATUSES)[number]>("All");
  const [view, setView] = useState<"cards" | "table">("cards");
  const [active, setActive] = useState<Project | null>(null);

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (direction === "All" || p.direction === direction) &&
          (status === "All" || p.status === status)
      ),
    [projects, direction, status]
  );

  // Close modal on ESC (page stays scrollable behind the modal)
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const dirLabel = (d: ProjectDirection | "All") =>
    d === "All" ? t.projects.all : t.projects.directions[d];
  const statusLabel = (s: ProjectStatus | "All") =>
    s === "All"
      ? t.projects.all
      : s === "Production"
        ? t.projects.production
        : t.projects.poc;

  const localized = (p: Project) => {
    const tx = t.projects.list[p.id];
    return {
      name: p.name || tx?.name || "",
      short: p.short || tx?.short || "",
      problem: p.problem || tx?.problem || "",
      solution: p.solution || tx?.solution || "",
      impact: p.impact?.length ? p.impact : tx?.impact ?? []
    };
  };

  return (
    <section id="projects" className="section theme-light">
      <div className="aura-side-r" aria-hidden />
      <div className="aura-spot-bc" aria-hidden />
      <div className="container-x">
        <div className="text-center">
          <span className="pill-label mx-auto">
            <Rocket size={11} /> {t.projects.eyebrow}
          </span>
          <h2 className="section-heading mx-auto mt-5 max-w-3xl">
            {t.projects.h2a}
            <span className="gradient-text-violet">{t.projects.h2b}</span>
            {t.projects.h2c}
          </h2>
          <p className="section-sub">{t.projects.sub}</p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {DIRECTIONS.map((d) => (
            <button
              key={d}
              onClick={() => setDirection(d)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                direction === d
                  ? "border-transparent bg-gradient-to-b from-violet-400 to-violet-600 text-white shadow-glow"
                  : "border-white/[0.08] bg-white/[0.025] text-white/70 hover:bg-white/[0.06]"
              }`}
            >
              {dirLabel(d)}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] transition-all ${
                status === s
                  ? "border-violet-400/40 bg-violet-500/15 text-violet-100"
                  : "border-white/[0.08] bg-white/[0.025] text-white/55 hover:bg-white/[0.06]"
              }`}
            >
              {statusLabel(s)}
            </button>
          ))}

          <div className="ml-3 inline-flex rounded-full border border-white/[0.08] bg-white/[0.03] p-1">
            <button
              onClick={() => setView("cards")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors ${
                view === "cards"
                  ? "bg-violet-500/20 text-violet-100"
                  : "text-white/55 hover:text-white"
              }`}
            >
              <LayoutGrid size={11} /> {t.projects.viewCards}
            </button>
            <button
              onClick={() => setView("table")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors ${
                view === "table"
                  ? "bg-violet-500/20 text-violet-100"
                  : "text-white/55 hover:text-white"
              }`}
            >
              <Table2 size={11} /> {t.projects.viewTable}
            </button>
          </div>
        </div>

        {view === "cards" ? (
          <motion.div
            layout
            className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => {
                const tx = localized(p);
                return (
                  <motion.button
                    layout
                    key={p.id}
                    onClick={() => setActive(p)}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35 }}
                    className="card group p-6 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                          p.status === "Production"
                            ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                            : "border-amber-300/20 bg-amber-300/10 text-amber-200"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            p.status === "Production"
                              ? "bg-emerald-400"
                              : "bg-amber-300"
                          } animate-pulseSoft`}
                        />
                        {statusLabel(p.status)}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.16em] text-white/45">
                        {dirLabel(p.direction)}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-xl font-semibold text-white">
                      {tx.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {tx.short}
                    </p>

                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {tx.impact.slice(0, 3).map((m) => (
                        <div
                          key={m.label}
                          className="rounded-xl border border-white/[0.05] bg-white/[0.025] p-3"
                        >
                          <div className="font-display text-base font-semibold text-white">
                            {m.value}
                          </div>
                          <div className="mt-0.5 line-clamp-2 text-[11px] text-white/50">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {p.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-white/[0.06] bg-white/[0.025] px-2 py-0.5 text-[11px] text-white/65"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-end text-xs text-white/55">
                      <span className="inline-flex items-center gap-1 text-violet-200 transition-transform group-hover:translate-x-0.5">
                        {t.projects.readCase} <ArrowUpRight size={12} />
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          <ProjectsTable
            data={filtered}
            onSelect={(p) => setActive(p)}
            dirLabel={dirLabel}
            statusLabel={statusLabel}
            localized={localized}
            t={t}
          />
        )}

        {filtered.length === 0 && (
          <div className="mt-12 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-10 text-center text-sm text-white/55">
            {t.projects.empty}
          </div>
        )}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-center bg-white/70 p-4 backdrop-blur-xl"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_30px_80px_-20px_rgba(10,10,20,0.45)]"
            >
              <div
                data-theme="dark"
                className="relative h-32 shrink-0 bg-gradient-to-r from-violet-500/70 via-violet-500/60 to-violet-700/55"
              >
                <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="absolute right-4 top-4 z-10 rounded-full border border-white/30 bg-white/15 p-2 text-white transition-colors hover:bg-white/25"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="overflow-y-auto p-7">
                {(() => {
                  const tx = localized(active);
                  return (
                    <>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                            active.status === "Production"
                              ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                              : "border-amber-300/20 bg-amber-300/10 text-amber-200"
                          }`}
                        >
                          {statusLabel(active.status)}
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.16em] text-white/45">
                          {dirLabel(active.direction)}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-2xl font-semibold text-white md:text-3xl">
                        {tx.name}
                      </h3>
                      <p className="mt-2 text-sm text-white/60">{tx.short}</p>

                      <div className="mt-6 grid gap-5 md:grid-cols-2">
                        <div>
                          <div className="text-xs uppercase tracking-[0.16em] text-white/40">
                            {t.projects.modal.problem}
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-white/80">
                            {tx.problem}
                          </p>
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-[0.16em] text-white/40">
                            {t.projects.modal.solution}
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-white/80">
                            {tx.solution}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <div className="text-xs uppercase tracking-[0.16em] text-white/40">
                          {t.projects.modal.impact}
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-3">
                          {tx.impact.map((m) => (
                            <div
                              key={m.label}
                              className="rounded-xl border border-white/[0.05] bg-white/[0.025] p-3"
                            >
                              <div className="font-display text-lg font-semibold text-white">
                                {m.value}
                              </div>
                              <div className="mt-0.5 text-[11px] text-white/55">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        <div className="flex flex-wrap gap-1.5">
                          {active.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md border border-white/[0.06] bg-white/[0.04] px-2 py-1 text-[11px] text-white/75"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectsTable({
  data,
  onSelect,
  dirLabel,
  statusLabel,
  localized,
  t
}: {
  data: Project[];
  onSelect: (p: Project) => void;
  dirLabel: (d: ProjectDirection | "All") => string;
  statusLabel: (s: ProjectStatus | "All") => string;
  localized: (p: Project) => {
    name: string;
    short: string;
    impact: { label: string; value: string }[];
  };
  t: ReturnType<typeof useT>;
}) {
  return (
    <div className="mt-12 overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-[0.16em] text-white/40">
              <th className="px-6 py-4 font-medium">{t.projects.table.project}</th>
              <th className="px-6 py-4 font-medium">{t.projects.table.direction}</th>
              <th className="px-6 py-4 font-medium">{t.projects.table.status}</th>
              <th className="px-6 py-4 font-medium">{t.projects.table.impact}</th>
              <th className="px-6 py-4 font-medium">{t.projects.table.tech}</th>
              <th className="px-6 py-4 font-medium" aria-label="action" />
            </tr>
          </thead>
          <tbody>
            {data.map((p, i) => {
              const tx = localized(p);
              return (
                <tr
                  key={p.id}
                  onClick={() => onSelect(p)}
                  className={`cursor-pointer border-t border-white/[0.05] transition-colors hover:bg-violet-500/[0.05] ${
                    i % 2 === 0 ? "bg-white/[0.01]" : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-white">{tx.name}</div>
                    <div className="mt-0.5 line-clamp-1 text-xs text-white/45">
                      {tx.short}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white/70">
                    {dirLabel(p.direction)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                        p.status === "Production"
                          ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                          : "border-amber-300/20 bg-amber-300/10 text-amber-200"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          p.status === "Production"
                            ? "bg-emerald-400"
                            : "bg-amber-300"
                        }`}
                      />
                      {statusLabel(p.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-display font-semibold text-violet-100">
                      {tx.impact[0].value}
                    </span>
                    <span className="ml-1 text-xs text-white/45">
                      {tx.impact[0].label.toLowerCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {p.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-white/[0.06] bg-white/[0.025] px-1.5 py-0.5 text-[10px] text-white/65"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ArrowUpRight size={14} className="inline text-violet-200" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
