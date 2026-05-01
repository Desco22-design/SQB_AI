import {
  Eye,
  Send,
  MousePointerClick,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { StatsChart, type ChartSeries } from "./StatsChart";

// Full year of mock metrics (Jan-Dec) — wire to a real analytics provider later.
// We slice this to the current month for display.
const MONTHLY = {
  visits: [3200, 5800, 8100, 10300, 12847, 14200, 15600, 16800, 18100, 19500, 20800, 22000],
  submissions: [22, 45, 71, 95, 124, 142, 158, 175, 190, 206, 220, 235],
  pageViews: [11400, 19800, 28500, 38000, 48392, 56000, 62500, 68000, 74500, 80200, 86000, 92500],
  avgSessionSeconds: [165, 180, 198, 212, 222, 230, 238, 245, 251, 257, 263, 268],
};

function formatDuration(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.round(totalSeconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default async function StatsPage() {
  const locale = getServerLocale();
  const t = getStrings(locale);

  const now = new Date();
  const year = now.getFullYear();
  // 1..12 — number of months elapsed in the current year (inclusive of current)
  const monthsCount = now.getMonth() + 1;

  const sliced = {
    visits: MONTHLY.visits.slice(0, monthsCount),
    submissions: MONTHLY.submissions.slice(0, monthsCount),
    pageViews: MONTHLY.pageViews.slice(0, monthsCount),
    avgSessionSeconds: MONTHLY.avgSessionSeconds.slice(0, monthsCount),
  };
  const visibleMonths = t.stats.months.slice(0, monthsCount);
  const last = (arr: number[]) => arr[arr.length - 1];

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
      value: last(sliced.visits).toLocaleString("ru-RU"),
      color: "#1f4e8e",
      bg: "rgba(31, 78, 142, 0.10)",
    },
    {
      Icon: Send,
      label: t.stats.submissions,
      hint: t.stats.submissionsHint,
      value: last(sliced.submissions).toLocaleString("ru-RU"),
      color: "#1f7a48",
      bg: "rgba(31, 122, 72, 0.10)",
    },
    {
      Icon: MousePointerClick,
      label: t.stats.pageViews,
      hint: t.stats.pageViewsHint,
      value: last(sliced.pageViews).toLocaleString("ru-RU"),
      color: "#7c3aed",
      bg: "rgba(124, 58, 237, 0.10)",
    },
    {
      Icon: Clock,
      label: t.stats.avgSession,
      hint: t.stats.avgSessionHint,
      value: formatDuration(last(sliced.avgSessionSeconds)),
      color: "#c47a18",
      bg: "rgba(196, 122, 24, 0.10)",
    },
  ];

  const series: ChartSeries[] = [
    {
      key: "visits",
      label: t.stats.visits,
      color: "#1f4e8e",
      data: sliced.visits,
      format: "short",
    },
    {
      key: "submissions",
      label: t.stats.submissions,
      color: "#1f7a48",
      data: sliced.submissions,
      format: "int",
    },
    {
      key: "pageViews",
      label: t.stats.pageViews,
      color: "#7c3aed",
      data: sliced.pageViews,
      format: "short",
    },
    {
      key: "avgSession",
      label: t.stats.avgSession,
      color: "#c47a18",
      data: sliced.avgSessionSeconds,
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
