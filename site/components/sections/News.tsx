"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Newspaper, ArrowUpRight } from "lucide-react";
import { type NewsItem } from "@/lib/data";
import { useT } from "../LanguageProvider";
import { useLang } from "../LanguageProvider";
import { formatDate } from "@/lib/i18n";

const MotionLink = motion.create(Link);

export default function News({ news }: { news: NewsItem[] }) {
  const t = useT();
  const { locale } = useLang();
  const fmt = (iso: string) => formatDate(iso, locale, "full");

  if (news.length === 0) return null;
  const featured = news[0];
  const rest = news.slice(1);
  const tx = (id: string) =>
    t.news.items[id] ?? {
      title: news.find((n) => n.id === id)?.title ?? "",
      excerpt: news.find((n) => n.id === id)?.excerpt ?? ""
    };

  return (
    <section id="news" className="section theme-light">
      <div className="container-x">
        <div className="text-center">
          <span className="pill-label mx-auto">
            <Newspaper size={11} /> {t.news.eyebrow}
          </span>
          <h2 className="section-heading mx-auto mt-5 max-w-3xl">
            {t.news.h2a}
            <span className="gradient-text-violet">{t.news.h2b}</span>
          </h2>
          <p className="section-sub">{t.news.sub}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-12">
          <MotionLink
            id={`news-${featured.id}`}
            href={`/news/${featured.id}`}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="card group scroll-mt-24 lg:col-span-7"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={featured.image}
                alt={tx(featured.id).title}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-0/95 via-bg-0/30 to-transparent" />
              <span className="pill-label absolute left-4 top-4">
                {t.news.categories[featured.category]}
              </span>
            </div>
            <div className="p-6">
              <div className="text-xs uppercase tracking-[0.14em] text-white/45">
                {fmt(featured.date)}
              </div>
              <h3 className="mt-2 font-display text-2xl font-semibold leading-snug text-white md:text-3xl">
                {tx(featured.id).title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">
                {tx(featured.id).excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-violet-200">
                {t.news.read}{" "}
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </div>
          </MotionLink>

          <div className="grid grid-cols-1 gap-5 lg:col-span-5">
            {rest.map((n, i) => (
              <MotionLink
                key={n.id}
                id={`news-${n.id}`}
                href={`/news/${n.id}`}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="card group flex gap-4 scroll-mt-24 p-3"
              >
                <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={n.image}
                    alt={tx(n.id).title}
                    fill
                    sizes="128px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="min-w-0 flex-1 py-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-violet-200">
                      {t.news.categories[n.category]}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.14em] text-white/45">
                      {fmt(n.date)}
                    </span>
                  </div>
                  <div className="mt-1.5 line-clamp-2 text-sm font-semibold text-white">
                    {tx(n.id).title}
                  </div>
                  <div className="mt-1 line-clamp-2 text-xs text-white/55">
                    {tx(n.id).excerpt}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1 text-[11px] font-medium text-violet-200 transition-transform group-hover:translate-x-0.5">
                    {t.news.read}{" "}
                    <ArrowUpRight size={11} />
                  </span>
                </div>
              </MotionLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
