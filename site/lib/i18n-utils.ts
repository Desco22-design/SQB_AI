import type { Locale } from "./admin-i18n";

export type I18nText = { uz?: string; ru?: string; en?: string };

export type HeadingOverride = {
  eyebrow: I18nText | null;
  titlePrefix: I18nText | null;
  titleHighlight: I18nText | null;
  titleSuffix: I18nText | null;
  subheading: I18nText | null;
};

export function pickLang(
  value: unknown,
  locale: Locale,
  fallback: Locale = "ru"
): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    const v = value as Record<string, unknown>;
    const primary = v[locale];
    if (typeof primary === "string" && primary.trim()) return primary;
    const fb = v[fallback];
    if (typeof fb === "string" && fb.trim()) return fb;
    // Fallback to first non-empty string in any locale
    for (const k of Object.keys(v)) {
      const x = v[k];
      if (typeof x === "string" && x.trim()) return x;
    }
  }
  return "";
}

// Pick override value or fall back to the static string when override is empty/missing
export function pickOverride(
  override: unknown,
  fallback: string,
  locale: Locale
): string {
  if (override == null) return fallback;
  const v = pickLang(override, locale);
  return v || fallback;
}

// Strict locale pick — returns "" when the requested locale is empty,
// instead of cross-falling to other locales. Use this when the caller
// has its own fallback (e.g. a static i18n dictionary).
export function pickLangStrict(value: unknown, locale: Locale): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    const v = value as Record<string, unknown>;
    const primary = v[locale];
    if (typeof primary === "string") return primary;
  }
  return "";
}

export function makeI18n(uz: string, ru: string, en: string): I18nText {
  return { uz, ru, en };
}

// Server-side helper: collect __uz/__ru/__en form fields into i18n JSON
export function collectI18n(form: FormData, baseName: string): I18nText {
  const get = (k: string) => {
    const v = form.get(k);
    return typeof v === "string" ? v.trim() : "";
  };
  return {
    uz: get(`${baseName}__uz`),
    ru: get(`${baseName}__ru`),
    en: get(`${baseName}__en`),
  };
}

// Coerce raw string into i18n shape (for legacy/seed migration)
export function toI18n(value: unknown): I18nText {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const v = value as Record<string, unknown>;
    return {
      uz: typeof v.uz === "string" ? v.uz : "",
      ru: typeof v.ru === "string" ? v.ru : "",
      en: typeof v.en === "string" ? v.en : "",
    };
  }
  if (typeof value === "string") {
    return { uz: value, ru: value, en: value };
  }
  return { uz: "", ru: "", en: "" };
}
