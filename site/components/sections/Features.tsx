"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Cpu, BarChart3, X } from "lucide-react";
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
            icon={<Cpu size={18} />}
            title={t.features.decisioningTitle}
            body={t.features.decisioningBody}
            seeInAction={t.features.seeInAction}
            onOpen={() => setActive("decisioning")}
            preview={
              <DecisioningPreview
                approve={t.features.statusApprove}
                review={t.features.statusReview}
                decline={t.features.statusDecline}
              />
            }
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
              <div className="relative flex h-32 shrink-0 items-end overflow-hidden bg-gradient-to-r from-[#1D90A8] via-[#28B6CF] to-[#3CD1EB] p-7">
                <div className="pointer-events-none absolute inset-0 grid-bg opacity-50 mix-blend-overlay" />
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="absolute right-4 top-4 z-10 rounded-full border border-white/40 bg-white/20 p-2 text-white transition-colors hover:bg-white/30"
                  aria-label={t.features.modalClose}
                >
                  <X size={16} />
                </button>
                <div className="relative z-[1] flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full border border-white/40 bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">
                    {active === "decisioning" ? (
                      <Cpu size={18} />
                    ) : (
                      <BarChart3 size={18} />
                    )}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
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
                  {active === "decisioning" ? (
                    <DecisioningPreview
                      approve={t.features.statusApprove}
                      review={t.features.statusReview}
                      decline={t.features.statusDecline}
                    />
                  ) : (
                    <ChartPreview />
                  )}
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

function DecisioningPreview({
  approve,
  review,
  decline
}: {
  approve: string;
  review: string;
  decline: string;
}) {
  const rows = [
    { name: "Transfer · UZS", score: 0.94, status: approve, kind: "approve" as const },
    { name: "Card · CNP", score: 0.71, status: review, kind: "review" as const },
    { name: "Loan · SME", score: 0.88, status: approve, kind: "approve" as const },
    { name: "Onboarding · KYC", score: 0.32, status: decline, kind: "decline" as const }
  ];
  return (
    <div className="space-y-2">
      {rows.map((r) => (
        <div
          key={r.name}
          className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5"
        >
          <div className="min-w-0 truncate text-sm text-white/85">{r.name}</div>
          <div className="flex items-center gap-3">
            <div className="hidden h-1.5 w-32 overflow-hidden rounded-full bg-white/[0.06] sm:block">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-400 to-violet-600"
                style={{ width: `${Math.round(r.score * 100)}%` }}
              />
            </div>
            <div className="w-12 text-right text-xs tabular-nums text-white/70">
              {r.score.toFixed(2)}
            </div>
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                r.kind === "approve"
                  ? "bg-emerald-400/10 text-emerald-300"
                  : r.kind === "review"
                    ? "bg-amber-300/10 text-amber-200"
                    : "bg-rose-400/10 text-rose-300"
              }`}
            >
              {r.status}
            </span>
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
