import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { requireAdmin } from "@/lib/require-admin";
import { getTopicById, formatLessonDate, type Lang } from "@/lib/school-program";

export default async function SchoolApplicationsPage() {
  await requireAdmin();
  const locale = getServerLocale();
  const t = getStrings(locale);
  const s = t.page.schoolApps;

  const rows = await prisma.schoolApplication.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <PageHeader title={s.title} description={s.sub} />

      {rows.length === 0 ? (
        <div className="ad-card" style={{ padding: 28 }}>
          <p className="ad-page-sub">{s.empty}</p>
        </div>
      ) : (
        <div className="ad-card overflow-x-auto">
          <table className="ad-table">
            <thead>
              <tr>
                <th>ФИО</th>
                <th>Email</th>
                <th>{t.page.schoolApps.grade}</th>
                <th>{s.topic}</th>
                <th>{s.lessonDate}</th>
                <th>{s.telegram}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                // The schedule is code-managed, so an old row can point at a
                // topic that no longer exists - show the raw id, never a blank.
                const topic = getTopicById(r.topicId);
                const lang = (r.lang ?? locale) as Lang;
                return (
                  <tr key={r.id}>
                    <td style={{ whiteSpace: "nowrap", fontWeight: 600 }}>
                      {r.name}
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>{r.email}</td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      {r.school} · {r.grade}
                    </td>
                    <td>{topic ? topic.title[lang] : r.topicId}</td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      {topic ? formatLessonDate(topic.date, lang) : "-"}
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      {r.telegramChatId ? (
                        <span className="ad-pill ad-pill-success">
                          {r.telegramUsername
                            ? `@${r.telegramUsername}`
                            : s.linked}
                        </span>
                      ) : (
                        <span className="ad-pill">{s.notLinked}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
