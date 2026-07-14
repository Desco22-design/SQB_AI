"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type RawMsg = {
  id: string;
  direction: string;
  text: string;
  createdAt: string;
};

const LOCALE_TAG: Record<string, string> = {
  uz: "uz-UZ",
  ru: "ru-RU",
  en: "en-US",
};

const DAY_LABELS: Record<string, [string, string]> = {
  uz: ["Bugun", "Kecha"],
  ru: ["Сегодня", "Вчера"],
  en: ["Today", "Yesterday"],
};

const POLL_MS = 4000;

export function ChatThread({
  submissionId,
  userName,
  locale,
  initialFormMessage,
  initialMessages,
}: {
  submissionId: string;
  userName: string;
  locale: string;
  initialFormMessage: { text: string; createdAt: string };
  initialMessages: RawMsg[];
}) {
  const [messages, setMessages] = useState<RawMsg[]>(initialMessages);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastCountRef = useRef(initialMessages.length);

  const tag = LOCALE_TAG[locale] ?? "ru-RU";
  const [todayLabel, yesterdayLabel] = DAY_LABELS[locale] ?? DAY_LABELS.ru;

  const startOfDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

  const dateLabelOf = (iso: string) => {
    const d = new Date(iso);
    const diff = startOfDay(new Date()) - startOfDay(d);
    if (diff === 0) return todayLabel;
    if (diff === 86_400_000) return yesterdayLabel;
    return d.toLocaleDateString(tag, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const timeOf = (iso: string) =>
    new Date(iso).toLocaleTimeString(tag, {
      hour: "2-digit",
      minute: "2-digit",
    });

  // Poll the API for new messages while the chat is open and the tab is visible.
  const poll = useCallback(async () => {
    if (typeof document !== "undefined" && document.hidden) return;
    try {
      const res = await fetch(
        `/api/admin/submissions/${submissionId}/messages`,
        { cache: "no-store" }
      );
      if (!res.ok) return;
      const data = (await res.json()) as { ok: boolean; messages: RawMsg[] };
      if (data.ok) setMessages(data.messages);
    } catch {
      /* network hiccup - try again next tick */
    }
  }, [submissionId]);

  useEffect(() => {
    const id = setInterval(poll, POLL_MS);
    const onVisible = () => {
      if (!document.hidden) poll();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [poll]);

  // Build the thread: the form message first, then the conversation.
  const items = [
    {
      id: "initial",
      dir: "in" as const,
      text: initialFormMessage.text,
      createdAt: initialFormMessage.createdAt,
    },
    ...messages.map((m) => ({
      id: m.id,
      dir: m.direction === "out" ? ("out" as const) : ("in" as const),
      text: m.text,
      createdAt: m.createdAt,
    })),
  ];

  // Auto-scroll to the latest message when the count grows (or on first paint).
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (messages.length >= lastCountRef.current) {
      el.scrollTop = el.scrollHeight;
    }
    lastCountRef.current = messages.length;
  }, [messages.length]);

  const initials =
    userName
      .split(" ")
      .map((p) => p[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  return (
    <div
      ref={scrollRef}
      style={{
        marginTop: 16,
        marginBottom: 12,
        maxHeight: 440,
        overflowY: "auto",
        borderRadius: 16,
        border: "1px solid var(--border)",
        background: "linear-gradient(180deg, #f4f7fb 0%, #eef3f9 100%)",
        padding: "16px 14px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
      className="ad-scrollbar"
    >
      {items.map((m, i) => {
        const isOut = m.dir === "out";
        const prev = items[i - 1];
        const next = items[i + 1];
        const dateLabel = dateLabelOf(m.createdAt);
        const showDate = !prev || dateLabelOf(prev.createdAt) !== dateLabel;
        const firstOfGroup = !prev || prev.dir !== m.dir || showDate;
        const lastOfGroup = !next || next.dir !== m.dir;

        return (
          <div key={m.id}>
            {showDate && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px 0 14px",
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--text-muted)",
                    background: "rgba(255,255,255,0.85)",
                    border: "1px solid var(--border)",
                    borderRadius: 999,
                    padding: "3px 12px",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  {dateLabel}
                </span>
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: isOut ? "flex-end" : "flex-start",
                alignItems: "flex-end",
                gap: 8,
                marginTop: firstOfGroup ? 8 : 2,
              }}
            >
              {!isOut && (
                <div
                  style={{
                    width: 28,
                    height: 28,
                    flexShrink: 0,
                    borderRadius: "50%",
                    background: lastOfGroup
                      ? "var(--primary-grad)"
                      : "transparent",
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                  }}
                >
                  {lastOfGroup ? initials : ""}
                </div>
              )}

              <div
                style={{
                  maxWidth: "76%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isOut ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    padding: "8px 12px 6px",
                    borderRadius: 16,
                    borderTopRightRadius: isOut && !firstOfGroup ? 6 : 16,
                    borderBottomRightRadius: isOut ? 6 : 16,
                    borderTopLeftRadius: !isOut && !firstOfGroup ? 6 : 16,
                    borderBottomLeftRadius: !isOut ? 6 : 16,
                    fontSize: 14,
                    lineHeight: 1.5,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    background: isOut ? "var(--primary-grad)" : "#fff",
                    color: isOut ? "#fff" : "var(--text)",
                    border: isOut ? "none" : "1px solid var(--border)",
                    boxShadow: isOut
                      ? "0 2px 8px rgba(31,78,142,0.22)"
                      : "var(--shadow-sm)",
                  }}
                >
                  {m.text}
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: 10,
                      marginLeft: 8,
                      verticalAlign: "bottom",
                      color: isOut
                        ? "rgba(255,255,255,0.75)"
                        : "var(--text-subtle)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {timeOf(m.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
