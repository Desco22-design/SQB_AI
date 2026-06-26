"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { Eye, Trash2, Send, Users } from "lucide-react";
import { useT, useLocale } from "@/components/admin/AdminI18n";
import { deleteSubmission } from "./actions";
import { BroadcastModal } from "./BroadcastModal";

type Row = {
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  direction: string | null;
  message: string;
  createdAt: Date;
  telegramChatId: string | null;
};

const LOCALE_TAG: Record<string, string> = {
  uz: "uz-UZ",
  ru: "ru-RU",
  en: "en-US",
};

const TYPE_LABEL: Record<string, Record<string, string>> = {
  partner: { uz: "Hamkor", ru: "Партнёр", en: "Partner" },
  intern: { uz: "Stajyor", ru: "Стажёр", en: "Intern" },
};

const BROADCAST_TX = {
  uz: {
    selected: (n: number) => `${n} ta tanlandi`,
    sendSelected: "Tanlanganlarga xabar",
    clear: "Bekor qilish",
    onlyLinked: "Faqat Telegramga ulanganlar",
    title: "Ommaviy xabar",
    to: (n: number) => `${n} ta foydalanuvchiga yuboriladi`,
    placeholder: "Tanlangan barcha foydalanuvchilarga yuboriladigan xabar…",
    send: "Yuborish",
    sending: "Yuborilmoqda…",
    cancel: "Bekor qilish",
    result: (s: number, f: number) =>
      `${s} ta yuborildi${f ? `, ${f} ta yuborilmadi` : ""}`,
  },
  ru: {
    selected: (n: number) => `Выбрано: ${n}`,
    sendSelected: "Написать выбранным",
    clear: "Сбросить",
    onlyLinked: "Только подключённые к Telegram",
    title: "Массовое сообщение",
    to: (n: number) => `Будет отправлено ${n} пользователям`,
    placeholder: "Сообщение для всех выбранных пользователей…",
    send: "Отправить",
    sending: "Отправка…",
    cancel: "Отмена",
    result: (s: number, f: number) =>
      `Отправлено: ${s}${f ? `, не доставлено: ${f}` : ""}`,
  },
  en: {
    selected: (n: number) => `${n} selected`,
    sendSelected: "Message selected",
    clear: "Clear",
    onlyLinked: "Telegram-linked only",
    title: "Broadcast message",
    to: (n: number) => `Will be sent to ${n} users`,
    placeholder: "Message to send to all selected users…",
    send: "Send",
    sending: "Sending…",
    cancel: "Cancel",
    result: (s: number, f: number) =>
      `Sent: ${s}${f ? `, failed: ${f}` : ""}`,
  },
} as const;

