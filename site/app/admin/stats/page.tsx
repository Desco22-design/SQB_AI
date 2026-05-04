import {
  Eye,
  Send,
  MousePointerClick,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { prisma } from "@/lib/prisma";
import { StatsChart, type ChartSeries } from "./StatsChart";

export const dynamic = "force-dynamic";

function formatDuration(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.round(totalSeconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

type MonthRow = { month: Date; n: bigint };
type AvgRow = { month: Date; avg_seconds: number | null };

export default async function StatsPage() {
  const locale = getServerLocale();
  const t = getStrings(locale);

  const now = new Date();
  const year = now.getFullYear();
  const monthsCount = now.getMonth() + 1;
  const yearStart = new Date(Date.UTC(year, 0, 1));

  const [pvRows, subRows, avgRows] = await Promise.all([
    prisma.$queryRaw<{ month: Date; views: bigint; visitors: bigint }[]>`
      SELECT date_trunc('month', "createdAt") AS month,
             COUNT(*)::bigint AS views,
             COUNT(DISTINCT "visitorId")::bigint AS visitors
      FROM "PageView"
      WHERE "createdAt" >= ${yearStart}
      GROUP BY 1
      ORDER BY 1
    `,
    prisma.$queryRaw<MonthRow[]>`
      SELECT date_trunc('month', "createdAt") AS month,
             COUNT(*)::bigint AS n
      FROM "ContactSubmission"
      WHERE "createdAt" >= ${yearStart}
      GROUP BY 1
      ORDER BY 1
    `,
    prisma.$queryRaw<AvgRow[]>`
      SELECT date_trunc('month', smin) AS month,
             AVG(EXTRACT(EPOCH FROM (smax - smin)))::float AS avg_seconds
      FROM (
        SELECT "sessionId", MIN("createdAt") AS smin, MAX("createdAt") AS smax
        FROM "PageView"
        WHERE "createdAt" >= ${yearStart}
        GROUP BY "sessionId"
      ) s
      GROUP BY 1
      ORDER BY 1
    `,
  ]);

  const visits = new Array(monthsCount).fill(0);
  const pageViews = new Array(monthsCount).fill(0);
  const submissions = new Array(monthsCount).fill(0);
  const avgSession = new Array(monthsCount).fill(0);

  for (const r of pvRows) {
    const i = new Date(r.month).getUTCMonth();
    if (i < monthsCount) {
      pageViews[i] = Number(r.views);
      visits[i] = Number(r.visitors);
    }
  }
  for (const r of subRows) {
    const i = new Date(r.month).getUTCMonth();
    if (i < monthsCount) submissions[i] = Number(r.n);
  }
  for (const r of avgRows) {
    const i = new Date(r.month).getUTCMonth();
    if (i < monthsCount) avgSession[i] = Math.round(r.avg_seconds ?? 0);
  }

  const visibleMonths = t.stats.months.slice(0, monthsCount);
  const last = (arr: number[]) => arr[arr.length - 1] ?? 0;

  const statCards: {
    Icon: LucideIcon;
    label: string;
    hint: string;
    value: string;
    color: string;
    bg: string;
  }[] = [
    {
      Icon: Eye,
      label: t.stats.visits,
      hint: t.stats.visitsHint,
      value: last(visits).toLocaleString("ru-RU"),
      color: "#1f4e8e",
      bg: "rgba(31, 78, 142, 0.10)",
    },
    {
      Icon: Send,
      label: t.stats.submissions,
      hint: t.stats.submissionsHint,
      value: last(submissions).toLocaleString("ru-RU"),
      color: "#1f7a48",
      bg: "rgba(31, 122, 72, 0.10)",
    },
    {
      Icon: MousePointerClick,
      label: t.stats.pageViews,
      hint: t.stats.pageViewsHint,
      value: last(pageViews).toLocaleString("ru-RU"),
      color: "#7c3aed",
      bg: "rgba(124, 58, 237, 0.10)",
    },
    {
      Icon: Clock,
      label: t.stats.avgSession,
      hint: t.stats.avgSessionHint,
      value: formatDuration(last(avgSession)),
      color: "#c47a18",
      bg: "rgba(196, 122, 24, 0.10)",
    },
  ];

  const series: ChartSeries[] = [
    {
      key: "visits",
      label: t.stats.visits,
      color: "#1f4e8e",
      data: visits,
      format: "short",
    },
    {
      key: "submissions",
      label: t.stats.submissions,
      color: "#1f7a48",
      data: submissions,
      format: "int",
    },
    {
      key: "pageViews",
      label: t.stats.pageViews,
      color: "#7c3aed",
      data: pageViews,
      format: "short",
    },
    {
      key: "avgSession",
      label: t.stats.avgSession,
      color: "#c47a18",
      data: avgSession,
      format: "duration",
    },
  ];

  return (
    <div>
      <div className="mb-7">
        <h1 className="ad-page-title">{t.stats.title}</h1>
        <p className="ad-page-sub">{t.stats.sub}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map(({ Icon, ...s }) => (
          <div key={s.label} className="ad-card" style={{ padding: 22 }}>
            <div
              className="rounded-xl flex items-center justify-center flex-shrink-0 mb-4"
              style={{
                width: 44,
                height: 44,
                background: s.bg,
                color: s.color,
              }}
            >
              <Icon size={22} />
            </div>
            <div
              style={{
                fontFamily: "var(--font-inter), Inter, sans-serif",
                color: "var(--text)",
                fontSize: 30,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              {s.value}
            </div>
            <div
              className="mt-1.5"
              style={{
                color: "var(--text)",
                fontWeight: 600,
                fontSize: 14,
                fontFamily: "var(--font-inter), Inter, sans-serif",
              }}
            >
              {s.label}
            </div>
            <div
              className="mt-0.5"
              style={{
                color: "var(--text-muted)",
                fontSize: 12,
                lineHeight: 1.4,
              }}
            >
              {s.hint}
            </div>
          </div>
        ))}
      </div>

      <StatsChart
        series={series}
        months={visibleMonths}
        year={year}
        title={t.stats.monthlyTrend}
        subtitle={t.stats.monthlyTrendSub}
      />
    </div>
  );
}
