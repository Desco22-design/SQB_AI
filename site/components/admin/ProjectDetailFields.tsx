"use client";

import { useState } from "react";
import { Plus, Minus, ChevronUp, ChevronDown, ImagePlus } from "lucide-react";

/* ------------------------------ shared types ------------------------------ */

type Tri = { uz: string; ru: string; en: string };
type Shot = { src: string; w: number; h: number };
type HeroImage = Shot & { alt: string; bare?: boolean; wrapClass?: string };
type Metric = { value: Tri; label: Tri };

type Section =
  | { kind: "paragraph"; label: Tri; body: Tri }
  | { kind: "bullets"; label: Tri; intro?: Tri; items: Tri[] }
  | { kind: "cards"; label: Tri; items: { title: Tri; body: Tri }[] }
  | { kind: "stats"; label: Tri; items: { label: Tri; value: string }[] }
  | { kind: "keyvalue"; label: Tri; items: { key: Tri; value: Tri }[] }
  | { kind: "compare"; label: Tri; columns: [Tri, Tri, Tri]; rows: { need: Tri; a: Tri; b: Tri }[] }
  | { kind: "gallery"; label: Tri; items: (Shot & { caption: Tri })[] };

type SectionKind = Section["kind"];

const emptyTri = (): Tri => ({ uz: "", ru: "", en: "" });

const KIND_LABEL: Record<SectionKind, string> = {
  paragraph: "Matn (paragraph)",
  bullets: "Ro'yxat (bullets)",
  cards: "Kartochkalar (cards)",
  stats: "Raqamlar (stats)",
  keyvalue: "Kalit-qiymat (key/value)",
  compare: "Taqqoslash jadvali (compare)",
  gallery: "Galereya (gallery)",
};

function newSection(kind: SectionKind): Section {
  switch (kind) {
    case "paragraph": return { kind, label: emptyTri(), body: emptyTri() };
    case "bullets": return { kind, label: emptyTri(), items: [emptyTri()] };
    case "cards": return { kind, label: emptyTri(), items: [{ title: emptyTri(), body: emptyTri() }] };
    case "stats": return { kind, label: emptyTri(), items: [{ label: emptyTri(), value: "" }] };
    case "keyvalue": return { kind, label: emptyTri(), items: [{ key: emptyTri(), value: emptyTri() }] };
    case "compare": return { kind, label: emptyTri(), columns: [emptyTri(), emptyTri(), emptyTri()], rows: [{ need: emptyTri(), a: emptyTri(), b: emptyTri() }] };
    case "gallery": return { kind, label: emptyTri(), items: [] };
  }
}

/* ------------------------------ small helpers ------------------------------ */

/** Three side-by-side language inputs bound to a Tri value. */
function TriInput({
  value,
  onChange,
  placeholder,
  textarea,
}: {
  value: Tri;
  onChange: (v: Tri) => void;
  placeholder?: string;
  textarea?: boolean;
}) {
  const langs: (keyof Tri)[] = ["uz", "ru", "en"];
  return (
    <div className="grid grid-cols-3 gap-2">
      {langs.map((l) => {
        const common = {
          value: value[l],
          onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            onChange({ ...value, [l]: e.target.value }),
          placeholder: `${placeholder ?? ""} ${l.toUpperCase()}`.trim(),
          className: "ad-input",
        };
        return textarea ? (
          <textarea key={l} rows={2} {...common} />
        ) : (
          <input key={l} {...common} />
        );
      })}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="ad-label" style={{ marginTop: 6 }}>{children}</div>;
}

function IconBtn({ onClick, children, title }: { onClick: () => void; children: React.ReactNode; title?: string }) {
  return (
    <button type="button" onClick={onClick} title={title} className="ad-btn ad-btn-secondary" style={{ padding: "0 0.7rem" }}>
      {children}
    </button>
  );
}

async function uploadImage(file: File): Promise<Shot & { alt: string }> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  if (!res.ok) {
    const d = await res.json().catch(() => ({}));
    throw new Error(d?.error ?? `Upload failed (${res.status})`);
  }
  const { url } = await res.json();
  const dims = await new Promise<{ w: number; h: number }>((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => resolve({ w: 0, h: 0 });
    img.src = url;
  });
  return { src: url, w: dims.w, h: dims.h, alt: "" };
}

