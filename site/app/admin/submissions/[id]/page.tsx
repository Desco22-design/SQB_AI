import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Phone, Building2, Compass, Trash2, Send } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getServerLocale, getStrings } from "@/lib/admin-i18n-server";
import { deleteSubmissionAndReturn } from "../actions";
import { TelegramReply } from "./TelegramReply";
import { ChatThread } from "./ChatThread";

const LOCALE_TAG: Record<string, string> = {
  uz: "uz-UZ",
  ru: "ru-RU",
  en: "en-US",
};

export default async function SubmissionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const locale = getServerLocale();
  const t = getStrings(locale);
  const row = await prisma.contactSubmission.findUnique({
    where: { id: params.id },
  });
  if (!row) notFound();

  // Load the conversation history and mark incoming messages as read.
  const messages = await prisma.contactMessage.findMany({
    where: { submissionId: row.id },
    orderBy: { createdAt: "asc" },
  });
  if (messages.some((m) => m.direction === "in" && !m.read)) {
    await prisma.contactMessage.updateMany({
      where: { submissionId: row.id, direction: "in", read: false },
      data: { read: true },
    });
  }

  const tag = LOCALE_TAG[locale] ?? "ru-RU";
  const deleteAction = deleteSubmissionAndReturn.bind(null, row.id);

  // Human date label for chat separators: Bugun / Kecha / full date.
  const now = new Date();
  const startOfDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const dayLabels: Record<string, string> = {
    uz: "Bugun|Kecha",
    ru: "Сегодня|Вчера",
    en: "Today|Yesterday",
  };
  const [todayLabel, yesterdayLabel] = (dayLabels[locale] ?? dayLabels.ru).split(
    "|"
  );
  const dateLabelOf = (d: Date) => {
    const diff = startOfDay(now) - startOfDay(d);
    const oneDay = 86_400_000;
    if (diff === 0) return todayLabel;
    if (diff === oneDay) return yesterdayLabel;
    return new Date(d).toLocaleDateString(tag, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };
  const timeOf = (d: Date) =>
    new Date(d).toLocaleTimeString(tag, { hour: "2-digit", minute: "2-digit" });

  // The form's initial message is the first bubble in the thread.
  const rawThread: { id: string; dir: "in" | "out"; text: string; at: Date }[] =
    [
      { id: "initial", dir: "in", text: row.message, at: row.createdAt },
      ...messages.map((m) => ({
        id: m.id,
        dir: m.direction === "out" ? ("out" as const) : ("in" as const),
        text: m.text,
        at: m.createdAt,
      })),
    ];
  const chatItems = rawThread.map((m) => ({
    id: m.id,
    dir: m.dir,
    text: m.text,
    time: timeOf(m.at),
    dateLabel: dateLabelOf(m.at),
  }));

  return (
    <div style={{ maxWidth: 760 }}>
      <Link
        href="/admin/submissions"
        className="ad-link-muted inline-flex items-center gap-1.5 mb-3"
      >
        <ArrowLeft size={16} />
        {t.common.back}
      </Link>
      <h1 className="ad-page-title mb-6">{t.page.submissions.detailTitle}</h1>

      <div className="ad-card" style={{ padding: 28 }}>
        <div
          className="flex items-start justify-between gap-4 flex-wrap mb-5 pb-5"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="min-w-0">
            <div
              style={{
                color: "var(--text-muted)",
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                fontWeight: 600,
              }}
            >
              {t.page.submissions.from}
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "var(--text)",
                marginTop: 4,
              }}
            >
              {row.name}
            </div>
            <div
              style={{
                color: "var(--text-muted)",
                fontSize: 13,
                marginTop: 6,
              }}
            >
              {t.page.submissions.received}:{" "}
              {new Date(row.createdAt).toLocaleString(tag, {
                year: "numeric",
                month: "long",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
          <form action={deleteAction}>
            <button
              type="submit"
              className="ad-btn ad-btn-secondary"
              style={{ color: "var(--danger)" }}
            >
              <Trash2 size={16} />
              {t.common.delete}
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <a
            href={`mailto:${row.email}`}
            className="ad-link-muted inline-flex items-center gap-2"
            style={{ fontSize: 14 }}
          >
            <Mail size={16} />
            {row.email}
          </a>
          <a
            href={`tel:${row.phone}`}
            className="ad-link-muted inline-flex items-center gap-2"
            style={{ fontSize: 14 }}
          >
            <Phone size={16} />
            {row.phone}
          </a>
          {row.company && (
            <div
              className="inline-flex items-center gap-2"
              style={{ color: "var(--text-muted)", fontSize: 14 }}
            >
              <Building2 size={16} />
              {row.company}
            </div>
          )}
          {row.direction && (
            <div
              className="inline-flex items-center gap-2"
              style={{ color: "var(--text-muted)", fontSize: 14 }}
            >
              <Compass size={16} />
              {row.direction}
            </div>
          )}
        </div>

        <div
          style={{
            whiteSpace: "pre-wrap",
            color: "var(--text)",
            fontSize: 15,
            lineHeight: 1.6,
          }}
        >
          {row.message}
        </div>
      </div>

      {/* Telegram section */}
      <div className="ad-card" style={{ padding: 28, marginTop: 20 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
          }}
        >
          <Send size={16} style={{ color: "var(--text-muted)" }} />
          <span
            style={{ fontWeight: 600, fontSize: 15, color: "var(--text)" }}
          >
            Telegram
          </span>
          {row.telegramChatId ? (
            <span
              className="ad-pill ad-pill-success"
              style={{ marginLeft: "auto" }}
            >
              ✓ Ulangan
            </span>
          ) : (
            <span
              className="ad-pill"
              style={{ marginLeft: "auto", opacity: 0.6 }}
            >
              Ulanmagan
            </span>
          )}
        </div>

        {row.telegramChatId ? (
          <>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px 24px",
                fontSize: 13,
                color: "var(--text-muted)",
                marginBottom: 4,
              }}
            >
              <span>Chat ID: {row.telegramChatId}</span>
              {row.telegramUsername && (
                <span>
                  @{row.telegramUsername}
                </span>
              )}
              {row.telegramLinkedAt && (
                <span>
                  Ulangan:{" "}
                  {new Date(row.telegramLinkedAt).toLocaleString(tag, {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>

            {/* Conversation thread */}
            <ChatThread items={chatItems} userName={row.name} />

            <TelegramReply submissionId={row.id} />
          </>
        ) : (
          <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>
            Foydalanuvchi hali Telegram botga ulanmagan. Forma yuborilgandan
            so&apos;ng bot ulanadi.
          </p>
        )}
      </div>
    </div>
  );
}
