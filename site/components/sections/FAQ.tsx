"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, HelpCircle } from "lucide-react";
import { useLang, useT } from "../LanguageProvider";
import { pickLangStrict, pickOverride, type I18nText, type HeadingOverride } from "@/lib/i18n-content";
import { SectionTitle } from "../SectionTitle";

type FaqItem = {
  id: string;
  question: I18nText | string;
  answer: I18nText | string;
};

export default function FAQ({
  items,
  heading,
}: {
  items: FaqItem[];
  heading?: HeadingOverride;
}) {
  const t = useT();
  const { locale } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  const eyebrow = pickOverride(heading?.eyebrow, t.faq.eyebrow, locale);
  const titlePrefix = pickOverride(heading?.titlePrefix, t.faq.h2a, locale);
  const titleHighlight = pickOverride(heading?.titleHighlight, t.faq.h2b, locale);
  const titleSuffix = pickOverride(heading?.titleSuffix, "", locale);
  const sub = pickOverride(heading?.subheading, t.faq.sub, locale);

  // Prefer DB; fall back to static i18n if a localized field is empty.
  const list =
    items.length > 0
      ? items.map((it, i) => ({
          q:
            pickLangStrict(it.question, locale) ||
            t.faq.items[i]?.q ||
            "",
          a:
            pickLangStrict(it.answer, locale) ||
            t.faq.items[i]?.a ||
            ""
        }))
      : t.faq.items;

  return (
    <section id="faq" className="section theme-light">
      <div className="aura-side-l" aria-hidden />
      <div className="aura-spot-tc" aria-hidden />
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <span className="pill-label">
            <HelpCircle size={11} /> {eyebrow}
          </span>
          <h2 className="section-heading mt-5">
            <SectionTitle
              prefix={titlePrefix}
              highlight={titleHighlight}
              suffix={titleSuffix}
            />
          </h2>
          <p className="mt-5 max-w-lg text-base text-white/55 md:text-lg">
            {sub}
          </p>
          <a href="#contact" className="btn-soft mt-7">
            {t.faq.stillHave}
          </a>
        </div>

        <div className="lg:col-span-7">
          <div className="space-y-3">
            {list.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={f.q}
                  className={`rounded-2xl border transition-colors ${
                    isOpen
                      ? "border-violet-400/25 bg-violet-500/[0.06]"
                      : "border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04]"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-start justify-between gap-6 px-6 py-5 text-left"
                  >
                    <span className="font-display text-base font-semibold text-white md:text-lg">
                      {f.q}
                    </span>
                    <span
                      className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all ${
                        isOpen
                          ? "rotate-45 border-violet-400/40 bg-violet-500/20 text-violet-100"
                          : "border-white/10 bg-white/[0.03] text-white/70"
                      }`}
                    >
                      <Plus size={14} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed text-white/65">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
