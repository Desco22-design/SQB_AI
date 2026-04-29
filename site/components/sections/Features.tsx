"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Languages, BarChart3, X } from "lucide-react";
import { useT } from "../LanguageProvider";

type FeatureKey = "decisioning" | "forecasting";

export default function Features() {
  const t = useT();
  const [active, setActive] = useState<FeatureKey | null>(null);

  // Close on ESC
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="features" className="section theme-light">
      <div className="aura-spot-tc" aria-hidden />
      <div className="aura-side-l" aria-hidden />
      <div className="container-x">
        <div className="text-center">
          <span className="pill-label mx-auto">{t.features.eyebrow}</span>
          <h2 className="section-heading mx-auto mt-5 max-w-3xl">
            {t.features.h2a}
            <span className="gradient-text-violet">{t.features.h2b}</span>
          </h2>
          <p className="section-sub">{t.features.sub}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <FeatureCard
            eyebrow={t.features.decisioningEyebrow}
            icon={<Languages size={18} />}
            title={t.features.decisioningTitle}
            body={t.features.decisioningBody}
            seeInAction={t.features.seeInAction}
            onOpen={() => setActive("decisioning")}
            preview={<BenchmarkPreview />}
          />
          <FeatureCard
            eyebrow={t.features.forecastingEyebrow}
            icon={<BarChart3 size={18} />}
            title={t.features.forecastingTitle}
            body={t.features.forecastingBody}
            seeInAction={t.features.seeInAction}
            onOpen={() => setActive("forecasting")}
            preview={<ChartPreview />}
          />
        </div>
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
              <div className="relative flex h-28 shrink-0 items-end overflow-hidden border-b border-black/[0.06] bg-white p-7">
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="absolute right-4 top-4 z-10 rounded-full border border-black/10 bg-white p-2 text-black/70 transition-colors hover:border-black/20 hover:text-black"
                  aria-label={t.features.modalClose}
                >
                  <X size={16} />
                </button>
                <div className="relative z-[1] flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-full border border-[#3CD1EB]/40 bg-[#3CD1EB]/10 text-[#1D90A8]">
                    {active === "decisioning" ? (
                      <Languages size={22} />
                    ) : (
                      <BarChart3 size={22} />
                    )}
                  </div>
                  <span className="text-base font-bold uppercase tracking-[0.18em] text-[#1D90A8]">
                    {active === "decisioning"
                      ? t.features.decisioningEyebrow
                      : t.features.forecastingEyebrow}
                  </span>
                </div>
              </div>

              <div className="overflow-y-auto p-7">
                <h3 className="font-display text-2xl font-semibold leading-tight md:text-3xl">
                  {active === "decisioning"
                    ? t.features.decisioningTitle
                    : t.features.forecastingTitle}
                </h3>
                <div className="mt-5 space-y-4 text-[15px] leading-[1.7] text-black/75">
                  {(active === "decisioning"
                    ? t.features.decisioningDetails
                    : t.features.forecastingDetails
                  ).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="mt-6">
                  {active === "decisioning" ? <BenchmarkPreview /> : <ChartPreview />}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function FeatureCard({
  eyebrow,
  icon,
  title,
  body,
  preview,
  seeInAction,
  onOpen
}: {
  eyebrow: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  preview: React.ReactNode;
  seeInAction: string;
  onOpen: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
      className="card-strong p-7 md:p-9"
    >
      <div className="flex items-center gap-3">
        <div className="icon-circle !h-10 !w-10">{icon}</div>
        <span className="text-xs uppercase tracking-[0.18em] text-violet-200/80">
          {eyebrow}
        </span>
      </div>
      <h3 className="mt-6 font-display text-2xl font-semibold leading-tight text-white md:text-3xl">
        {title}
      </h3>
      <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-white/60">
        {body}
      </p>

      <div className="mt-7 overflow-hidden rounded-2xl border border-white/[0.06] bg-black/30 p-4">
        {preview}
      </div>

      <button
        type="button"
        onClick={onOpen}
        className="group mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-200 transition-colors hover:text-white"
      >
        {seeInAction}
        <ArrowRight
          size={14}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </button>
    </motion.div>
  );
}

function BenchmarkPreview() {
  // Top results from the ULAB Benchmark (Uzbek-language AI evaluation)
  const rows = [
    { name: "Kimi K2.5", score: 0.702, rank: 1 },
    { name: "Mistral Large 2410", score: 0.693, rank: 2 },
    { name: "Cogito 67B", score: 0.681, rank: 3 },
    { name: "Llama 4 Scout", score: 0.654, rank: 4 }
  ];
  const max = Math.max(...rows.map((r) => r.score));
  return (
    <div className="space-y-2">
      {rows.map((r) => (
        <div
          key={r.name}
          className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5"
        >
          <div className="flex min-w-0 items-center gap-2">
            <span
              className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold ${
                r.rank === 1
                  ? "bg-amber-300/15 text-amber-200"
                  : r.rank === 2
                    ? "bg-white/15 text-white/80"
                    : r.rank === 3
                      ? "bg-orange-400/15 text-orange-300"
                      : "bg-white/[0.05] text-white/55"
              }`}
            >
              {r.rank}
            </span>
            <div className="min-w-0 truncate text-sm text-white/85">{r.name}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden h-1.5 w-32 overflow-hidden rounded-full bg-white/[0.06] sm:block">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-400 to-violet-600"
                style={{ width: `${Math.round((r.score / max) * 100)}%` }}
              />
            </div>
            <div className="w-14 text-right text-xs tabular-nums font-semibold text-white">
              {(r.score * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ChartPreview() {
  const points = [12, 18, 16, 22, 28, 26, 31, 36, 33, 41, 46, 50];
  const max = Math.max(...points);
  const min = Math.min(...points);
  const w = 520;
  const h = 160;
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / (max - min)) * (h - 20) - 10;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-40 w-full">
      <defs>
        <linearGradient id="chart-grad" x1="0" x2="0" y1="0" y2="1">
          <stop className="chart-fill-stop" offset="0%" stopOpacity="0.55" />
          <stop className="chart-fill-stop" offset="100%" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#chart-grad)" />
      <path
        d={path}
        className="chart-line"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.map((p, i) => {
        const x = (i / (points.length - 1)) * w;
        const y = h - ((p - min) / (max - min)) * (h - 20) - 10;
        const last = i === points.length - 1;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="2.5"
            className={last ? "chart-dot-active" : "chart-dot-mute"}
          />
        );
      })}
    </svg>
  );
}
