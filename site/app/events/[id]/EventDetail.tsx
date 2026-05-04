"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Users2 } from "lucide-react";
import type { EventItem } from "@/lib/data";
import { useT, useLang } from "@/components/LanguageProvider";
import { formatDate } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function EventDetail({ event }: { event: EventItem | null }) {
  const router = useRouter();
  const t = useT();
  const { locale } = useLang();
  const fmtFull = (iso: string) => formatDate(iso, locale, "full");

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
    name: event.name || fallback?.name || "",
    place: event.place || fallback?.place || "",
    participants: event.participants || fallback?.participants || "",
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
                  <a
                    key={`${src}-${i}`}
                    href={src}
                    target="_blank"
                    rel="noreferrer"
                    className={`group relative overflow-hidden rounded-2xl border border-black/10 ${
                      i % 5 === 0 ? "row-span-2" : ""
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`${tx.name} — ${i + 1}`}
                      fill
                      sizes="(min-width: 768px) 33vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </a>
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
    </>
  );
}
