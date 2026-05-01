"use client";

import { useState } from "react";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/admin-i18n";
import { useT } from "./AdminI18n";

type Props = {
  name: string;
  label: string;
  defaultValue?: unknown;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
};

function normalize(v: unknown): Record<Locale, string> {
  if (v && typeof v === "object") {
    const obj = v as Record<string, unknown>;
    const get = (k: string) =>
      typeof obj[k] === "string" ? (obj[k] as string) : "";
    return { uz: get("uz"), ru: get("ru"), en: get("en") };
  }
  if (typeof v === "string") {
    return { uz: v, ru: v, en: v };
  }
  return { uz: "", ru: "", en: "" };
}

export function MultiLangField({
  name,
  label,
  defaultValue,
  required,
  multiline,
  rows = 4,
  placeholder,
}: Props) {
  const t = useT();
  const initial = normalize(defaultValue);
  const [values, setValues] = useState<Record<Locale, string>>(initial);
  const [active, setActive] = useState<Locale>("ru");

  const update = (loc: Locale, val: string) =>
    setValues((prev) => ({ ...prev, [loc]: val }));

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <label className="ad-label" style={{ marginBottom: 0 }}>
          {label}
          {required && <span style={{ color: "var(--danger)" }}> *</span>}
        </label>
        <div
          className="inline-flex p-0.5 rounded-lg"
          style={{
            background: "var(--bg)",
            border: "1px solid var(--border)",
          }}
        >
          {LOCALES.map((loc) => {
            const isActive = loc === active;
            const filled = (values[loc] ?? "").trim().length > 0;
            return (
              <button
                key={loc}
                type="button"
                onClick={() => setActive(loc)}
                style={{
                  padding: "3px 9px",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  letterSpacing: "0.05em",
                  background: isActive ? "#fff" : "transparent",
                  color: isActive
                    ? "var(--primary-deep)"
                    : filled
                      ? "var(--text-muted)"
                      : "var(--text-subtle)",
                  border: "1px solid",
                  borderColor: isActive ? "var(--border)" : "transparent",
                  boxShadow: isActive ? "0 1px 2px rgba(0,0,0,0.04)" : "none",
                  cursor: "pointer",
                  transition: "all 0.12s ease",
                }}
              >
                {LOCALE_LABELS[loc]}
                {filled && !isActive && (
                  <span
                    style={{
                      display: "inline-block",
                      marginLeft: 4,
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "var(--primary)",
                      verticalAlign: "middle",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hidden inputs for all 3 langs so server gets all */}
      {LOCALES.map((loc) => (
        <input
          key={loc}
          type="hidden"
          name={`${name}__${loc}`}
          value={values[loc]}
        />
      ))}

      {multiline ? (
        <textarea
          value={values[active]}
          onChange={(e) => update(active, e.target.value)}
          required={required && active === "ru"}
          rows={rows}
          placeholder={placeholder}
          className="ad-input"
          style={{ resize: "vertical" }}
        />
      ) : (
        <input
          type="text"
          value={values[active]}
          onChange={(e) => update(active, e.target.value)}
          required={required && active === "ru"}
          placeholder={placeholder}
          className="ad-input"
        />
      )}

      <div
        style={{
          marginTop: 4,
          fontSize: 11,
          color: "var(--text-subtle)",
        }}
      >
        {/* Hint reuses common.required - just for clarity */}
        {required && !values.ru.trim() && active === "ru" ? (
          <span style={{ color: "var(--danger)" }}>RU {t.common.required}</span>
        ) : null}
      </div>
    </div>
  );
}

