"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Check } from "lucide-react";
import { MultiLangField } from "./MultiLangField";
import { useT } from "./AdminI18n";
import { updateSectionHeading } from "@/app/admin/_actions/section-heading";
import type { SectionKey } from "@/lib/section-headings";

type Heading = {
  eyebrow: unknown;
  titlePrefix: unknown;
  titleHighlight: unknown;
  titleSuffix: unknown;
  subheading: unknown;
};

export function SectionHeadingForm({
  section,
  adminPath,
  defaultValue,
}: {
  section: SectionKey;
  adminPath: string;
  defaultValue: Heading;
}) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const action = updateSectionHeading.bind(null, section, adminPath);

  return (
    <div className="ad-card mb-6" style={{ overflow: "hidden" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between"
        style={{
          padding: "14px 22px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          color: "var(--text)",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              color: "var(--text)",
            }}
          >
            {t.sectionHeading.title}
          </div>
          <div style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 2 }}>
            {t.sectionHeading.hint}
          </div>
        </div>
        {open ? (
          <ChevronDown size={18} color="var(--text-muted)" />
        ) : (
          <ChevronRight size={18} color="var(--text-muted)" />
        )}
      </button>

      {open && (
        <form
          action={action}
          style={{
            padding: "0 22px 22px",
            borderTop: "1px solid var(--border)",
            paddingTop: 18,
          }}
        >
          <MultiLangField
            name="eyebrow"
            label={t.sectionHeading.eyebrow}
            defaultValue={defaultValue.eyebrow}
            placeholder="About / Capabilities / ..."
          />
          <MultiLangField
            name="titlePrefix"
            label={t.sectionHeading.titlePrefix}
            defaultValue={defaultValue.titlePrefix}
          />
          <MultiLangField
            name="titleHighlight"
            label={t.sectionHeading.titleHighlight}
            defaultValue={defaultValue.titleHighlight}
          />
          <MultiLangField
            name="titleSuffix"
            label={t.sectionHeading.titleSuffix}
            defaultValue={defaultValue.titleSuffix}
          />
          <MultiLangField
            name="subheading"
            label={t.sectionHeading.subheading}
            defaultValue={defaultValue.subheading}
            multiline
          />
          <button type="submit" className="ad-btn ad-btn-primary">
            <Check size={16} />
            {t.common.save}
          </button>
        </form>
      )}
    </div>
  );
}
