"use client";

import { useState, useTransition } from "react";
import {
  UploadCloud,
  Images,
  Trash2,
  ArrowLeft as ArrowL,
  ArrowRight as ArrowR,
} from "lucide-react";
import { addGalleryImage, deleteGalleryImage, reorderGalleryImage } from "./actions";
import { useT } from "@/components/admin/AdminI18n";

type Item = { id: string; url: string; order: number };

export function GalleryManager({ items }: { items: Item[] }) {
  const t = useT();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  async function onFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    setError(null);
    try {
      for (const f of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", f);
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        if (!res.ok) {
          const d = await res.json().catch(() => ({}));
          throw new Error(d?.error ?? `Upload failed (${res.status})`);
        }
        const { url } = await res.json();
        await addGalleryImage(url);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <label className="ad-btn ad-btn-primary cursor-pointer">
          <UploadCloud size={16} />
          {busy ? t.common.uploading : t.gallery.addImages}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => onFiles(e.target.files)}
          />
        </label>
        {error && (
          <span className="text-sm" style={{ color: "var(--danger)" }}>
            {error}
          </span>
        )}
      </div>

      {items.length === 0 ? (
        <div
          className="ad-card text-center"
          style={{
            padding: "3rem 1rem",
            color: "var(--text-subtle)",
          }}
        >
          <div className="flex justify-center mb-3">
            <Images size={48} />
          </div>
          <p style={{ fontSize: 14 }}>{t.gallery.empty}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {items.map((it, idx) => (
            <div
              key={it.id}
              className="relative group rounded-xl overflow-hidden bg-white"
              style={{ border: "1px solid var(--border)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.url} alt="" className="aspect-square w-full object-cover" />
              <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={pending || idx === 0}
                  onClick={() =>
                    start(async () => {
                      await reorderGalleryImage(it.id, "up");
                    })
                  }
                  className="rounded-md bg-white/15 hover:bg-white/25 text-white p-1.5 disabled:opacity-30"
                  title={t.gallery.moveLeft}
                  aria-label={t.gallery.moveLeft}
                >
                  <ArrowL size={16} />
                </button>
                <button
                  type="button"
                  disabled={pending || idx === items.length - 1}
                  onClick={() =>
                    start(async () => {
                      await reorderGalleryImage(it.id, "down");
                    })
                  }
                  className="rounded-md bg-white/15 hover:bg-white/25 text-white p-1.5 disabled:opacity-30"
                  title={t.gallery.moveRight}
                  aria-label={t.gallery.moveRight}
                >
                  <ArrowR size={16} />
                </button>
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => {
                    if (!confirm(t.gallery.deleteConfirm)) return;
                    start(async () => {
                      await deleteGalleryImage(it.id);
                    });
                  }}
                  className="rounded-md text-white p-1.5"
                  style={{ background: "var(--danger)" }}
                  title={t.common.delete}
                  aria-label={t.common.delete}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