/* ------------------------------ main component ------------------------------ */

export function ProjectDetailFields({
  tagline: taglineD,
  heroImage: heroD,
  metrics: metricsD,
  sections: sectionsD,
}: {
  // DB Json values (untyped); coerced below.
  tagline?: unknown;
  heroImage?: unknown;
  metrics?: unknown;
  sections?: unknown;
}) {
  const [tagline, setTagline] = useState<Tri>((taglineD as Tri) ?? emptyTri());
  const [hero, setHero] = useState<HeroImage | null>((heroD as HeroImage) ?? null);
  const [metrics, setMetrics] = useState<Metric[]>((metricsD as Metric[]) ?? []);
  const [sections, setSections] = useState<Section[]>((sectionsD as Section[]) ?? []);
  const [addKind, setAddKind] = useState<SectionKind>("paragraph");

  return (
    <div className="ad-card" style={{ padding: "1.1rem 1.25rem", marginBottom: "1.25rem" }}>
      {/* serialized payload for the server action */}
      <input type="hidden" name="tagline" value={JSON.stringify(tagline)} />
      <input type="hidden" name="heroImage" value={hero ? JSON.stringify(hero) : ""} />
      <input type="hidden" name="metrics" value={JSON.stringify(metrics)} />
      <input type="hidden" name="detailSections" value={JSON.stringify(sections)} />

      <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Batafsil sahifa (ixtiyoriy)</h3>
      <p className="ad-page-sub" style={{ marginBottom: 14 }}>
        To'ldirilmasa, loyiha sahifasi faqat Muammo/Yechim ko'rsatadi.
      </p>

      {/* Tagline */}
      <FieldLabel>Tagline (sarlavha ostidagi bir qator)</FieldLabel>
      <TriInput value={tagline} onChange={setTagline} placeholder="Tagline" />

      {/* Hero image */}
      <FieldLabel>Hero rasm</FieldLabel>
      <HeroEditor hero={hero} onChange={setHero} />

      {/* Metrics */}
      <FieldLabel>Ko'rsatkichlar (hero va kartochkadagi 3 ta plita)</FieldLabel>
      <MetricsEditor metrics={metrics} onChange={setMetrics} />

      {/* Sections */}
      <FieldLabel>Seksiyalar</FieldLabel>
      <div className="space-y-3">
        {sections.map((sec, i) => (
          <SectionEditor
            key={i}
            index={i}
            total={sections.length}
            section={sec}
            onChange={(s) => setSections((prev) => prev.map((x, idx) => (idx === i ? s : x)))}
            onRemove={() => setSections((prev) => prev.filter((_, idx) => idx !== i))}
            onMove={(dir) =>
              setSections((prev) => {
                const j = i + dir;
                if (j < 0 || j >= prev.length) return prev;
                const copy = [...prev];
                [copy[i], copy[j]] = [copy[j], copy[i]];
                return copy;
              })
            }
          />
        ))}
      </div>

      <div className="flex gap-2 mt-3">
        <select value={addKind} onChange={(e) => setAddKind(e.target.value as SectionKind)} className="ad-input" style={{ maxWidth: 260 }}>
          {(Object.keys(KIND_LABEL) as SectionKind[]).map((k) => (
            <option key={k} value={k}>{KIND_LABEL[k]}</option>
          ))}
        </select>
        <button type="button" className="ad-btn ad-btn-secondary" onClick={() => setSections((prev) => [...prev, newSection(addKind)])}>
          <Plus size={16} /> Seksiya qo'shish
        </button>
      </div>
    </div>
  );
}

/* ------------------------------ hero editor ------------------------------ */

