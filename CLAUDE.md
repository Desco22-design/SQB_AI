# SQB AI Department — Korporativ Sayt

> Bu fayl loyiha haqida to'liq ma'lumot beradi. Yangi suhbat yoki yangi AI agent shu faylni o'qib ishni davom ettirishi uchun yozilgan.

---

## Loyiha haqida

**SQB** = Sozial Kredit Bank — O'zbekistondagi mikrofinans banki.  
**Maqsad:** SQB AI bo'limining korporativ veb-sayti — real AI loyihalar, jamoa, yangiliklar va KPI ko'rsatkichlarini taqdim etadi.

**Til:** O'zbek / Rus / Ingliz (3 tilli)  
**Manzil:** Toshkent, O'zbekiston | ai@sqb.uz | +998 78 777 11 80

---

## Tech Stack

| Texnologiya | Versiya | Maqsad |
|---|---|---|
| Next.js | 14.2.15 | React meta-framework (App Router) |
| React | 18.3.1 | UI |
| Prisma ORM | 6.19.3 | Database |
| PostgreSQL (Neon) | — | Production DB (serverless) |
| NextAuth.js | 4.24.14 | Admin autentifikatsiya |
| Tailwind CSS | 3.4.13 | Stil |
| Framer Motion | 11.11.7 | Animatsiyalar |
| Lucide React | 0.453.0 | Ikonkalar |
| @vercel/blob | 2.3.3 | Rasm saqlash |
| bcryptjs | 3.0.3 | Parol hash |

