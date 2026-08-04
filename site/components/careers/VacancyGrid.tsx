"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import { type Vacancy } from "@/lib/data";
import { useLang, useT, useLocaleHref } from "../LanguageProvider";
import { pickLang } from "@/lib/i18n-utils";
import { SectionTitle } from "../SectionTitle";
import { getVacancyIcon } from "./vacancyIcons";

const MotionLink = motion.create(Link);

export function VacancyGrid({ vacancies }: { vacancies: Vacancy[] }) {
  const t = useT();
  const { locale } = useLang();
  const localeHref = useLocaleHref();

  return (
    <section id="open-roles" className="section">
      <div className="container-x">
        <div className="text-center">
          <h2 className="section-heading mx-auto max-w-3xl">
            <SectionTitle
              prefix={t.careers.rolesA}
              highlight={t.careers.rolesHi}
              suffix={t.careers.rolesB}
            />
          </h2>
          <p className="section-sub">{t.careers.rolesSub}</p>
        </div>

        {vacancies.length === 0 ? (
          <p className="mx-auto mt-12 max-w-xl text-center text-sm leading-relaxed text-black/55">
            {t.careers.empty}
          </p>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {vacancies.map((v, i) => {
              const Icon = getVacancyIcon(v.icon);
              const title = pickLang(v.title, locale);
              const location = pickLang(v.location, locale);
              const typeLabel = t.careers.types[v.type] ?? v.type;
              const blurb = pickLang(v.description, locale)
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean)[0];
              return (
                <MotionLink
                  key={v.id}
                  href={localeHref(`/careers/${v.id}`)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgba(10,10,20,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#28B6CF]/35 hover:shadow-[0_26px_50px_-18px_rgba(40,182,207,0.4)]"
                >
                  {/* soft corner glow on hover */}
                  <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#28B6CF]/0 blur-2xl transition-colors duration-500 group-hover:bg-[#28B6CF]/12" />

                  <div className="relative flex items-start justify-between gap-3">
                    <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#3CD1EB]/12 to-[#28B6CF]/12 text-[#1D90A8] ring-1 ring-inset ring-[#28B6CF]/20 transition-all duration-300 group-hover:from-[#3CD1EB] group-hover:to-[#28B6CF] group-hover:text-white group-hover:shadow-[0_10px_22px_-8px_rgba(40,182,207,0.65)]">
                      <Icon size={22} />
                    </span>
                    <span className="rounded-full border border-[#28B6CF]/25 bg-[#28B6CF]/[0.07] px-2.5 py-1 text-[11px] font-medium text-[#1D90A8]">
                      {typeLabel}
                    </span>
                  </div>

                  <h3 className="relative mt-5 font-display text-[17px] font-semibold text-[#0A0A14]">
                    {title}
                  </h3>
                  {location && (
                    <div className="relative mt-1.5 flex items-center gap-1.5 text-xs text-black/50">
                      <MapPin size={12} /> {location}
                    </div>
                  )}
                  {blurb && (
                    <p className="relative mt-3 line-clamp-2 text-sm leading-relaxed text-black/55">
                      {blurb}
                    </p>
                  )}

                  <div className="relative mt-6 flex items-center gap-1.5 text-[13px] font-semibold text-[#1D90A8]">
                    {t.team.detailsCta}
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </MotionLink>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
