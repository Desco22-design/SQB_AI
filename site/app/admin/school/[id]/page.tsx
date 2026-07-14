import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Send, BookOpen } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { requireAdmin } from "@/lib/require-admin";
import {
  LESSON_LOCATION,
  LESSON_TIME,
  formatLessonDate,
  getTopicById,
  type Lang,
} from "@/lib/school-program";
import { markSchoolMessagesRead, deleteSchoolApplicationAndReturn } from "../actions";
import { SchoolReply } from "./SchoolReply";

export const dynamic = "force-dynamic";

export default async function SchoolApplicationPage({
  params,
}: {
  params: { id: string };
}) {
  await requireAdmin();
  const locale = getServerLocale();
  const t = getStrings(locale);
  const s = t.page.schoolApps;

  const app = await prisma.schoolApplication.findUnique({
    where: { id: params.id },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });
  if (!app) notFound();

  // The same pupil signs up per lesson, so their other lessons are separate
  // rows. Email is the only identifier they always have (Telegram may not be
  // linked yet), so it is what ties the rows together.
  const siblings = await prisma.schoolApplication.findMany({
    where: {
      email: { equals: app.email.trim(), mode: "insensitive" },
    },
    orderBy: { createdAt: "asc" },
    select: { id: true, topicId: true },
  });

  // Opening the thread is what "reading" means here.
  await markSchoolMessagesRead(app.id);

  const lang = (app.lang ?? locale) as Lang;
  const topic = getTopicById(app.topicId);

  const rows: [string, string][] = [
    ["Email", app.email],
    [s.phone, app.phone ?? "-"],
    [s.schoolName, app.school],
    [s.grade, app.grade],
    [s.topic, topic ? topic.title[lang] : app.topicId],
    [s.lessonDate, topic ? formatLessonDate(topic.date, lang) : "-"],
    [s.whenWhere, `${LESSON_TIME} · ${LESSON_LOCATION[lang]}`],
    [
      s.telegram,
      app.telegramChatId
        ? app.telegramUsername
          ? `@${app.telegramUsername}`
          : s.linked
        : s.notLinked,
    ],
  ];

  return (
    <div>
      <PageHeader title={app.name} description={s.title} />

      <div style={{ marginBottom: 16 }}>
        <Link href="/admin/school" className="ad-link-muted">
          <ArrowLeft size={14} style={{ verticalAlign: "-2px" }} /> {s.title}
        </Link>
      </div>

      <div className="ad-card" style={{ padding: 24, marginBottom: 20 }}>
        <table className="ad-table">
          <tbody>
            {rows.map(([label, value]) => (
              <tr key={label}>
                <td style={{ width: 200, color: "#64748b" }}>{label}</td>
                <td style={{ fontWeight: 500 }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Every lesson this pupil is coming to - the point is spotting the ones
          who signed up for several, not just the lesson we opened from. */}
      <div className="ad-card" style={{ padding: 24, marginBottom: 20 }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 600 }}>
          <BookOpen size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} />
          {s.pupilLessons} ({siblings.length})
        </h3>

        {siblings.length === 1 ? (
          <p className="ad-page-sub" style={{ margin: 0 }}>
            {s.onlyThis}
          </p>
        ) : (
          <div style={{ display: "grid", gap: 8 }}>
            {siblings.map((sib) => {
              const st = getTopicById(sib.topicId);
              const isCurrent = sib.id === app.id;
              const label = st
                ? `${st.title[lang]} · ${formatLessonDate(st.date, lang)}`
                : sib.topicId;
              return isCurrent ? (
                <div
                  key={sib.id}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 10,
                    background: "#eef2ff",
                    border: "1px solid #c7d2fe",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#3730a3",
                  }}
                >
                  {label}
                </div>
              ) : (
                <Link
                  key={sib.id}
                  href={`/admin/school/${sib.id}`}
                  style={{
                    display: "block",
                    padding: "10px 14px",
                    borderRadius: 10,
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    fontSize: 13,
                    color: "#334155",
                    textDecoration: "none",
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Conversation */}
      <div className="ad-card" style={{ padding: 24, marginBottom: 20 }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 600 }}>
          <Send size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} />
          {s.chat}
        </h3>

        {app.messages.length === 0 ? (
          <p className="ad-page-sub" style={{ margin: 0 }}>
            {s.chatEmpty}
          </p>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {app.messages.map((m) => {
              const isOut = m.direction === "out";
              return (
                <div
                  key={m.id}
                  style={{
                    justifySelf: isOut ? "end" : "start",
                    maxWidth: "78%",
                    padding: "10px 14px",
                    borderRadius: 14,
                    background: isOut ? "#eef2ff" : "#f1f5f9",
                    border: `1px solid ${isOut ? "#c7d2fe" : "#e2e8f0"}`,
                  }}
                >
                  <p style={{ margin: 0, fontSize: 14, whiteSpace: "pre-wrap" }}>
                    {m.text}
                  </p>
                  <p
                    style={{
                      margin: "6px 0 0",
                      fontSize: 11,
                      color: "#94a3b8",
                      textAlign: isOut ? "right" : "left",
                    }}
                  >
                    {isOut ? s.fromAdmin : app.name} ·{" "}
                    {new Date(m.createdAt).toLocaleString("ru-RU", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ marginTop: 20 }}>
          {app.telegramChatId ? (
            <SchoolReply applicationId={app.id} />
          ) : (
            <p
              className="ad-page-sub"
              style={{ margin: 0, color: "#b45309" }}
            >
              {s.cannotReply}
            </p>
          )}
        </div>
      </div>

      <form action={deleteSchoolApplicationAndReturn.bind(null, app.id)}>
        <button type="submit" className="ad-btn ad-btn-danger">
          {s.delete}
        </button>
      </form>
    </div>
  );
}
