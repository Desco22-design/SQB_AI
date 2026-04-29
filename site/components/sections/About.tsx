"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Activity, LineChart, Zap } from "lucide-react";
import { useT } from "../LanguageProvider";

const ICONS = [
  <Activity key="a" size={20} />,
  <ShieldCheck key="s" size={20} />,
  <Zap key="z" size={20} />,
  <LineChart key="l" size={20} />
];

export default function About() {
  const t = useT();
  return (
    <section id="about" className="section theme-light">
      <div className="absolute inset-x-0 top-0 -z-10 h-1/2 bg-violet-radial opacity-50" />
      <div className="container-x">
        <div className="text-center">
          <span className="pill-label mx-auto">{t.about.eyebrow}</span>
          <h2 className="section-heading mx-auto mt-5 max-w-3xl">
            {t.about.h2a}
            <span className="gradient-text-violet">{t.about.h2b}</span>
            {t.about.h2c}
          </h2>
          <p className="section-sub">{t.about.sub}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
          {t.about.benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.06 }}
              className="card-strong p-7 md:p-9"
            >
              <div className="icon-circle">{ICONS[i]}</div>
              <h3 className="mt-6 font-display text-xl font-semibold text-white md:text-2xl">
                {b.title}
              </h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/60">
                {b.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
