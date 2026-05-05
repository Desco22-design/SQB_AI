"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users2, Mic } from "lucide-react";
import { type EventItem } from "@/lib/data";
import { useLang, useT } from "../LanguageProvider";
import { formatDate, formatDay, formatMonth } from "@/lib/i18n";
import { pickLangStrict, pickOverride, type HeadingOverride } from "@/lib/i18n-content";

const MotionLink = motion.create(Link);

export default function Events({
  events,
  heading,
}: {
  events: EventItem[];
  heading?: HeadingOverride;
}) {
  const t = useT();
  const { locale } = useLang();
  const eyebrow = pickOverride(heading?.eyebrow, t.events.eyebrow, locale);
  const titlePrefix = pickOverride(heading?.titlePrefix, t.events.h2a, locale);
  const titleHighlight = pickOverride(heading?.titleHighlight, t.events.h2b, locale);
  const titleSuffix = pickOverride(heading?.titleSuffix, t.events.h2c, locale);
  const sub = pickOverride(heading?.subheading, t.events.sub, locale);

  const fmtBadge = (iso: string) => ({
    day: formatDay(iso),
    mon: formatMonth(iso, locale)
  });
  const fmtFull = (iso: string) => formatDate(iso, locale, "full");

  return (
    <section id="events" className="section theme-light">
      <div className="container-x">
        <div className="text-center">
          <span className="pill-label mx-auto">
            <Mic size={11} /> {eyebrow}
          </span>
          <h2 className="section-heading mx-auto mt-5 max-w-3xl">
            {titlePrefix}
            <span className="gradient-text-violet">{titleHighlight}</span>
            {titleSuffix}
          </h2>
          <p className="section-sub">{sub}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {events.map((e, i) => {
            const badge = fmtBadge(e.date);
            const fallback = t.events.items[e.id];
            const tx = {
              name:
                pickLangStrict(e.name, locale) || fallback?.name || "",
              place:
                pickLangStrict(e.place, locale) || fallback?.place || "",
              participants:
                pickLangStrict(e.participants, locale) ||
                fallback?.participants ||
                ""
            };
            return (
              <MotionLink
                key={e.id}
                href={`/events/${e.id}`}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="card group"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={e.image}
                    alt={tx.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-0/95 via-bg-0/30 to-transparent" />
                  <div
                    data-theme="dark"
                    className="absolute left-4 top-4 grid h-16 w-16 place-items-center rounded-2xl border border-violet-400/30 bg-bg-0/80 backdrop-blur-md"
                  >
                    <div className="text-center">
                      <div className="font-display text-xl font-bold leading-none text-white">
                        {badge.day}
                      </div>
                      <div className="mt-1 text-[10px] tracking-[0.16em] text-violet-300">
                        {badge.mon}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold leading-snug text-white">
                    {tx.name}
                  </h3>
                  <ul className="mt-3 space-y-1.5 text-xs text-white/60">
                    <li className="flex items-center gap-2">
                      <Calendar size={12} /> {fmtFull(e.date)}
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin size={12} /> {tx.place}
                    </li>
                    <li className="flex items-center gap-2">
                      <Users2 size={12} /> {tx.participants}
                    </li>
                  </ul>
                </div>
              </MotionLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}
