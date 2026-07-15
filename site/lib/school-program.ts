// "Школа" - the bank's AI programme for schoolchildren (grades 9-11).
//
// The 14-lesson schedule lives in code rather than the DB: it is a fixed course,
// and both the public form and the Telegram bot read from here, so the topic a
// student picks and the details the bot messages them can never drift apart.
//
// Source of truth for titles/summaries/dates: the "01_Curriculum" tab of the
// programme spreadsheet. Dates are the real lesson dates - every one a Friday,
// weekly, 17 July → 16 October 2026.
//
// Do not renumber `id` - it is persisted on SchoolApplication rows.

export type Lang = "uz" | "ru" | "en";

export type LocalizedText = Record<Lang, string>;

export type SchoolTopic = {
  /** Stable id persisted on SchoolApplication.topicId. Never reuse or renumber. */
  id: string;
  title: LocalizedText;
  /** "What the student takes away" - shown under the title on the schedule. */
  summary: LocalizedText;
  /** ISO date (YYYY-MM-DD) of the lesson - always a Friday. */
  date: string;
};

/** First lesson: Friday, 17 July 2026. */
export const FIRST_LESSON_DATE = "2026-07-17";

/** Start time of every lesson (local Tashkent time). Lessons run 2 hours. */
export const LESSON_TIME = "16:00";

/**
 * Seats advertised per lesson - the number the public site shows.
 */
export const LESSON_CAPACITY = 30;

/**
 * The real per-lesson intake. We advertise 30 but accept up to 45 (a buffer for
 * no-shows), and the site keeps a lesson looking open until this hard limit is
 * reached. Enforced atomically in /api/school - a plain count-then-insert would
 * let two concurrent signups both slip past the last seat. Admin sees this
 * number; the public sees it mapped onto the 30-seat scale via publicSeats().
 */
export const LESSON_MAX = 45;

export type PublicSeats = {
  /** 0..LESSON_CAPACITY - for the "N / 30" label and the fill bar. */
  shownTaken: number;
  /** LESSON_CAPACITY..0 - for the "N seats left" chip. */
  shownLeft: number;
  /** True only once real signups reach LESSON_MAX (45), not at 30. */
  isFull: boolean;
};

/**
 * Map a lesson's real signup count onto the advertised 30-seat scale. Real
 * intake runs to 45, so the site shows seats shrinking proportionally and never
 * reports "full" until 45 is actually reached - 30 real signups still read as
 * ~10 seats left, not sold out.
 */
export function publicSeats(rawCount: number): PublicSeats {
  const taken = Math.max(0, rawCount);
  if (taken >= LESSON_MAX) {
    return { shownTaken: LESSON_CAPACITY, shownLeft: 0, isFull: true };
  }
  const shownLeft = Math.max(
    1,
    Math.ceil(((LESSON_MAX - taken) / LESSON_MAX) * LESSON_CAPACITY)
  );
  return { shownTaken: LESSON_CAPACITY - shownLeft, shownLeft, isFull: false };
}

export const LESSON_LOCATION: LocalizedText = {
  uz: "SQB bank, Oxunguzar 2-tor ko'chasi, 21A, Olmazor tumani, Toshkent",
  ru: "SQB, банк, 2-й пр. Ахунгузар, 21А, Алмазарский район, Ташкент",
  en: "SQB bank, 2nd Akhunguzar lane 21A, Almazar district, Tashkent",
};

export const GRADES = ["9", "10", "11"] as const;
export type Grade = (typeof GRADES)[number];

