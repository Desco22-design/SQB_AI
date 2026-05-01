"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { ChevronDown, Check } from "lucide-react";
import { LOCALES, LOCALE_LABELS, LOCALE_COOKIE, type Locale } from "@/lib/admin-i18n";
import { useLocale } from "./AdminI18n";

const NATIVE: Record<Locale, string> = {
  uz: "O'zbekcha",
  ru: "Русский",
  en: "English",
};

const FLAG_CODE: Record<Locale, string> = {
  uz: "uz",
  ru: "ru",
  en: "gb",
};

function flagSrc(loc: Locale, size = 80) {
  return `https://flagcdn.com/w${size}/${FLAG_CODE[loc]}.png`;
}

export function LanguageSwitcher() {
  const current = useLocale();
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [pending, start] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function setLocale(loc: Locale) {
    if (loc === current) {
      setOpen(false);
      return;
    }
    document.cookie = `${LOCALE_COOKIE}=${loc}; path=/; max-age=31536000; samesite=lax`;
    setOpen(false);
    start(() => {
      window.location.reload();
    });
  }

  const active = open || hover;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        disabled={pending}
        className="inline-flex items-center gap-2"
        style={{
          padding: "6px 11px",
          background: active ? "var(--bg)" : "#fff",
          border: "1px solid",
          borderColor: active ? "var(--border-strong)" : "var(--border)",
          borderRadius: 8,
          color: "var(--text)",
          fontFamily: "var(--font-inter), Inter, sans-serif",
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: "0.02em",
          cursor: pending ? "wait" : "pointer",
          transition: "all 0.12s ease",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={flagSrc(current)}
          alt=""
          aria-hidden
          width={22}
          height={22}
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            objectFit: "cover",
            border: "1px solid var(--border)",
            display: "inline-block",
            flexShrink: 0,
          }}
        />
        <span style={{ fontWeight: 600, letterSpacing: "0.04em" }}>
          {LOCALE_LABELS[current]}
        </span>
        <ChevronDown
          size={13}
          style={{
            color: "var(--text-muted)",
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.15s ease",
          }}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 rounded-xl bg-white py-1.5 z-30"
          style={{
            minWidth: 200,
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-lift)",
          }}
        >
          {LOCALES.map((loc) => {
            const isActive = loc === current;
            return (
              <button
                key={loc}
                type="button"
                onClick={() => setLocale(loc)}
                className="flex items-center justify-between w-full px-4 py-2.5 text-left transition-colors"
                style={{
                  background: isActive ? "var(--primary-soft)" : "transparent",
                  color: isActive ? "var(--primary-deep)" : "var(--text)",
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLButtonElement).style.background = "var(--bg)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }}
              >
                <span className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={flagSrc(loc)}
                    alt=""
                    aria-hidden
                    width={24}
                    height={24}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "1px solid var(--border)",
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      display: "inline-block",
                      width: 24,
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      fontSize: 12,
                      color: isActive ? "var(--primary-deep)" : "var(--text-subtle)",
                    }}
                  >
                    {LOCALE_LABELS[loc]}
                  </span>
                  <span style={{ color: isActive ? "var(--primary-deep)" : "var(--text)" }}>
                    {NATIVE[loc]}
                  </span>
                </span>
                {isActive && <Check size={14} style={{ color: "var(--primary)" }} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
