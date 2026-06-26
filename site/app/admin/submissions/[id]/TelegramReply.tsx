"use client";

import { useState, useTransition } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { sendTelegramReply } from "../actions";

export function TelegramReply({ submissionId }: { submissionId: string }) {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{ ok: boolean; error?: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    startTransition(async () => {
      const res = await sendTelegramReply(submissionId, text);
      setResult(res);
      if (res.ok) setText("");
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
      <label
        style={{
          display: "block",
          fontSize: 12,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          color: "var(--text-muted)",
          marginBottom: 8,
        }}
      >
        Telegram orqali javob yozish
      </label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Foydalanuvchiga xabar..."
        rows={3}
        style={{
          width: "100%",
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid var(--border)",
          background: "var(--surface)",
          color: "var(--text)",
          fontSize: 14,
          resize: "vertical",
          fontFamily: "inherit",
          boxSizing: "border-box",
        }}
      />

      {result && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginTop: 8,
            fontSize: 13,
            color: result.ok ? "var(--success, #22c55e)" : "var(--danger)",
          }}
        >
          {result.ok ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
          {result.ok ? "Xabar muvaffaqiyatli yuborildi ✓" : result.error}
        </div>
      )}

      <div style={{ marginTop: 10 }}>
        <button
          type="submit"
          disabled={isPending || !text.trim()}
          className="ad-btn ad-btn-primary"
          style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
        >
          <Send size={14} />
          {isPending ? "Yuborilmoqda..." : "Yuborish"}
        </button>
      </div>
    </form>
  );
}
