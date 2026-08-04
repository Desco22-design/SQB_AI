"use client";
import { createContext, useCallback, useContext, useMemo } from "react";
import { dictionaries, type Dict, type Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/locale";

type Ctx = {
  locale: Locale;
  t: Dict;
};

const LanguageCtx = createContext<Ctx | null>(null);

/**
 * The active locale comes from the URL segment (`/uz`, `/ru`, `/en`) and is
 * handed down by the server layout, so the server and the client render the
 * same language on the first paint.
 *
 * This used to detect the locale in a `useEffect` from localStorage/navigator,
 * which meant the server always emitted the default language and the client
 * swapped it after hydration - search engines only ever saw one locale, and
 * users saw a flash of the wrong language. Switching languages is now a
 * navigation (see LanguageSwitcher), not client state.
 */
export function LanguageProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const value = useMemo<Ctx>(
    () => ({ locale, t: dictionaries[locale] }),
    [locale]
  );

  return (
    <LanguageCtx.Provider value={value}>{children}</LanguageCtx.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageCtx);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}

export function useT() {
  return useLang().t;
}

/**
 * Build an internal link that keeps the visitor in their current language.
 *
 * Every public path now lives under a locale prefix, so a bare `/news/x` would
 * be redirected to the DEFAULT locale by middleware - silently throwing a
 * ru/en visitor back to Uzbek. Always route internal navigation through this.
 *
 *   const href = useLocaleHref();
 *   <Link href={href(`/news/${id}`)}>…</Link>
 */
export function useLocaleHref() {
  const { locale } = useLang();
  return useCallback((path: string) => withLocale(path, locale), [locale]);
}
