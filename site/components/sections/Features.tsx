"use client";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, BarChart3 } from "lucide-react";
import { useT } from "../LanguageProvider";

export default function Features() {
  const t = useT();
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
            preview={<ChartPreview />}
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  eyebrow,
  icon,
  title,
  body,
  preview,
  seeInAction
}: {
  eyebrow: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  preview: React.ReactNode;
  seeInAction: string;
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

      <a
        href="#projects"
        className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-200 transition-colors hover:text-white"
      >
        {seeInAction} <ArrowRight size={14} />
      </a>
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