> **Deployment faqat Vercel.** Netlify butunlay olib tashlangan — `netlify.toml`
> ham, `@netlify/blobs` paketi ham yo'q.
>
> **Eslatma:** `embedded-postgres` `dependencies` da turibdi, lekin kodda
> ishlatilmaydi (ishlatib bo'lmaydi ham — `lib/prisma.ts` Neon adapteriga
> bog'langan). Olib tashlash mumkin.

---

## Papkalar tuzilmasi

> **MUHIM — 2026-08-04 dan boshlab til URL da.** Publik sahifalar
> `app/[locale]/` ostida: `/uz/...`, `/ru/...`, `/en/...`. Ildiz `/` middleware
> orqali foydalanuvchi tiliga yo'naltiriladi. Eski prefixsiz manzillar
> (`/news/...`, `/events/...`, `/team/...`, `/careers/...`, `/school/...`)
> 308 bilan `/uz/...` ga o'tadi.
>
> Loyihada **ikkita root layout** bor (Next.js route-group qoidasi):
> `app/[locale]/layout.tsx` — publik sayt (`<html lang={locale}>`), va
> `app/admin/layout.tsx` — admin panel. `app/layout.tsx` **yo'q** va bo'lmasligi
> kerak — aks holda `lang` atributi tilga qarab o'zgarmaydi.

```
SQB AI/                        ← Root loyiha papkasi
├── site/                      ← Next.js sayt kodi (asosiy papka)
│   ├── app/
│   │   ├── globals.css        ← Global stillar
│   │   ├── global-error.tsx   ← Butun ilova xatosi (o'z <html> i bilan)
│   │   ├── [locale]/          ← PUBLIK SAYT (uz | ru | en)
│   │   │   ├── layout.tsx     ← Root layout: <html lang>, hreflang, metadata
│   │   │   ├── page.tsx       ← Bosh sahifa
│   │   │   ├── not-found.tsx  ← 404
│   │   │   ├── news/[id]/     ← Yangilik sahifasi
│   │   │   ├── events/[id]/   ← Tadbir sahifasi
│   │   │   ├── team/[id]/     ← Jamoa a'zosi sahifasi
│   │   │   ├── careers/       ← Vakansiyalar
│   │   │   └── school/        ← Maktab dasturi
│   │   ├── admin/             ← Admin panel sahifalari
│   │   │   ├── page.tsx       ← Dashboard
│   │   │   ├── login/         ← Login sahifasi
│   │   │   ├── about/         ← About bo'lim CRUD
│   │   │   ├── directions/    ← AI yo'nalishlar CRUD
│   │   │   ├── projects/      ← Loyihalar CRUD
│   │   │   ├── kpis/          ← KPI raqamlar CRUD
│   │   │   ├── team/          ← Jamoa CRUD
│   │   │   ├── news/          ← Yangiliklar CRUD
│   │   │   ├── events/        ← Tadbirlar CRUD
│   │   │   ├── gallery/       ← Galereya manager
│   │   │   ├── faq/           ← FAQ CRUD
│   │   │   ├── submissions/   ← Murojaat + Telegram chat
│   │   │   ├── school/        ← Maktab arizalari + chat
│   │   │   ├── vacancies/     ← Vakansiyalar CRUD
│   │   │   ├── audit/         ← Admin harakatlar logi
│   │   │   └── stats/         ← Statistika / analytics
│   │   └── api/               ← API route'lar
│   │       ├── auth/          ← NextAuth endpoint
│   │       ├── contact/       ← Murojaat shakli
│   │       ├── school/        ← Maktab dasturiga ariza
│   │       ├── telegram/webhook/ ← Telegram bot (secret token bilan)
│   │       ├── admin/upload/  ← Rasm yuklash
│   │       ├── admin/submissions/[id]/messages/ ← Chat polling
│   │       ├── media/[key]/   ← Rasmlarni serve qilish
│   │       └── track/         ← Tashrif statistikasi
│   ├── components/            ← React komponentlar
│   │   ├── sections/          ← Bosh sahifa bo'limlari
│   │   │   ├── Hero.tsx       ← Bosh banner (video fon)
│   │   │   ├── About.tsx      ← Tashkilot haqida (benefit kartalar)
│   │   │   ├── Features.tsx   ← Xususiyatlar (modal kartalar)
│   │   │   ├── Projects.tsx   ← Loyihalar (filter + grid)
│   │   │   ├── Impact.tsx     ← KPI raqamlar (counter)
│   │   │   ├── Team.tsx       ← Jamoa bo'limi
│   │   │   ├── News.tsx       ← Yangiliklar bo'limi
│   │   │   ├── Events.tsx     ← Tadbirlar bo'limi
│   │   │   ├── Gallery.tsx    ← Galereya (masonry grid)
│   │   │   ├── FAQ.tsx        ← FAQ (accordion)
│   │   │   └── Contact.tsx    ← Aloqa shakli
│   │   ├── admin/             ← Admin UI komponentlar
│   │   │   ├── Sidebar.tsx    ← Navigatsiya
│   │   │   ├── AdminTable.tsx ← CRUD jadval
│   │   │   ├── Fields.tsx     ← Form maydonlar
│   │   │   ├── MultiLangField.tsx ← UZ/RU/EN maydoni
│   │   │   └── ImageUpload.tsx ← Rasm yuklash widget
│   │   ├── Navbar.tsx         ← Navigatsiya bar
│   │   ├── Footer.tsx         ← Altbilgi
│   │   ├── NewsBanner.tsx     ← Yangiliklar tasmasi
│   │   └── NeuralBackground.tsx ← Animatsiyali fon
│   ├── lib/                   ← Utility va helper'lar
│   │   ├── queries.ts         ← DB so'rovlari (getProjects, getNews...)
│   │   ├── auth.ts            ← NextAuth konfiguratsiyasi
│   │   ├── prisma.ts          ← Prisma client (singleton)
│   │   ├── storage.ts         ← Blob storage abstraktsiyasi
│   │   ├── audit.ts           ← Admin harakatlar logi
│   │   ├── i18n.ts            ← Til o'girish funksiyalari
│   │   └── section-headings.ts ← Bo'lim sarlavhalarini olish
│   ├── prisma/
│   │   ├── schema.prisma      ← DB sxemasi (19 jadval)
│   │   └── seed.ts            ← Boshlang'ich ma'lumotlar
│   ├── scripts/               ← Bir martalik skriptlar
│   ├── public/                ← Statik fayllar (rasmlar, videolar)
│   ├── .env                   ← Maxfiy sozlamalar (git'ga yuklanmaydi)
│   ├── .env.example           ← .env namunasi
│   ├── next.config.mjs        ← Next.js konfiguratsiyasi
│   ├── tailwind.config.ts     ← Tailwind konfiguratsiyasi
│   └── package.json           ← Paketlar
├── docs/                      ← Hujjatlar (TZ, PDF)
├── assets/                    ← Media va rasmlar (loyiha uchun)
├── presentation/              ← Taqdimot materiallari
├── Logo/                      ← Logotiplar
├── fonts/                     ← Shriftlar
└── CLAUDE.md                  ← BU FAYL — loyiha dokumentatsiyasi
```

---

## Database Jadvallari (Prisma Schema)

| Jadval | Maqsad |
|---|---|
| AdminUser | Admin foydalanuvchilar (email + parol hash) |
| Project | AI loyihalar (nom, muammo, yechim, texnologiyalar) |
| TeamMember | Jamoa a'zolari (ism, rol, bio, rasm) |
| NewsItem | Yangiliklar (sarlavha, matn, rasm) |
| EventItem | Tadbirlar (nom, sana, joy, galereya) |
| GalleryImage | Galereya rasmlari |
| Kpi | KPI ko'rsatkichlari (raqam, label) |
| AiDirection | AI yo'nalishlar (Risk, Scoring, NLP...) |
| FaqItem | FAQ savol-javoblar |
| AboutBenefit | About bo'lim kartalari |
| PageView | Tashrif statistikasi |
| ContactSubmission | Murojaat shakli yuborishlari |
| ContactMessage | Murojaat bo'yicha admin↔mijoz Telegram yozishmasi |
| Vacancy | Vakansiyalar (karyera bo'limi) |
| SchoolApplication | Maktab dasturiga arizalar |
| SchoolMessage | Maktab arizasi bo'yicha yozishma |
| SectionHeading | Bo'lim sarlavhalari (admin dan boshqariladi) |
| AdminAuditLog | Admin harakatlar logi |
| SiteSetting | Global sayt sozlamalari (key-value) |

**Barcha matn maydonlar 3 tilli:** `{ uz: "...", ru: "...", en: "..." }` JSON formatida saqlanadi.

---

## Environment Variables (.env)

```env
DATABASE_URL=postgresql://...         # Neon PostgreSQL connection string
NEXTAUTH_SECRET=...                   # JWT imzolash uchun random string
NEXTAUTH_URL=http://localhost:3000    # Sayt URL (prod da o'zgartirish kerak)
TELEGRAM_BOT_TOKEN=...               # Murojaat shakli uchun Telegram bot
TELEGRAM_CHAT_ID=...                 # Telegram guruh/kanal ID
```

**Deployment da avtomatik qo'shiladi:**
- `VERCEL` — Vercel deployment
- `NETLIFY_SITE_ID`, `NETLIFY_AUTH_TOKEN` — Netlify deployment
- `BLOB_READ_WRITE_TOKEN` — Vercel blob storage

---

## Admin Panel

**URL:** `/admin`  
**Login:** `/admin/login`

**Admin foydalanuvchilar** (seed.ts da):
- `sqbai@admin1`, `sqbai@admin2`, `sqbai@admin3`

> Parollar **seed vaqtida tasodifiy generatsiya qilinadi** va konsolga **bir marta**
> chiqariladi (`npx prisma db seed`). O'sha paytda parollarni xavfsiz saqlang.
> Kodda hech qanday standart parol yo'q. Birinchi kirishdan keyin parollarni
> almashtiring va xavfsiz joyda saqlang.

**Admin da boshqariladi:**
- Barcha bo'limlar matni va rasmlari
- Loyihalar, jamoa, yangiliklar, tadbirlar
- KPI raqamlar
- FAQ, galereya
- Bo'lim sarlavhalari (eyebrow, title, subheading)
- Murojaat shakli yuborishlari
- Audit log va statistika

---

## API Route'lar

| Route | Metod | Maqsad | Auth |
|---|---|---|---|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth session | Yo'q |
| `/api/contact` | POST | Murojaat shakli (Telegram + DB) | Yo'q |
| `/api/admin/upload` | POST | Rasm yuklash (8MB limit) | Ha |
| `/api/media/[key]` | GET | Blob rasmni serve qilish | Yo'q |
| `/api/track` | POST | Tashrif statistikasi | Yo'q |

---

## Loyihadagi AI Loyihalar

1. **SQB Mahalla** — O'zbekistonning 200+ tumanini qamragan AI biznes maslahatchi
2. **SQB AI Advisor** — Biznes g'oyani moliya rejasiga aylantiradigan suhbatchi AI
3. **SQB AI Ijro** — OCR + LLM bilan 500+ xat/kun qayta ishlash (80-90% qo'l mehnat kamaygan)
4. **AI Lex.uz** — Yuridik hujjatlar tekshiruvi va xato aniqlash
5. **Call Center AI** — OpenAI asosidagi shablon javoblar assistent
6. **SQB Fleet AI** — XGBoost bilan 129 avtomobil, 13 viloyat monitoring
7. **SQB Solar Forecaster** — 14 kunlik quyosh energiyasi prognozi (ML)

---

## Saytni Ishga Tushirish

```bash
cd site
npm install
npm run dev        # http://localhost:3000
```

**Build:**
```bash
npm run build
npm start
```

**DB seed (birinchi marta):**
```bash
npx prisma db seed
```

---

## Lokal baza (bulutsiz)

`lib/prisma.ts` Neon adapteriga bog'langan, shuning uchun oddiy Postgres bilan
to'g'ridan-to'g'ri ishlamaydi. Lokal ishlash uchun Postgres + Neon'ning
`wsproxy` si ko'tariladi:

```bash
docker run -d --name sqb-pg -e POSTGRES_PASSWORD=sqb -e POSTGRES_USER=sqb \
  -e POSTGRES_DB=sqbai -p 55432:5432 postgres:16-alpine
docker run -d --name sqb-wsproxy --link sqb-pg:pg -e APPEND_PORT='pg:5432' \
  -e ALLOW_ADDR_REGEX='.*' -p 5480:80 ghcr.io/neondatabase/wsproxy:latest

# sxema + boshlang'ich ma'lumot (to'g'ridan-to'g'ri ulanish orqali)
DATABASE_URL="postgres://sqb:sqb@localhost:55432/sqbai" npx prisma db push
DATABASE_URL="postgres://sqb:sqb@localhost:55432/sqbai" npx tsx prisma/seed.ts

# ilovani ishga tushirish (proxy orqali)
DATABASE_URL="postgres://sqb:sqb@pg/sqbai" NEON_LOCAL_PROXY="localhost:5480" npm run dev
```

> `NEON_LOCAL_PROXY` o'rnatilmaganda `lib/prisma.ts` dagi bu tarmoq umuman
> ishlamaydi — Vercel'da hech qachon faollashmaydi.
>
> To'xtatish: `docker rm -f sqb-pg sqb-wsproxy`

---

## E2E Testlar (Playwright)

Testlar **ishlab turgan sayt**ga qarshi ishlaydi — publik sahifalar hamma
ma'lumotni bazadan oladi, shuning uchun bazasiz run hech narsani isbotlamaydi.

```bash
# lokal (avval boshqa terminalda: npm run dev)
npm run test:e2e

# Vercel preview deploy'iga qarshi — prod'ga chiqarishdan OLDIN shu talab qilinadi
BASE_URL=https://<preview>.vercel.app npm run test:e2e

npm run test:e2e:ui      # interaktiv rejim
```

**Nimani qamrab oladi (`site/e2e/`):**

| Fayl | Tekshiradi |
|---|---|
| `locale-routing.spec.ts` | `/` redirect (Accept-Language + cookie), eski URL'lar 308, `<html lang>`, hreflang/canonical, noma'lum til → 404 |
| `links.spec.ts` | **Hech bir ichki havola tilni yo'qotmaydi** (crawl), bosh sahifada anchor'lar sakrash emas — silliq scroll |
| `content.spec.ts` | Detail sahifalar 3 tilda ochiladi, uch til matni haqiqatan farq qiladi |
| `admin.spec.ts` | `/admin/*` anonim foydalanuvchini login'ga yuboradi, `noindex`, til prefiksi qo'shilmaydi |

> `links.spec.ts` aynan o'sha regressiya sinfini ushlaydi: til URL ga
> ko'chirilganda 16 ta havola prefikssiz qolgan edi va rus/ingliz mehmonini
> jimgina o'zbekchaga qaytarardi.

---

## Deployment

**Vercel — yagona platforma.** `site/` papkasi Vercel loyihasiga ulangan,
konfiguratsiya `site/vercel.json` da.

⚠️ **Build skripti hozir `prisma db push` ishlatadi** (`package.json`):
```
"build": "prisma generate && prisma db push --skip-generate && next build"
```
Bu har deploy'da prod sxemasini ko'r-ko'rona tenglashtiradi va maydon nomi
o'zgarsa **ma'lumot yo'qotishi mumkin**. `prisma migrate deploy` ga o'tish
kerak (`prisma/migrations/` hali yo'q).

⚠️ **Region `iad1` (Vashington)** — auditoriya O'zbekistonda. `fra1` ga
o'tkazish kerak, **lekin faqat Neon bazasi bilan birga** — aks holda funksiya
Frankfurtdan Vashingtondagi bazaga so'rov yuboradi va yomonlashadi.

---

## Muhim Qoidalar

1. **Matnlar har doim 3 tilda yoziladi** — UZ, RU, EN
2. **Rasmlar admin orqali yuklanadi** — to'g'ridan-to'g'ri fayl qo'shish emas
3. **Bo'lim sarlavhalari admin dan boshqariladi** — kod da hard-code qilinmagan
4. **Audit log** — har bir admin harakatni saqlaydi
5. **Contact shakli honeypot** himoyasi bor (bot spam'dan)
6. **Session 7 kun davom etadi**
7. **Til — URL dan, boshqa joydan emas.** `useLang()` faqat
   `app/[locale]/layout.tsx` bergan qiymatni qaytaradi. Tilni localStorage yoki
   `navigator.language` dan aniqlashga qaytmaslik kerak — aynan shu sabab sayt
   ilgari serverda **doim faqat o'zbekcha** render qilinardi va qidiruv
   tizimlari rus/ingliz versiyalarini umuman ko'rmasdi.
8. **Yangi publik sahifa `app/[locale]/` ichida yaratiladi.** Ildizga
   (`app/`) qo'yilgan sahifa tilsiz qoladi va layout topilmay xato beradi.
9. **`app/layout.tsx` yaratmang** — ikkita root layout qoidasi buziladi.

---

## Git Tarixi (Oxirgi commitlar)

- `Auto-insert spaces between heading parts on the homepage`
- `Make every public section heading editable from the admin`
- `Show About card on the admin dashboard grid`
- `Drive Features and About sections from admin-managed content`
- `Revert admin login to the plain light layout`

---

## Aloqa

- **Email:** ai@sqb.uz
- **Tel:** +998 78 777 11 80
- **GitHub user:** Desco22-design
- **Loyiha boshlanish sanasi:** 2026-yil boshida
