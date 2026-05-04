import type { Metadata, Viewport } from "next";
import "@fontsource-variable/mona-sans";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Tracker } from "@/components/Tracker";

export const metadata: Metadata = {
  title: "SQB AI Department — AI-driven transformation in banking",
  description:
    "AI Department of SQB. AI projects, team, news, events and impact across credit risk, fraud, automation, NLP and computer vision in banking.",
  keywords: [
    "SQB",
    "AI",
    "Banking",
    "Machine Learning",
    "Risk",
    "Credit Scoring",
    "NLP",
    "Computer Vision"
  ],
  authors: [{ name: "SQB AI Department" }],
  openGraph: {
    title: "SQB AI Department — AI-driven transformation in banking",
    description:
      "AI projects, team and impact at SQB. Risk, credit scoring, automation, NLP and computer vision.",
    type: "website",
    siteName: "SQB AI Department"
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: "#06030F",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className="dark">
      <body className="bg-bg-0 text-white antialiased">
        <LanguageProvider>{children}</LanguageProvider>
        <Tracker />
      </body>
    </html>
  );
}
