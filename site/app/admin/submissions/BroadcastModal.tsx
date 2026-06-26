"use client";

import { useEffect, useState, useTransition } from "react";
import { Send, X, CheckCircle, AlertCircle, Users } from "lucide-react";
import { broadcastTelegram } from "./actions";

type Tx = {
  title: string;
  to: (n: number) => string;
  placeholder: string;
  send: string;
  sending: string;
  cancel: string;
  result: (sent: number, failed: number) => string;
};

export function BroadcastModal({
  open,
  onClose,
  ids,
  tx,
}: {
  open: boolean;
  onClose: () => void;
  ids: string[];
  tx: Tx;
}) {
  const [text, setText] = useState("");
  const [result, setResult] = useState<
    { ok: boolean; sent: number; failed: number; error?: string } | null
  >(null);
  const [isPending, startTransition] = useTransition();

  // Reset content whenever the modal is opened.
  useEffect(() => {
    if (open) {
      setText("");
      setResult(null);
    }
  }, [open]);

  if (!open) return null;

  const send = () => {
    if (isPending || !text.trim()) return;
    setResult(null);
    startTransition(async () => {
      const res = await broadcastTelegram(ids, text);
      setResult(res);
      if (res.ok && res.failed === 0) setText("");
    });
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(15,23,42,0.45)",
        backdropFilter: "blur(2px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="ad-card"
        style={{
          width: "100%",
          maxWidth: 520,
          padding: 24,
          boxShadow: "var(--shadow-lift)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 4,
          }}
        >
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: "var(--primary-soft)",
              color: "var(--primary)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Users size={17} />
          </span>
          <div style={{ flex: 1 }}>
            <div
              style={{ fontWeight: 700, fontSize: 16, color: "var(--text)" }}
            >
              {tx.title}
            </div>
            <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
              {tx.to(ids.length)}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ad-icon-btn"
            aria-label={tx.cancel}
          >
            <X size={18} />
          </button>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={tx.placeholder}
          rows={5}
          autoFocus
          style={{
            width: "100%",
            marginTop: 14,
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid var(--border)",
            background: "#fff",
            color: "var(--text)",
            fontSize: 14,
            lineHeight: 1.5,
            resize: "vertical",
            fontFamily: "inherit",
            boxSizing: "border-box",
            outline: "none",
          }}
        />

        {result && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 10,
              fontSize: 13,
              color: result.ok && result.failed === 0
                ? "#1f7a48"
                : result.ok
                  ? "var(--warn)"
                  : "var(--danger)",
            }}
          >
            {result.ok ? <CheckCircle size={15} /> : <AlertCircle size={15} />}
            {result.error
              ? result.error
              : tx.result(result.sent, result.failed)}
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            marginTop: 18,
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="ad-btn ad-btn-secondary"
          >
            {tx.cancel}
          </button>
          <button
            type="button"
            onClick={send}
            disabled={isPending || !text.trim()}
            className="ad-btn ad-btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <Send size={15} />
            {isPending ? tx.sending : tx.send}
          </button>
        </div>
      </div>
    </div>
  );
}
