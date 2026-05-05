"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Activity, LineChart, Zap } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { pickLang, pickOverride, type I18nText, type HeadingOverride } from "@/lib/i18n-content";

const ICONS = [
  <Activity key="a" size={20} />,
  <ShieldCheck key="s" size={20} />,
  <Zap key="z" size={20} />,
  <LineChart key="l" size={20} />
];

export type AboutBenefitData = {
  title: I18nText | string;
  body: I18nText | string;
};

export default function About({
  benefits = [],
  heading,
}: {
  benefits?: AboutBenefitData[];
  heading?: HeadingOverride;
}) {
  const { t, locale } = useLang();
  const items =
    benefits.length > 0
      ? benefits.map((b) => ({
          title: pickLang(b.title, locale),
          body: pickLang(b.body, locale),
        }))
      : t.about.benefits;

  const eyebrow = pickOverride(heading?.eyebrow, t.about.eyebrow, locale);
  const titlePrefix = pickOverride(heading?.titlePrefix, t.about.h2a, locale);
  const titleHighlight = pickOverride(heading?.titleHighlight, t.about.h2b, locale);
  const titleSuffix = pickOverride(heading?.titleSuffix, t.about.h2c, locale);
  const sub = pickOverride(heading?.subheading, t.about.sub, locale);

  return (
    <section id="about" className="section theme-light">
      <div className="absolute inset-x-0 top-0 -z-10 h-1/2 bg-violet-radial opacity-50" />
      <div className="container-x">
        <div className="text-center">
          <span className="pill-label mx-auto">{eyebrow}</span>
          <h2 className="section-heading mx-auto mt-5 max-w-3xl">
            {titlePrefix}
            <span className="gradient-text-violet">{titleHighlight}</span>
            {titleSuffix}
          </h2>
          <p className="section-sub">{sub}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
          {items.map((b, i) => (
            <motion.div
              key={`${b.title}-${i}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.06 }}
              className="card-strong p-7 md:p-9"
            >
              <div className="icon-circle">{ICONS[i % ICONS.length]}</div>
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
