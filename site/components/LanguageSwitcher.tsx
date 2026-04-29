"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n";

export default function LanguageSwitcher({
  className = ""
}: {
  className?: string;
}) {
  const { locale, setLocale } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (l: Locale) => {
    setLocale(l);
    setOpen(false);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[12px] font-semibold tracking-wide text-white/85 backdrop-blur-md transition-colors hover:bg-white/[0.06]"
      >
        {LOCALE_LABELS[locale]}
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-[calc(100%+6px)] z-50 min-w-[88px] overflow-hidden rounded-xl border border-white/[0.08] bg-bg-1/95 p-1 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl"
        >
          {LOCALES.map((l: Locale) => {
            const active = l === locale;
            return (
              <button
                key={l}
                role="option"
                aria-selected={active}
                onClick={() => pick(l)}
                className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-1.5 text-[12px] font-semibold tracking-wide transition-colors ${
                  active
                    ? "bg-violet-500/20 text-violet-100"
                    : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {LOCALE_LABELS[l]}
                {active && <Check size={12} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
