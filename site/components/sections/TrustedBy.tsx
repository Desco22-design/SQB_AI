"use client";
import { useT } from "../LanguageProvider";

const trustedBy = [
  "Visa",
  "Mastercard",
  "SWIFT",
  "MSCI",
  "Bloomberg",
  "Moody's"
];

export default function TrustedBy() {
  const t = useT();
  return (
    <section className="theme-light relative py-14 md:py-20">
      <div className="container-x">
        <div className="text-center text-xs uppercase tracking-[0.22em] text-white/40">
          {t.hero.trusted}
        </div>
        <div className="mx-auto mt-7 grid max-w-4xl grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">
          {trustedBy.map((c) => (
            <div
              key={c}
              className="flex h-12 items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.02] text-sm font-medium tracking-wide text-white/55 backdrop-blur-md transition-colors hover:bg-white/[0.04] hover:text-white/80"
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
