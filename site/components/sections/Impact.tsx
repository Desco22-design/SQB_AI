"use client";
import { motion } from "framer-motion";
import { TrendingUp, LineChart } from "lucide-react";
import Counter from "../Counter";
import { kpis } from "@/lib/data";
import { useT } from "../LanguageProvider";

export default function Impact() {
  const t = useT();
  return (
    <section id="impact" className="section theme-light">
      <div className="container-x">
        <div className="text-center">
          <span className="pill-label mx-auto">
            <TrendingUp size={11} /> {t.impact.eyebrow}
          </span>
          <h2 className="section-heading mx-auto mt-5 max-w-3xl">
            {t.impact.h2a}
            <span className="gradient-text-violet">{t.impact.h2b}</span>
          </h2>
          <p className="section-sub">{t.impact.sub}</p>
          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2 text-xs text-white/60 backdrop-blur-md">
            <LineChart size={14} className="text-violet-300" />
            {t.impact.updated}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k, i) => {
            const label = t.impact.items[i]?.label ?? k.label;
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="card-strong p-7"
              >
                <div className="flex items-baseline gap-1">
                  <div className="font-display text-5xl font-semibold leading-none text-white md:text-[56px]">
                    <Counter value={k.value} decimals={k.decimals} suffix="" />
                  </div>
                  <span className="font-display text-xl font-semibold text-violet-300">
                    {k.suffix}
                  </span>
                </div>
                <div className="mt-5 text-sm text-white/55">{label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
