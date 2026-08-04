/** Locales served by the public site, in URL form. */
export const LOCALES = ["uz", "ru", "en"] as const;
export type Locale = (typeof LOCALES)[number];

/** The language the `/` redirect falls back to when nothing else matches. */
export const DEFAULT_LOCALE: Locale = "uz";

/**
 * Locale-prefixed paths that must render for every language.
 *
 * Detail routes (`/news/[id]`, `/team/[id]`, …) are not listed statically -
 * their ids come from the database, so `content.spec.ts` discovers a real one
 * from the homepage instead of hardcoding a fixture that could be deleted.
 */
export const STATIC_PATHS = ["", "/careers", "/school"] as const;

/** Public segments that existed before the locale prefix; must 308 to /uz/…. */
export const LEGACY_SEGMENTS = [
  "news",
  "events",
  "team",
  "careers",
  "school",
] as const;

/** Assets and API routes the locale prefix must never be applied to. */
export function isAssetOrApi(href: string): boolean {
  return (
    href.startsWith("/_next") ||
    href.startsWith("/api") ||
    href.startsWith("/brand") ||
    href.startsWith("/media") ||
    /\.[a-zA-Z0-9]+(\?|$)/.test(href)
  );
}

/** True when a same-origin path carries one of the supported locale prefixes. */
export function hasLocalePrefix(path: string): boolean {
  return new RegExp(`^/(${LOCALES.join("|")})(/|$|#|\\?)`).test(path);
}
