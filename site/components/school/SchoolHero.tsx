"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Sparkles,
  Users,
  BadgeCheck,
  CalendarDays,
  MapPin,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { useLang, useT } from "../LanguageProvider";
import { LESSON_TIME, LESSON_LOCATION, type Lang } from "@/lib/school-program";

const ABOUT_ICONS = [Sparkles, Users, BadgeCheck];

export default function SchoolHero() {
  const t = useT();
  const { locale } = useLang();
  const lang = locale as Lang;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="container-x relative text-center">
          <span className="pill-label">
            <GraduationCap size={11} /> {t.school.eyebrow}
          </span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            {t.school.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
            className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base"
          >
            {t.school.heroSub}
          </motion.p>

          {/* Key facts */}
          <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-3">
            <Fact icon={CalendarDays} text={t.school.scheduleNote} />
            <Fact icon={Clock} text={LESSON_TIME} />
            <Fact icon={MapPin} text={LESSON_LOCATION[lang]} />
          </div>
        </div>
      </section>

      {/* ── What the programme gives you ─────────────────────────────────── */}
      <section className="section">
        <div className="container-x">
          <h2 className="section-heading text-center">{t.school.aboutTitle}</h2>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {t.school.about.map((item, i) => {
              const Icon = ABOUT_ICONS[i] ?? Sparkles;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 transition-colors hover:border-violet-400/30 hover:bg-white/[0.05]"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/12 text-violet-300">
                    <Icon size={19} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/55">
                    {item.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

    </>
  );
}

function Fact({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs text-white/65">
      <Icon size={13} className="shrink-0 text-violet-300" />
      {text}
    </span>
  );
}
