"use client";

import { useEffect, useRef } from "react";

export type ChatItem = {
  id: string;
  dir: "in" | "out";
  text: string;
  time: string;
  dateLabel: string;
};

export function ChatThread({
  items,
  userName,
}: {
  items: ChatItem[];
  userName: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep the latest message in view, like a real messenger.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [items.length]);

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
        background:
          "linear-gradient(180deg, #f4f7fb 0%, #eef3f9 100%)",
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
        const showDate = !prev || prev.dateLabel !== m.dateLabel;
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
                  {m.dateLabel}
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
              {/* Avatar (incoming only, shown on the last bubble of a group) */}
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
                    {m.time}
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
