import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Rocket,
  TrendingUp,
  Users,
  Newspaper,
  Calendar,
  Images,
  HelpCircle,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";

type Counts = {
  directions: number;
  projects: number;
  kpis: number;
  team: number;
  news: number;
  events: number;
  gallery: number;
  faq: number;
};

async function getCounts(): Promise<Counts> {
  const [directions, projects, kpis, team, news, events, gallery, faq] =
    await Promise.all([
      prisma.aiDirection.count(),
      prisma.project.count(),
      prisma.kpi.count(),
      prisma.teamMember.count(),
      prisma.newsItem.count(),
      prisma.eventItem.count(),
      prisma.galleryImage.count(),
      prisma.faqItem.count(),
    ]);
  return { directions, projects, kpis, team, news, events, gallery, faq };
}

export default async function AdminDashboard() {
  const counts = await getCounts();
  const total = Object.values(counts).reduce((s, n) => s + n, 0);
  const t = getStrings(getServerLocale());

  const cards: {
    href: string;
    label: string;
    Icon: LucideIcon;
    key: keyof Counts;
    hint: string;
    image: string;
  }[] = [
    {
      href: "/admin/directions",
      label: t.sidebar.directions,
      Icon: Sparkles,
      key: "directions",
      hint: t.page.directions.sub,
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&crop=entropy&w=800&h=360&q=75",
    },
    {
      href: "/admin/projects",
      label: t.sidebar.projects,
      Icon: Rocket,
      key: "projects",
      hint: t.page.projects.sub,
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&crop=entropy&w=800&h=360&q=75",
    },
    {
      href: "/admin/kpis",
      label: t.sidebar.kpis,
      Icon: TrendingUp,
      key: "kpis",
      hint: t.page.kpis.sub,
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&crop=entropy&w=800&h=360&q=75",
    },
    {
      href: "/admin/team",
      label: t.sidebar.team,
      Icon: Users,
      key: "team",
      hint: t.page.team.sub,
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&crop=entropy&w=800&h=360&q=75",
    },
    {
      href: "/admin/news",
      label: t.sidebar.news,
      Icon: Newspaper,
      key: "news",
      hint: t.page.news.sub,
      image:
        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&crop=entropy&w=800&h=360&q=75",
    },
    {
      href: "/admin/events",
      label: t.sidebar.events,
      Icon: Calendar,
      key: "events",
      hint: t.page.events.sub,
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&crop=center&w=800&h=360&q=75",
    },
    {
      href: "/admin/gallery",
      label: t.sidebar.gallery,
      Icon: Images,
      key: "gallery",
      hint: t.page.gallery.sub,
      image:
        "https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&crop=entropy&w=800&h=360&q=75",
    },
    {
      href: "/admin/faq",
      label: t.sidebar.faq,
      Icon: HelpCircle,
      key: "faq",
      hint: t.page.faq.sub,
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&crop=entropy&w=800&h=360&q=75",
    },
  ];

  return (
    <div>
      <div className="mb-7">
        <h1 className="ad-page-title">{t.dashboard.title}</h1>
        <p className="ad-page-sub">
          {t.dashboard.sub}:{" "}
          <strong style={{ color: "var(--text)" }}>{total}</strong>{" "}
          {t.dashboard.totalLabel}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {cards.map(({ Icon, ...c }) => (
          <Link
            key={c.href}
            href={c.href}
            className="group block rounded-2xl overflow-hidden relative"
            style={{
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow)",
              background: "#fff",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              height: 280,
            }}
          >
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={c.image}
                alt=""
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div
              className="absolute top-3 left-3 rounded-xl flex items-center justify-center z-10"
              style={{
                width: 40,
                height: 40,
                background: "rgba(255,255,255,0.22)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              <Icon size={20} color="#fff" />
            </div>

            <div
              className="absolute top-3 right-3 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 z-10"
              style={{
                width: 32,
                height: 32,
                background: "rgba(255,255,255,0.95)",
                transition: "opacity 0.2s ease",
              }}
            >
              <ArrowRight size={16} color="var(--primary-deep)" />
            </div>

            <div
              className="absolute left-0 right-0 bottom-0 px-4 flex flex-col justify-center z-10"
              style={{
                height: 96,
                background: "rgba(35, 40, 50, 0.38)",
                backdropFilter: "blur(14px) saturate(140%)",
                WebkitBackdropFilter: "blur(14px) saturate(140%)",
                borderTop: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <div
                style={{
                  color: "#fff",
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: 19,
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  textShadow: "0 1px 4px rgba(0,0,0,0.35)",
                }}
              >
                {c.label}
              </div>
              <div
                className="mt-1.5"
                style={{
                  color: "rgba(255,255,255,0.92)",
                  fontSize: 12,
                  lineHeight: 1.4,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textShadow: "0 1px 3px rgba(0,0,0,0.4)",
                }}
              >
                {c.hint}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
