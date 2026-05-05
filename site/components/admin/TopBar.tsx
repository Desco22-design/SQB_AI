"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ExternalLink } from "lucide-react";
import { useT } from "./AdminI18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function TopBar() {
  const t = useT();
  const pathname = usePathname();

  const titleMap: Record<string, string> = {
    "/admin/stats": t.stats.title,
    "/admin/submissions": t.sidebar.submissions,
    "/admin/audit": t.sidebar.audit,
    "/admin/about": t.sidebar.about,
    "/admin/directions": t.sidebar.directions,
    "/admin/projects": t.sidebar.projects,
    "/admin/kpis": t.sidebar.kpis,
    "/admin/team": t.sidebar.team,
    "/admin/news": t.sidebar.news,
    "/admin/events": t.sidebar.events,
    "/admin/gallery": t.sidebar.gallery,
    "/admin/faq": t.sidebar.faq,
  };
  const keys = Object.keys(titleMap).sort((a, b) => b.length - a.length);
  let pageName = t.sidebar.dashboard;
  for (const k of keys) {
    if (pathname === k || pathname.startsWith(k + "/")) {
      pageName = titleMap[k];
      break;
    }
  }

  return (
    <header className="ad-topbar sticky top-0 z-20">
      <div
        className="text-base truncate"
        style={{
          color: "var(--text)",
          fontFamily: "var(--font-inter), Inter, sans-serif",
          fontWeight: 600,
          fontSize: 15,
        }}
      >
        {pageName}
      </div>

      <div className="flex-1" />

      <Link
        href="/"
        target="_blank"
        className="inline-flex items-center gap-2 rounded-lg ml-1"
        style={{
          padding: "7px 12px",
          color: "var(--text-muted)",
          border: "1px solid var(--border)",
          background: "transparent",
          fontFamily: "var(--font-inter), Inter, sans-serif",
          fontSize: 13,
          fontWeight: 600,
          textDecoration: "none",
          transition: "all 0.12s ease",
        }}
      >
        <ExternalLink size={15} />
        {t.sidebar.openSite}
      </Link>

      <LanguageSwitcher />

      <button
        type="button"
        className="ad-icon-btn"
        aria-label={t.topbar.notifications}
        title={t.topbar.notifications}
      >
        <Bell size={18} />
      </button>
    </header>
  );
}
