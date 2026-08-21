// Rich, id-keyed "case study" content for the project detail pages
// (/[locale]/projects/[id]). This lives in code - not the DB - because each
// project's write-up is a bespoke, multi-section document, not a row in a
// generic table. Projects without an entry here fall back to the basic
// problem/solution/impact view driven by the DB row.

export type Tri = { uz: string; ru: string; en: string };

/** A UI screenshot with intrinsic dimensions (for next/image, no layout shift). */
export type Shot = { src: string; w: number; h: number };

/** One block of the case study. The detail page renders each `kind` differently. */
export type DetailSection =
  // A titled prose paragraph.
  | { kind: "paragraph"; label: Tri; body: Tri }
  // A titled bullet list, optionally introduced by a lead sentence.
  | { kind: "bullets"; label: Tri; intro?: Tri; items: Tri[] }
  // A grid of titled feature cards (e.g. the platform's modules). Each card
  // may name a lucide icon (see components/detailIcons).
  | { kind: "cards"; label: Tri; items: { title: Tri; body: Tri; icon?: string }[] }
  // A row of stat tiles (e.g. data coverage: 15 regions, 201 districts…).
  | { kind: "stats"; label: Tri; items: { label: Tri; value: string }[] }
  // Key → value rows (e.g. business value: area → impact).
  | { kind: "keyvalue"; label: Tri; items: { key: Tri; value: Tri }[] }
  // A three-column comparison table (need vs. option A vs. option B).
  | {
      kind: "compare";
      label: Tri;
      columns: [Tri, Tri, Tri];
      rows: { need: Tri; a: Tri; b: Tri }[];
    }
  // A masonry gallery of product screenshots with captions.
  | { kind: "gallery"; label: Tri; items: (Shot & { caption: Tri })[] };

/** A localized hero/card metric tile. */
export type Metric = { value: Tri; label: Tri };

/**
 * Hero visual shown beside the title. `bare: true` means the image already
 * includes its own device frame / dark backdrop, so it renders without a frame.
 */
export type HeroImage = Shot & {
  alt: string;
  bare?: boolean;
  /** Tailwind classes overriding the hero image's width/position (per project). */
  wrapClass?: string;
};

export type ProjectDetail = {
  id: string;
  /** One-line subtitle shown under the project name in the hero. */
  tagline: Tri;
  heroImage?: HeroImage;
  sections: DetailSection[];
};

/** Generic UI labels for the detail page shell, kept beside the content. */
export const DETAIL_LABELS = {
  back: { uz: "Loyihalarga qaytish", ru: "К проектам", en: "Back to projects" },
  overview: { uz: "Umumiy ma'lumot", ru: "Обзор", en: "Overview" },
  techStack: { uz: "Texnologiyalar", ru: "Технологии", en: "Technology stack" },
  keyMetrics: { uz: "Asosiy ko'rsatkichlar", ru: "Ключевые показатели", en: "Key metrics" },
} as const;
