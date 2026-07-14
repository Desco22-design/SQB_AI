"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { EventItem } from "@/lib/data";
import { useT, useLang } from "@/components/LanguageProvider";
import { formatDate } from "@/lib/i18n";
import { pickLangStrict } from "@/lib/i18n-utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function EventDetail({ event }: { event: EventItem | null }) {
  const router = useRouter();
  const t = useT();
  const { locale } = useLang();
  const fmtFull = (iso: string) => formatDate(iso, locale, "full");

  // In-site image lightbox (open on gallery click; arrow-key / prev-next navigation)
  const [lightbox, setLightbox] = useState<number | null>(null);
  const galleryLen = event?.gallery.length ?? 0;
  const closeLightbox = () => setLightbox(null);
  const showPrev = () =>
    setLightbox((i) => (i === null ? i : (i - 1 + galleryLen) % galleryLen));
  const showNext = () =>
    setLightbox((i) => (i === null ? i : (i + 1) % galleryLen));

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") showPrev();
      else if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox, galleryLen]);

  if (!event) {
    return (
      <>
        <Navbar />
        <main className="container-x section text-center">
          <h1 className="section-heading">404</h1>
          <p className="section-sub">Event not found</p>
          <Link href="/" className="btn-soft mt-8 inline-flex">
            <ArrowLeft size={16} /> {t.news.back}
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const fallback = t.events.items[event.id];
  const tx = {
    name: pickLangStrict(event.name, locale) || fallback?.name || "",
    place: pickLangStrict(event.place, locale) || fallback?.place || "",
    participants:
      pickLangStrict(event.participants, locale) ||
      fallback?.participants ||
      "",
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/#events");
    }
  };

  return (
    <>
      <Navbar />
      <main className="theme-light min-h-screen">
        <article className="container-x relative pt-28 pb-20 md:pt-32">
          <button
            type="button"
            onClick={handleBack}
            className="btn-ghost mb-8 !px-4 !py-2 !text-sm"
          >
            <ArrowLeft size={16} /> {t.news.back}
          </button>

          <div className="mx-auto max-w-3xl">
            <h1 className="h-display text-3xl font-semibold leading-[1.15] sm:text-4xl md:text-5xl">
              {tx.name}
            </h1>
            <ul className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-black/65">
              <li className="inline-flex items-center gap-2">
                <Calendar size={14} className="text-black/45" />
                {fmtFull(event.date)}
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin size={14} className="text-black/45" />
                {tx.place}
              </li>
              <li className="inline-flex items-center gap-2">
                <Users2 size={14} className="text-black/45" />
                {tx.participants}
              </li>
            </ul>
          </div>

          <div className="relative mx-auto mt-10 aspect-[16/9] max-w-5xl overflow-hidden rounded-3xl border border-black/10 shadow-[0_18px_48px_-18px_rgba(10,10,20,0.18)]">
            <Image
              src={event.image}
              alt={tx.name}
              fill
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
            />
          </div>

          {event.gallery.length > 0 && (
            <div className="mx-auto mt-12 max-w-5xl">
              <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-3">
                {event.gallery.map((src, i) => (
                  <button
                    key={`${src}-${i}`}
                    type="button"
                    onClick={() => setLightbox(i)}
                    aria-label={`${tx.name} - ${i + 1}`}
                    className={`group relative h-full w-full cursor-pointer overflow-hidden rounded-2xl border border-black/10 ${
                      i % 5 === 0 ? "row-span-2" : ""
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`${tx.name} - ${i + 1}`}
                      fill
                      sizes="(min-width: 768px) 33vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mx-auto mt-14 max-w-3xl">
            <button
              type="button"
              onClick={handleBack}
              className="btn-ghost !px-5 !py-2.5 !text-sm"
            >
              <ArrowLeft size={16} /> {t.news.back}
            </button>
          </div>
        </article>
      </main>
      <Footer />

      {lightbox !== null && event.gallery[lightbox] && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label={t.nav.closeModal}
            className="absolute right-4 top-4 rounded-full border border-white/25 bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
          >
            <X size={20} />
          </button>

          <div className="absolute left-1/2 top-5 -translate-x-1/2 text-sm text-white/70">
            {lightbox + 1} / {event.gallery.length}
          </div>

          {event.gallery.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:left-6"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.gallery[lightbox]}
            alt={`${tx.name} - ${lightbox + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[86vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
          />

          {event.gallery.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:right-6"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      )}
    </>
  );
}
