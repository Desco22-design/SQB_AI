# SQB AI — Repository Restructure Plan

> Read-only analysis output. Nothing has been changed yet. This document is for owner review **before** any file operations. It is deliberately conservative: when a file is a source artifact or its intent is ambiguous, the recommendation is *investigate/keep*, never blind delete. User source media (team photos, conference videos, original materials) is **explicitly excluded** from all deletion.

---

## 1. Current state

### 1.1 Repo overview

The actual Next.js 14 app lives entirely under `site/`. The repo **root** is cluttered with original source-media dumps, build/temp artifacts, and a few docs — none of which the running app depends on.

```
SQB AI/                                  ← repo root (MESSY)
├── site/                                ← the real Next.js app (CLEAN)
├── Komanda rasmlari/                    ← source media (team photos)        [spaced name]
├── Momenti komandi/                     ← source media (team moments)        [Cyrillic/translit, spaced]
├── Vozmojnosti/                         ← source media (capabilities)        [translit]
├── Конференции, митапы, внутренние дни/  ← source media (events)             [Cyrillic + spaces + comma]
├── Новая папка/                         ← source media ("New folder")        [Cyrillic, junk-ish name]
├── Что нового/                          ← source media (what's new)          [Cyrillic, spaced]
├── rasmlar/                             ← source media (images)              [lowercase translit]
├── presentation/                        ← presentation materials
├── assets/                              ← media/assets
├── docs/                                ← docs + "AI Team (IT Department).pdf"
├── Logo/                                ← logos
├── fonts/                               ← fonts
├── extract-tmp/                         ← TEMP extraction dir                 [junk]
├── .vercel/                             ← Vercel local link cache
├── .claude/                             ← Claude config
├── CLAUDE.md                            ← project doc (keep)
├── SECURITY_AUDIT.md                    ← security notes (keep)
├── SQB_AI_Loyihalar.docx               ← Word doc (source material)
└── netlify.toml                         ← STALE deploy config (see §7)
```

```
site/                                    ← Next.js app (idiomatic, well-structured)
├── app/                                 ← App Router: public pages, admin CRUD, API — CLEAN, no changes
├── components/                          ← shared chrome + sections/ + admin/ — 2 dead files only
├── lib/                                 ← data layer + i18n + helpers — naming/size nits only
├── prisma/                              ← schema.prisma + seed.ts — clean
├── scripts/                             ← db-start + 3 obsolete one-offs (gitignored, not in repo)
├── public/                             ← static assets, committed team photos
├── .env / .env.example                  ← secrets (.env must never be committed)
├── .local-pg/                           ← local embedded Postgres data        [junk, gitignored]
├── .next/                               ← build output                        [junk, gitignored]
├── tsconfig.tsbuildinfo                 ← TS incremental cache                 [junk]
└── next-env.d.ts / configs              ← standard
```

### 1.2 Honest assessment of what's messy

| Area | Problem | Severity |
|---|---|---|
| **Root media dump** | ~9 media/source folders sit loose at root, several with Cyrillic, spaces, and even a comma in the name. Looks unprofessional and is hard to navigate. | High (cosmetic) |
| **Ugly folder names** | `Komanda rasmlari`, `Momenti komandi`, `Конференции, митапы, внутренние дни`, `Новая папка`, `Что нового`, `rasmlar` — inconsistent language, casing, and spacing. | High (cosmetic) |
| **Junk artifacts** | `extract-tmp/` at root; `site/.local-pg/`, `site/.next/`, `site/tsconfig.tsbuildinfo` (build/temp). | Medium |
| **Deploy-config conflict** | `netlify.toml` at root while the project is deployed on **Vercel** (root dir = `site`). Misleading. | Medium |
| **Dead code in `site/`** | `components/NeuralBackground.tsx` and `components/sections/TrustedBy.tsx` — 0 importers each. | Low |
| **`lib/` naming/size nits** | `lib/i18n.ts` is 1570 lines (>800 guideline); `lib/i18n-content.ts` is a vague name for i18n utilities; `lib/data.ts` mixes types + ~430 lines of stale seed content. | Low |
| **Tailwind token misnomer** | Color scale named `violet` actually holds cyan/teal hex values. | Low (cosmetic) |
| **Obsolete one-off scripts** | `site/scripts/extract-team-photos.mjs`, `seed-about-benefits.ts`, `seed-feature-cards.ts` — orphaned, but **gitignored / not in repo**, so zero repo footprint. | Low |
| **App in subfolder** | `site/` is not at repo root. This is **intentional** (Vercel root-dir = `site`) and must **not** be changed. | Not a problem — leave as-is |

**Bottom line:** `site/app` is excellent and needs nothing. The mess is almost entirely at the repo root (media + a stale `netlify.toml` + temp dirs), plus a handful of low-risk code tidy-ups inside `site/`.

