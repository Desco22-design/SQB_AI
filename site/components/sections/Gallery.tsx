"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { useT } from "../LanguageProvider";

const SPANS = ["row-span-2", "", "", "row-span-2", "", "", "", ""];

export default function Gallery({ images }: { images: string[] }) {
  const t = useT();
  return (
    <section id="gallery" className="section theme-light">
      <div className="container-x">
        <div className="text-center">
          <span className="pill-label mx-auto">
            <ImageIcon size={11} /> {t.gallery.eyebrow}
          </span>
          <h2 className="section-heading mx-auto mt-5 max-w-3xl">
            {t.gallery.h2a}
            <span className="gradient-text-violet">{t.gallery.h2b}</span>
          </h2>
          <p className="section-sub">{t.gallery.sub}</p>
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
