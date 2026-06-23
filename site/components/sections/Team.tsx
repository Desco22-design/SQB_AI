"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { type TeamMember } from "@/lib/data";
import { useLang } from "../LanguageProvider";
import { pickLang, pickOverride, type HeadingOverride } from "@/lib/i18n-content";
import { SectionTitle } from "../SectionTitle";

const MotionLink = motion.create(Link);

export default function Team({
  members = [],
  heading,
}: {
  members?: TeamMember[];
  heading?: HeadingOverride;
}) {
  const { t, locale } = useLang();
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

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((m, i) => {
            const role = pickLang(m.role, locale);
            return (
              <MotionLink
                key={m.id}
                href={`/team/${m.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.55,
                  delay: (i % 4) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative block aspect-[3/4] overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.03] ring-1 ring-transparent transition-[box-shadow,border-color] duration-500 hover:border-violet-400/40 hover:shadow-[0_28px_70px_-24px_rgba(124,58,237,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70"
              >
                <Image
                  src={m.photo}
                  alt={m.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                />

                {/* Legibility scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-0 via-bg-0/30 to-transparent" />
                {/* Violet wash on hover */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-violet-600/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                {/* Top sheen */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.08] to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-xl font-semibold leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
                    {m.name}
                  </h3>
                  <div className="mt-1.5 text-sm font-medium text-violet-200 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
                    {role}
                  </div>

                  <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-colors duration-300 group-hover:border-violet-300/50 group-hover:bg-violet-500/35">
                    {t.team.detailsCta}
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </MotionLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}