export function SubmissionsList({
  rows,
  unreadMap = {},
}: {
  rows: Row[];
  unreadMap?: Record<string, number>;
}) {
  const t = useT();
  const locale = useLocale();
  const [pending, start] = useTransition();
  const tag = LOCALE_TAG[locale] ?? "ru-RU";
  const tx = BROADCAST_TX[locale as keyof typeof BROADCAST_TX] ?? BROADCAST_TX.ru;

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [broadcastOpen, setBroadcastOpen] = useState(false);

  // Only Telegram-linked users can receive messages.
  const linkedIds = useMemo(
    () => rows.filter((r) => r.telegramChatId).map((r) => r.id),
    [rows]
  );
  const allLinkedSelected =
    linkedIds.length > 0 && linkedIds.every((id) => selected.has(id));

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected((prev) =>
      allLinkedSelected ? new Set() : new Set(linkedIds)
    );
  }

  function handleDelete(id: string) {
    if (!confirm(t.common.confirmDelete)) return;
    start(async () => {
      await deleteSubmission(id);
    });
  }

  const selectedIds = [...selected];

  return (
    <>
      {/* Selection toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 12,
          minHeight: 40,
        }}
      >
        <span
          style={{
            fontSize: 13,
            color: "var(--text-muted)",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Users size={15} />
          {selected.size > 0 ? tx.selected(selected.size) : tx.onlyLinked}
        </span>
        {selected.size > 0 && (
          <>
            <button
              type="button"
              onClick={() => setBroadcastOpen(true)}
              className="ad-btn ad-btn-primary ad-btn-sm"
              style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <Send size={14} />
              {tx.sendSelected}
            </button>
            <button
              type="button"
              onClick={() => setSelected(new Set())}
              className="ad-btn ad-btn-secondary ad-btn-sm"
            >
              {tx.clear}
            </button>
          </>
        )}
      </div>

      <div className="ad-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="ad-table">
            <thead>
              <tr>
                <th style={{ width: 44, textAlign: "center" }}>
                  <input
                    type="checkbox"
                    checked={allLinkedSelected}
                    onChange={toggleAll}
                    disabled={linkedIds.length === 0}
                    aria-label="Select all"
                    style={{ cursor: "pointer", width: 16, height: 16 }}
                  />
                </th>
                <th style={{ width: 160 }}>{t.page.submissions.received}</th>
                <th style={{ width: 220 }}>{t.page.submissions.from}</th>
                <th>{t.form.body}</th>
                <th style={{ width: 70, textAlign: "center" }}>Telegram</th>
                <th
                  style={{ width: 100, textAlign: "right", paddingRight: 20 }}
                >
                  {t.common.actions}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    style={{
                      padding: "3rem 1rem",
                      textAlign: "center",
                      color: "var(--text-subtle)",
                    }}
                  >
                    {t.page.submissions.noMessage}
                  </td>
                </tr>
              )}
              {rows.map((row) => {
                const linked = !!row.telegramChatId;
                const isChecked = selected.has(row.id);
                return (
                  <tr
                    key={row.id}
                    style={
                      isChecked
                        ? { background: "var(--primary-soft)" }
                        : undefined
                    }
                  >
                    <td style={{ textAlign: "center" }}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleOne(row.id)}
                        disabled={!linked}
                        title={linked ? undefined : tx.onlyLinked}
                        aria-label={`Select ${row.name}`}
                        style={{
                          cursor: linked ? "pointer" : "not-allowed",
                          width: 16,
                          height: 16,
                          opacity: linked ? 1 : 0.4,
                        }}
                      />
                    </td>
                    <td
                      style={{
                        color: "var(--text-muted)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {new Date(row.createdAt).toLocaleString(tag, {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          fontWeight: 600,
                          color: "var(--text)",
                        }}
                      >
                        {row.name}
                        <span
                          className={`ad-pill ${
                            row.type === "intern"
                              ? "ad-pill-info"
                              : "ad-pill-success"
                          }`}
                        >
                          {(TYPE_LABEL[row.type] ?? TYPE_LABEL.partner)[
                            locale
                          ] ?? row.type}
                        </span>
                        {unreadMap[row.id] > 0 && (
                          <span
                            title={`${unreadMap[row.id]} yangi xabar`}
                            style={{
                              minWidth: 18,
                              height: 18,
                              padding: "0 5px",
                              borderRadius: 999,
                              background: "var(--danger)",
                              color: "#fff",
                              fontSize: 10,
                              fontWeight: 700,
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              lineHeight: 1,
                            }}
                          >
                            {unreadMap[row.id] > 99
                              ? "99+"
                              : unreadMap[row.id]}
                          </span>
                        )}
                      </div>
                      <div
                        style={{ color: "var(--text-muted)", fontSize: 12 }}
                      >
                        {row.email}
                      </div>
                    </td>
                    <td>
                      <span
                        style={{
                          color: "var(--text)",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {row.message}
                      </span>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {linked ? (
                        <span
                          title={`Chat ID: ${row.telegramChatId}`}
                          style={{ fontSize: 16 }}
                        >
                          ✈️
                        </span>
                      ) : (
                        <span
                          style={{
                            color: "var(--text-subtle)",
                            fontSize: 12,
                          }}
                        >
                          —
                        </span>
                      )}
                    </td>
                    <td
                      className="whitespace-nowrap"
                      style={{ textAlign: "right" }}
                    >
                      <div className="inline-flex items-center gap-1">
                        <Link
                          href={`/admin/submissions/${row.id}`}
                          className="ad-icon-btn"
                          title={t.page.submissions.detailTitle}
                          aria-label={t.page.submissions.detailTitle}
                        >
                          <Eye size={16} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(row.id)}
                          disabled={pending}
                          className="ad-icon-btn"
                          title={t.common.delete}
                          aria-label={t.common.delete}
                          style={{ color: "var(--danger)" }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <BroadcastModal
        open={broadcastOpen}
        onClose={() => setBroadcastOpen(false)}
        ids={selectedIds}
        tx={tx}
      />
    </>
  );
}
