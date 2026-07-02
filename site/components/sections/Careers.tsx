"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, ArrowRight } from "lucide-react";
import { useLang, useT } from "../LanguageProvider";
import { pickOverride, type HeadingOverride } from "@/lib/i18n-utils";
import { SectionTitle } from "../SectionTitle";

export default function Careers({ heading }: { heading?: HeadingOverride }) {
  const t = useT();
  const { locale } = useLang();
  const eyebrow = pickOverride(heading?.eyebrow, t.careers.eyebrow, locale);
  const titlePrefix = pickOverride(heading?.titlePrefix, t.careers.h2a, locale);
  const titleHighlight = pickOverride(heading?.titleHighlight, t.careers.h2b, locale);
  const titleSuffix = pickOverride(heading?.titleSuffix, t.careers.h2c, locale);

  return (
    <section id="careers" className="section">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-br from-bg-1 to-bg-2 p-8 md:p-14">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-violet-700/25 blur-3xl" />

          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            {/* LEFT — text, left-aligned */}
            <div className="text-left">
              <span className="pill-label">
                <Briefcase size={11} /> {eyebrow}
              </span>
              <h2 className="section-heading mt-5">
                <SectionTitle
                  prefix={titlePrefix}
                  highlight={titleHighlight}
                  suffix={titleSuffix}
                />
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
                {t.careers.invite}
              </p>
              <Link href="/careers" className="btn-primary mt-8 inline-flex">
                {t.careers.cta}
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* RIGHT — floating 3D icon */}
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
                  src="/careers/briefcase-3d.png"
                  alt=""
                  width={720}
                  height={720}
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
