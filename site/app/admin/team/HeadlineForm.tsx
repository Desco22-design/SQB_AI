"use client";

import { useState, useTransition } from "react";
import { Check } from "lucide-react";
import { useT } from "@/components/admin/AdminI18n";
import { updateTeamHeadlineValue } from "./actions";

export function HeadlineForm({ initial }: { initial: string }) {
  const t = useT();
  const [value, setValue] = useState(initial);
  const [pending, start] = useTransition();
  const [savedAt, setSavedAt] = useState<number | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData();
    fd.set("headlineValue", value);
    start(async () => {
      await updateTeamHeadlineValue(fd);
      setSavedAt(Date.now());
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="ad-card mb-6"
      style={{ padding: 22 }}
    >
      <div
        style={{
          color: "var(--text)",
          fontWeight: 600,
          fontSize: 14,
          fontFamily: "var(--font-inter), Inter, sans-serif",
          marginBottom: 4,
        }}
      >
        {t.page.team.headlineLabel}
      </div>
      <div
        style={{
          color: "var(--text-muted)",
          fontSize: 12,
          marginBottom: 12,
        }}
      >
        {t.page.team.headlineHint}
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <input
          type="text"
          name="headlineValue"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="20+"
          className="ad-input"
          style={{ maxWidth: 180 }}
        />
        <button
          type="submit"
          className="ad-btn ad-btn-primary"
          disabled={pending}
        >
          <Check size={16} />
          {pending ? t.common.saving : t.common.save}
        </button>
        {savedAt && !pending && (
          <span
            style={{ color: "var(--text-muted)", fontSize: 12 }}
            key={savedAt}
          >
            ✓
          </span>
        )}
      </div>
    </form>
  );
}
