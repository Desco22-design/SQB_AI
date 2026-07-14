"use client";

import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { useLang, useT } from "../LanguageProvider";
import {
  SCHOOL_TOPICS,
  formatLessonDate,
  type Lang,
} from "@/lib/school-program";

/**
 * "How it works" - the full 14-lesson schedule. Rendered inside the page's
 * `theme-light` block, which remaps the white-on-dark utility classes below to
 * their light-theme equivalents (see globals.css).
 */
export default function SchoolSchedule() {
  const t = useT();
  const { locale } = useLang();
  const lang = locale as Lang;

  return (
    <section id="school-schedule" className="section">
      <div className="container-x">
        <h2 className="section-heading text-center">{t.school.scheduleTitle}</h2>
        <p className="mt-4 text-center text-sm text-white/50">
          {t.school.scheduleNote}
        </p>

        <ol className="mx-auto mt-12 max-w-3xl space-y-2.5">
          {SCHOOL_TOPICS.map((topic, i) => (
            <motion.li
              key={topic.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: Math.min(i, 6) * 0.04 }}
              className="flex gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-4 transition-colors hover:border-violet-400/30 hover:bg-white/[0.04]"
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-500/12 text-xs font-semibold text-violet-300">
                {i + 1}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <h3 className="text-sm font-medium text-white/85">
                    {topic.title[lang]}
                  </h3>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] text-white/55">
                    <CalendarDays size={12} className="shrink-0 text-violet-300" />
                    {formatLessonDate(topic.date, lang)}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-white/50">
                  {topic.summary[lang]}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
