"use client";

import { useState } from "react";

export type FormatKind = "short" | "int" | "duration";

export type ChartSeries = {
  key: string;
  label: string;
  color: string;
  data: number[];
  format: FormatKind;
};

function shortNumber(v: number): string {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(v >= 10_000 ? 0 : 1)}K`;
  return Math.round(v).toString();
}

function formatDuration(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.round(totalSeconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function fmt(v: number, kind: FormatKind): string {
  switch (kind) {
    case "short":
      return shortNumber(v);
    case "duration":
      return formatDuration(v);
    case "int":
    default:
      return Math.round(v).toLocaleString("ru-RU");
  }
}

export function StatsChart({
  series,
  months,
  year,
  title,
  subtitle,
}: {
  series: ChartSeries[];
  months: string[];
  year: number;
  title: string;
  subtitle: string;
}) {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const s = series[active];

  const W = 1200;
  const H = 360;
  const PAD_L = 56;
  const PAD_R = 24;
  const PAD_T = 24;
  const PAD_B = 56;
  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;

  const rawMax = Math.max(...s.data, 0);
  const max = rawMax > 0 ? rawMax * 1.12 : 1;
  const min = 0;

  const xAt = (i: number) =>
    s.data.length <= 1
      ? PAD_L + innerW / 2
      : PAD_L + (i / (s.data.length - 1)) * innerW;
  const yAt = (v: number) =>
    PAD_T + innerH - ((v - min) / (max - min)) * innerH;

  const points = s.data.map((v, i) => [xAt(i), yAt(v)] as const);

  const linePath = points
    .map(([x, y], i) => {
      if (i === 0) return `M ${x} ${y}`;
      const [px, py] = points[i - 1];
      const cx1 = (px + x) / 2;
      const cx2 = (px + x) / 2;
      return `C ${cx1} ${py} ${cx2} ${y} ${x} ${y}`;
    })
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1][0]} ${PAD_T + innerH} L ${points[0][0]} ${PAD_T + innerH} Z`;

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((p) => {
    const value = min + (max - min) * (1 - p);
    const y = PAD_T + p * innerH;
    return { value, y };
  });

  const gradientId = `chart-grad-${s.key}`;

  return (
    <div className="ad-card" style={{ padding: 24 }}>
      <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
        <div>
          <h2
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontSize: 18,
              fontWeight: 700,
              color: "var(--text)",
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </h2>
          <p
            className="mt-1"
            style={{ color: "var(--text-muted)", fontSize: 13 }}
          >
            {subtitle}
          </p>
        </div>

        <div
          className="inline-flex flex-wrap p-1 rounded-lg"
          style={{
            background: "var(--bg)",
            border: "1px solid var(--border)",
            gap: 2,
          }}
        >
          {series.map((sx, i) => {
            const isActive = i === active;
            return (
              <button
                key={sx.key}
                type="button"
                onClick={() => setActive(i)}
                style={{
                  padding: "6px 12px",
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  borderRadius: 6,
                  border: "none",
                  background: isActive ? "#fff" : "transparent",
                  color: isActive ? sx.color : "var(--text-muted)",
                  boxShadow: isActive
                    ? "0 1px 2px rgba(31,45,61,0.06)"
                    : "none",
                  cursor: "pointer",
                  transition: "all 0.12s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: sx.color,
                  }}
                />
                {sx.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          style={{ display: "block", height: "auto" }}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity="0.28" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {ticks.map((t, i) => (
            <line
              key={i}
              x1={PAD_L}
              x2={W - PAD_R}
              y1={t.y}
              y2={t.y}
              stroke="var(--border)"
              strokeDasharray={i === ticks.length - 1 ? "0" : "4 4"}
              strokeWidth="1"
            />
          ))}

          {ticks.map((t, i) => (
            <text
              key={i}
              x={PAD_L - 10}
              y={t.y + 4}
              textAnchor="end"
              fontSize="11"
              fill="var(--text-subtle)"
              fontFamily="var(--font-inter), Inter, sans-serif"
            >
              {fmt(t.value, s.format)}
            </text>
          ))}

          {months.map((m, i) => (
            <g key={i}>
              <text
                x={xAt(i)}
                y={H - 28}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="var(--text-muted)"
                fontFamily="var(--font-inter), Inter, sans-serif"
              >
                {m}
              </text>
              <text
                x={xAt(i)}
                y={H - 12}
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-subtle)"
                fontFamily="var(--font-inter), Inter, sans-serif"
              >
                {year}
              </text>
            </g>
          ))}

          <path d={areaPath} fill={`url(#${gradientId})`} />

          <path
            d={linePath}
            fill="none"
            stroke={s.color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map(([x, y], i) => (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r="4"
                fill="#fff"
                stroke={s.color}
                strokeWidth="2"
              />
              <rect
                x={xAt(i) - innerW / s.data.length / 2}
                y={PAD_T}
                width={innerW / s.data.length}
                height={innerH}
                fill="transparent"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: "pointer" }}
              />
              {hover === i && (
                <line
                  x1={x}
                  x2={x}
                  y1={PAD_T}
                  y2={PAD_T + innerH}
                  stroke={s.color}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity="0.5"
                />
              )}
            </g>
          ))}
        </svg>

        {hover !== null && (
          <div
            className="absolute pointer-events-none rounded-lg px-3 py-2"
            style={{
              left: `calc(${(xAt(hover) / W) * 100}% - 50px)`,
              top: 4,
              background: "var(--text)",
              color: "#fff",
              fontSize: 12,
              fontFamily: "var(--font-inter), Inter, sans-serif",
              boxShadow: "var(--shadow-lift)",
              minWidth: 100,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 10,
                opacity: 0.7,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {months[hover]} {year}
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
                marginTop: 2,
              }}
            >
              {fmt(s.data[hover], s.format)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
