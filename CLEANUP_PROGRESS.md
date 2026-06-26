# Repo Cleanup — Progress & Resume Notes

Branch: `chore/repo-cleanup` (off `main`). Status: **project builds (tsc 0 errors) and runs**; security fixes intact.

This file tracks what's DONE and what REMAINS so the cleanup can be resumed later. See `RESTRUCTURE_PLAN.md` for the full plan.

---

## ✅ DONE (this branch)

### Security hardening (committed to `main` before branching)
- Path traversal fixed in `/api/media/[key]` (KEY_RE allowlist + containment). Verified: `..%2f..%2f.env → 404`.
- SVG uploads removed + magic-byte validation; media response headers.
- Security headers added in `next.config.mjs` (CSP/HSTS/X-Frame-Options/nosniff/Referrer/Permissions). Verified: CSP present.
- Shared bounded rate limiter (`lib/rate-limit.ts`); honeypot-before-limit; Telegram timeout; `/api/track` throttled.
- Login brute-force protection + constant-time bcrypt; default admin passwords removed from seed/docs.

### Cleanup (this branch — applied, NOT yet committed)
- **Deleted junk:** `extract-tmp/`, `site/.next/`, `site/.local-pg/`, `site/tsconfig.tsbuildinfo`.
- **Deleted dead code:** `components/NeuralBackground.tsx`, `components/sections/TrustedBy.tsx`.
- **Deleted obsolete scripts:** `scripts/extract-team-photos.mjs`, `seed-about-benefits.ts`, `seed-feature-cards.ts`.
- **Netlify removed:** deleted `netlify.toml`; removed Netlify branches from `lib/storage.ts`; removed `@netlify/blobs` + `@types/bcryptjs` from `package.json`; **added `server-only`** dependency.
- **Media organized:** root source-media folders (ugly Cyrillic/spaced names) moved into `_source-media/` with professional kebab-case names (team-photos, team-moments, capabilities, events, whats-new, misc, images, presentation, assets, logo). `SQB_AI_Loyihalar.docx → docs/`.
- **`.gitignore`** updated (build/temp artifacts, env).
- **Refactor — i18n-content → i18n-utils:** `lib/i18n-content.ts` renamed to `lib/i18n-utils.ts`; all imports updated.
- **Refactor — data.ts split:** types → `lib/types.ts`; `lib/data.ts` is now a barrel (`export * from "./types"`); seed arrays → `prisma/seed-data.ts`; `prisma/seed.ts` updated.

### Verified
- `npx tsc --noEmit` → **0 errors**.
- Dev server runs; homepage / `/team/[id]` / projects → 200; path-traversal → 404; CSP header present.

---

## ⏳ REMAINING (resume here — budget was hit mid-run)

1. **`i18n.ts` split — DEFERRED.** The workflow died mid-split (session limit). The orphan `lib/i18n/` folder was removed; `lib/i18n.ts` (≈1569 lines) is intact and working. To finish later: create `lib/i18n/site-dictionary.ts` (the trilingual dictionary) + `lib/i18n/index.ts` (types + logic + same exports), then delete `lib/i18n.ts` so `@/lib/i18n` resolves to the folder index. Low priority, cosmetic.
2. **Full production build not yet run.** `cd site && npm run build` should be run once before deploy to confirm bundling (tsc is green, but build also checks the bundle). Stop the dev server first (prisma-generate file lock).
3. **`_source-media/` git decision.** Owner chose to TRACK media in git, but it may be large and the current `.gitignore` still ignores some media paths (`rasmlar/`, `Komanda rasmlari/`, `site/scripts/`). Reconcile: either commit `_source-media/` (check size first) or keep local + remove the stale ignore lines. **Not yet resolved.**
4. **Phase 4 — Re-audit** (skipped for now per owner; budget). Re-run a lighter security/quality pass after the structure settles.
5. **Phase 5 — Documentation** (not started): full project docs — architecture, what's where, responsibilities, how to run/deploy.
6. **Observed (not part of cleanup):** an in-progress **Telegram bot integration** exists in the tree (`app/api/telegram/webhook/route.ts`, `app/admin/submissions/[id]/TelegramReply.tsx`, `ContactSubmission.telegram*` fields, `Contact.tsx` redirect to `telegramUrl`). It typechecks after `prisma generate`. The schema has the telegram columns — confirm the Neon DB has them (`prisma db push`) before relying on that feature in production.

### Manual (owner) — from the security audit
- Rotate secrets: Neon `DATABASE_URL` password, Vercel `NEXTAUTH_SECRET`, Telegram bot token.
- Reset deployed admin passwords.

---

## How to resume
1. `git checkout chore/repo-cleanup`
2. `cd site && npx tsc --noEmit` (should be 0) → `npm run build` (final gate).
3. Pick up REMAINING items 1–5 above.
