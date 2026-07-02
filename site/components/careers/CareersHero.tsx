"use client";
import { Briefcase, Lightbulb, Rocket, TrendingUp, type LucideIcon } from "lucide-react";
import { useT } from "../LanguageProvider";
import { SectionTitle } from "../SectionTitle";

const WANT_ICONS: LucideIcon[] = [Lightbulb, Rocket, TrendingUp];

export function CareersHero() {
  const t = useT();
  return (
    <section className="relative pt-32 pb-16 md:pt-36 md:pb-20">
      <div className="container-x relative z-[1] text-center">
        <span className="pill-label mx-auto">
          <Briefcase size={11} /> {t.careers.eyebrow}
        </span>
        <h1 className="section-heading mx-auto mt-5 max-w-4xl">
          <SectionTitle
            prefix={t.careers.h2a}
            highlight={t.careers.h2b}
            suffix={t.careers.h2c}
          />
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
          {t.careers.invite}
        </p>

        <div className="mt-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5FD3E6]">
            {t.careers.wantTitle}
          </p>
          <div className="mx-auto mt-6 grid max-w-4xl gap-4 sm:grid-cols-3">
            {t.careers.want.map((w, i) => {
              const Icon = WANT_ICONS[i] ?? Lightbulb;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 text-left backdrop-blur-sm transition-colors duration-300 hover:border-[#28B6CF]/35"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#28B6CF]/[0.12] text-[#5FD3E6] ring-1 ring-inset ring-[#28B6CF]/25">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-white">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    {w.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
