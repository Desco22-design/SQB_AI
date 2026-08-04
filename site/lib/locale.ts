import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

export { LOCALES, DEFAULT_LOCALE, type Locale };

/** Narrow an arbitrary path segment to a supported locale. */
export function isLocale(value: string | undefined): value is Locale {
  return typeof value === "string" && (LOCALES as string[]).includes(value);
}

/**
 * Best-effort locale from an `Accept-Language` header. Used only to pick the
 * target of the `/` redirect; every rendered page takes its locale from the
 * URL segment, never from a header.
 */
export function localeFromAcceptLanguage(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;
  // "ru-RU,ru;q=0.9,en;q=0.8" -> ["ru-ru", "ru", "en"]
  const tags = header
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase())
    .filter(Boolean) as string[];

  for (const tag of tags) {
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }
  return DEFAULT_LOCALE;
}

/**
 * Swap (or add) the locale prefix on a path.
 * `/uz/news/n2` + "ru" -> `/ru/news/n2`;  `/` + "ru" -> `/ru`
 */
export function withLocale(pathname: string, locale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = locale;
  } else {
    segments.unshift(locale);
  }
  return "/" + segments.join("/");
}