function HeroEditor({ hero, onChange }: { hero: HeroImage | null; onChange: (h: HeroImage | null) => void }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  async function onFile(f: File | null) {
    if (!f) return;
    setBusy(true); setErr(null);
    try {
      const shot = await uploadImage(f);
      onChange({ ...shot, alt: hero?.alt ?? "", bare: hero?.bare, wrapClass: hero?.wrapClass });
    } catch (e) { setErr(e instanceof Error ? e.message : "Upload failed"); }
    finally { setBusy(false); }
  }
  return (
    <div className="ad-card" style={{ padding: "0.8rem", background: "var(--bg)" }}>
      {hero?.src ? (
        <div className="flex items-start gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={hero.src} alt="" style={{ width: 160, height: "auto", borderRadius: 8, border: "1px solid var(--border)" }} />
          <div className="flex-1 space-y-2">
            <input className="ad-input" placeholder="Alt matn" value={hero.alt} onChange={(e) => onChange({ ...hero, alt: e.target.value })} />
            <input className="ad-input" placeholder="wrapClass (ixtiyoriy, masalan: lg:w-[108%] lg:translate-x-[2%])" value={hero.wrapClass ?? ""} onChange={(e) => onChange({ ...hero, wrapClass: e.target.value })} />
            <label className="flex items-center gap-2" style={{ fontSize: 13 }}>
              <input type="checkbox" checked={!!hero.bare} onChange={(e) => onChange({ ...hero, bare: e.target.checked })} />
              Bare (rasmning o'z ramkasi/foni bor - ramkasiz ko'rsatilsin)
            </label>
            <div className="ad-page-sub">{hero.w}×{hero.h}px</div>
            <button type="button" className="ad-btn ad-btn-secondary" onClick={() => onChange(null)}><Minus size={16} /> Rasmni olib tashlash</button>
          </div>
        </div>
      ) : (
        <label className="ad-btn ad-btn-secondary" style={{ cursor: "pointer" }}>
          <ImagePlus size={16} /> {busy ? "Yuklanmoqda…" : "Hero rasm yuklash"}
          <input type="file" accept="image/*" hidden onChange={(e) => onFile(e.target.files?.[0] ?? null)} />
        </label>
      )}
      {err && <div style={{ color: "var(--danger)", fontSize: 12, marginTop: 6 }}>{err}</div>}
    </div>
  );
}

/* ------------------------------ metrics editor ------------------------------ */

