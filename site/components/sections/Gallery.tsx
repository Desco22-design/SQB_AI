"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { pickOverride, type HeadingOverride } from "@/lib/i18n-content";
import { SectionTitle } from "../SectionTitle";

const SPANS = ["row-span-2", "", "", "row-span-2", "", "", "", ""];

export default function Gallery({
  images,
  heading,
}: {
  images: string[];
  heading?: HeadingOverride;
}) {
  const { t, locale } = useLang();
  const eyebrow = pickOverride(heading?.eyebrow, t.gallery.eyebrow, locale);
  const titlePrefix = pickOverride(heading?.titlePrefix, t.gallery.h2a, locale);
  const titleHighlight = pickOverride(heading?.titleHighlight, t.gallery.h2b, locale);
  const titleSuffix = pickOverride(heading?.titleSuffix, "", locale);
  const sub = pickOverride(heading?.subheading, t.gallery.sub, locale);
  return (
    <section id="gallery" className="section theme-light">
      <div className="container-x">
        <div className="text-center">
          <span className="pill-label mx-auto">
            <ImageIcon size={11} /> {eyebrow}
          </span>
          <h2 className="section-heading mx-auto mt-5 max-w-3xl">
            <SectionTitle
              prefix={titlePrefix}
              highlight={titleHighlight}
              suffix={titleSuffix}
            />
          </h2>
          <p className="section-sub">{sub}</p>
        </div>

        <div className="mt-16 grid auto-rows-[180px] grid-cols-2 gap-3 md:grid-cols-4">
          {images.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.05 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/[0.07] ${SPANS[i] ?? ""}`}
            >
              <Image
                src={src}
                alt={`${t.nav.galleryImageAlt} ${i + 1}`}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-0/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
