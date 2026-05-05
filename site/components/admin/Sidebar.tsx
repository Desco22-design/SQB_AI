"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  BarChart3,
  Sparkles,
  Rocket,
  TrendingUp,
  Users,
  Newspaper,
  Calendar,
  Images,
  HelpCircle,
  Inbox,
  History,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { useT } from "./AdminI18n";

export function Sidebar() {
  const pathname = usePathname();
  const t = useT();
  const { data: session } = useSession();
  const user = {
    name: session?.user?.name ?? "",
    email: session?.user?.email ?? "",
  };
  const initials = user.name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const main: { href: string; label: string; Icon: LucideIcon }[] = [
    { href: "/admin", label: t.sidebar.dashboard, Icon: LayoutDashboard },
    { href: "/admin/stats", label: t.stats.title, Icon: BarChart3 },
    { href: "/admin/submissions", label: t.sidebar.submissions, Icon: Inbox },
    { href: "/admin/audit", label: t.sidebar.audit, Icon: History },
  ];
  const sections: { href: string; label: string; Icon: LucideIcon }[] = [
    { href: "/admin/directions", label: t.sidebar.directions, Icon: Sparkles },
    { href: "/admin/projects", label: t.sidebar.projects, Icon: Rocket },
    { href: "/admin/kpis", label: t.sidebar.kpis, Icon: TrendingUp },
    { href: "/admin/team", label: t.sidebar.team, Icon: Users },
    { href: "/admin/news", label: t.sidebar.news, Icon: Newspaper },
    { href: "/admin/events", label: t.sidebar.events, Icon: Calendar },
    { href: "/admin/gallery", label: t.sidebar.gallery, Icon: Images },
    { href: "/admin/faq", label: t.sidebar.faq, Icon: HelpCircle },
  ];

  return (
    <aside
      className="fixed inset-y-0 left-0 w-[260px] bg-white flex flex-col z-30"
      style={{
        borderRight: "1px solid var(--border)",
        boxShadow: "var(--shadow)",
      }}
    >
      <Link
        href="/admin"
        className="flex items-center px-6"
        style={{ height: 64, borderBottom: "1px solid var(--border)" }}
      >
        <Image
          src="/brand/g12.png"
          alt="SQB"
          width={155}
          height={55}
          priority
          style={{ height: 32, width: "auto" }}
        />
      </Link>

      <nav className="flex-1 overflow-y-auto py-2 ad-scrollbar">
        <div className="ad-side-title">{t.sidebar.main}</div>
        {main.map((s) => (
          <SidebarLink key={s.href} {...s} pathname={pathname} />
        ))}

        <div className="ad-side-title">{t.sidebar.sections}</div>
        {sections.map((s) => (
          <SidebarLink key={s.href} {...s} pathname={pathname} />
        ))}
      </nav>

      {/* Profile + logout at bottom */}
      <div
        className="px-3 py-3"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg"
          style={{ background: "var(--bg)" }}
        >
          <div
            className="rounded-full flex items-center justify-center text-white flex-shrink-0"
            style={{
              width: 36,
              height: 36,
              background: "var(--primary-grad)",
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            {initials || "?"}
          </div>
          <div className="min-w-0 flex-1">
            <div
              className="truncate"
              style={{
                color: "var(--text)",
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontSize: 13,
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              {user.name}
            </div>
            <div
              className="truncate"
              style={{
                color: "var(--text-muted)",
                fontSize: 11,
                lineHeight: 1.2,
                marginTop: 2,
              }}
            >
              {user.email}
            </div>
          </div>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="ad-icon-btn flex-shrink-0"
            title={t.topbar.logout}
            aria-label={t.topbar.logout}
            style={{ color: "var(--danger)", width: 32, height: 32 }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}

function SidebarLink({
  href,
  Icon,
  label,
  pathname,
}: {
  href: string;
  Icon: LucideIcon;
  label: string;
  pathname: string;
}) {
  const active =
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
  return (
    <Link href={href} className={`ad-side-link ${active ? "active" : ""}`}>
      <Icon size={18} />
      <span className="truncate">{label}</span>
    </Link>
  );
}
