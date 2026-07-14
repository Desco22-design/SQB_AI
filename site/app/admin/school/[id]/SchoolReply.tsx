"use client";

import { useState, useTransition } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { sendSchoolReply } from "../actions";

export function SchoolReply({ applicationId }: { applicationId: string }) {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{ ok: boolean; error?: string } | null>(
    null
  );
  const [isPending, startTransition] = useTransition();

  const doSubmit = () => {
    if (isPending || !text.trim()) return;
    setResult(null);
    startTransition(async () => {
      const res = await sendSchoolReply(applicationId, text);
      setResult(res);
      if (res.ok) setText("");
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doSubmit();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter sends, Shift+Enter makes a newline - like a real messenger.
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      doSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="ad-input"
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Xabar matni... (Enter - yuborish, Shift+Enter - yangi qator)"
        style={{ resize: "vertical" }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginTop: 12,
        }}
      >
        {result ? (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              color: result.ok ? "#16a34a" : "#dc2626",
            }}
          >
            {result.ok ? <CheckCircle size={15} /> : <AlertCircle size={15} />}
            {result.ok ? "Yuborildi" : result.error}
          </span>
        ) : (
          <span />
        )}

        <button
          type="submit"
          className="ad-btn ad-btn-primary"
          disabled={isPending || !text.trim()}
        >
          <Send size={15} />
          {isPending ? "Yuborilmoqda..." : "Yuborish"}
        </button>
      </div>
    </form>
  );
}