export const SCHOOL_TOPICS: SchoolTopic[] = [
  {
    id: "t1",
    date: "2026-07-17",
    title: {
      ru: "Что такое искусственный интеллект и почему он меняет мир",
      uz: "Sun'iy intellekt nima va u nega dunyoni o'zgartiryapti",
      en: "What artificial intelligence is and why it is changing the world",
    },
    summary: {
      ru: "История ИИ, где используется, какие профессии исчезают и появляются, как устроен современный AI. Демонстрация ChatGPT, Claude, Gemini, Midjourney.",
      uz: "AI tarixi, qayerda qo'llaniladi, qaysi kasblar yo'qoladi va paydo bo'ladi, zamonaviy AI qanday tuzilgan. ChatGPT, Claude, Gemini, Midjourney namoyishi.",
      en: "The history of AI, where it is used, which professions disappear and appear, how modern AI is built. Live demos of ChatGPT, Claude, Gemini and Midjourney.",
    },
  },
  {
    id: "t2",
    date: "2026-07-24",
    title: {
      ru: "Как думает инженер: логика, алгоритмы и решение задач",
      uz: "Muhandis qanday fikrlaydi: mantiq, algoritmlar va masala yechish",
      en: "How an engineer thinks: logic, algorithms and problem solving",
    },
    summary: {
      ru: "Алгоритмическое мышление, декомпозиция, блок-схемы, поиск закономерностей. Без программирования.",
      uz: "Algoritmik fikrlash, dekompozitsiya, blok-sxemalar, qonuniyatlarni topish. Dasturlashsiz.",
      en: "Algorithmic thinking, decomposition, flowcharts, spotting patterns. No programming required.",
    },
  },
  {
    id: "t3",
    date: "2026-07-31",
    title: {
      ru: "Данные - новая нефть",
      uz: "Ma'lumot - yangi neft",
      en: "Data is the new oil",
    },
    summary: {
      ru: "Что такое данные, базы данных, таблицы, Excel, ошибки в данных, как данные превращаются в решения. Практика на реальных наборах данных.",
      uz: "Ma'lumot nima, ma'lumotlar bazasi, jadvallar, Excel, ma'lumotdagi xatolar, ma'lumot qanday qarorga aylanadi. Haqiqiy ma'lumot to'plamlarida amaliyot.",
      en: "What data is, databases, tables, Excel, errors in data, and how data turns into decisions. Hands-on work with real datasets.",
    },
  },
  {
    id: "t4",
    date: "2026-08-07",
    title: {
      ru: "Как работают нейросети простыми словами",
      uz: "Neyron tarmoqlar oddiy tilda",
      en: "How neural networks work, in plain language",
    },
    summary: {
      ru: "Что такое машинное обучение, нейронные сети, компьютерное зрение, распознавание речи, большие языковые модели. Без сложной математики.",
      uz: "Mashinali o'qitish, neyron tarmoqlar, kompyuter ko'rish, nutqni tanish, katta til modellari nima. Murakkab matematikasiz.",
      en: "Machine learning, neural networks, computer vision, speech recognition and large language models. Without heavy mathematics.",
    },
  },
  {
    id: "t5",
    date: "2026-08-14",
    title: {
      ru: "ИИ как личный помощник: Prompt Engineering",
      uz: "AI shaxsiy yordamchi sifatida: Prompt Engineering",
      en: "AI as a personal assistant: prompt engineering",
    },
    summary: {
      ru: "Как правильно общаться с ИИ. Создание качественных промптов. Работа с ChatGPT, Claude, Gemini. Практика: сделать презентацию, исследование и мини-проект за час.",
      uz: "AI bilan qanday to'g'ri muloqot qilish. Sifatli promptlar yozish. ChatGPT, Claude, Gemini bilan ishlash. Amaliyot: bir soatda taqdimot, tadqiqot va mini-loyiha.",
      en: "How to talk to AI properly. Writing strong prompts. Working with ChatGPT, Claude and Gemini. Practice: build a presentation, a research piece and a mini-project in an hour.",
    },
  },
  {
    id: "t6",
    date: "2026-08-21",
    title: {
      ru: "Создаём первое AI-приложение без программирования",
      uz: "Dasturlashsiz birinchi AI-ilovani yaratamiz",
      en: "Building your first AI app without programming",
    },
    summary: {
      ru: "Работа с no-code платформами. Создание чат-бота, помощника или простого AI-сервиса.",
      uz: "No-code platformalar bilan ishlash. Chat-bot, yordamchi yoki oddiy AI-xizmat yaratish.",
      en: "Working with no-code platforms. Building a chatbot, an assistant or a simple AI service.",
    },
  },
  {
    id: "t7",
    date: "2026-08-28",
    title: {
      ru: "Основы программирования для AI",
      uz: "AI uchun dasturlash asoslari",
      en: "Programming fundamentals for AI",
    },
    summary: {
      ru: "Что такое Python, переменные, функции, циклы. Минимум кода, максимум понимания. Первый скрипт, работающий с ИИ API.",
      uz: "Python nima, o'zgaruvchilar, funksiyalar, sikllar. Kod minimal, tushuncha maksimal. AI API bilan ishlaydigan birinchi skript.",
      en: "What Python is, variables, functions, loops. Minimal code, maximal understanding. Your first script calling an AI API.",
    },
  },
  {
    id: "t8",
    date: "2026-09-04",
    title: {
      ru: "Как создаются AI-продукты в банках и крупных компаниях",
      uz: "Banklar va yirik kompaniyalarda AI-mahsulotlar qanday yaratiladi",
      en: "How AI products are built in banks and large companies",
    },
    summary: {
      ru: "Кейсы: кредитный скоринг, борьба с мошенничеством, чат-боты, рекомендации, анализ документов, автоматизация процессов. Как работает команда AI-проекта.",
      uz: "Keyslar: kredit skoring, firibgarlikka qarshi kurash, chat-botlar, tavsiyalar, hujjatlar tahlili, jarayonlarni avtomatlashtirish. AI-loyiha jamoasi qanday ishlaydi.",
      en: "Cases: credit scoring, fraud detection, chatbots, recommendations, document analysis, process automation. How an AI project team works.",
    },
  },
  {
    id: "t9",
    date: "2026-09-11",
    title: {
      ru: "Командный AI-проект",
      uz: "Jamoaviy AI-loyiha",
      en: "Team AI project",
    },
    summary: {
      ru: "Команды получают реальную бизнес-задачу и за два часа проектируют AI-решение: определяют проблему, пользователей, данные и ожидаемый эффект.",
      uz: "Jamoalar haqiqiy biznes-masala oladi va ikki soatda AI-yechim loyihalaydi: muammo, foydalanuvchilar, ma'lumot va kutilayotgan natijani aniqlaydi.",
      en: "Teams take a real business problem and design an AI solution in two hours: the problem, the users, the data and the expected impact.",
    },
  },
  {
    id: "t10",
    date: "2026-09-18",
    title: {
      ru: "Этика и безопасность ИИ",
      uz: "AI etikasi va xavfsizligi",
      en: "AI ethics and safety",
    },
    summary: {
      ru: "Изучение проблем предвзятости алгоритмов (bias), защиты персональных данных, дипфейков и правового регулирования ИИ.",
      uz: "Algoritmlar tarafkashligi (bias), shaxsiy ma'lumotlarni himoya qilish, deepfake va AI huquqiy tartibga solinishi masalalari.",
      en: "Algorithmic bias, personal-data protection, deepfakes and the legal regulation of AI.",
    },
  },
  {
    id: "t11",
    date: "2026-09-25",
    title: {
      ru: "Введение в компьютерное зрение",
      uz: "Kompyuter ko'rishga kirish",
      en: "Introduction to computer vision",
    },
    summary: {
      ru: "Основы работы с изображениями и видео. Как ИИ распознаёт лица и объекты. Практические примеры применения.",
      uz: "Rasm va video bilan ishlash asoslari. AI yuz va obyektlarni qanday tanidi. Amaliy qo'llash misollari.",
      en: "The basics of images and video. How AI recognises faces and objects. Practical applications.",
    },
  },
  {
    id: "t12",
    date: "2026-10-02",
    title: {
      ru: "Обработка естественного языка (NLP)",
      uz: "Tabiiy tilni qayta ishlash (NLP)",
      en: "Natural language processing (NLP)",
    },
    summary: {
      ru: "Как алгоритмы понимают текст. Анализ тональности, машинный перевод и генерация текста.",
      uz: "Algoritmlar matnni qanday tushunadi. Tonallik tahlili, mashina tarjimasi va matn generatsiyasi.",
      en: "How algorithms understand text. Sentiment analysis, machine translation and text generation.",
    },
  },
  {
    id: "t13",
    date: "2026-10-09",
    title: {
      ru: "Будущее ИИ: тренды и перспективы",
      uz: "AI kelajagi: trendlar va istiqbollar",
      en: "The future of AI: trends and outlook",
    },
    summary: {
      ru: "Разбор концепции сильного ИИ (AGI), автономных агентов и того, как технологии изменят мир в ближайшие годы.",
      uz: "Kuchli AI (AGI) konsepsiyasi, avtonom agentlar va texnologiyalar yaqin yillarda dunyoni qanday o'zgartirishi.",
      en: "The concept of strong AI (AGI), autonomous agents, and how technology will reshape the world in the coming years.",
    },
  },
  {
    id: "t14",
    date: "2026-10-16",
    title: {
      ru: "Demo Day. Защита проектов и карьерный путь в AI",
      uz: "Demo Day. Loyihalar himoyasi va AI sohasidagi karyera yo'li",
      en: "Demo Day. Project defence and a career path in AI",
    },
    summary: {
      ru: "Презентация проектов перед экспертами. Обратная связь. Что изучать дальше, как попасть на стажировку, дорожная карта до позиции AI Engineer или AI Analyst.",
      uz: "Loyihalarni ekspertlar oldida taqdim etish. Fikr-mulohaza. Keyin nimani o'rganish, stajirovkaga qanday kirish, AI Engineer yoki AI Analyst lavozimigacha yo'l xaritasi.",
      en: "Presenting projects to experts. Feedback. What to study next, how to land an internship, and a roadmap to an AI Engineer or AI Analyst role.",
    },
  },
];

export function getTopicById(id: string): SchoolTopic | undefined {
  return SCHOOL_TOPICS.find((t) => t.id === id);
}

const MONTHS: Record<Lang, string[]> = {
  uz: [
    "yanvar", "fevral", "mart", "aprel", "may", "iyun",
    "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr",
  ],
  ru: [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря",
  ],
  en: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ],
};

const FRIDAY: LocalizedText = { uz: "juma", ru: "пятница", en: "Friday" };

/** "17 iyul 2026 (juma)" - every lesson falls on a Friday by construction. */
export function formatLessonDate(isoDate: string, lang: Lang): string {
  const d = new Date(`${isoDate}T00:00:00Z`);
  const day = d.getUTCDate();
  const month = MONTHS[lang][d.getUTCMonth()];
  const year = d.getUTCFullYear();
  return `${day} ${month} ${year} (${FRIDAY[lang]})`;
}
