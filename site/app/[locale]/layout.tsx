import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@fontsource-variable/mona-sans";
import "../globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Tracker } from "@/components/Tracker";
import { LOCALES, isLocale, type Locale } from "@/lib/locale";

// The public site is fully static per locale: three prerendered variants, no
// request-time locale detection. `/` is redirected to a locale by middleware.
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://sqb-ai-jx5a.vercel.app";

const META: Record<Locale, { title: string; description: string }> = {
  uz: {
    title: "SQB AI Bo'limi - bankda AI asosidagi transformatsiya",
    description:
      "SQB AI bo'limi. Kredit riski, firibgarlikka qarshi kurash, avtomatlashtirish, NLP va kompyuter ko'rishi bo'yicha AI loyihalar, jamoa, yangiliklar va natijalar.",
  },
  ru: {
    title: "AI-департамент SQB - трансформация банка на основе AI",
    description:
      "AI-департамент SQB. AI-проекты, команда, новости и результаты в области кредитного риска, антифрода, автоматизации, NLP и компьютерного зрения.",
  },
  en: {
    title: "SQB AI Department - AI-driven transformation in banking",
    description:
      "AI Department of SQB. AI projects, team, news, events and impact across credit risk, fraud, automation, NLP and computer vision in banking.",
  },
};

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const locale = isLocale(params.locale) ? params.locale : "uz";
  const meta = META[locale];

  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    keywords: [
      "SQB",
      "AI",
      "Banking",
      "Machine Learning",
      "Risk",
      "Credit Scoring",
      "NLP",
      "Computer Vision",
    ],
    authors: [{ name: "SQB AI Department" }],
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      // hreflang: tells search engines these are translations of one another,
      // so all three locales get indexed instead of competing as duplicates.
      languages: {
        uz: `${SITE_URL}/uz`,
        ru: `${SITE_URL}/ru`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/uz`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      siteName: "SQB AI Department",
      locale,
      url: `${SITE_URL}/${locale}`,
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#06030F",
  width: "device-width",
  initialScale: 1,
};

export default function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Anything that is not one of the three locales is a 404, not a silent
  // fallback - otherwise /favicon-ish typos would render a full page.
  if (!isLocale(params.locale)) notFound();

  return (
    <html lang={params.locale} className="dark">
      <body className="bg-bg-0 text-white antialiased">
        <LanguageProvider locale={params.locale}>{children}</LanguageProvider>
        <Tracker />
      </body>
    </html>
  );
}
