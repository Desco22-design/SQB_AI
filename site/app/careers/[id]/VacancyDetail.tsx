"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import type { Vacancy } from "@/lib/data";
import { useT, useLang } from "@/components/LanguageProvider";
import { pickLang } from "@/lib/i18n-utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getVacancyIcon } from "@/components/careers/vacancyIcons";

function toLines(value: string): string[] {
  return value
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function VacancyDetail({
  vacancy,
}: {
  vacancy: Vacancy | null;
}) {
  const router = useRouter();
  const t = useT();
  const { locale } = useLang();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/careers");
    }
  };

  if (!vacancy) {
    return (
      <>
        <Navbar />
        <main className="theme-light min-h-screen">
          <div className="container-x section text-center">
            <h1 className="section-heading">404</h1>
            <p className="section-sub">404</p>
            <Link href="/careers" className="btn-soft mt-8 inline-flex">
              <ArrowLeft size={16} /> {t.careers.back}
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const Icon = getVacancyIcon(vacancy.icon);
  const title = pickLang(vacancy.title, locale);
  const location = pickLang(vacancy.location, locale);
  const typeLabel = t.careers.types[vacancy.type] ?? vacancy.type;
  const desc = toLines(pickLang(vacancy.description, locale));
  const resp = toLines(pickLang(vacancy.responsibilities, locale));
  const req = toLines(pickLang(vacancy.requirements, locale));
  const offer = toLines(pickLang(vacancy.offer, locale));

  return (
    <>
      <Navbar />
      <main className="theme-light min-h-screen">
        <div className="container-x pt-28 pb-20 md:pt-32">
          <button
            type="button"
            onClick={handleBack}
            className="btn-ghost mb-8 !px-4 !py-2 !text-sm"
          >
            <ArrowLeft size={16} /> {t.careers.back}
          </button>

          <div className="mx-auto max-w-3xl">
            <div className="flex items-start gap-4">
              <span className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-2xl border border-black/10 bg-white text-violet-600 shadow-sm">
                <Icon size={24} />
              </span>
              <div>
                <h1 className="h-display text-3xl font-semibold leading-tight sm:text-4xl">
                  {title}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-black/55">
                  <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-medium text-violet-700">
                    {typeLabel}
                  </span>
                  {location && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={13} /> {location}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 space-y-5">
              {desc.length > 0 && (
                <DetailCard title={t.careers.detailDesc}>
                  <div className="space-y-4">
                    {desc.map((p, i) => (
                      <p
                        key={i}
                        className="text-[15px] leading-relaxed text-black/70"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </DetailCard>
              )}
              {resp.length > 0 && (
                <DetailCard title={t.careers.detailResp}>
                  <BulletList items={resp} />
                </DetailCard>
              )}
              {req.length > 0 && (
                <DetailCard title={t.careers.detailReq}>
                  <BulletList items={req} />
                </DetailCard>
              )}
              {offer.length > 0 && (
                <DetailCard title={t.careers.detailOffer}>
                  <BulletList items={offer} />
                </DetailCard>
              )}
            </div>

            <div className="mt-10">
              <Link
                href="/careers#careers-apply"
                className="btn-primary inline-flex"
              >
                {t.careers.apply}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function DetailCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-black/[0.07] bg-white p-6 shadow-[0_18px_48px_-24px_rgba(10,10,20,0.18)] md:p-8">
      <h2 className="h-display text-xl font-semibold text-black">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((it, i) => (
        <li
          key={i}
          className="flex gap-3 text-[15px] leading-relaxed text-black/70"
        >
          <span className="select-none text-black/30">—</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
