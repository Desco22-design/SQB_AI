"use client";

import { useState, useTransition } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { sendTelegramReply } from "../actions";

export function TelegramReply({ submissionId }: { submissionId: string }) {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{ ok: boolean; error?: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const doSubmit = () => {
    if (isPending || !text.trim()) return;
    setResult(null);
    startTransition(async () => {
      const res = await sendTelegramReply(submissionId, text);
      setResult(res);
      if (res.ok) setText("");
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doSubmit();
  };

  const onTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter sends, Shift+Enter makes a newline - like a real messenger.
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      doSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 4 }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 8,
          padding: 8,
          borderRadius: 16,
          border: "1px solid var(--border)",
          background: "#fff",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onTextareaKeyDown}
          placeholder="Xabar yozing…"
          rows={1}
          style={{
            flex: 1,
            maxHeight: 140,
            minHeight: 24,
            padding: "8px 10px",
            border: "none",
            background: "transparent",
            color: "var(--text)",
            fontSize: 14,
            lineHeight: 1.5,
            resize: "none",
            fontFamily: "inherit",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
        <button
          type="submit"
          disabled={isPending || !text.trim()}
          aria-label="Yuborish"
          title="Yuborish (Enter)"
          style={{
            flexShrink: 0,
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "none",
            cursor: isPending || !text.trim() ? "not-allowed" : "pointer",
            background:
              isPending || !text.trim()
                ? "var(--border-strong)"
                : "var(--primary-grad)",
            color: "#fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.15s ease, transform 0.15s ease",
            boxShadow:
              isPending || !text.trim()
                ? "none"
                : "0 2px 8px rgba(31,78,142,0.3)",
          }}
        >
          <Send size={16} />
        </button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          minHeight: 18,
          marginTop: 8,
          fontSize: 12.5,
          color: result
            ? result.ok
              ? "#1f7a48"
              : "var(--danger)"
            : "var(--text-subtle)",
        }}
      >
        {result ? (
          <>
            {result.ok ? (
              <CheckCircle size={14} />
            ) : (
              <AlertCircle size={14} />
            )}
            {result.ok ? "Yuborildi" : result.error}
          </>
        ) : isPending ? (
          "Yuborilmoqda…"
        ) : (
          "Enter - yuborish, Shift+Enter - yangi qator"
        )}
      </div>
    </form>
  );
}