function MetricsEditor({ metrics, onChange }: { metrics: Metric[]; onChange: (m: Metric[]) => void }) {
  const upd = (i: number, m: Metric) => onChange(metrics.map((x, idx) => (idx === i ? m : x)));
  return (
    <div className="space-y-2">
      {metrics.map((m, i) => (
        <div key={i} className="ad-card" style={{ padding: "0.7rem", background: "var(--bg)" }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Ko'rsatkich #{i + 1}</span>
            <IconBtn onClick={() => onChange(metrics.filter((_, idx) => idx !== i))} title="O'chirish"><Minus size={15} /></IconBtn>
          </div>
          <span style={{ fontSize: 12 }}>Qiymat (masalan 15 / 100% / Daqiqalar)</span>
          <TriInput value={m.value} onChange={(v) => upd(i, { ...m, value: v })} placeholder="Qiymat" />
          <span style={{ fontSize: 12 }}>Izoh</span>
          <TriInput value={m.label} onChange={(v) => upd(i, { ...m, label: v })} placeholder="Izoh" />
        </div>
      ))}
      {metrics.length < 3 && (
        <button type="button" className="ad-btn ad-btn-secondary" onClick={() => onChange([...metrics, { value: emptyTri(), label: emptyTri() }])}>
          <Plus size={16} /> Ko'rsatkich qo'shish
        </button>
      )}
    </div>
  );
}

/* ------------------------------ section editor ------------------------------ */

function SectionEditor({
  index, total, section, onChange, onRemove, onMove,
}: {
  index: number;
  total: number;
  section: Section;
  onChange: (s: Section) => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
}) {
  return (
    <div className="ad-card" style={{ padding: "0.85rem", background: "var(--bg)" }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
        <strong style={{ fontSize: 13 }}>{index + 1}. {KIND_LABEL[section.kind]}</strong>
        <div className="flex gap-1">
          <IconBtn onClick={() => onMove(-1)} title="Yuqoriga"><ChevronUp size={15} /></IconBtn>
          <IconBtn onClick={() => onMove(1)} title="Pastga"><ChevronDown size={15} /></IconBtn>
          <IconBtn onClick={onRemove} title="O'chirish"><Minus size={15} /></IconBtn>
        </div>
      </div>

      <span style={{ fontSize: 12 }}>Sarlavha</span>
      <TriInput value={section.label} onChange={(v) => onChange({ ...section, label: v })} placeholder="Sarlavha" />

      <div style={{ marginTop: 8 }}>
        <SectionBody section={section} onChange={onChange} />
      </div>
    </div>
  );
}

/** Repeatable list of Tri items with add/remove. */
function TriRepeater({ items, onChange, addLabel, placeholder, textarea }: {
  items: Tri[]; onChange: (v: Tri[]) => void; addLabel: string; placeholder?: string; textarea?: boolean;
}) {
  return (
    <div className="space-y-2">
      {items.map((it, i) => (
        <div key={i} className="flex gap-2 items-start">
          <div className="flex-1"><TriInput value={it} onChange={(v) => onChange(items.map((x, idx) => (idx === i ? v : x)))} placeholder={placeholder} textarea={textarea} /></div>
          <IconBtn onClick={() => onChange(items.filter((_, idx) => idx !== i))}><Minus size={15} /></IconBtn>
        </div>
      ))}
      <button type="button" className="ad-btn ad-btn-secondary" onClick={() => onChange([...items, emptyTri()])}><Plus size={16} /> {addLabel}</button>
    </div>
  );
}

function SectionBody({ section, onChange }: { section: Section; onChange: (s: Section) => void }) {
  switch (section.kind) {
    case "paragraph":
      return (<><span style={{ fontSize: 12 }}>Matn</span><TriInput value={section.body} onChange={(v) => onChange({ ...section, body: v })} placeholder="Matn" textarea /></>);

    case "bullets":
      return (
        <>
          <span style={{ fontSize: 12 }}>Kirish (ixtiyoriy)</span>
          <TriInput value={section.intro ?? emptyTri()} onChange={(v) => onChange({ ...section, intro: v })} placeholder="Kirish" textarea />
          <span style={{ fontSize: 12 }}>Bandlar</span>
          <TriRepeater items={section.items} onChange={(items) => onChange({ ...section, items })} addLabel="Band qo'shish" placeholder="Band" textarea />
        </>
      );

    case "cards":
      return (
        <div className="space-y-2">
          {section.items.map((it, i) => (
            <div key={i} className="ad-card" style={{ padding: "0.6rem" }}>
              <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
                <span style={{ fontSize: 12 }}>Kartochka #{i + 1}</span>
                <IconBtn onClick={() => onChange({ ...section, items: section.items.filter((_, idx) => idx !== i) })}><Minus size={14} /></IconBtn>
              </div>
              <TriInput value={it.title} onChange={(v) => onChange({ ...section, items: section.items.map((x, idx) => idx === i ? { ...x, title: v } : x) })} placeholder="Sarlavha" />
              <TriInput value={it.body} onChange={(v) => onChange({ ...section, items: section.items.map((x, idx) => idx === i ? { ...x, body: v } : x) })} placeholder="Matn" textarea />
            </div>
          ))}
          <button type="button" className="ad-btn ad-btn-secondary" onClick={() => onChange({ ...section, items: [...section.items, { title: emptyTri(), body: emptyTri() }] })}><Plus size={16} /> Kartochka qo'shish</button>
        </div>
      );

    case "stats":
      return (
        <div className="space-y-2">
          {section.items.map((it, i) => (
            <div key={i} className="flex gap-2 items-start">
              <input className="ad-input" style={{ maxWidth: 120 }} placeholder="Qiymat" value={it.value} onChange={(e) => onChange({ ...section, items: section.items.map((x, idx) => idx === i ? { ...x, value: e.target.value } : x) })} />
              <div className="flex-1"><TriInput value={it.label} onChange={(v) => onChange({ ...section, items: section.items.map((x, idx) => idx === i ? { ...x, label: v } : x) })} placeholder="Izoh" /></div>
              <IconBtn onClick={() => onChange({ ...section, items: section.items.filter((_, idx) => idx !== i) })}><Minus size={14} /></IconBtn>
            </div>
          ))}
          <button type="button" className="ad-btn ad-btn-secondary" onClick={() => onChange({ ...section, items: [...section.items, { label: emptyTri(), value: "" }] })}><Plus size={16} /> Raqam qo'shish</button>
        </div>
      );

    case "keyvalue":
      return (
        <div className="space-y-2">
          {section.items.map((it, i) => (
            <div key={i} className="ad-card" style={{ padding: "0.6rem" }}>
              <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
                <span style={{ fontSize: 12 }}>Qator #{i + 1}</span>
                <IconBtn onClick={() => onChange({ ...section, items: section.items.filter((_, idx) => idx !== i) })}><Minus size={14} /></IconBtn>
              </div>
              <TriInput value={it.key} onChange={(v) => onChange({ ...section, items: section.items.map((x, idx) => idx === i ? { ...x, key: v } : x) })} placeholder="Kalit" />
              <TriInput value={it.value} onChange={(v) => onChange({ ...section, items: section.items.map((x, idx) => idx === i ? { ...x, value: v } : x) })} placeholder="Qiymat" textarea />
            </div>
          ))}
          <button type="button" className="ad-btn ad-btn-secondary" onClick={() => onChange({ ...section, items: [...section.items, { key: emptyTri(), value: emptyTri() }] })}><Plus size={16} /> Qator qo'shish</button>
        </div>
      );

    case "compare":
      return (
        <>
          <span style={{ fontSize: 12 }}>Ustun sarlavhalari (Ehtiyoj / A / B)</span>
          {section.columns.map((c, ci) => (
            <TriInput key={ci} value={c} onChange={(v) => onChange({ ...section, columns: section.columns.map((x, idx) => idx === ci ? v : x) as [Tri, Tri, Tri] })} placeholder={`Ustun ${ci + 1}`} />
          ))}
          <span style={{ fontSize: 12, marginTop: 6, display: "block" }}>Qatorlar</span>
          <div className="space-y-2">
            {section.rows.map((r, i) => (
              <div key={i} className="ad-card" style={{ padding: "0.6rem" }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
                  <span style={{ fontSize: 12 }}>Qator #{i + 1}</span>
                  <IconBtn onClick={() => onChange({ ...section, rows: section.rows.filter((_, idx) => idx !== i) })}><Minus size={14} /></IconBtn>
                </div>
                <TriInput value={r.need} onChange={(v) => onChange({ ...section, rows: section.rows.map((x, idx) => idx === i ? { ...x, need: v } : x) })} placeholder="Ehtiyoj" />
                <TriInput value={r.a} onChange={(v) => onChange({ ...section, rows: section.rows.map((x, idx) => idx === i ? { ...x, a: v } : x) })} placeholder="A" />
                <TriInput value={r.b} onChange={(v) => onChange({ ...section, rows: section.rows.map((x, idx) => idx === i ? { ...x, b: v } : x) })} placeholder="B" />
              </div>
            ))}
            <button type="button" className="ad-btn ad-btn-secondary" onClick={() => onChange({ ...section, rows: [...section.rows, { need: emptyTri(), a: emptyTri(), b: emptyTri() }] })}><Plus size={16} /> Qator qo'shish</button>
          </div>
        </>
      );

    case "gallery":
      return <GalleryItems section={section} onChange={onChange} />;
  }
}

function GalleryItems({ section, onChange }: { section: Extract<Section, { kind: "gallery" }>; onChange: (s: Section) => void }) {
  const [busy, setBusy] = useState(false);
  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    try {
      const added: (Shot & { caption: Tri })[] = [];
      for (const f of Array.from(files)) {
        const shot = await uploadImage(f);
        added.push({ src: shot.src, w: shot.w, h: shot.h, caption: emptyTri() });
      }
      onChange({ ...section, items: [...section.items, ...added] });
    } finally { setBusy(false); }
  }
  return (
    <div className="space-y-2">
      {section.items.map((it, i) => (
        <div key={i} className="ad-card flex items-start gap-3" style={{ padding: "0.6rem" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={it.src} alt="" style={{ width: 96, height: "auto", borderRadius: 6, border: "1px solid var(--border)" }} />
          <div className="flex-1">
            <span style={{ fontSize: 12 }}>Izoh (caption)</span>
            <TriInput value={it.caption} onChange={(v) => onChange({ ...section, items: section.items.map((x, idx) => idx === i ? { ...x, caption: v } : x) })} placeholder="Izoh" />
          </div>
          <IconBtn onClick={() => onChange({ ...section, items: section.items.filter((_, idx) => idx !== i) })}><Minus size={14} /></IconBtn>
        </div>
      ))}
      <label className="ad-btn ad-btn-secondary" style={{ cursor: "pointer" }}>
        <ImagePlus size={16} /> {busy ? "Yuklanmoqda…" : "Rasm(lar) yuklash"}
        <input type="file" accept="image/*" multiple hidden onChange={(e) => onFiles(e.target.files)} />
      </label>
    </div>
  );
}
