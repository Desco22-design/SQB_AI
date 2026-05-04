"use client";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { type NewsItem } from "@/lib/data";
import { useT, useLang } from "./LanguageProvider";
import { formatDate } from "@/lib/i18n";

export default function NewsBanner({ news }: { news: NewsItem[] }) {
  const t = useT();
  const { locale } = useLang();
  const fmt = (iso: string) => formatDate(iso, locale, "short");

  const tx = (id: string) => {
    const db = news.find((n) => n.id === id);
    const fallback = t.news.items[id];
    return { title: db?.title || fallback?.title || "" };
  };

  if (news.length === 0) return null;
  // Two copies for a seamless infinite loop
  const items = [...news, ...news];

  return (
    <section className="theme-light relative overflow-hidden py-16">
      {/* Edge fades — match light bg so banners dissolve into the section */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#FAFBFD] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#FAFBFD] to-transparent" />

      {/* mr-6 (24px) on each item keeps the seamless-loop math exact:
          8 × (340 + 24) = 2912; translateX(-50%) = -1456 = 4 × 364 → item 5 lands at 0 */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {items.map((n, i) => (
          <Link
            key={`${n.id}-${i}`}
            href={`/news/${n.id}`}
            className="group relative mr-6 flex h-[440px] w-[340px] shrink-0 flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_8px_28px_-14px_rgba(10,10,20,0.18)] transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-400/40 hover:shadow-[0_18px_44px_-14px_rgba(60,209,235,0.35)]"
          >
            {/* Image area with category pill */}
            <div className="relative h-[220px] w-full overflow-hidden">
              <Image
                src={n.image}
                alt={tx(n.id).title}
                fill
                sizes="340px"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              />
              <span className="absolute left-3 top-3 rounded-md bg-[#3CD1EB] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-sm">
                {t.news.categories[n.category]}
              </span>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-black/50">
                <Calendar size={12} className="text-black/40" />
                {fmt(n.date)}
              </div>

              <h3 className="mt-3 font-display text-[17px] font-semibold leading-snug text-[#0A0A14] line-clamp-3">
                {tx(n.id).title}
              </h3>

              <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-[#1D90A8] transition-all group-hover:gap-2.5">
                {t.news.read} <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
