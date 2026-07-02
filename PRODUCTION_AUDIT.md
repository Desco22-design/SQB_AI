# SQB AI Department — Production Readiness Audit (Adversarial)

> **Purpose:** Adversarial ("red-team") production-readiness audit. Every reviewer acts as a
> hostile professional trying to break, exploit, or discredit the platform BEFORE real users /
> attackers do. Nothing is assumed safe. This single file is the durable record — if the
> assistant loses context, **this file is the source of truth**. Resume by reading the
> Progress Tracker and continuing any `PENDING` domain.
>
> - **Date started:** 2026-07-02
> - **Target:** `site/` — Next.js 14 (App Router), Prisma + Neon Postgres, NextAuth admin,
>   Telegram contact integration, i18n (uz/ru/en), deployed on Vercel (`sqb-ai-jx5a`).
> - **Method:** Parallel specialized adversarial subagents → findings compiled here → verified →
>   prioritized remediation plan.

---

## Severity legend
- **CRITICAL** — data loss, security breach, or guaranteed prod outage. **Blocks release.**
- **HIGH** — real bug / vuln / ops gap likely to bite in production. Fix before launch.
- **MEDIUM** — maintainability / resilience / correctness concern. Fix soon.
- **LOW** — polish, style, minor.

---

## Progress Tracker
| # | Domain | Adversary persona | Status |
|---|--------|-------------------|--------|
| 1 | Security & offensive (hacker/AppSec) | security-reviewer | ✅ DONE |
| 2 | System architecture & scalability | architect | ✅ DONE |
| 3 | Database & data integrity | database-reviewer | ✅ DONE |
| 4 | Code quality & correctness (senior dev) | typescript-reviewer | ✅ DONE |
| 5 | Business processes / user journeys | business-analyst | ✅ DONE |
| 6 | DevOps / build / deploy / ops | senior-devops | ✅ DONE |
| 7 | QA / functional / edge / stress | qa-tester | ✅ DONE |
| 8 | Copywriting / localization (uz/ru/en) | copywriter | ✅ DONE |
| 9 | Web performance / Core Web Vitals | performance-optimizer | ✅ DONE |

---

## Executive summary

**Verdict: 🔴 NOT production-ready yet. Do NOT open to real traffic until the P0 list below is done.**
All 9 adversarial domains completed. The codebase has a **genuinely strong security foundation** (bcrypt + anti-enumeration auth, magic-byte upload validation, honeypot + escaping, strict CSP/security headers, `requireAuth()` on every mutation, gitignored/never-committed secrets, safe-mode seed). The problem is a **small number of concentrated, high-blast-radius blockers** — a known framework CVE, a data-loss-prone deploy pipeline, and a no-cache/no-error-boundary rendering model — plus correctness gaps in the admin content workflow. These are fixable in one focused hardening sprint.

**7 CRITICAL blocker themes (de-duplicated across domains):**
1. **Next.js 14.2.15 → CVE-2025-29927 middleware auth-bypass** — admin panel + applicant PII readable **unauthenticated**; admin pages have no own session check. → upgrade `next` ≥14.2.25 + add `getServerSession` per admin page/layout.
2. **`prisma db push` in the build command, no migrations, shared dev/prod Neon DB, 6h retention, no backups** — the #1 data-loss engine (already bit us once this session). → `migrate deploy` + committed migrations + separate dev branch + PITR/backups + seed prod-guard.
3. **`force-dynamic` + zero caching on every public page** — 10 uncached DB round-trips per request → TTFB/LCP tied to Neon, connection-exhaustion + cost at scale. → ISR/`unstable_cache` + revalidate on admin writes.
4. **No error boundaries** (`error.tsx`/`global-error.tsx`/`not-found.tsx`) — one DB blip 500s the entire site with the raw Next screen.
5. **Projects "Table" view crashes** (`tx.impact[0]`) on any admin project without impact metrics → kills the section for all visitors.
6. **Admin content renders BLANK for UZ & EN** when only the RU tab is filled — and RU is the *only* tab flagged required; this is the **default admin workflow**, not an edge case.
7. **`sharp` not installed** — next/image optimization falls back to slow WASM on serverless → timeouts/heavy LCP for the large images.

**Cross-cutting HIGH themes:** Telegram webhook fails **open** if secret unset; in-memory rate limiting is bypassable on serverless (login brute-force, form/track flooding); careers apply flow **loses which vacancy** the candidate applied to and labels everyone "intern"; unbounded `findMany` + unindexed webhook lookup + unbounded `PageView`; exposed prod secrets need rotation; **zero observability** (no logs/health/Sentry/alerts — a wiped DB still returns HTTP 200); no CI and code-rollback can't reverse a schema push; soft-404s (HTTP 200) on all detail routes; contact email conflict (`info@` vs `ai@`) + wrong RU university name; 187 KB First-Load JS + oversized images.

**What this means:** the site *looks* done and returns 200s, but a single Neon hiccup, a schema edit, an unauthenticated `/admin` probe, or an admin saving a record in only Russian each independently degrades or breaks production. Fix P0, then P1, then launch.

---
## ✅ Remediation progress — 2026-07-02 (code pass, verified `tsc` + `next build` green)
**Fixed in code:**
- ✅ **Next.js 14.2.15 → 14.2.35** + `sharp` installed (CVE-2025-29927 & related CVEs closed; image optimizer real). _[C1/PERF]_
- ✅ **Admin PII pages** (`admin`, `submissions`, `submissions/[id]`, `audit`, `stats`) now call `requireAdmin()` (`lib/require-admin.ts`) — page-level session gate, not middleware-only. _[C1]_
- ✅ **Telegram webhook fail-closed** — rejects when `TELEGRAM_WEBHOOK_SECRET` unset. _[SEC HIGH]_
- ✅ **Error boundaries** `app/error.tsx` + `app/global-error.tsx` + `app/not-found.tsx`. _[C4]_
- ✅ **`notFound()`** on `/careers/[id]`, `/news/[id]`, `/events/[id]` (real 404, no soft-200). _[QA HIGH]_
- ✅ **Projects Table crash** guarded (`tx.impact[0]` bounds check). _[C5]_
- ✅ **Blank UZ/EN admin content** fixed — `pickLangStrict` now cross-locale fallback (`lib/i18n-utils.ts`). _[C6]_
- ✅ **ISR caching** — public pages `force-dynamic` → `revalidate = 60` (kills per-request 10-query fan-out; `/careers` now Static). _[C3/PERF]_
- ✅ **`vercel.json`** (`regions:["iad1"]` co-located w/ Neon us-east-1) + `engines: node 20.x`. _[DEVOPS]_
- ✅ **`lib/env.ts`** fail-fast on missing `DATABASE_URL`/`NEXTAUTH_SECRET` (imported by `prisma.ts`). _[DEVOPS]_
- ✅ **Contact double-failure** — returns 502 (not false `ok:true`) when DB insert AND Telegram both fail. _[BIZ/QA]_
- ✅ **`deleteImageByUrl`** path-containment (KEY_RE + resolve) matching `readImage`. _[CODE]_
- ✅ **Middleware matcher anchored** `(?!login(?:/|$))`. _[SEC LOW]_
- ✅ **Hero rAF loop bounded** — 60fps only during fade windows, idle otherwise. _[PERF HIGH]_
- ✅ **`briefcase-3d` 802 KB PNG → 31 KB WebP** (960px) + PNG deleted. _[PERF HIGH]_
- ✅ **Copy:** `Oy ma oy`→`Oyma-oy`, UZ `F.I.O`→`To‘liq ism`, RU `«Янги Узбекистан»`→`«Новый Узбекистан»`. _[COPY]_
- ✅ Junk removed (`*.out` logs, root `karyera.png`) + `*.out` gitignored.

