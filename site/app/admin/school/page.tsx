import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { requireAdmin } from "@/lib/require-admin";
import {
  LESSON_CAPACITY,
  SCHOOL_TOPICS,
  formatLessonDate,
  type Lang,
} from "@/lib/school-program";
import { LessonGroups, type LessonGroup } from "./LessonGroups";

// Seat counts and unread badges must be current, not a minute old.
export const dynamic = "force-dynamic";

export default async function SchoolApplicationsPage() {
  await requireAdmin();
  const locale = getServerLocale();
  const t = getStrings(locale);
  const s = t.page.schoolApps;
  const lang = locale as Lang;

  const [rows, unreadGroups] = await Promise.all([
    prisma.schoolApplication.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.schoolMessage.groupBy({
      by: ["applicationId"],
      where: { direction: "in", read: false },
      _count: { _all: true },
    }),
  ]);

  const unread: Record<string, number> = {};
  for (const g of unreadGroups) unread[g.applicationId] = g._count._all;

  // The same pupil can sign up for several lessons - each signup is its own row.
  // Email is what identifies them across those rows (they may not have linked
  // Telegram yet, so chat id cannot be the key).
  const lessonsByPupil: Record<string, number> = {};
  for (const r of rows) {
    const key = r.email.trim().toLowerCase();
    lessonsByPupil[key] = (lessonsByPupil[key] ?? 0) + 1;
  }

  // Group the applications under the lesson they signed up for. A row whose
  // topic was later removed from the schedule simply has no group to land in -
  // it is still in the DB, it just isn't one of the lessons we run.
  const groups: LessonGroup[] = SCHOOL_TOPICS.map((topic, i) => {
    const applicants = rows
      .filter((r) => r.topicId === topic.id)
      .map((r) => ({
        id: r.id,
        name: r.name,
        email: r.email,
        phone: r.phone,
        school: r.school,
        grade: r.grade,
        telegramLabel: r.telegramChatId
          ? r.telegramUsername
            ? `@${r.telegramUsername}`
            : s.linked
          : null,
        unread: unread[r.id] ?? 0,
        totalLessons: lessonsByPupil[r.email.trim().toLowerCase()] ?? 1,
      }));

    return {
      topicId: topic.id,
      index: i + 1,
      title: topic.title[lang],
      date: formatLessonDate(topic.date, lang),
      taken: applicants.length,
      capacity: LESSON_CAPACITY,
      applicants,
    };
  });

  const total = groups.reduce((n, g) => n + g.taken, 0);

  return (
    <div>
      <PageHeader title={s.title} description={s.sub} />

      <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 600 }}>
        {s.statsTitle} · {s.applicants}: {total}
      </h3>

      <LessonGroups
        groups={groups}
        labels={{
          full: s.full,
          empty: s.empty,
          linked: s.linked,
          notLinked: s.notLinked,
          phone: s.phone,
          school: s.schoolName,
          grade: s.grade,
          lessonsShort: s.lessonsShort,
        }}
      />
    </div>
  );
}