---

## 2. Target structure

The Next.js app **stays in `site/`** (Vercel root-dir is configured to it — moving it is high-risk and out of scope). The cleanup consolidates loose root media into one clearly-named, gitignored folder and tidies a few names inside `site/`.

```
SQB AI/                                  ← repo root (CLEAN)
├── site/                                ← Next.js app (unchanged location)
│   ├── app/                             ← unchanged
│   ├── components/
│   │   ├── ui/                          ← (OPTIONAL) primitives: Counter, Pagination, SectionTitle, ArticleContent
│   │   ├── sections/                    ← homepage sections (TrustedBy removed)
│   │   └── admin/                       ← admin UI
│   ├── lib/
│   │   ├── i18n/                        ← (OPTIONAL) site-dictionary.ts, helpers.ts, admin.ts, admin-server.ts
│   │   ├── types.ts                     ← (OPTIONAL) domain types split out of data.ts
│   │   └── …                            ← queries, prisma, auth, storage, etc.
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.ts
│   │   └── seed-data.ts                 ← (OPTIONAL) static seed arrays moved out of lib/data.ts
│   └── …
├── _source-media/                       ← ALL original media consolidated here (gitignored)
│   ├── team-photos/                     ← was "Komanda rasmlari"
│   ├── team-moments/                    ← was "Momenti komandi"
│   ├── capabilities/                    ← was "Vozmojnosti"
│   ├── events/                          ← was "Конференции, митапы, внутренние дни"
│   ├── whats-new/                       ← was "Что нового"
│   ├── misc/                            ← was "Новая папка" (rename after inspecting contents)
│   ├── images/                          ← was "rasmlar"
│   ├── presentation/                    ← was "presentation"
│   ├── assets/                          ← was "assets"
│   └── logo/                            ← was "Logo"
├── docs/                                ← docs (keep; includes the source PDF)
├── fonts/                               ← fonts (keep, or move under _source-media if not used by build)
├── CLAUDE.md
├── SECURITY_AUDIT.md
├── SQB_AI_Loyihalar.docx                ← (or move into docs/ — see §5)
├── README.md                            ← (RECOMMENDED ADD) short pro README
└── .gitignore                           ← updated (see §4)
```

> **Note on `_source-media/`:** the leading underscore sorts it to the top and signals "support material, not app code". It is gitignored so it stays on the owner's machine but is never pushed. If the owner prefers these tracked, drop the gitignore entry — but given their size, keeping them local is recommended.

---

## 3. DELETE list (true junk only)

Only build artifacts, temp dirs, and local caches. **No user source media is in this list.** Most are already gitignored; deleting them from disk is optional housekeeping.

| Path | Reason | Confidence |
|---|---|---|
| `extract-tmp/` (root) | Temporary extraction scratch dir. Not referenced anywhere; pure junk. | High |
| `site/.next/` | Next.js build output. Regenerated on every build. Already gitignored. | High |
| `site/.local-pg/` | Local embedded-Postgres data dir. Regenerable dev state. Already gitignored. | High |
| `site/tsconfig.tsbuildinfo` | TypeScript incremental build cache. Regenerated automatically. | High |
| `site/components/NeuralBackground.tsx` | Dead code: 0 importers (grep-verified). Site uses CSS gradients instead. Only referenced in CLAUDE.md prose. Pure code, not media. | High — *confirm with owner it isn't planned for re-enable* |
| `site/components/sections/TrustedBy.tsx` | Dead code: 0 importers; never wired into `app/page.tsx`. Pure code, not media. | High — *confirm with owner* |

**Investigate-then-delete (do NOT auto-delete — author artifacts, gitignored, zero repo footprint):**

