"use client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { news } from "@/lib/data";
import { useT, useLang } from "@/components/LanguageProvider";
import { formatDate } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NewsArticlePage() {
  const params = useParams();
  const router = useRouter();
  const t = useT();
  const { locale } = useLang();
  const id = params?.id as string;

  const article = news.find((n) => n.id === id);

  const fmt = (iso: string) => formatDate(iso, locale, "full");

  if (!article) {
    return (
      <>
        <Navbar />
        <main className="container-x section text-center">
          <h1 className="section-heading">404</h1>
          <p className="section-sub">Article not found</p>
          <Link href="/" className="btn-soft mt-8 inline-flex">
            <ArrowLeft size={16} /> {t.news.back}
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const tx = t.news.items[id] ?? {
    title: article.title,
    excerpt: article.excerpt,
    body: [article.excerpt]
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/#news");
    }
  };

  return (
    <>
      <Navbar />
      <main className="theme-light min-h-screen">
        <article className="container-x relative pt-28 pb-20 md:pt-32">
          {/* Back button */}
          <button
            type="button"
            onClick={handleBack}
            className="btn-ghost mb-8 !px-4 !py-2 !text-sm"
          >
            <ArrowLeft size={16} /> {t.news.back}
          </button>

          {/* Header */}
          <div className="mx-auto max-w-3xl">
            <span className="pill-label">
              {t.news.categories[article.category]}
            </span>
            <h1 className="h-display mt-5 text-3xl font-semibold leading-[1.15] sm:text-4xl md:text-5xl">
              {tx.title}
            </h1>
            <div className="mt-5 flex items-center gap-2 text-sm text-black/55">
              <Calendar size={14} className="text-black/40" />
              {fmt(article.date)}
            </div>
          </div>

          {/* Hero image */}
          <div className="relative mx-auto mt-10 aspect-[16/9] max-w-5xl overflow-hidden rounded-3xl border border-black/10 shadow-[0_18px_48px_-18px_rgba(10,10,20,0.18)]">
            <Image
              src={article.image}
              alt={tx.title}
              fill
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
            />
          </div>

          {/* Body */}
          <div className="mx-auto mt-12 max-w-3xl space-y-5 text-base leading-[1.75] text-black/75 md:text-lg md:leading-[1.8]">
            {tx.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Bottom back */}
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
