"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Users, BookOpen } from "lucide-react";

export type Applicant = {
  id: string;
  name: string;
  email: string;
  /** Rows created before the phone field existed have none. */
  phone: string | null;
  school: string;
  grade: string;
  telegramLabel: string | null;
  unread: number;
  /**
   * How many lessons this pupil signed up for in total (matched by email).
   * > 1 means they are coming to several lessons - flagged in the row so it is
   * visible without opening anyone.
   */
  totalLessons: number;
};

export type LessonGroup = {
  topicId: string;
  index: number;
  title: string;
  date: string;
  taken: number;
  capacity: number;
  applicants: Applicant[];
};

export type Labels = {
  full: string;
  empty: string;
  linked: string;
  notLinked: string;
  phone: string;
  school: string;
  grade: string;
  lessonsShort: string;
};

export function LessonGroups({
  groups,
  labels,
}: {
  groups: LessonGroup[];
  labels: Labels;
}) {
  // Lessons that already have signups start open - that is what the admin came
  // to look at; empty ones stay collapsed so the list is scannable.
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setOpen((o) => ({ ...o, [id]: !o[id] }));

  return (
    <div style={{ display: "grid", gap: 10 }}>
      {groups.map((g) => {
        const isOpen = open[g.topicId] ?? false;
        const isFull = g.taken >= g.capacity;
        const pct = (g.taken / g.capacity) * 100;

        return (
          <div key={g.topicId} className="ad-card" style={{ padding: 0 }}>
            <button
              type="button"
              onClick={() => toggle(g.topicId)}
              aria-expanded={isOpen}
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                gap: 14,
                padding: "16px 20px",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 700,
                  background: isFull ? "#fee2e2" : "#e0e7ff",
                  color: isFull ? "#dc2626" : "#4338ca",
                }}
              >
                {g.index}
              </span>

              <span style={{ minWidth: 0, flex: 1 }}>
                <span
                  style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#0f172a",
                  }}
                >
                  {g.title}
                </span>
                <span style={{ display: "block", fontSize: 12, color: "#94a3b8" }}>
                  {g.date}
                </span>
              </span>

              <span
                style={{
                  flexShrink: 0,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  color: isFull ? "#dc2626" : "#475569",
                }}
              >
                <Users size={14} />
                {isFull ? labels.full : `${g.taken} / ${g.capacity}`}
              </span>

              <ChevronDown
                size={17}
                style={{
                  flexShrink: 0,
                  color: "#94a3b8",
                  transition: "transform 180ms",
                  transform: isOpen ? "rotate(180deg)" : "none",
                }}
              />
            </button>

            {/* Fill bar sits under the header so it reads even while collapsed. */}
            <div style={{ padding: "0 20px 14px" }}>
              <div
                style={{
                  height: 5,
                  borderRadius: 999,
                  background: "#e2e8f0",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${pct}%`,
                    height: "100%",
                    borderRadius: 999,
                    background: isFull ? "#dc2626" : "#3b82f6",
                  }}
                />
              </div>
            </div>

            {isOpen && (
              <div style={{ borderTop: "1px solid #e2e8f0" }}>
                {g.applicants.length === 0 ? (
                  <p
                    className="ad-page-sub"
                    style={{ margin: 0, padding: "18px 20px" }}
                  >
                    {labels.empty}
                  </p>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table className="ad-table">
                      <thead>
                        <tr>
                          <th>ФИО</th>
                          <th>{labels.phone}</th>
                          <th>Email</th>
                          <th>{labels.school}</th>
                          <th>{labels.grade}</th>
                          <th>Telegram</th>
                        </tr>
                      </thead>
                      <tbody>
                        {g.applicants.map((a) => (
                          <tr key={a.id}>
                            <td style={{ whiteSpace: "nowrap", fontWeight: 600 }}>
                              <Link
                                href={`/admin/school/${a.id}`}
                                className="ad-link"
                              >
                                {a.name}
                              </Link>
                              {a.unread > 0 && (
                                <span
                                  className="ad-pill ad-pill-danger"
                                  style={{ marginLeft: 8 }}
                                >
                                  {a.unread}
                                </span>
                              )}
                              {a.totalLessons > 1 && (
                                <span
                                  className="ad-pill ad-pill-info"
                                  style={{ marginLeft: 8 }}
                                  title={`${a.totalLessons} ${labels.lessonsShort}`}
                                >
                                  <BookOpen
                                    size={11}
                                    style={{ verticalAlign: "-1px" }}
                                  />{" "}
                                  {a.totalLessons}
                                </span>
                              )}
                            </td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              {a.phone ? (
                                <a href={`tel:${a.phone}`} className="ad-link">
                                  {a.phone}
                                </a>
                              ) : (
                                <span style={{ color: "#94a3b8" }}>-</span>
                              )}
                            </td>
                            <td style={{ whiteSpace: "nowrap" }}>{a.email}</td>
                            <td style={{ whiteSpace: "nowrap" }}>{a.school}</td>
                            <td style={{ whiteSpace: "nowrap" }}>{a.grade}</td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              {a.telegramLabel ? (
                                <span className="ad-pill ad-pill-success">
                                  {a.telegramLabel}
                                </span>
                              ) : (
                                <span className="ad-pill">
                                  {labels.notLinked}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