**⚠️ Still requires YOUR Neon/Vercel dashboard (cannot be done in code):**
- 🔴 **Rotate the 4 exposed secrets** (NEXTAUTH_SECRET, Neon DB password, Telegram bot token, webhook secret).
- 🔴 **Separate dev DB** (Neon branch) + move `prisma db push` out of build to **committed migrations + `migrate deploy`** + enable **Neon PITR/backups**. _(Build still runs `db push` until migrations exist — documented; do NOT edit schema destructively meanwhile.)_
- 🟠 Delete the 3 unused Vercel projects; set prod env vars there.
- 🟠 Shared-store **rate limiting** (Vercel KV / Upstash) — needs an infra binding.

**🟠 Remaining P1 code items (deferred — need care / schema / bigger refactor):**
- Careers apply: capture **which vacancy** + derive submission type (needs `ContactSubmission` columns + `useSearchParams` w/ Suspense so it doesn't break ISR).
- Zod server-side validation of `direction/status/type/category` + date validation; Unicode-aware `slugify` + `P2002` handling.
- Paginate admin submissions list; index `telegramChatId`; `PageView` retention/rollup.
- Framer-Motion trim / real lazy-load (First-Load JS still ~183 KB); team/gallery image resize.
- a11y (label `htmlFor`, `role=alert`, `prefers-reduced-motion`); email `info@`↔`ai@` decision.
---

---

## Orchestrator preliminary findings (seed — to be confirmed by agents)
- **[CRITICAL candidate] `prisma db push` runs inside the production build command.**
  `package.json` → `"build": "prisma generate && prisma db push --skip-generate && next build"`.
  `db push` auto-syncs schema to the **production** DB on every deploy with no migration history
  and no review — a schema edit that drops/renames a column can silently destroy production data.
  Must move to `prisma migrate deploy`.
- **[HIGH candidate] Shared dev/prod database.** `.env` comment: "Production Postgres (Neon) —
  used by both dev and prod." Local `npm run db:seed` already destroyed prod content once this
  session. Neon history retention is only **6h** (`history_retention_seconds: 21600`) — a narrow
  recovery window.
- **[Good] Security headers present** (`next.config.mjs`): CSP, HSTS, X-Frame-Options DENY,
  nosniff, Referrer-Policy, Permissions-Policy. `/admin/*` protected by `next-auth/middleware`.
- **[MEDIUM candidate] CSP allows `'unsafe-inline'`** for script-src and style-src (no nonce);
  HSTS lacks `preload`.
- **[MEDIUM candidate] Public unauthenticated write endpoints** `/api/track` (PageView inserts)
  and `/api/contact` — need rate limiting / abuse controls confirmed.
- API surface to audit: `auth/[...nextauth]`, `admin/upload`, `track`, `media/[key]`,
  `contact`, `telegram/webhook`, `admin/submissions/[id]/messages`.

---

## 1. Security & offensive (AppSec / hacker)

- **[CRITICAL] Next.js 14.2.15 → CVE-2025-29927 middleware auth-bypass; admin auth relies ONLY on middleware** — `package.json` (`next@14.2.15`), `middleware.ts`
  - `npm audit`: CRITICAL "Authorization Bypass in Next.js Middleware", affected `>=14.0.0 <14.2.25`; installed 14.2.15. `/admin/*` is protected ONLY by `next-auth/middleware`; admin `page.tsx` files have **no own `getServerSession` check** — they query Prisma and render, trusting middleware. Exploit: forged `x-middleware-subrequest` header skips middleware → unauthenticated `GET /admin`, `/admin/submissions` renders full dashboard incl. **ContactSubmission PII** (names/emails/phones/chat) into HTML, no cookie needed. (Server Actions stay safe via `requireAuth`, so mutations aren't exposed — but reads are.) **#1 blocker.**
  - Fix: upgrade `next` to ≥14.2.25 (drop-in). Defense-in-depth: add `getServerSession(authOptions)` + `redirect("/admin/login")` in admin pages/layout.
- **[HIGH] Multiple additional Next.js CVEs in 14.2.15** — DoS via Server Components / Server Actions, image-optimization cache-key confusion + content injection, middleware→SSRF, cache-poisoning race. All fixed by the same `next` upgrade.
- **[HIGH] Telegram webhook signature check fails OPEN if `TELEGRAM_WEBHOOK_SECRET` unset** — `api/telegram/webhook/route.ts:113-119` — unlike `TELEGRAM_BOT_TOKEN` (hard-fails), secret check is skipped when falsy; `.env.example` presents it as optional. If unset → endpoint accepts ANY POST → forge `TelegramUpdate` to inject spoofed inbound `ContactMessage` rows into admin chat (social-eng) or burn bot API limits. Fix: make it mandatory (fail-closed, 500 if missing).
- **[MEDIUM] Rate limit + login brute-force protection are in-memory/process-local** — `lib/rate-limit.ts`, used by `auth.ts:59-61` — resets on cold start, ×instanceCount on serverless; "5 login attempts/5min" and "3 contact/min" far weaker in practice → slow brute-force of `sqbai@admin1/2/3` not reliably blocked. Fix: shared store (KV/Upstash).
- **[MEDIUM] Rate-limit IP key derived from client-influenceable `x-forwarded-for`** — `lib/rate-limit.ts:57-64` — on Vercel (vs Netlify's trusted `x-nf-client-connection-ip`), a client-set `X-Forwarded-For` may yield a fresh bucket per request → bypass all limits. **Needs manual verification against actual host.** Fix: use platform trusted header.
- **[MEDIUM] Dev & prod share one Neon DB** — local dev/seed operates on real applicant PII; blast radius. (Cross-confirmed.) Fix: separate Neon branch.
- **[LOW]** middleware matcher `(?!login)` not segment-anchored (fragile if a `/admin/login*` route is added) → use `(?!login(?:/|$))`. **[LOW]** CSP `script-src 'unsafe-inline'` in prod (no nonce), HSTS no `preload`. **[LOW]** vulnerable transitive deps: `undici`, `ws` (via Neon driver), `uuid`, `postcss` (build-only), `esbuild` (dev-only) — `npm audit fix` / upstream bumps.

**Blockers:** (1) Next.js CVE middleware bypass → upgrade + per-page session; (2) Telegram webhook fail-open → mandatory secret.
**Already good:** login = bcrypt + per-IP/email limit + anti-enumeration dummy-hash; upload = auth + size/MIME + **magic-byte sniffing** + server-gen keys + path containment; `/api/media` `nosniff` + `CSP default-src 'none'; sandbox`; **all 11 admin `actions.ts` call `requireAuth()` first**; contact honeypot + escapeHtml; **no `dangerouslySetInnerHTML`/`eval`/`child_process`/`NEXT_PUBLIC_` secrets**; `.env` gitignored & never committed; generic error messages (no stack/DB leak); Prisma prod logging = `["error"]`; seed random admin passwords + safe-mode.

## 2. System architecture & scalability

- **[CRITICAL] `force-dynamic` on every public page + zero caching → full DB fan-out per request** — `app/page.tsx:5,34-47`, `app/careers/page.tsx:10-17`, `app/news/[id]/page.tsx:4`, `app/events/[id]/page.tsx`, `app/careers/[id]/page.tsx:4`
  - Homepage fires **10 queries** in `Promise.all` on every hit; no `revalidate`/`unstable_cache`/ISR anywhere. At 50 req/s ≈ 500 Neon round-trips/s for content that changes a few times/day. Neon cold-start adds 0.5–3s. Bots crawling `/news/[id]` = N uncacheable fan-outs.
  - Fix: `export const revalidate = 300` (or `unstable_cache` + tags), drop `force-dynamic`; call `revalidatePath`/`revalidateTag` from admin mutations so edits still publish instantly.
- **[CRITICAL] No error boundaries — one DB blip 500s the whole route** — no `error.tsx`/`global-error.tsx`/`not-found.tsx` exist in `app/`
  - Every RSC awaits queries unguarded; `lib/queries.ts` has no try/catch. A 2s Neon hiccup/connection-cap/`ECONNRESET` during a spike = wall of 500s across the whole site with no fallback.
  - Fix: add `app/error.tsx` (retry) + `app/global-error.tsx` + `not-found.tsx`; combine with caching so an outage serves stale content; optionally make query fns return safe empties.
- **[HIGH] Per-instance Neon pools + serverless fan-out → connection-limit exhaustion** — `lib/prisma.ts:14-27` — each cold Vercel instance opens its own pool; with `force-dynamic`, connections scale with traffic → "too many connections" → 500s. Fix: pooled endpoint (`-pooler`), low `connection_limit`, cache reads, persist singleton on `globalThis` in prod too.
- **[HIGH] Dev & prod share one Neon DB** — `schema.prisma:7-10` — local `migrate reset`/`seed` mutates/wipes prod & rotates live admin creds. Fix: separate Neon branch per env.
- **[HIGH] Unbounded `findMany` (no `take`/pagination) across all list loaders** — `lib/queries.ts:17,36,95,121,171,…` — homepage loads ALL news/events/gallery; payload & cost grow forever. Fix: `take` limits (e.g. latest 6) + paginated "all" routes.
- **[HIGH] Over-fetching joins: `getProjects`/`getTeam` pull full related rows to use only `id`** — `lib/queries.ts:17-32,35-52` — `include:{team:true}` drags every member's full i18n JSON; M2M join paid twice per homepage render. Fix: `include:{team:{select:{id:true}}}`.
- **[MEDIUM]** `/api/media/[key]` has no Vercel branch (local-FS only) — any stored `/api/media/…` URL 404s in prod (`lib/storage.ts:52-89`).
- **[MEDIUM]** `PageView` insert on every visit — unbounded write-heavy table competing for connections (`api/track/route.ts:38-44`).
- **[MEDIUM]** In-memory rate limiter is per-instance → effective limit = 3×instanceCount on serverless (`lib/rate-limit.ts`). Fix: shared store (Vercel KV/Upstash).
- **[MEDIUM]** Contact drops data silently on DB failure while returning `ok:true`; Telegram `await`ed on response path (`api/contact/route.ts:177-196`).
- **[MEDIUM]** Admin messages poll every 4s re-reads ALL messages + fires a redundant write each time (`api/admin/submissions/[id]/messages/route.ts:22-35`). Fix: gate `updateMany` on actual unread, use `since` cursor.
- **[MEDIUM]** i18n stored as opaque `Json` — unqueryable/unvalidated, blind `as I18nText` cast (`queries.ts:11`). Fix: Zod-validate at write boundary.
- **[LOW]** Prod images depend on external hosts (unsplash/pravatar/flagcdn) — `next.config.mjs:42-49`. **[LOW]** No query/statement timeout (`prisma.ts`).

**Blockers:** force-dynamic+no-cache; no error boundaries; Neon pool exhaustion; shared DB; unbounded findMany; double-fetched joins.
**Already good:** `Promise.all` batching; `poolQueryViaFetch=true`; media route hardening (KEY_RE allowlist, immutable cache, `CSP default-src 'none'; sandbox`); contact honeypot+ratelimit+escapeHtml+single-use token; bounded rate-limiter w/ eviction; sensible indexes on high-write tables + cascade; Prisma externalized from webpack; strict prod CSP.

## 3. Database & data integrity

- **[CRITICAL] `prisma db push` in build; NO migrations dir; shared dev/prod DB; 6h PITR** — `package.json:8,12`
  - No `prisma/migrations/` exists. Every deploy diffs schema→live DB and applies destructive changes (drop/rename/narrow) with no CI prompt, no down-migration, no changelog. A future column rename silently `DROP COLUMN`s prod; a dev pushing a WIP schema hits prod data; only 6h Neon recovery window.
  - Fix: switch build to `prisma migrate deploy`; author `migrate dev --name …` locally + commit `migrations/`; separate dev DB; CI gate on `migrate diff` for destructive changes.
- **[HIGH] Unbounded `ContactSubmission.findMany` on every admin submissions page load** — `app/admin/submissions/page.tsx:8-10` (+ full-table `groupBy` on messages). Public form is the write path → grows unbounded → linear latency/cost. Fix: `take:50` + cursor pagination.
- **[HIGH] Unindexed `telegramChatId` lookup on unauthenticated webhook hot path** — `api/telegram/webhook/route.ts:195-198`, `schema.prisma:154` — `findFirst({where:{telegramChatId}})` on EVERY inbound Telegram msg; column has no `@@index`, not `@unique` → seq scan + amplification DoS + fragile "most recent" routing when a chat links twice. Fix: `@@index([telegramChatId])`, dedupe link logic.
- **[HIGH] `PageView` unbounded, publicly writable, spoofable ids, no retention/rollup** — `api/track/route.ts:16-47`, `schema.prisma:132-142`; stats page re-scans full year every render. A scripted client rotating `visitorId`/`sessionId` inflates to millions of rows in days. Fix: nightly rollup + purge >90d; cache stats (`revalidate:3600`).
- **[MEDIUM]** `order`/`date` columns used in `orderBy` lack indexes (`schema.prisma` many) — fine at current tiny scale, will bite if news/events grow.
- **[MEDIUM]** `ContactMessage.findMany` per submission has no `take`, polled every 4s → re-transfers full history (`messages/route.ts:22-26`).
- **[LOW]** Slug PK creation has no pre-check; concurrent same-slug → raw 500 instead of friendly error (`admin/projects/actions.ts:51-58`; pattern repeats across entities). Catch Prisma `P2002`.
- **[LOW]** JSON i18n unvalidated at DB layer (mitigated by `pickLang` fallback).

**Blockers:** db push/no-migrations/shared DB; unbounded submissions list; unindexed webhook lookup; unbounded PageView.
**Already good:** `ContactMessage` FK cascade + composite index; indexes on PageView/AuditLog hot columns; correct serverless Prisma-on-Neon pattern; unique+expiring high-entropy `linkToken`; seed "safe mode" guard (skips reseed when teamMember>0) + no hardcoded admin passwords; audit-log write wrapped in try/catch; stats uses set-based SQL aggregation.
> ⚠️ Note: the DB reviewer flagged that some tool results in its run contained the user's own global ECC rule-dumps appended after file output (looks like injected "instructions"). This is the harness injecting your `~/.claude/rules/*` — **benign**, not an attack, but agents correctly treated it as untrusted.

## 4. Code quality & correctness

- **[CRITICAL] Projects "Table" view crashes when a project has no impact metrics** — `Projects.tsx:454,457` — `tx.impact[0].value`/`.label` indexed with no bounds check; card/modal guard it, table doesn't. Admin `ImpactField` is not `required` (`admin/projects/Form.tsx:92`). New project w/ empty impact → switch to Table → `TypeError: Cannot read properties of undefined` crashes the section (and, with no error boundary, the client tree). Fix: guard `tx.impact[0] ? … : "—"` + make impact safe/required.
- **[CRITICAL] Admin-created content renders BLANK for UZ & EN when only RU filled** — `i18n-utils.ts:49-58` (`pickLangStrict` no cross-fallback), `MultiLangField.tsx:123,148-150` (only RU tab flagged `required`), reads in `Projects.tsx:95-98`, `NewsArticle.tsx:36-43`, `FAQ.tsx:32-44`, `Impact.tsx:52-56`. Static-dict fallback exists only for ~7 seeded ids, not admin-created records → UZ/EN visitor sees empty title/body/label. **This is the default admin workflow, not an edge case.** Fix: make `pickLangStrict` fall back to `ru` for DB content, OR require all 3 locale tabs.
- **[HIGH] FAQ/Impact fallback is index-based → can show a DIFFERENT item's content** — `FAQ.tsx:32-44`, `Impact.tsx:52-56` — `t.faq.items[i]`/`t.impact.items[i]` fall back by array position. Reorder/delete an item → EN visitor sees the static answer written for whatever used to be in that slot (silently wrong, not just missing). Fix: key fallback by stable id or drop it.
- **[HIGH] `slugify` strips all Cyrillic → empty/colliding IDs; no `P2002` handling** — `lib/slug.ts:1-8` (ASCII `\w`), `admin/*/actions.ts` create fns. RU-only title → `slugify=""` → generic constant (`"news"`/`"vacancy"`); `createTeamMember` has NO fallback → `id:""`. Two Cyrillic-only records collide → unhandled Prisma `P2002` → raw error page, record not saved. Fix: Unicode/transliterate slugify + random suffix fallback + try/catch P2002 → friendly error.
- **[HIGH] Server actions don't validate literal-union fields (`direction`/`status`/`type`/`category`)** — `admin/{projects,vacancies,news}/actions.ts` read raw strings; `queries.ts:30-31,102,116,162` unsafe `as` cast back. Forged POST (any admin session) writes out-of-union value → blank pill / wrong ternary branch. Fix: Zod enum validation server-side.
- **[MEDIUM] `deleteImageByUrl` lacks the path-containment check that `readImage` has** — `lib/storage.ts:91-116` vs `52-89`. `image` is free-form admin string; a crafted `/uploads/../../…` value → later image change unlinks an arbitrary file. Fix: reuse `KEY_RE` + `path.resolve` containment.
- **[MEDIUM] Vacancy 404 renders literal "404" as heading AND message** — `careers/[id]/VacancyDetail.tsx:41-43` (not localized, no real message). Fix: add `careers.notFound`.
- **[MEDIUM] Empty/invalid date crashes News/Event create & update** — `admin/{news,events}/actions.ts` `new Date(s(form,"date"))` unvalidated; date inputs not `required` → `Invalid Date` → `RangeError` unhandled. Fix: `required` + `Number.isNaN(getTime())` guard.
- **[LOW]** dead `Field.full` prop (`Contact.tsx`); `ImageUpload.value` unvalidated before hitting `image` column.

**Blockers:** table crash on empty impact; blank UZ/EN for admin content; index-based fallback shows wrong item; Cyrillic slug collisions unhandled; no union validation.
**Already good:** auth brute-force protections (per-IP/email limit, timing-safe enum defense); contact honeypot + graceful degradation; `readImage` path-traversal defense; audit logging defensively wrapped; `broadcastTelegram` batches (15) w/ per-recipient failure isolation; correct `useMemo`/stable keys + modal ESC cleanup.

## 5. Business processes / user journeys

- **[HIGH] Careers "apply" flow loses which vacancy the candidate applied to** — `VacancyDetail.tsx:131-137` → `careers/page.tsx:27` → `api/contact/route.ts` → `schema.prisma:144`
  - Evidence: apply button is a plain anchor `href="/careers#careers-apply"` with no vacancy id/title in query/hash/state. It lands on a shared intern form with no vacancy field. `ContactSubmission` has no `vacancyId`/`vacancyTitle`.
  - Impact: recruiters get every application with zero indication of which role → broken hiring funnel, misrouted/dropped candidates.
  - Fix: pass `?vacancy=<id>#careers-apply`, read in Contact, submit it, add `vacancyId`/`vacancyTitle` column + Telegram msg + admin detail.
- **[HIGH] Every vacancy applicant is filed & labeled "Intern" regardless of employment type** — `careers/page.tsx:27`, `admin/submissions/List.tsx:29-32,274-277`
  - Evidence: careers form is hard-coded `defaultMode="intern" lockMode`; a senior full-time applicant is POSTed as `type:"intern"` and gets the "internship application received" Telegram template (`telegram/webhook/route.ts:35`).
  - Impact: high-value hires mislabeled as interns and sent the wrong confirmation — trust-eroding.
  - Fix: derive submission `type` from the vacancy's employment type (or a distinct `vacancy-application` type) and pick the confirmation template accordingly.
- **[MEDIUM] Forced off-site Telegram redirect on submit; no real on-site confirmation** — `Contact.tsx:91-97`, `api/contact/route.ts:215-220`
  - Evidence: on success does `window.location.href = json.telegramUrl` for ALL submitters; only in-page feedback is the button checkmark. No success panel / "we'll reply in 1–2 days".
  - Impact: users without Telegram (common on desktop) are yanked to a t.me page with no reassurance → looks broken, lost leads.
  - Fix: show explicit on-site success + next-steps; make Telegram hand-off secondary/optional.
- **[MEDIUM] False "success" when BOTH DB insert and Telegram fail** — `api/contact/route.ts:177-220`
  - Evidence: DB `create` and `sendTelegramMessage` both in silent try/catch; handler always returns `{ok:true}`. If Neon + Telegram both down, lead is lost but user sees success.
  - Fix: if both persistence and notification fail, return non-OK + log.
- **[MEDIUM] "Direction" dropdown = 6 fixed generic options, decoupled from real vacancies, and optional** — `Contact.tsx:11-18`, `api/contact/route.ts:156,161`
  - Evidence: hard-coded `DIRECTION_OPTIONS`; `direction` not in server required-field check → can be blank. Combined with lost vacancy context, an application can reach staff with no role signal at all.
  - Fix: source options from live vacancies or drop once vacancy context is passed.
- **[LOW] Admin submission detail hard-codes Uzbek strings** — `admin/submissions/[id]/page.tsx:186-250`, `List.tsx:280` (e.g. `✓ Ulangan`, `… yangi xabar`) — RU/EN admins see mixed language. Fix: move into admin i18n.
- **[LOW] Contact email mismatch: site shows `info@sqb.uz` (`Contact.tsx:151`, `Footer.tsx:49`) but docs say `ai@sqb.uz`** — reconcile & ensure the published mailbox is monitored.
- **[LOW] Wrong-locale first paint** — `LanguageProvider.tsx:40-46`: initial state is `uz` on server; stored locale applied only in client `useEffect` → RU/EN returning visitor briefly sees Uzbek. Fix: persist locale in cookie, read server-side.

**Blockers (this domain):** (1) vacancy context lost end-to-end; (2) all applicants handled as interns. No CRITICAL security/data-loss in traced flows.

**Already good:** submission persisted before Telegram call; honeypot + IP rate limit (3/min) + email regex + length caps server-side; Telegram HTML-escaped + webhook verifies `x-telegram-bot-api-secret-token`; partner/intern pills; vacancy 404 handled with back link; VacancyGrid empty state; locale persisted in localStorage across nav; 3-language Telegram confirmation with token-expiry fallbacks.

## 6. DevOps / build / deploy / ops

- **[CRITICAL] `build` runs `prisma db push` against prod on every deploy** — `package.json:8` — force-syncs schema into the shared prod Neon DB; a destructive change either aborts the CI build (broken deploy) or wipes column data; no migration artifact to review/revert. Fix: `"build": "prisma generate && next build"`; apply schema via committed migrations + `prisma migrate deploy` as a gated pre-deploy step, never inside build.
- **[CRITICAL] Dev & prod share ONE Neon DB; local scripts hit prod & can wipe curated content** — `.env:1` — `db:seed` `deleteMany`s aiDirection/kpi/gallery/faq and upserts projects/team/news/events; 6h history; no backups/PITR configured. Fix: dedicated dev Neon branch; guard `seed.ts` to refuse the prod host unless `ALLOW_PROD_SEED=1`; enable Neon PITR / scheduled `pg_dump`.
- **[HIGH] Real production secrets sit in plaintext in local `.env`** — `.env` (DB password, `NEXTAUTH_SECRET`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_WEBHOOK_SECRET`). **Verified: `.env` is gitignored and was NEVER committed** (checked `git log -S`/history — clean). Risk: leaked `NEXTAUTH_SECRET` forges 7-day admin JWTs; leaked DB password = full prod DB access; leaked bot token = bot impersonation. Fix: treat all four as exposed and **rotate** (regenerate Neon role pw, `openssl rand -base64 32` for NEXTAUTH_SECRET, reissue Telegram token via BotFather + re-run setWebhook), store prod values only in Vercel env vars. _(Secret values deliberately not reproduced in this file.)_
- **[HIGH] No deploy config exists; CLAUDE.md's `netlify.toml` claim is false** — no `vercel.json`/`netlify.toml`/`.vercelignore`/`.nvmrc`/`engines`. Node version unpinned; no region (functions may run far from us-east-1 Neon); default memory/timeout → 504 on slow admin query. Fix: add `site/vercel.json` (`regions:["iad1"]`, per-route `functions` maxDuration/memory), `"engines":{"node":"20.x"}`, `.vercelignore`; pick Vercel-only and remove dead `@netlify/blobs` path + stale CLAUDE.md line.
- **[HIGH] Effectively zero observability** — `grep console.` in app/lib = **0 hits**; bare `catch {}` swallows errors; no Sentry, no health endpoint, no uptime/alerting. A wiped DB still returns HTTP 200 (empty sections) so uptime pings stay green — first "alert" is a stakeholder hours later. Fix: `app/api/health` (`SELECT 1`), Sentry (`@sentry/nextjs`), structured logging to stdout, build-failure notifications, content-aware uptime monitor.
- **[HIGH] No CI/CD or tests; code rollback can't undo a destructive `db push`** — no `.github/workflows`, no test runner/script. Vercel instant-rollback restores code but not a dropped column → `P2022` errors site-wide. Fix: PR CI (`migrate diff` lint, `next build`, `next lint`, tests) + migration-based schema so rollback is real; preview deploys against dev DB only.
- **[MEDIUM] Four Vercel projects on one repo** (`sqb-ai`, `sqb-ai-db6o`, `sqb-i-do`, `sqb-ai-jx5a`) — no canonical target; re-link risk → wrong env/DB; each re-runs the destructive build (doubled `db push` exposure). Fix: delete/disconnect the 3 unused, document `sqb-ai-jx5a` as canonical.
- **[MEDIUM] `DATABASE_URL` uses direct (non-pooled) Neon endpoint** (`.env:1`, no `-pooler`) → connection exhaustion under spikes. Fix: pooled URL for runtime, `DIRECT_URL` for migrate.
- **[MEDIUM] No fail-fast env validation** — missing/blank secret surfaces as lazy 500s (`prisma.ts:16`, `auth.ts:98`). Fix: `lib/env.ts` validating required vars at import.
- **[LOW]** `NEXTAUTH_URL=http://localhost:3000` in `.env` (must be overridden in Vercel); HSTS lacks `preload`.

**Blockers:** db push in build; shared DB + no backups; exposed prod secrets (rotate); no deploy config; no observability; no CI + un-reversible schema rollback.
**Already good:** `.env` gitignored & never committed; strict fail-closed CSP + full security headers + `poweredByHeader:false`; auth = bcrypt + per-IP/email rate limit + constant-time dummy compare + JWT; seed never overwrites admins / random passwords; Prisma global singleton + `poolQueryViaFetch`; binaryTargets include `rhel-openssl-3.0.x`.

## 7. QA / functional / edge / stress

- **[HIGH] Public endpoints allow unbounded DB row flooding (process-local rate limit ineffective on serverless)** — `api/track/route.ts`, `api/contact/route.ts`, `lib/rate-limit.ts` — verified: 6-burst to `/api/track` all 200 (6 rows); `/api/contact` created row + Telegram from one curl. In-memory Map limit × instanceCount, fresh budget per rotated IP → PageView/ContactSubmission flooding + Telegram spam. Fix: shared store (KV/Upstash) + global daily cap + dedupe/batch track.
- **[HIGH] Soft-404: detail routes return HTTP 200 for nonexistent IDs** — `careers/[id]/page.tsx`, `news/[id]/page.tsx`, `VacancyDetail.tsx:36-52` — `/careers/does-not-exist` → 200 (renders "404" text but status 200); 3000-char slug → 200. Never calls `notFound()`. SEO indexes junk; uptime can't tell hits from misses. Fix: `if(!x) notFound()` server-side + `app/not-found.tsx`.
- **[HIGH] No error boundary** — no `app/error.tsx`/`global-error.tsx`; `force-dynamic` + direct Prisma → any DB failure shows raw Next 500 (no locale/retry/style). (Cross-confirmed by architect.) Fix: add boundaries + degrade.
- **[MEDIUM] Weak email regex accepts invalid addresses** (client+server share `^[^\s@]+@[^\s@]+\.[^\s@]+$`) — `contact/route.ts:167`, `Contact.tsx:61`: accepts `foo@bar..com`, `a@b.c`; phone unvalidated (`"1"` ok). Fix: Zod `.email()` + phone rules server-side.
- **[MEDIUM] Silent data loss on contact submit when both DB+Telegram fail** — `contact/route.ts:177-213` returns `{ok:true}` anyway. (Cross-confirmed by business + architect.) Fix: return 500 + log.
- **[MEDIUM] No `prefers-reduced-motion` anywhere** (0 hits) — `VacancyGrid.tsx:47-54`, `Contact.tsx:216-221`, hero/cards animate unconditionally. WCAG 2.3.3 / vestibular risk. Fix: `useReducedMotion()` guard or global media override.
- **[MEDIUM] Form a11y gaps** — `Contact.tsx`/`SelectField.tsx`: no `htmlFor`/`id` label association (0 hits); error div not `role="alert"`/`aria-live`; no `aria-invalid`/`aria-describedby`. Fix: associate labels, announce errors.
- **[MEDIUM] Contact form fully JS-dependent, no native HTML5 constraints** — no `required`/`maxLength`/`type="email"` on inputs (0 `required`); JS-off/hydration-fail → dead form. Fix: add native constraints + `<form action>` fallback.
- **[LOW]** `/api/track` accepts arbitrary `visitorId`/`path` → analytics poisoning / high-cardinality bloat. **[LOW]** `clientIp()` fallback `"unknown"` collapses all users into one bucket → self-DoS if IP headers absent. **[LOW]** stored contact payloads raw (safe now via React escape + Telegram escapeHtml; latent risk for future CSV/HTML/PDF export).

**Recommended stress/load plan (k6, against a THROWAWAY Neon branch — never shared prod):** A) `/api/track` flood 0→500 VUs, rotate `X-Forwarded-For`, assert limiter caps inserts (it won't today). B) `/api/contact` 100 VUs/60s rotated IPs, count rows/Telegram slipping past 3/min; honeypot variant. C) Telegram-down: mock 8s+, 20 RPS, verify fast return + no socket pileup. D) cold-read spike 200 VUs on `/careers` & `/` (`force-dynamic`), p95<2.5s, watch Neon "too many connections". E) 404 storm 100 RPS on random ids. Global: error<1% (excl. intended 429), p95<2.5s, 0 unhandled 500s, DB conns<pool max, rate-limit Map eviction at MAX_KEYS=10k.

**Blockers:** ineffective rate limiting (floodable); soft-404s; no error boundary.
**Already good:** ✅ upload hardened (auth + 8MB + MIME allowlist + **magic-byte sniffing**); honeypot before rate-limit, off-screen + `tabIndex=-1`; Telegram HTML-escaped + no `dangerouslySetInnerHTML`; length caps + whitespace-only rejected (400); correct HTTP semantics (405/400); vacancy empty state; Projects table `overflow-x-auto min-w-[720px]` (mobile ok); `pickLang` fallback robust.
> ⚠️ QA left test rows in the shared prod DB (`qa-probe` PageViews + a `<script>` ContactSubmission) — **purged by orchestrator** (see cleanup below).

## 8. Copywriting / localization

- **[HIGH] Contact email conflict `info@sqb.uz` vs `ai@sqb.uz`** — Contact card + Footer show `info@sqb.uz` (`Contact.tsx:151`, `Footer.tsx:49`); FAQ in all 3 langs + CLAUDE.md say `ai@sqb.uz` (`i18n.ts:658` en, `:1140` uz, `:1621` ru). Public contradiction → mail may hit an unmonitored box. Fix: pick one canonical, unify, move email into i18n.
- **[HIGH] Wrong RU university name `Новый Узбекский Университет`** ("New Uzbek University") — `seed.ts:390,421,459` (ru n1/n4/e3). Official RU is `Университет «Новый Узбекистан»`. Same uni rendered 3 ways across code (i18n news correct, events uses `«Янги Узбекистан»`, seed wrong). Factual error on RU news/events. Fix before seeding prod; also fix `i18n.ts:1547-1548`.
- **[MEDIUM] Garbled RU Call Center AI copy** — `i18n.ts:1386,1388`: stray benefit sentence pasted into the *solution*; `понижает`→`снижает нагрузку`; tense/subject issues in problem. Seed version is cleaner (i18n≠seed). Fix per seed phrasing.
- **[MEDIUM] Broken Uzbek "Oy ma oy dinamika"** — `admin-i18n.ts:604` → should be `"Oyma-oy dinamika"`/`"Oylik dinamika"`.
- **[MEDIUM] Inconsistent UZ "submissions": `Zayavkalar` vs `Arizalar`** — `admin-i18n.ts:567,625` vs `:597`. `Zayavka` is a Russism; use `Arizalar` everywhere (correct for a bank).
- **[MEDIUM] Mixed apostrophe glyphs in UZ** (curly ‘ U+2018 vs straight ') across `i18n.ts` — visibly renders two different apostrophes for `oʻ/gʻ`. Standardize one glyph.
- **[MEDIUM] Dev slang / anglicisms in careers copy** — RU `прода` (`i18n.ts:1588`), UZ `productioncha`/`konsept` (`:1107,:957`), untranslated `AI banking` (uz `:1079`). Unprofessional for a bank. Fix: RU `от идеи до продакшена`, UZ `ishga tushirishgacha`.
- **[LOW]** `F.I.O` Russism (uz `i18n.ts:1169`) → `To‘liq ism`. **[LOW]** Address romanization `Shakhrisabz` vs `Shahrisabz` (`:708` vs `:1190`). **[LOW]** `Compliance` untranslated in UZ KPI labels (`seed.ts:97`,`i18n.ts:968`) — inconsistent w/ `Mos kelmaslik/Muvofiqlik`. **[LOW]** seed vs i18n disagree on event e2 name & KPI labels (whichever renders depends on data state). **[LOW]** UZ `hakaton` vs `Hackathon`, `Universiteti` vs `universiteti` casing drift.

**Blockers:** email conflict (public contradiction); wrong RU university name (factual). Both customer-facing.
**Already good:** ✅ **No remaining "IT company" mislabel** — vacancy `offer` says "one of Uzbekistan's leading **banks**" in all 3 langs; past error fully fixed. Phone identical everywhere. All 3 locales structurally complete (no empty/placeholder/mis-slotted strings). Product names consistent & untranslated. RU typography strong (« », ё, em-dashes).

## 9. Web performance / Core Web Vitals

- **[CRITICAL] `force-dynamic` + 10 uncached parallel DB round-trips per request** — `page.tsx:5,35-47`, `careers/page.tsx:10,13-17` — `poolQueryViaFetch=true` makes each an HTTP round-trip to Neon; TTFB tied to Neon latency + cold start on every view; blocks LCP/FCP. **Top perf lever.** (Cross-confirmed by architect.) Fix: ISR `revalidate` / `unstable_cache` + revalidate on admin writes.
- **[CRITICAL] `sharp` NOT installed** — `package.json` (confirmed absent) — next/image falls back to slow WASM Squoosh; decoding 802KB 2000×2000 PNG per size/format on serverless risks function timeout/memory. Fix: `npm install sharp`, verify against deploy target.
- **[HIGH] `briefcase-3d.png` 802KB / 2000×2000** for a 480px-max display — `public/careers/briefcase-3d.png` (`Careers.tsx:59-66`). Fix: pre-resize ~960px + WebP/AVIF (<100KB).
- **[HIGH] First Load JS 179–187KB gzip > 150KB landing budget** (verified `next build`) — Framer Motion imported unconditionally in ~9 sections. Fix: replace simple `whileInView` fades with CSS/IntersectionObserver; keep Framer only where justified.
- **[HIGH] `next/dynamic` on homepage sections gives NO real lazy benefit** — `page.tsx:23-32` (no `ssr:false`, no viewport gate) → chunks still in First Load JS. Fix: viewport-gated dynamic import or accept static + trim Framer.
- **[HIGH] Hero infinite `requestAnimationFrame` loop never terminates** — `Hero.tsx:13-46` — 60 wake-ups/s for whole session → CPU/battery/INP. Fix: run rAF only within fade windows.
- **[HIGH] Team marquee duplicates all photos (`[...members,...members]`) using 1224×1584 scanned-page PNGs for 270px cards** — `Team.tsx:25,50-67`. Fix: pre-resize to ~540×720 WebP; clones `aria-hidden` (a11y already ok) but still 2× network.
- **[MEDIUM]** Gallery sources 4–8× oversized (`m02.jpg` 1600×2133/616KB) — resize on upload in `lib/storage.ts`. **[MEDIUM]** byte-identical images duplicated across `news/*` & `events/*` URLs → double fetch on homepage. **[MEDIUM]** `/careers` bundles full `Projects` (card+modal) despite `tableOnly` — split `ProjectsTable`.
- **[LOW]** middleware 49.4KB (admin-only). **[LOW]** hero video has no `poster` (LCP delay if video is LCP element).

**Blockers:** force-dynamic no-cache; missing `sharp`; oversized hero/team/gallery images; >150KB JS; fake lazy-loading; infinite rAF; marquee duplication.
**Already good:** `next/image` + responsive `sizes` everywhere; careers teaser correctly no `priority`; **smart fonts** (system stack for body, single-axis mona-sans subset + `font-display:swap`); CSS ~15.7KB gzip (under budget); `/api/track` `keepalive` non-blocking; `Promise.all` batching + single `getAllSectionHeadings`; hero `aspect-ratio` container (no CLS).

---

## Consolidated prioritized remediation plan

### 🔴 P0 — MUST fix before any production launch (security, data-loss, crashes, core correctness)
- [ ] **Upgrade `next` 14.2.15 → ≥14.2.25** (`site/package.json`) — closes CVE-2025-29927 + several DoS/cache CVEs (drop-in). _[SEC]_
- [ ] **Add `getServerSession(authOptions)` + `redirect("/admin/login")` in admin pages/layout** — don't rely on middleware alone. _[SEC]_
- [ ] **Stop mutating schema in build**: change build to `prisma generate && next build`; author + commit `prisma/migrations/`; run `prisma migrate deploy` as a gated pre-deploy step. _[DATA/DEVOPS]_
- [ ] **Separate dev DB from prod** (Neon branch); point local `.env` at dev; guard `seed.ts` to refuse the prod host; enable Neon PITR / scheduled `pg_dump` backups. _[DATA/DEVOPS]_
- [ ] **Rotate the 4 exposed prod secrets** (NEXTAUTH_SECRET, Neon DB password, Telegram bot token, webhook secret) and keep prod values only in Vercel env. _[DEVOPS/SEC]_
- [ ] **Make `TELEGRAM_WEBHOOK_SECRET` mandatory (fail-closed)** — `api/telegram/webhook/route.ts:113-119`. _[SEC]_
- [ ] **Add error boundaries + 404**: `app/error.tsx`, `app/global-error.tsx`, `app/not-found.tsx`; call `notFound()` in `/careers/[id]`, `/news/[id]`, `/events/[id]`. _[ARCH/QA]_
- [ ] **Fix Projects Table crash** on empty impact — guard `tx.impact[0]` (`Projects.tsx:454,457`). _[CODE]_
- [ ] **Fix blank UZ/EN admin content** — make `pickLangStrict` fall back to `ru` for DB content, or require all 3 locale tabs in `MultiLangField`. _[CODE]_
- [ ] **Add caching to public pages** — `revalidate`/`unstable_cache` + `revalidateTag`/`revalidatePath` from admin mutations; drop `force-dynamic`. _[ARCH/PERF]_
- [ ] **`npm install sharp`** and verify image optimization on the real deploy target. _[PERF]_

### 🟠 P1 — before real / marketing traffic
- [ ] Shared rate-limit store (Vercel KV / Upstash) for login + contact + track; verify the host's trusted IP header (XFF spoofing). _[SEC/QA/ARCH]_
- [ ] Use Neon **pooled** endpoint (`-pooler`) + `connection_limit`; keep direct URL only for migrations. _[ARCH/DEVOPS]_
- [ ] Paginate/bound `findMany`: admin submissions list, homepage news/events/gallery (`take`); index `telegramChatId`; add `PageView` retention/rollup + validate `path`. _[DATA]_
- [ ] **Careers apply flow:** pass `?vacancy=<id>`, add `vacancyId`/`vacancyTitle` to `ContactSubmission` + Telegram + admin detail; derive submission `type` from the vacancy (stop labeling everyone "intern"); show an on-site success state; return non-OK when both DB + Telegram fail. _[BIZ]_
- [ ] **Observability:** `app/api/health` (`SELECT 1`), Sentry, structured logging (replace bare `catch {}`), content-aware uptime monitor, build-failure alerts. _[DEVOPS]_
- [ ] **CI:** GitHub Actions on PRs — `next build`, `next lint`, `prisma migrate diff` (fail on destructive), tests. _[DEVOPS]_
- [ ] **Deploy config:** `site/vercel.json` (`regions:["iad1"]`, function `maxDuration`/memory), `"engines":{"node":"20.x"}`, `.vercelignore`; delete the 3 unused Vercel projects; remove dead `@netlify/blobs` path + fix CLAUDE.md. _[DEVOPS]_
- [ ] Env fail-fast validation (`lib/env.ts`) for all required secrets at import. _[DEVOPS]_
- [ ] Server-side validation: Unicode-aware `slugify` + random-suffix fallback + `P2002` handling; Zod enums for `direction/status/type/category`; validate dates. _[CODE]_
- [ ] **Copy fixes:** unify contact email (`ai@` vs `info@`), fix RU "Новый Узбекский Университет" → «Новый Узбекистан» (seed n1/n4/e3), fix garbled RU Call Center copy, UZ `Zayavkalar→Arizalar`, `Oy ma oy→Oyma-oy`, apostrophe glyphs, dev-slang (`прода`/`productioncha`). _[COPY]_
- [ ] **Perf:** resize `briefcase-3d.png` + team/gallery images to WebP/AVIF (server-side resize-on-upload); fix Hero infinite rAF; trim Framer Motion / real viewport-gated lazy-load; split `ProjectsTable` for `/careers`. _[PERF]_

### 🟡 P2 — hardening / polish (soon after launch)
- [ ] `deleteImageByUrl` path-containment check (match `readImage`). _[CODE]_
- [ ] Replace index-based FAQ/Impact fallback with id-keyed (avoid wrong-item content). _[CODE]_
- [ ] Accessibility: `htmlFor`/`id` label association, `role="alert"` errors, `aria-invalid`, `prefers-reduced-motion` guard, native form `required`/`maxLength`. _[QA]_
- [ ] CSP nonce (drop `'unsafe-inline'`), HSTS `preload`, anchor middleware matcher `(?!login(?:/|$))`. _[SEC]_
- [ ] Bump vulnerable transitive deps (`undici`/`ws`/`uuid`/`postcss`/`esbuild`) via `npm audit fix` / upstream. _[SEC]_
- [ ] Zod-validate i18n JSON at write boundary; dedupe byte-identical news/events images; locale cookie for correct first paint; move hardcoded Uzbek admin-submission strings into i18n; localize vacancy 404. _[misc]_

---
### Audit metadata
- Method: 9 parallel adversarial subagents (security, architecture, database, code, business, devops, QA, copy, performance), findings cross-verified where domains overlapped (force-dynamic, error boundaries, rate limiting, shared DB, contact double-failure were each independently reported by 2–3 agents → high confidence).
- Cleanup done: purged QA-created test rows from the shared DB (6 `PageView` + 1 `<script>` `ContactSubmission`). A Telegram notification fired during a QA contact probe (cannot be unsent).
- This file is the durable record — safe to commit (contains **no secret values**). Recommend committing as `PRODUCTION_AUDIT.md` and tracking the P0/P1 checkboxes.
