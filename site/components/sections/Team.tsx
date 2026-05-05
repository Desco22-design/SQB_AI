"use client";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { pickOverride, type HeadingOverride } from "@/lib/i18n-content";
import { SectionTitle } from "../SectionTitle";

export default function Team({
  headlineValue,
  heading,
}: {
  headlineValue?: string;
  heading?: HeadingOverride;
}) {
  const { t, locale } = useLang();
  const displayHeadline = headlineValue?.trim() || t.team.headlineValue;
  const eyebrow = pickOverride(heading?.eyebrow, t.team.eyebrow, locale);
  const titlePrefix = pickOverride(heading?.titlePrefix, t.team.h2a, locale);
  const titleHighlight = pickOverride(heading?.titleHighlight, t.team.h2b, locale);
  const titleSuffix = pickOverride(heading?.titleSuffix, "", locale);
  const sub = pickOverride(heading?.subheading, t.team.sub, locale);
  return (
    <section id="team" className="section">
      <div className="aura-side-r" aria-hidden />
      <div className="container-x">
        <div className="text-center">
          <span className="pill-label mx-auto">{eyebrow}</span>
          <h2 className="section-heading mx-auto mt-5 max-w-3xl">
            <SectionTitle
              prefix={titlePrefix}
              highlight={titleHighlight}
              suffix={titleSuffix}
            />
          </h2>
          <p className="section-sub">{sub}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="card-strong relative mx-auto mt-14 max-w-3xl overflow-hidden p-10 text-center md:p-14"
        >
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
          <div className="relative">
            <div className="mx-auto inline-flex items-center justify-center rounded-2xl border border-violet-400/25 bg-violet-500/10 p-3 text-violet-200 shadow-glow">
              <Users size={26} />
            </div>
            <div className="mt-6 flex items-baseline justify-center gap-2">
              <div className="font-display text-6xl font-semibold leading-none text-white md:text-7xl">
                {displayHeadline}
              </div>
            </div>
            <div className="mt-4 text-[11px] uppercase tracking-[0.22em] text-violet-200/80">
              {t.team.headlineLabel}
            </div>
            <p className="mx-auto mt-7 max-w-2xl text-sm leading-relaxed text-white/65 md:text-[15px]">
              {t.team.body}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
