"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, ArrowRight } from "lucide-react";
import { useLang, useT, useLocaleHref } from "../LanguageProvider";
import { pickOverride, type HeadingOverride } from "@/lib/i18n-utils";
import { SectionTitle } from "../SectionTitle";

export default function School({ heading }: { heading?: HeadingOverride }) {
  const t = useT();
  const { locale } = useLang();
  const localeHref = useLocaleHref();

  const eyebrow = pickOverride(heading?.eyebrow, t.school.eyebrow, locale);
  const titlePrefix = pickOverride(heading?.titlePrefix, t.school.h2a, locale);
  const titleHighlight = pickOverride(
    heading?.titleHighlight,
    t.school.h2b,
    locale
  );
  const titleSuffix = pickOverride(heading?.titleSuffix, t.school.h2c, locale);

  return (
    <section id="school" className="section">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-br from-bg-1 to-bg-2 p-8 md:p-14">
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-violet-600/25 blur-3xl" />

          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            {/* LEFT - text + CTA */}
            <div className="text-left">
              <span className="pill-label">
                <GraduationCap size={11} /> {eyebrow}
              </span>
              <h2 className="section-heading mt-5">
                <SectionTitle
                  prefix={titlePrefix}
                  highlight={titleHighlight}
                  suffix={titleSuffix}
                />
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
                {t.school.sub}
              </p>
              <Link href={localeHref("/school")} className="btn-primary mt-8 inline-flex">
                {t.school.cta}
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* RIGHT - floating 3D icon */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex justify-center lg:justify-end"
            >
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/school/books-3d.webp"
                  alt=""
                  width={960}
                  height={960}
                  sizes="(min-width: 1024px) 480px, 340px"
                  className="h-auto w-[300px] drop-shadow-[0_36px_70px_rgba(83,60,235,0.45)] sm:w-[400px] lg:w-[480px]"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
