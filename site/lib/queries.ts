import { prisma } from "@/lib/prisma";
import type {
  Project,
  TeamMember,
  NewsItem,
  EventItem,
} from "@/lib/data";
import type { I18nText } from "@/lib/i18n-content";

const asI18n = (v: unknown): I18nText | string => {
  if (v && typeof v === "object") return v as I18nText;
  return typeof v === "string" ? v : "";
};

export async function getProjects(): Promise<Project[]> {
  const rows = await prisma.project.findMany({
    orderBy: { order: "asc" },
    include: { team: true },
  });
  return rows.map((r) => ({
    id: r.id,
    name: asI18n(r.name),
    short: asI18n(r.short),
    problem: asI18n(r.problem),
    solution: asI18n(r.solution),
    technologies: r.technologies,
    impact: r.impact as { label: string; value: string }[],
    team: r.team.map((m) => m.id),
    direction: r.direction as Project["direction"],
    status: r.status as Project["status"],
  }));
}

export async function getTeam(): Promise<TeamMember[]> {
  const rows = await prisma.teamMember.findMany({
    orderBy: { order: "asc" },
    include: { projects: { select: { id: true } } },
  });
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    role: asI18n(r.role),
    bio: asI18n(r.bio),
    skills: r.skills,
    photo: r.photo,
    projects: r.projects.map((p) => p.id),
  }));
}

export async function getNews(): Promise<NewsItem[]> {
  const rows = await prisma.newsItem.findMany({ orderBy: { date: "desc" } });
  return rows.map((r) => ({
    id: r.id,
    title: asI18n(r.title),
    excerpt: asI18n(r.excerpt),
    body: asI18n(r.body),
    date: r.date.toISOString().slice(0, 10),
    category: r.category as NewsItem["category"],
    image: r.image,
  }));
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  const r = await prisma.newsItem.findUnique({ where: { id } });
  if (!r) return null;
  return {
    id: r.id,
    title: asI18n(r.title),
    excerpt: asI18n(r.excerpt),
    body: asI18n(r.body),
    date: r.date.toISOString().slice(0, 10),
    category: r.category as NewsItem["category"],
    image: r.image,
  };
}

export async function getEvents(): Promise<EventItem[]> {
  const rows = await prisma.eventItem.findMany({ orderBy: { date: "desc" } });
  return rows.map((r) => ({
    id: r.id,
    name: asI18n(r.name),
    date: r.date.toISOString().slice(0, 10),
    place: asI18n(r.place),
    participants: asI18n(r.participants),
    image: r.image,
    gallery: r.gallery,
  }));
}

export async function getEventById(id: string): Promise<EventItem | null> {
  const r = await prisma.eventItem.findUnique({ where: { id } });
  if (!r) return null;
  return {
    id: r.id,
    name: asI18n(r.name),
    date: r.date.toISOString().slice(0, 10),
    place: asI18n(r.place),
    participants: asI18n(r.participants),
    image: r.image,
    gallery: r.gallery,
  };
}

export async function getGalleryImages(): Promise<string[]> {
  const rows = await prisma.galleryImage.findMany({
    orderBy: { order: "asc" },
  });
  return rows.map((r) => r.url);
}

export type KpiRaw = {
  label: I18nText | string;
  value: number;
  suffix: string;
  decimals: number;
};

export async function getKpis(): Promise<KpiRaw[]> {
  const rows = await prisma.kpi.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    label: asI18n(r.label),
    value: r.value,
    suffix: r.suffix,
    decimals: r.decimals,
  }));
}

export type DirectionRaw = {
  title: I18nText | string;
  description: I18nText | string;
};

export async function getDirections(): Promise<DirectionRaw[]> {
  const rows = await prisma.aiDirection.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    title: asI18n(r.title),
    description: asI18n(r.description),
  }));
}

export type FaqRaw = {
  id: string;
  question: I18nText | string;
  answer: I18nText | string;
};

export async function getTeamHeadlineValue(): Promise<string | null> {
  const row = await prisma.siteSetting.findUnique({
    where: { key: "team.headlineValue" },
  });
  return row?.value ?? null;
}

export async function getFaq(): Promise<FaqRaw[]> {
  const rows = await prisma.faqItem.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    id: r.id,
    question: asI18n(r.question),
    answer: asI18n(r.answer),
  }));
}
