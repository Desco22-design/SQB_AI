"use client";

import { useState } from "react";
import { Plus, Minus, UploadCloud } from "lucide-react";
import { useT } from "./AdminI18n";

export function TextField({
  name,
  label,
  defaultValue,
  required,
  type = "text",
  placeholder,
}: {
  name: string;
  label: string;
  defaultValue?: string | number;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="mb-4">
      <label className="ad-label">
        {label}
        {required && <span style={{ color: "var(--danger)" }}> *</span>}
      </label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="ad-input"
      />
    </div>
  );
}

export function TextAreaField({
  name,
  label,
  defaultValue,
  required,
  rows = 4,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
  rows?: number;
}) {
  return (
    <div className="mb-4">
      <label className="ad-label">
        {label}
        {required && <span style={{ color: "var(--danger)" }}> *</span>}
      </label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        required={required}
        rows={rows}
        className="ad-input"
        style={{ resize: "vertical" }}
      />
    </div>
  );
}

export function SelectField({
  name,
  label,
  options,
  defaultValue,
  required,
}: {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <div className="mb-4">
      <label className="ad-label">
        {label}
        {required && <span style={{ color: "var(--danger)" }}> *</span>}
      </label>
      <select
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="ad-input"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function TagsField({
  name,
  label,
  defaultValue,
  placeholder,
}: {
  name: string;
  label: string;
  defaultValue?: string[];
  placeholder?: string;
}) {
  const t = useT();
  const [val, setVal] = useState((defaultValue ?? []).join(", "));
  return (
    <div className="mb-4">
      <label className="ad-label">
        {label}{" "}
        <span style={{ color: "var(--text-subtle)", fontWeight: 400, fontSize: 12 }}>
          ({t.form.csvHint})
        </span>
      </label>
      <input
        name={name}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={placeholder}
        className="ad-input"
      />
    </div>
  );
}

export function CheckboxGroup({
  name,
  label,
  options,
  defaultValue,
}: {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  defaultValue?: string[];
}) {
  const set = new Set(defaultValue ?? []);
  return (
    <div className="mb-4">
      <label className="ad-label">{label}</label>
      <div className="grid grid-cols-2 gap-2">
        {options.map((o) => (
          <label
            key={o.value}
            className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer rounded-lg"
            style={{
              border: "1px solid var(--border)",
              background: "#fff",
              color: "var(--text)",
            }}
          >
            <input
              type="checkbox"
              name={name}
              value={o.value}
              defaultChecked={set.has(o.value)}
              className="accent-[var(--primary)]"
            />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export function ImpactField({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: { label: string; value: string }[];
}) {
  const t = useT();
  const [items, setItems] = useState<{ label: string; value: string }[]>(
    defaultValue && defaultValue.length > 0
      ? defaultValue
      : [{ label: "", value: "" }]
  );

  function update(i: number, key: "label" | "value", v: string) {
    setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, [key]: v } : it)));
  }
  function add() {
    setItems((prev) => [...prev, { label: "", value: "" }]);
  }
  function remove(i: number) {
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  }

  return (
    <div className="mb-4">
      <label className="ad-label">{label}</label>
      <input type="hidden" name={name} value={JSON.stringify(items)} />
      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={it.label}
              onChange={(e) => update(i, "label", e.target.value)}
              placeholder={t.form.impactMetric}
              className="ad-input"
            />
            <input
              value={it.value}
              onChange={(e) => update(i, "value", e.target.value)}
              placeholder={t.form.impactValue}
              className="ad-input"
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="ad-btn ad-btn-secondary"
              style={{ padding: "0 0.875rem" }}
              aria-label="Remove"
            >
              <Minus size={16} />
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={add} className="ad-btn ad-btn-secondary mt-2">
        <Plus size={16} />
        {t.common.add}
      </button>
    </div>
  );
}

export function GalleryField({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string[];
}) {
  const t = useT();
  const [urls, setUrls] = useState<string[]>(defaultValue ?? []);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function uploadOne(file: File) {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data?.error ?? `Upload failed (${res.status})`);
    }
    const { url } = await res.json();
    return url as string;
  }

  async function onFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    setError(null);
    try {
      for (const f of Array.from(files)) {
        const url = await uploadOne(f);
        setUrls((prev) => [...prev, url]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  function remove(i: number) {
    setUrls((prev) => prev.filter((_, idx) => idx !== i));
  }

  return (
    <div className="mb-4">
      <label className="ad-label">{label}</label>
      <input type="hidden" name={name} value={urls.join(",")} />
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-3">
        {urls.map((u, i) => (
          <div key={i} className="relative group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={u}
              alt=""
              className="aspect-square rounded-lg object-cover"
              style={{ border: "1px solid var(--border)" }}
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute top-1 right-1 rounded-full text-white text-xs w-6 h-6 leading-none opacity-0 group-hover:opacity-100"
              style={{ background: "var(--danger)" }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <label
        className="ad-btn ad-btn-secondary cursor-pointer"
        style={{ display: "inline-flex" }}
      >
        <UploadCloud size={16} />
        {busy ? t.common.uploading : t.form.addImages}
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => onFiles(e.target.files)}
        />
      </label>
      {error && (
        <div className="mt-2 text-sm" style={{ color: "var(--danger)" }}>
          {error}
        </div>
      )}
    </div>
  );
}
