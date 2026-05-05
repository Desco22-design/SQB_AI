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
| @vercel/blob | 2.3.3 | Rasm saqlash (Vercel) |
| @netlify/blobs | 10.7.4 | Rasm saqlash (Netlify) |
| bcryptjs | 3.0.3 | Parol hash |
| embedded-postgres | 18.3.0-beta | Local dev DB |

---

## Papkalar tuzilmasi

```
SQB AI/                        ← Root loyiha papkasi
├── site/                      ← Next.js sayt kodi (asosiy papka)
│   ├── app/                   ← Next.js App Router sahifalari
│   │   ├── page.tsx           ← Bosh sahifa
│   │   ├── layout.tsx         ← Root layout
│   │   ├── globals.css        ← Global stillar
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
│   │   │   ├── submissions/   ← Murojaat shakli yuborislari
│   │   │   ├── audit/         ← Admin harakatlar logi
│   │   │   └── stats/         ← Statistika / analytics
│   │   ├── api/               ← API route'lar
│   │   │   ├── auth/          ← NextAuth endpoint
│   │   │   ├── contact/       ← Murojaat shakli
│   │   │   ├── admin/upload/  ← Rasm yuklash
│   │   │   ├── media/[key]/   ← Rasmlarni serve qilish
│   │   │   └── track/         ← Tashrif statistikasi
│   │   ├── news/[id]/         ← Yangilik batafsil sahifasi
│   │   └── events/[id]/       ← Tadbir batafsil sahifasi
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
│   │   ├── schema.prisma      ← DB sxemasi (15 jadval)
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

**Default foydalanuvchilar** (seed.ts da):
- `sqbai@admin1` / `ChangeMe!2026A`
- `sqbai@admin2` / `ChangeMe!2026B`
- `sqbai@admin3` / `ChangeMe!2026C`

> Muhim: Production'da parollarni o'zgartirish kerak!

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

## Deployment

**Netlify** (asosiy):
- `netlify.toml` root papkada bor
- Build command: `npm run build`
- Publish dir: `.next`

**Vercel:**
- `site/` papkasini Vercel'ga ulash
- Env variables qo'shish

---

## Muhim Qoidalar

1. **Matnlar har doim 3 tilda yoziladi** — UZ, RU, EN
2. **Rasmlar admin orqali yuklanadi** — to'g'ridan-to'g'ri fayl qo'shish emas
3. **Bo'lim sarlavhalari admin dan boshqariladi** — kod da hard-code qilinmagan
4. **Audit log** — har bir admin harakatni saqlaydi
5. **Contact shakli honeypot** himoyasi bor (bot spam'dan)
6. **Session 7 kun davom etadi**

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
