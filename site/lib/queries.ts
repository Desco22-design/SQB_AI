import { prisma } from "@/lib/prisma";
import type {
  Project,
  TeamMember,
  NewsItem,
  EventItem,
} from "@/lib/data";
import { pickLang } from "@/lib/i18n-content";
import type { Locale } from "@/lib/admin-i18n";

export async function getProjects(locale: Locale = "ru"): Promise<Project[]> {
  const rows = await prisma.project.findMany({
    orderBy: { order: "asc" },
    include: { team: true },
  });
  return rows.map((r) => ({
    id: r.id,
    name: pickLang(r.name, locale),
    short: pickLang(r.short, locale),
    problem: pickLang(r.problem, locale),
    solution: pickLang(r.solution, locale),
    technologies: r.technologies,
    impact: r.impact as { label: string; value: string }[],
    team: r.team.map((m) => m.id),
    direction: r.direction as Project["direction"],
    status: r.status as Project["status"],
  }));
}

export async function getTeam(locale: Locale = "ru"): Promise<TeamMember[]> {
  const rows = await prisma.teamMember.findMany({
    orderBy: { order: "asc" },
    include: { projects: { select: { id: true } } },
  });
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    role: pickLang(r.role, locale),
    bio: pickLang(r.bio, locale),
    skills: r.skills,
    photo: r.photo,
    projects: r.projects.map((p) => p.id),
  }));
}

export async function getNews(locale: Locale = "ru"): Promise<NewsItem[]> {
  const rows = await prisma.newsItem.findMany({ orderBy: { date: "desc" } });
  return rows.map((r) => ({
    id: r.id,
    title: pickLang(r.title, locale),
    excerpt: pickLang(r.excerpt, locale),
    body: pickLang(r.body, locale),
    date: r.date.toISOString().slice(0, 10),
    category: r.category as NewsItem["category"],
    image: r.image,
  }));
}

export async function getNewsById(
  id: string,
  locale: Locale = "ru"
): Promise<NewsItem | null> {
  const r = await prisma.newsItem.findUnique({ where: { id } });
  if (!r) return null;
  return {
    id: r.id,
    title: pickLang(r.title, locale),
    excerpt: pickLang(r.excerpt, locale),
    body: pickLang(r.body, locale),
    date: r.date.toISOString().slice(0, 10),
    category: r.category as NewsItem["category"],
    image: r.image,
  };
}

export async function getEvents(locale: Locale = "ru"): Promise<EventItem[]> {
  const rows = await prisma.eventItem.findMany({ orderBy: { date: "desc" } });
  return rows.map((r) => ({
    id: r.id,
    name: pickLang(r.name, locale),
    date: r.date.toISOString().slice(0, 10),
    place: pickLang(r.place, locale),
    participants: pickLang(r.participants, locale),
    image: r.image,
    gallery: r.gallery,
  }));
}

export async function getEventById(
  id: string,
  locale: Locale = "ru"
): Promise<EventItem | null> {
  const r = await prisma.eventItem.findUnique({ where: { id } });
  if (!r) return null;
  return {
    id: r.id,
    name: pickLang(r.name, locale),
    date: r.date.toISOString().slice(0, 10),
    place: pickLang(r.place, locale),
    participants: pickLang(r.participants, locale),
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

export async function getKpis(locale: Locale = "ru") {
  const rows = await prisma.kpi.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    label: pickLang(r.label, locale),
    value: r.value,
    suffix: r.suffix,
    decimals: r.decimals,
  }));
}

export async function getDirections(locale: Locale = "ru") {
  const rows = await prisma.aiDirection.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    title: pickLang(r.title, locale),
    description: pickLang(r.description, locale),
  }));
}

export async function getFaq(locale: Locale = "ru") {
  const rows = await prisma.faqItem.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    id: r.id,
    question: pickLang(r.question, locale),
    answer: pickLang(r.answer, locale),
  }));
}
