"use client";

import Link from "next/link";
import { Plus, ArrowLeft, Check } from "lucide-react";
import { useT } from "./AdminI18n";

export function PageHeader({
  title,
  description,
  actionHref,
}: {
  title: string;
  description?: string;
  actionHref?: string;
}) {
  const t = useT();
  return (
    <div className="flex items-end justify-between gap-4 mb-6 flex-wrap">
      <div className="min-w-0">
        <h1 className="ad-page-title">{title}</h1>
        {description && <p className="ad-page-sub">{description}</p>}
      </div>
      {actionHref && (
        <Link href={actionHref} className="ad-btn ad-btn-primary">
          <Plus size={16} />
          {t.common.add}
        </Link>
      )}
    </div>
  );
}

export function FormShell({
  title,
  backHref,
  children,
}: {
  title: string;
  backHref: string;
  children: React.ReactNode;
}) {
  const t = useT();
  return (
    <div style={{ maxWidth: 760 }}>
      <Link
        href={backHref}
        className="ad-link-muted inline-flex items-center gap-1.5 mb-3"
      >
        <ArrowLeft size={16} />
        {t.common.back}
      </Link>
      <h1 className="ad-page-title mb-6">{title}</h1>
      <div className="ad-card" style={{ padding: 28 }}>
        {children}
      </div>
    </div>
  );
}

export function FormActions({ cancelHref }: { cancelHref?: string }) {
  const t = useT();
  return (
    <div
      className="flex gap-3 mt-7 pt-5"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <button type="submit" className="ad-btn ad-btn-primary">
        <Check size={16} />
        {t.common.save}
      </button>
      {cancelHref && (
        <Link href={cancelHref} className="ad-btn ad-btn-secondary">
          {t.common.cancel}
        </Link>
      )}
    </div>
  );
}