| Path | Reason | Confidence |
|---|---|---|
| `site/scripts/extract-team-photos.mjs` | One-off PDF→photo extractor. Imports `mupdf` (not in package.json → can't run), hardcoded PDF path is wrong, output already committed to `public/team/`. Served its purpose. | Medium |
| `site/scripts/seed-about-benefits.ts` | Orphan backfill seeder; overlaps canonical `prisma/seed.ts`. | Medium |
| `site/scripts/seed-feature-cards.ts` | Orphan seeder; runs a **destructive** `aiDirection.deleteMany()` — footgun if left lying around. Overlaps `prisma/seed.ts`. | Medium |

> Recommendation for the three scripts: keep `site/scripts/db-start.mjs` (legitimate local dev tooling — and ideally wire it into a `db:local` npm script). Archive or delete the other three only after the owner confirms they are obsolete.

---

## 4. GITIGNORE additions

Goal: keep these locally, never commit them. Verify each against the **existing** `.gitignore` before adding (several may already be present).

```gitignore
# --- Source media (kept local, never pushed) ---
/_source-media/

# --- Build & temp artifacts ---
/extract-tmp/
site/.next/
site/.local-pg/
site/tsconfig.tsbuildinfo
site/out/

# --- Secrets / env ---
site/.env
site/.env.local
site/.env*.local
.env
# (keep site/.env.example tracked as the documented template)

# --- OS / editor noise ---
.DS_Store
Thumbs.db

# --- Large binaries / source docs (optional, owner's call) ---
*.mp4
*.zip
SQB_AI_Loyihalar.docx
```

> **Critical check:** confirm `site/.env` is **not currently tracked** (`git ls-files | grep .env`). If it is, it must be removed from history-going-forward (`git rm --cached site/.env`) and any exposed secrets rotated per the project's security rules. `.env.example` stays tracked.

---

## 5. ORGANIZE / MOVE list

Consolidate all loose root media into `_source-media/` with professional, ASCII, kebab-case names. These are `git mv`-free moves (most are untracked/gitignored), so they only affect the local working tree.

| Current (root) | Move to | Note |
|---|---|---|
| `Komanda rasmlari/` | `_source-media/team-photos/` | translit "team images" |
| `Momenti komandi/` | `_source-media/team-moments/` | translit "team moments" |
| `Vozmojnosti/` | `_source-media/capabilities/` | translit "capabilities/возможности" |
| `Конференции, митапы, внутренние дни/` | `_source-media/events/` | "conferences, meetups, internal days" |
| `Что нового/` | `_source-media/whats-new/` | "what's new" |
| `Новая папка/` | `_source-media/misc/` | "New folder" — **inspect contents first**, rename to something meaningful if possible |
| `rasmlar/` | `_source-media/images/` | translit "images" |
| `presentation/` | `_source-media/presentation/` | or keep at root if actively referenced |
| `assets/` | `_source-media/assets/` | verify nothing in `site/` imports from here first |
| `Logo/` | `_source-media/logo/` | source logos (app logo already lives in `site/app/icon.png` + `site/public`) |
| `SQB_AI_Loyihalar.docx` (root) | `docs/SQB_AI_Loyihalar.docx` | tidier; or gitignore it |

**Do NOT move blindly — verify first:**
- `assets/`, `Logo/`, `fonts/` — confirm nothing under `site/` references them by relative path before moving. If the build or any component imports from them, they must stay where the import expects (or imports get updated). Analysis suggests `site/` is self-contained (uses `site/public/`), but verify with a grep for each folder name across `site/`.
- `docs/` and `fonts/` — leave at root unless confirmed unused; they read as legitimate top-level folders.

---

## 6. RENAME list

### 6.1 Folder renames (covered by §5 moves)
All ugly Cyrillic/spaced folder names are normalized via the moves in §5. No app imports reference them (they are root-level source dumps), so **no import updates required** — but grep-verify per §5.

### 6.2 Code file renames inside `site/` (LOW priority, optional)

These are **organize/refactor** suggestions, not required for a clean repo. Each requires updating imports. Do them in a **separate batch** with `tsc`/build verification after.

| Current | Proposed | Reason | Import-update scope |
|---|---|---|---|
| `site/lib/i18n-content.ts` | `site/lib/i18n-utils.ts` (or `lib/i18n/helpers.ts`) | Name is vague; file holds i18n helper **functions** + `I18nText` type, not "content". | Heavily imported (public + admin). Update all `from '@/lib/i18n-content'` / relative imports. |
| `site/lib/i18n.ts` | `site/lib/i18n/site-dictionary.ts` + `lib/i18n/index.ts` | 1570 lines (>800 guideline); inline trilingual dictionary; name inconsistent with `admin-i18n.ts`. | Imported by `LanguageProvider` + several components. Higher churn — do carefully. |
| `site/lib/data.ts` | Split: types → `site/lib/types.ts`; seed arrays → `site/prisma/seed-data.ts` | File mixes domain types (used by 9 runtime files + queries) with ~430 lines of stale seed content used only by `prisma/seed.ts`. | Type imports in 9 files + `queries.ts`; array imports in `prisma/seed.ts`. **Do not delete** — seed depends on the arrays. |

### 6.3 Things deliberately NOT renamed
- `app/admin/_actions/` — underscore folder is the **intentional** Next.js convention to exclude shared server actions from routing. Keep.
- `app/admin/team/HeadlineForm.tsx` — justified team-specific feature, not a stray. Keep.
- `components/LanguageSwitcher.tsx` vs `components/admin/LanguageSwitcher.tsx` — **NOT duplicates** (context-based public vs cookie+reload admin). Both stay.
- Tailwind `violet` color scale (holds cyan/teal values) — misleading but referenced across many components; renaming is high-churn, low-value. **Keep** unless doing a deliberate token cleanup.

---

## 7. Conflicts / risks & safe execution order

### 7.1 Conflicts to resolve

| Item | Risk | Recommendation |
|---|---|---|
| `netlify.toml` at root vs **Vercel** deployment | Misleading; implies Netlify is the deploy target when Vercel (root-dir = `site`) is canonical. The code even carries both `@vercel/blob` and `@netlify/blobs` adapters. | **Investigate, don't delete blindly.** Confirm Netlify is truly retired. If yes, delete `netlify.toml` (and consider dropping `@netlify/blobs`). If Netlify is a fallback, keep it but document that Vercel is primary. Confidence: medium. |
| `site/.env` possibly tracked | Secret leak | Verify with `git ls-files`. If tracked, `git rm --cached` and rotate secrets. |
| Moving `assets/` / `Logo/` / `fonts/` | Could break a build/import if `site/` references them by path | Grep each folder name across `site/` **before** moving. Default to keeping if any reference is found. |
| `@types/bcryptjs` (devDep) | Redundant — bcryptjs v3 ships own types | Safe to remove. Low risk. |
| `server-only` missing from package.json | Imported by `lib/admin-i18n-server.ts` + `lib/audit.ts`, resolves only transitively via Next | **ADD** `server-only` to dependencies. Do not remove. |
| `embedded-postgres` dependency | Only used by gitignored `scripts/db-start.mjs` | Keep if local DB workflow is still used (consider moving to devDependencies); otherwise remove. Owner's call. |

### 7.2 Safe execution order

Do this in batches, **committing and verifying between each**. Never combine media moves with code renames in one batch.

1. **Branch first.** `git checkout -b chore/repo-cleanup` (never work on `main` for this).
2. **Gitignore + secret check (no deletions yet).** Update `.gitignore` (§4). Run `git ls-files | grep -i .env` and `git status --ignored` to confirm what's tracked vs ignored. If `.env` is tracked → `git rm --cached`, rotate secrets.
3. **Delete junk artifacts** (§3 top table only): `extract-tmp/`, `site/.next/`, `site/.local-pg/`, `site/tsconfig.tsbuildinfo`. Run `npm run build` in `site/` to confirm they regenerate cleanly. Commit.
4. **Resolve `netlify.toml`** (§7.1) after owner confirms deploy target.
5. **Organize root media** (§5): create `_source-media/`, move folders in, normalize names. This touches only untracked/gitignored files → **no build impact**. Verify the app still builds. Commit.
6. **Delete dead code** (§3): `NeuralBackground.tsx`, `TrustedBy.tsx` — **only after owner confirms**. Run `npx knip` + `tsc --noEmit` + `npm run build`. Commit.
7. **Dependency fixes:** remove `@types/bcryptjs`, add `server-only`, decide on `embedded-postgres`. `npm install` + build. Commit.
8. **(Optional) code renames** (§6.2) — one file at a time: rename → update imports → `tsc --noEmit` → `npm run build` → commit. Stop and revert immediately if anything breaks.
9. **(Optional) add a root `README.md`** describing the repo, that the app lives in `site/`, and how to run it.

**Verification gate after every batch:** `cd site && npm run build` must pass; `npx tsc --noEmit` clean; for code changes, `npx knip` shows no new orphans.

---

## 8. Naming conventions (enforce going forward)

**Folders (repo-level):**
- ASCII only — no Cyrillic, no spaces, no commas.
- `kebab-case` for multi-word folders (`team-photos`, `whats-new`).
- Prefix non-code support folders with `_` (`_source-media/`) so they sort apart from code and read as "not the app".

**Code (inside `site/`):**
- Components & types: `PascalCase` (`SectionTitle`, `TeamMember`).
- Hooks: `use` prefix, `camelCase` (`useReducedMotion`).
- Utilities / non-component modules: `camelCase` or `kebab-case` filenames, consistent within a folder (e.g. `i18n-utils.ts`, `section-headings.ts`).
- Server actions: `actions.ts`; private shared actions in `_actions/`.
- CSS classes: `kebab-case`; design tokens via CSS custom properties (already done).
- Constants: `UPPER_SNAKE_CASE`.

**Files & docs:**
- No spaces in committed filenames; use `-` or `_`.
- Keep `.env.example` tracked, `.env` ignored.
- One responsibility per file; split modules over ~800 lines (applies to `lib/i18n.ts`).

**Deploy config:**
- Single source of truth. Vercel (root-dir = `site`) is canonical; don't leave a competing `netlify.toml` at root unless Netlify is an actively-maintained fallback (and document it if so).

---

*End of plan. Awaiting owner approval before any file is created, moved, renamed, or deleted.*