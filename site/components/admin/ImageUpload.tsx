"use client";

import { useRef, useState } from "react";
import { UploadCloud, ImageIcon } from "lucide-react";
import { useT } from "./AdminI18n";

type Props = {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
};

export function ImageUpload({ value, onChange, label, className }: Props) {
  const t = useT();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setBusy(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? `Upload failed (${res.status})`);
      }
      const { url } = await res.json();
      onChange(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={className}>
      {label && <label className="ad-label">{label}</label>}
      <div className="flex items-center gap-3">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt=""
            className="rounded-lg object-cover"
            style={{
              width: 64,
              height: 64,
              border: "1px solid var(--border)",
            }}
          />
        ) : (
          <div
            className="rounded-lg flex items-center justify-center"
            style={{
              width: 64,
              height: 64,
              border: "1px dashed var(--border)",
              background: "var(--bg)",
              color: "var(--text-subtle)",
            }}
          >
            <ImageIcon size={22} />
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) upload(f);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          className="ad-btn ad-btn-secondary"
        >
          <UploadCloud size={16} />
          {busy ? t.common.uploading : value ? t.common.replace : t.common.upload}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="ad-btn ad-btn-danger"
          >
            {t.common.remove}
          </button>
        )}
      </div>
      {error && (
        <div className="mt-2 text-sm" style={{ color: "var(--danger)" }}>
          {error}
        </div>
      )}
    </div>
  );
}
