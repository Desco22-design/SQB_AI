"use client";

import { motion } from "framer-motion";
import { CalendarDays, Users } from "lucide-react";
import { useLang, useT } from "../LanguageProvider";
import {
  LESSON_CAPACITY,
  SCHOOL_TOPICS,
  formatLessonDate,
  type Lang,
} from "@/lib/school-program";

/**
 * "How it works" - the full 14-lesson schedule. Rendered inside the page's
 * `theme-light` block, which remaps the white-on-dark utility classes below to
 * their light-theme equivalents (see globals.css).
 */
export default function SchoolSchedule({
  seats = {},
}: {
  /** Signups per lesson, keyed by topic id. Comes from the server page. */
  seats?: Record<string, number>;
}) {
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
          {SCHOOL_TOPICS.map((topic, i) => {
            const taken = Math.min(seats[topic.id] ?? 0, LESSON_CAPACITY);
            const left = LESSON_CAPACITY - taken;
            const isFull = left <= 0;
            return (
              <motion.li
                key={topic.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, delay: Math.min(i, 6) * 0.04 }}
                className={`flex gap-4 rounded-2xl border px-5 py-4 transition-colors ${
                  isFull
                    ? "border-white/[0.05] bg-white/[0.01]"
                    : "border-white/[0.07] bg-white/[0.02] hover:border-violet-400/30 hover:bg-white/[0.04]"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-semibold ${
                    isFull
                      ? "bg-rose-400/10 text-rose-300"
                      : "bg-violet-500/12 text-violet-300"
                  }`}
                >
                  {i + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                    {/* A full lesson still has to be readable - only the red
                        seat chip and the fill bar mark it as closed. */}
                    <h3 className="text-sm font-medium text-white/85">
                      {topic.title[lang]}
                    </h3>

                    <div className="flex shrink-0 flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] text-white/55">
                        <CalendarDays
                          size={12}
                          className="shrink-0 text-violet-300"
                        />
                        {formatLessonDate(topic.date, lang)}
                      </span>

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] ${
                          isFull
                            ? "border-rose-400/25 bg-rose-400/10 text-rose-300"
                            : "border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300"
                        }`}
                      >
                        <Users size={12} className="shrink-0" />
                        {isFull
                          ? t.school.seatsFull
                          : `${left} ${t.school.seatsLeft}`}
                      </span>
                    </div>
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-white/50">
                    {topic.summary[lang]}
                  </p>

                  {/* Fill bar - reads at a glance which lessons are running out. */}
                  <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className={`h-full rounded-full ${
                        isFull ? "bg-rose-400/60" : "bg-violet-400/60"
                      }`}
                      style={{
                        width: `${(taken / LESSON_CAPACITY) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] text-white/35">
                    {taken} {t.school.seatsOf} {LESSON_CAPACITY}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
