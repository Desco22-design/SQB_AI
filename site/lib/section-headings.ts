import { prisma } from "@/lib/prisma";
import type { I18nText } from "@/lib/i18n-content";

export type SectionHeadingData = {
  eyebrow: I18nText | null;
  titlePrefix: I18nText | null;
  titleHighlight: I18nText | null;
  titleSuffix: I18nText | null;
  subheading: I18nText | null;
};

const EMPTY: SectionHeadingData = {
  eyebrow: null,
  titlePrefix: null,
  titleHighlight: null,
  titleSuffix: null,
  subheading: null,
};

const asI18n = (v: unknown): I18nText | null => {
  if (v && typeof v === "object" && !Array.isArray(v)) {
    return v as I18nText;
  }
  return null;
};

export const SECTION_KEYS = [
  "about",
  "features",
  "projects",
  "impact",
  "team",
  "news",
  "events",
  "gallery",
  "faq",
] as const;

export type SectionKey = (typeof SECTION_KEYS)[number];

export async function getSectionHeading(
  section: SectionKey
): Promise<SectionHeadingData> {
  const row = await prisma.sectionHeading.findUnique({ where: { section } });
  if (!row) return EMPTY;
  return {
    eyebrow: asI18n(row.eyebrow),
    titlePrefix: asI18n(row.titlePrefix),
    titleHighlight: asI18n(row.titleHighlight),
    titleSuffix: asI18n(row.titleSuffix),
    subheading: asI18n(row.subheading),
  };
}

export async function getAllSectionHeadings(): Promise<
  Record<SectionKey, SectionHeadingData>
> {
  const rows = await prisma.sectionHeading.findMany();
  const out = Object.fromEntries(
    SECTION_KEYS.map((k) => [k, EMPTY])
  ) as Record<SectionKey, SectionHeadingData>;
  for (const r of rows) {
    if ((SECTION_KEYS as readonly string[]).includes(r.section)) {
      out[r.section as SectionKey] = {
        eyebrow: asI18n(r.eyebrow),
        titlePrefix: asI18n(r.titlePrefix),
        titleHighlight: asI18n(r.titleHighlight),
        titleSuffix: asI18n(r.titleSuffix),
        subheading: asI18n(r.subheading),
      };
    }
  }
  return out;
}
