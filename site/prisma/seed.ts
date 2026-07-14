import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import {
  projects,
  team,
  news,
  events,
  galleryImages,
  kpis,
  aiDirections,
} from "./seed-data";

const prisma = new PrismaClient();

// Bootstrap admins for fresh installs only. If any admin already exists
// the seed leaves all admin records untouched, so production passwords
// rotated out-of-band will not be overwritten.
//
// Passwords are NOT hardcoded. A strong random password is generated at seed
// time for each admin and printed ONCE to the console so the operator can
// record it securely. Rotate these after first login.
const ADMIN_USERS = [
  { email: "sqbai@admin1", name: "Admin 1" },
  { email: "sqbai@admin2", name: "Admin 2" },
  { email: "sqbai@admin3", name: "Admin 3" },
];

// 24 random bytes → ~32 url-safe chars. Well above the 16-char minimum.
const generatePassword = (): string => randomBytes(24).toString("base64url");

// Tri-lingual seed data
const tri = (uz: string, ru: string, en: string) => ({ uz, ru, en });

// Coerce LocalizedText (string | I18nText) into a plain string for fallback seeding.
const str = (v: unknown): string => (typeof v === "string" ? v : "");

// AI directions in 3 languages
const DIRECTIONS_I18N: { title: ReturnType<typeof tri>; description: ReturnType<typeof tri> }[] = [
  {
    title: tri("Risklar", "Риски", "Risk"),
    description: tri(
      "Kredit, bozor va operatsion risk modellari oqimdagi ma'lumotlardan o'rganadi va doimiy moslashtirilgan holda turadi.",
      "Модели кредитных, рыночных и операционных рисков, обучающиеся на потоковых данных и сохраняющие калибровку.",
      "Credit, market and operational risk models that learn from streaming data and stay calibrated."
    ),
  },
  {
    title: tri("Kredit skoringi", "Кредитный скоринг", "Credit Scoring"),
    description: tri(
      "Chakana va MSB skoringi tushunarli modellar va PoC'dan ishga tushirishgacha bo'lgan yo'l bilan.",
      "Розничный и SME-скоринг с объяснимыми моделями и понятным путём от PoC к продакшену.",
      "Retail and SME scoring with explainable models and a path from PoC to production."
    ),
  },
  {
    title: tri("Avtomatlashtirish", "Автоматизация", "Automation"),
    description: tri(
      "Hujjat intellekti, RPA-uslubidagi yordamchilar va back-office avtomatlashtirish.",
      "Документная аналитика, RPA-копилоты и автоматизация бэк-офиса.",
      "Document intelligence, RPA-style copilots and back-office automation."
    ),
  },
  {
    title: tri("NLP / Chat-botlar", "NLP / Чат-боты", "NLP / Chatbots"),
    description: tri(
      "Kontakt markazi va ichki xodimlar uchun ko'p tilli suhbat AI.",
      "Многоязычный разговорный AI для контакт-центра и внутренних сотрудников.",
      "Multilingual conversational AI for the contact centre and internal staff."
    ),
  },
  {
    title: tri("Kompyuter ko'rishi", "Компьютерное зрение", "Computer Vision"),
    description: tri(
      "Filial operatsiyalari tahlili va mavjud apparatda KYC hujjatlarini massali tekshirish.",
      "Аналитика операций отделений и KYC документов на существующем оборудовании.",
      "Branch operations analytics and document KYC at scale, on existing hardware."
    ),
  },
];

// KPIs in 3 languages
const KPIS_I18N: { label: ReturnType<typeof tri>; value: number; suffix: string; decimals: number }[] = [
  {
    label: tri("Hujjat ko'rib chiqish vaqti tejaldi", "Сэкономлено времени на проверку документов", "Document review time saved"),
    value: 70,
    suffix: "%",
    decimals: 0,
  },
  {
    label: tri("Qo'lda ishlov berish kamaydi", "Сокращение ручной обработки", "Manual handling reduction"),
    value: 90,
    suffix: "%",
    decimals: 0,
  },
  {
    label: tri("Compliance riski kamaydi", "Снижение комплаенс-риска", "Compliance risk reduction"),
    value: 80,
    suffix: "%",
    decimals: 0,
  },
  {
    label: tri("Mehnat tejalishi", "Экономия трудозатрат", "Labour savings"),
    value: 70,
    suffix: "%",
    decimals: 0,
  },
];

// FAQ in 3 languages
const FAQ_I18N: { question: ReturnType<typeof tri>; answer: ReturnType<typeof tri> }[] = [
  {
    question: tri("SQB AI nima?", "Что такое SQB AI?", "What is SQB AI?"),
    answer: tri(
      "SQB AI - bu SQB Bank ichidagi sun'iy intellekt bo'yicha kompetentsiya markazi. Biz bank jarayonlarini avtomatlashtirish uchun AI-yechimlarni ishlab chiqamiz va joriy etamiz.",
      "SQB AI - это центр компетенций по искусственному интеллекту в SQB Bank. Мы разрабатываем и внедряем AI-решения для автоматизации банковских процессов.",
      "SQB AI is the AI competence centre at SQB Bank. We design and deploy AI solutions to automate banking processes."
    ),
  },
  {
    question: tri(
      "Hozirda ishlamoqda bo'lgan loyihalar?",
      "Какие проекты уже работают в продакшене?",
      "Which projects are already in production?"
    ),
    answer: tri(
      "Ishlab turibdi: SQB Mahalla, SQB AI Advisor, SQB AI Ijro, Call Center AI, SQB Fleet AI va SQB Solar Forecaster.",
      "В продакшене работают: SQB Mahalla, SQB AI Advisor, SQB AI Ijro, Call Center AI, SQB Fleet AI и SQB Solar Forecaster.",
      "In production: SQB Mahalla, SQB AI Advisor, SQB AI Ijro, Call Center AI, SQB Fleet AI and SQB Solar Forecaster."
    ),
  },
  {
    question: tri(
      "Komanda bilan qanday bog'lanaman?",
      "Как связаться с командой?",
      "How can I get in touch with the team?"
    ),
    answer: tri(
      "«Aloqa» bo'limidagi shaklni to'ldiring - bizning komandamiz 1-2 ish kuni ichida siz bilan bog'lanadi.",
      "Заполните форму в разделе «Контакты» - наша команда свяжется с вами в течение 1-2 рабочих дней.",
      "Fill out the form in the Contacts section - our team will get back to you within 1-2 business days."
    ),
  },
  {
    question: tri(
      "Komandaga qo'shilish mumkinmi?",
      "Можно ли присоединиться к команде?",
      "Can I join the team?"
    ),
    answer: tri(
      "Biz muntazam ravishda AI-muhandislar, data scientist'lar va product manager'lar qidiramiz. Ochiq vakansiyalar va ariza shakli «Karyera» bo'limida.",
      "Мы регулярно ищем AI-инженеров, дата-сайентистов и продукт-менеджеров. Открытые вакансии и форма отклика - в разделе «Карьера».",
      "We regularly look for AI engineers, data scientists and product managers. Open roles and the application form are in the Careers section."
    ),
  },
];

// Map team member id → role/bio in 3 languages
const TEAM_I18N: Record<string, { role: ReturnType<typeof tri>; bio: ReturnType<typeof tri> }> = {
  kozlov: {
    role: tri("Bosh AI direktor va Boshqaruv raisi maslahatchisi", "Chief AI Officer и советник Председателя Правления", "Chief AI Officer & Advisor to the Chairman"),
    bio: tri(
      "SQB'da AI strategiyasini belgilaydi va Boshqaruv raisiga AI tashabbuslari bo'yicha maslahat beradi.",
      "Определяет AI-стратегию SQB и консультирует Председателя Правления по AI-инициативам.",
      "Sets the AI strategy at SQB and advises the Chairman of the Board on AI initiatives."
    ),
  },
  muhammadjon: {
    role: tri("Yetakchi menejer", "Ведущий менеджер", "Lead Manager"),
    bio: tri(
      "SQB'dagi AI tashabbuslarini boshqaradi, fintexda 5+ yil tajriba: Ijro AI, Financial Assistant AI, LogiCoreAI, SQB Voice.",
      "Руководит AI-инициативами в SQB, 5+ лет в финтехе: Ijro AI, Financial Assistant AI, LogiCoreAI, SQB Voice.",
      "Leads AI initiatives at SQB with 5+ years in fintech: Ijro AI, Financial Assistant AI, LogiCoreAI, SQB Voice."
    ),
  },
  umidjon: {
    role: tri("AI / Biznes va tizim tahlilchisi", "AI / Бизнес- и системный аналитик", "AI / Business & System Analyst"),
    bio: tri(
      "Biznes va funksional talablarni shakllantiradi, ma'lumotlarni tayyorlaydi va AI yetkazib berishni g'oyadan integratsiyagacha qo'llab-quvvatlaydi.",
      "Формирует бизнес- и функциональные требования, готовит данные и поддерживает AI-доставку от идеи до интеграции.",
      "Shapes business and functional requirements, prepares data and supports AI delivery from idea to integration."
    ),
  },
  timurjon: {
    role: tri("Loyiha menejeri", "Проектный менеджер", "Project Manager"),
    bio: tri(
      "Bankdagi IT va AI loyihalarini to'liq tsiklda boshqaradi; ex-IT Park Uzbekistan va SQB Mobile / CROBS.",
      "Полный цикл управления IT и AI проектами в банке; ex-IT Park Uzbekistan и SQB Mobile / CROBS.",
      "Full-cycle PM across IT and AI projects in banking; ex-IT Park Uzbekistan and SQB Mobile / CROBS."
    ),
  },
  javokhir: {
    role: tri("Scrum Master", "Scrum Master", "Scrum Master"),
    bio: tri(
      "AI komandasi yetkazib berishini Jira'da boshqaradi; SQB chat, HR, Audit va CROBS botlari uchun prompt engineering'ni qo'llab-quvvatlaydi.",
      "Управляет доставкой AI-команды в Jira; поддерживает prompt engineering для SQB chat, HR, Audit и CROBS ботов.",
      "Drives delivery for the AI team in Jira; supports prompt engineering for SQB chat, HR, Audit and CROBS bots."
    ),
  },
  murodjon: {
    role: tri("Senior Data Engineer", "Senior Data Engineer", "Senior Data Engineer"),
    bio: tri(
      "2020 yildan beri bank DWH va DataOps; SQB'ga qaytishdan oldin bir nechta banklarda korporativ omborlarni yetkazib bergan.",
      "Банковский DWH и DataOps с 2020 года; до возвращения в SQB поставлял корпоративные хранилища в нескольких банках.",
      "Banking DWH and DataOps since 2020; delivered enterprise warehouses across multiple banks before returning to SQB."
    ),
  },
  abdullo: {
    role: tri("Backend dasturchi", "Backend разработчик", "Software Engineer (Backend)"),
    bio: tri(
      "SQB'da Backend va AI integratsiyasi: SQB Chat Assistant, Obnal AI, Ijro AI; Qwen3-32B va GPT-OSS-20B'ni GPU'da o'rnatdi.",
      "Backend и AI интеграция в SQB: SQB Chat Assistant, Obnal AI, Ijro AI; развернул Qwen3-32B и GPT-OSS-20B на GPU.",
      "Backend and AI integration at SQB: SQB Chat Assistant, Obnal AI, Ijro AI; deployed Qwen3-32B and GPT-OSS-20B on GPU."
    ),
  },
  azizbek: {
    role: tri("Junior Java Backend dasturchi", "Junior Java Backend разработчик", "Junior Java Backend Developer"),
    bio: tri(
      "AI xizmatlarini Java ilovalari va Telegram botlar bilan integratsiya qiladi. HR-bot, chat-bot va CROBS AI yordamchisida ishlagan.",
      "Интегрирует AI-сервисы с Java-приложениями и Telegram-ботами. Работал над HR-ботом, чат-ботом и CROBS AI-ассистентом.",
      "Integrates AI services with Java applications and Telegram bots. Worked on HR bot, chat-bot and CROBS AI assistant."
    ),
  },
  daler: {
    role: tri("Junior Angular dasturchi", "Junior Angular разработчик", "Junior Angular Developer"),
    bio: tri(
      "Angular SPA interfeyslar yaratadi va backend API'lar bilan integratsiya qiladi; AI-Admin, SQB-Ijro va Monitoring'da ishlaydi.",
      "Создаёт Angular SPA интерфейсы и интегрирует с backend API; работает на AI-Admin, SQB-Ijro и Monitoring.",
      "Builds Angular SPA interfaces and integrates with backend APIs; works on AI-Admin, SQB-Ijro and Monitoring."
    ),
  },
  odiljon: {
    role: tri("HR Loyiha menejeri", "HR Проектный менеджер", "HR Project Manager"),
    bio: tri(
      "SQB'da IT va AI yollashga ega; SQB Start dasturini boshqaradi va AI HR Telegram-botini birga yaratdi.",
      "Отвечает за IT и AI найм в SQB; ведёт программу SQB Start и со-разработчик AI HR Telegram-бота.",
      "Owns IT and AI hiring at SQB; runs the SQB Start program and co-built the AI HR Telegram bot."
    ),
  },
  dilshodbek: {
    role: tri("UX/UI dizayner", "UX/UI дизайнер", "UX/UI Designer"),
    bio: tri(
      "SQB Monitoring, SQB AI Chat, MFI va CROBS AI Chat uchun interfeyslar va prototiplarni loyihalashtiradi; AI vositalardan foydalanadi.",
      "Проектирует интерфейсы и прототипы для SQB Monitoring, SQB AI Chat, MFI и CROBS AI Chat; использует AI-инструменты.",
      "Designs interfaces and prototypes for SQB Monitoring, SQB AI Chat, MFI and CROBS AI Chat; uses AI tools to accelerate delivery."
    ),
  },
};

// Project content in 3 languages (id-keyed)
const PROJECTS_I18N: Record<string, { name: ReturnType<typeof tri>; short: ReturnType<typeof tri>; problem: ReturnType<typeof tri>; solution: ReturnType<typeof tri> }> = {
  "sqb-mahalla": {
    name: tri("SQB Mahalla", "SQB Mahalla", "SQB Mahalla"),
    short: tri(
      "AI biznes maslahatchisi va O'zbekistonning barcha hududlari va tumanlarini qamrab oluvchi mintaqaviy tahlil platformasi.",
      "AI бизнес-советник и аналитическая платформа по всем регионам и районам Узбекистана.",
      "AI business advisor and regional analytics platform covering all regions and districts of Uzbekistan."
    ),
    problem: tri(
      "Mamlakat bo'ylab tadbirkorlar lokal bozor tahlili va tayyor biznes-rejalardan mahrum; qo'lda mintaqaviy tadqiqot sekin va parchalangan.",
      "Предприниматели по всей стране лишены локализованных рыночных инсайтов и готовых бизнес-планов; ручное региональное исследование медленное и фрагментарное.",
      "Entrepreneurs across the country lack access to localized market insights and ready-to-use business plans; manual regional research is slow, fragmented and out of reach for most mahallas."
    ),
    solution: tri(
      "Biznes g'oyani barcha viloyat va tumanlardagi mintaqaviy bozor talablariga tahlil qiladigan, daqiqalarda tayyor biznes-rejani yaratadigan va tadbirkorlarni SQB moliyalashtirish variantlari bilan bog'laydigan AI platforma.",
      "AI-платформа, анализирующая бизнес-идею под потребности рынка по всем вилоятам и туманам, генерирующая готовый бизнес-план за минуты и связывающая предпринимателей с финансированием SQB.",
      "An AI platform that analyses a business idea against regional market needs across all viloyats and tumans, generates a ready business plan in minutes and connects entrepreneurs with SQB financing options."
    ),
  },
  "ai-advisor": {
    name: tri("SQB AI Advisor", "SQB AI Advisor", "SQB AI Advisor"),
    short: tri(
      "Biznes g'oyani daqiqalarda tayyor biznes-rejaga va mos SQB moliyalashtirishga aylantiradigan suhbat AI yordamchisi.",
      "Разговорный AI-ассистент, превращающий бизнес-идею в готовый бизнес-план с подбором финансирования SQB за минуты.",
      "Conversational AI assistant that turns a business idea into a ready business plan with matching SQB financing in minutes."
    ),
    problem: tri(
      "Yangi tadbirkorlar va MSB'lar xom g'oyalarni tuzilgan, moliyaga tayyor rejalarga aylantirishga qiynaladi; konsultantlar qimmat va sekin.",
      "Начинающим предпринимателям и SME сложно превратить сырые идеи в структурированные финансово-готовые планы; консультанты дорогие и медленные.",
      "First-time entrepreneurs and SMEs struggle to translate raw ideas into structured, finance-ready business plans; consultants are expensive and slow."
    ),
    solution: tri(
      "Foydalanuvchini g'oyasi haqida intervyu qiluvchi, mintaqaviy bozor signallarini oluvchi, daromad va xarajat prognozlari bilan tuzilgan reja yaratuvchi va to'g'ri SQB mahsulotiga yo'naltiruvchi ko'p tilli AI maslahatchi.",
      "Многоязычный AI-советник, который опрашивает пользователя об идее, подтягивает региональные сигналы рынка, генерирует структурированный план с прогнозами и направляет к подходящему финансовому продукту SQB.",
      "A multilingual AI advisor that interviews the user about their idea, pulls regional market signals, generates a structured plan with revenue and cost projections and routes the user to the right SQB financing product end-to-end."
    ),
  },
  "ai-ijro": {
    name: tri("SQB AI Ijro", "SQB AI Ijro", "SQB AI Ijro"),
    short: tri(
      "Kelgan bank yozishmalari uchun AI'da intake va yo'naltirish - OCR, LLM va embedding asosida mas'ul bo'limlarga avtomatik yetkazish.",
      "AI-приёмка и маршрутизация входящей корреспонденции - OCR, LLM и embedding-маршрутизация в ответственные подразделения.",
      "AI-powered intake and routing for incoming bank correspondence - OCR, LLM and embedding-based dispatch to responsible departments."
    ),
    problem: tri(
      "Kuniga 500+ kiruvchi xat qo'lda ro'yxatga olinadi; har birini o'qib, mas'ul shaxsga qo'lda yo'naltirish kerak.",
      "500+ входящих писем в день регистрируются вручную; каждое нужно прочесть и направить вручную.",
      "500+ incoming letters per day are registered by hand; each item has to be read and routed manually to the right owner."
    ),
    solution: tri(
      "OCR matnni ajratib oladi, LLM tahlil qiladi va avtomatik ro'yxatga oladi, embedding modeli xatni mas'ul bo'limga yo'naltiradi.",
      "OCR извлекает текст, LLM анализирует и регистрирует автоматически, embedding-модель направляет в ответственное подразделение.",
      "OCR extracts text from incoming letters, an LLM analyses content and auto-registers each item, and an embedding model routes the letter to the responsible department end-to-end."
    ),
  },
  "ai-lex": {
    name: tri("AI Lex.uz", "AI Lex.uz", "AI Lex.uz"),
    short: tri(
      "lex.uz va bankning ichki ombori bilan integratsiyalashgan AI/ML huquqiy hujjat tekshiruvi - eskirgan normalar, imlo va texnik xatolarni avtomatik aniqlaydi.",
      "AI/ML проверка юридических документов с интеграцией lex.uz и внутренней базы банка - обнаруживает устаревшие нормы, орфографические и технические ошибки.",
      "AI/ML legal-document verification integrated with lex.uz and the bank's internal repository - detects outdated norms, spelling and technical errors automatically."
    ),
    problem: tri(
      "Ichki hujjatlar bitta omborida emas, shuning uchun yuristlar vaqtning ko'pini qidirishga sarflaydi; avtomatik xato tekshiruvi yo'q.",
      "Внутренние документы не в едином хранилище, юристы тратят время на поиск; автоматической проверки ошибок нет.",
      "Internal documents are not in a single repository, so legal staff burn most of their time searching and cross-checking; there is no automated spelling/technical-error check."
    ),
    solution: tri(
      "lex.uz va bank bazasi bilan integratsiyalashgan avtomatik tahlil tizimi; OCR + NLP analizatorlari xatolarni aniqlaydi.",
      "Автоматизированный анализ с интеграцией lex.uz и базы банка; OCR + NLP анализаторы выявляют ошибки.",
      "An automated analysis system integrated with lex.uz and the bank's database; AI/ML-based content verification and OCR + NLP analysers for in-text error detection."
    ),
  },
  "ai-callcenter": {
    name: tri("Call Center AI", "Call Center AI", "Call Center AI"),
    short: tri(
      "Call markazi uchun AI yordamchi: oddiy va shablonli mijoz savollarini hal qiladi va murakkab holatlarni jonli operatorga uzatadi.",
      "AI-копилот для колл-центра: решает рутинные вопросы и плавно передаёт сложные кейсы живому оператору.",
      "AI co-pilot for the call center: handles routine and templated client questions and seamlessly hands off complex or personal-data cases to a live operator."
    ),
    problem: tri(
      "Call markazi shablonli savollarning katta hajmini oladi, har biri operatorni band qiladi.",
      "Колл-центр получает большой объём шаблонных вопросов, каждый занимает оператора.",
      "The call center receives a high volume of templated and recurring questions, yet every single one ties up a human operator."
    ),
    solution: tri(
      "OpenAI'da o'qitilgan yordamchi tez-tez savollarni hal qiladi va notanish mavzular yoki shaxsiy ma'lumotni operatorga yo'naltiradi.",
      "Ассистент на OpenAI решает FAQ и направляет незнакомые темы и персональные данные оператору.",
      "An OpenAI-powered assistant trained on the bank's structure resolves simple FAQs end-to-end and routes unfamiliar topics or anything involving personal data to a live operator."
    ),
  },
  "sqb-fleet-ai": {
    name: tri("SQB Fleet AI", "SQB Fleet AI", "SQB Fleet AI"),
    short: tri(
      "129 ta avtomobil va generatorni 13 mintaqada real vaqtda kuzatish, ML asosida haydovchini baholash va prediktiv texnik xizmat ko'rsatuvchi AI fleet platformasi.",
      "AI-платформа управления автопарком: мониторинг в реальном времени, ML-оценка водителей и прогнозное ТО для 129 авто и генераторов в 13 регионах.",
      "AI fleet-management platform with real-time monitoring, ML-based driver scoring and predictive maintenance for 129 vehicles and generators across 13 regions."
    ),
    problem: tri(
      "129 ta avtomobil va generator GPS hisobotlari orqali qo'lda kuzatilardi - yagona analitika yo'q edi.",
      "129 автомобилей и генераторов мониторились вручную через GPS - единой аналитики не было.",
      "129 vehicles and generators were monitored manually via scattered GPS reports - no unified analytics."
    ),
    solution: tri(
      "XGBoost modeli haydovchini baholaydi, 7 ta tahlil dvigateli parallel ishlaydi: scoring, yo'nalishdan tashqari foydalanish, mintaqaviy yuk, yoqilg'i tahlili, prediktiv texnik xizmat, generator monitoringi va marshrut tahlili.",
      "Модель XGBoost оценивает водителей, 7 аналитических движков работают параллельно: скоринг, нецелевое использование, региональная нагрузка, топливо, прогнозное ТО, мониторинг генераторов и анализ маршрутов.",
      "An XGBoost model scores driver behaviour from GPS events and seven analytical engines run in parallel: driver scoring, non-target-use detection, regional load distribution, fuel and cost analytics, predictive maintenance, generator monitoring and route analysis."
    ),
  },
  "sqb-solar-forecaster": {
    name: tri("SQB Solar Forecaster", "SQB Solar Forecaster", "SQB Solar Forecaster"),
    short: tri(
      "Quyosh stansiyalarida ishlash uchun 14 kun oldinga soatlik energiya ishlab chiqarish prognozi va past samaradorlikni real vaqtda belgilaydigan AI yordamchi.",
      "AI-ассистент для операторов солнечных станций: почасовой прогноз генерации на 14 дней вперёд и сигнализация недостаточной выработки в реальном времени.",
      "AI assistant for solar-station operators that forecasts hourly energy generation 14 days ahead and flags underperforming stations in real time."
    ),
    problem: tri(
      "Quyosh stansiya operatorlarida ishlab chiqarishning ishonchli prognozi yo'q - umumiy ob-havo asosidagi taxminlar 25-30% xato qiladi.",
      "У операторов нет надёжного прогноза выработки - оценки по общему прогнозу погоды ошибаются на 25-30%.",
      "Solar-station operators have no reliable forecast of upcoming energy generation - by-eye estimates from generic weather forecasts miss by 25-30%."
    ),
    solution: tri(
      "Stansiya tarixi va ob-havo prognozida o'qitilgan ML modeli kelgusi 14 kun uchun soatlik ishlab chiqarishni hisoblab chiqadi; dashboard pastroq ishlayotgan stansiyalarni darhol belgilaydi.",
      "ML-модель, обученная на истории станции и прогнозах погоды, считает почасовую генерацию на 14 дней; дашборд мгновенно подсвечивает станции ниже прогноза.",
      "An ML model trained on each station's historical telemetry and weather forecasts automatically computes hourly generation for every station for the next 14 days; the dashboard instantly highlights stations underperforming the model's prediction."
    ),
  },
};

// News content in 3 languages (id-keyed) - using existing seeds and providing UZ/RU/EN
const NEWS_I18N: Record<string, { title: ReturnType<typeof tri>; excerpt: ReturnType<typeof tri> }> = {
  n1: {
    title: tri(
      "SQB AI Hackathon: raqamli kelajak va innovatsion yechimlar markazida",
      "SQB AI Hackathon: в центре цифрового будущего и инновационных решений",
      "SQB AI Hackathon: at the heart of digital future and innovative solutions"
    ),
    excerpt: tri(
      "SQB va Yangi O'zbekiston Universiteti birgalikda AI hakatonni o'tkazdi va yosh dasturchilarni real bank va moliya muammolarini yechishga yig'di.",
      "SQB и Новый Узбекский Университет совместно провели AI-хакатон, собрав молодых разработчиков для решения банковских и финансовых задач.",
      "SQB and New Uzbekistan University co-hosted an AI Hackathon, bringing young developers together to solve real banking and finance challenges."
    ),
  },
  n2: {
    title: tri(
      "Sun'iy intellekt - O'zbekiston iqtisodiyotining drayveri",
      "Искусственный интеллект становится драйвером экономики Узбекистана",
      "Artificial Intelligence becomes a driver of Uzbekistan's economy"
    ),
    excerpt: tri(
      "SQB tomonidan o'tkazilgan AI va raqamli transformatsiya bo'yicha xalqaro konferensiya hukumat, banklar va IT-sanoatni yagona sahnaga olib chiqdi.",
      "Международная конференция по AI и цифровой трансформации, проведённая SQB, объединила правительство, банки и IT-индустрию.",
      "An international conference on AI and digital transformation hosted by SQB gathered government, banks and the IT industry on one stage."
    ),
  },
  n3: {
    title: tri(
      "SQB AI Advisor - g'oyani daqiqalarda real biznesga aylantiring",
      "SQB AI Advisor - превратите идею в реальный бизнес за минуты",
      "SQB AI Advisor - turn an idea into a real business in minutes"
    ),
    excerpt: tri(
      "SQB'dan raqamli yordamchi g'oyangizni va mintaqaviy bozor talablarini tahlil qiladi, moliyalashtirish variantlari bilan tayyor biznes-rejani taqdim etadi.",
      "Цифровой ассистент SQB анализирует вашу идею и потребности рынка региона, выдавая готовый бизнес-план с вариантами финансирования.",
      "A digital assistant from SQB that analyses your idea, regional market needs and produces a ready business plan with financing options."
    ),
  },
  n4: {
    title: tri(
      "Yoshlar, startaplar va IT: SQB va Yangi O'zbekiston Universiteti hamkorlikni boshlaydi",
      "Молодёжь, стартапы и IT: SQB и Новый Узбекский Университет запускают сотрудничество",
      "Youth, startups and IT: SQB and New Uzbekistan University launch cooperation"
    ),
    excerpt: tri(
      "Universitet akselerator dasturi doirasida imzolangan memorandum AI, kiberxavfsizlik, tadqiqot va birgalikdagi startap loyihalarini qamrab oladi.",
      "Подписанный в рамках акселератора университета меморандум охватывает AI, кибербезопасность, исследования и совместные стартап-проекты.",
      "A memorandum signed within the university's accelerator program covers AI, cybersecurity, research and joint startup projects."
    ),
  },
  n5: {
    title: tri(
      "Yoshlar salohiyati va innovatsiya - ustuvor yo'nalish",
      "Потенциал молодёжи и инновации - приоритетное направление",
      "Youth potential and innovation - a priority direction"
    ),
    excerpt: tri(
      "SQB Turin Politexnika Universiteti bilan birgalikdagi AI va IT loyihalarini amalga oshirish bo'yicha hamkorlik memorandumini imzolaydi.",
      "SQB подписывает меморандум о сотрудничестве с Туринским политехническим университетом для совместных AI и IT проектов.",
      "SQB signs a memorandum of cooperation with Turin Polytechnic University to deliver joint AI and IT projects."
    ),
  },
};

// Events content in 3 languages
const EVENTS_I18N: Record<string, { name: ReturnType<typeof tri>; place: ReturnType<typeof tri>; participants: ReturnType<typeof tri> }> = {
  e1: {
    name: tri("SQB AI Hackathon", "SQB AI Hackathon", "SQB AI Hackathon"),
    place: tri("Toshkent", "Ташкент", "Tashkent"),
    participants: tri("AI muhandislari, dasturchilar, talabalar", "AI-инженеры, разработчики, студенты", "AI engineers, developers, students"),
  },
  e2: {
    name: tri("Xalqaro AI Konferensiyasi", "Международная AI-конференция", "International AI Conference"),
    place: tri("Toshkent", "Ташкент", "Tashkent"),
    participants: tri("Hukumat, banklar, ekspertlar", "Правительство, банки, эксперты", "Government, banks, experts"),
  },
  e3: {
    name: tri(
      "Yangi O'zbekiston Universiteti bilan hamkorlik",
      "Партнёрство с Новым Узбекским Университетом",
      "Partnership with New Uzbekistan University"
    ),
    place: tri(
      "Yangi O'zbekiston Universiteti, Toshkent",
      "Новый Узбекский Университет, Ташкент",
      "New Uzbekistan University, Tashkent"
    ),
    participants: tri(
      "Universitet va SQB vakillari",
      "Представители университета и SQB",
      "University and SQB representatives"
    ),
  },
  e4: {
    name: tri(
      "Turin Politexnika Universiteti bilan hamkorlik",
      "Партнёрство с Туринским политехническим университетом",
      "Partnership with Turin Polytechnic University"
    ),
    place: tri(
      "Turin Politexnika Universiteti, Toshkent",
      "Туринский политехнический университет, Ташкент",
      "Turin Polytechnic University, Tashkent"
    ),
    participants: tri(
      "Universitet va SQB vakillari",
      "Представители университета и SQB",
      "University and SQB representatives"
    ),
  },
};

// Vacancies in 3 languages (id-keyed)
const OFFER = tri(
  "O'zbekistonning yetakchi banklaridan birida ish va gibrid format\nMentor qo'llab-quvvatlovi bilan karyera o'sishi va o'qish\nKuchli AI jamoasi, konferensiyalar va meetuplar\nRaqobatbardosh maosh - suhbatda kelishamiz",
  "Работа в одном из ведущих банков Узбекистана и гибридный формат\nКарьерный рост и обучение с поддержкой ментора\nСильная AI-команда, конференции и митапы\nКонкурентная зарплата - обсудим на собеседовании",
  "Work at one of Uzbekistan's leading banks and a hybrid format\nCareer growth and learning with mentor support\nA strong AI team, conferences and meetups\nCompetitive salary - discussed at the interview"
);

const VACANCIES: {
  id: string;
  type: "full-time" | "part-time" | "internship" | "contract";
  icon: string;
  title: ReturnType<typeof tri>;
  location: ReturnType<typeof tri>;
  description: ReturnType<typeof tri>;
  responsibilities: ReturnType<typeof tri>;
  requirements: ReturnType<typeof tri>;
  offer: ReturnType<typeof tri>;
}[] = [
  {
    id: "senior-ml-engineer",
    type: "full-time",
    icon: "brain",
    title: tri("Senior ML muhandisi", "Senior ML-инженер", "Senior ML Engineer"),
    location: tri("Toshkent · gibrid", "Ташкент · гибрид", "Tashkent · hybrid"),
    description: tri(
      "Jamoamiz bankning qaror qabul qilish jarayoniga AI modellarini joriy etadi. Siz kredit risk, skoring va firibgarlik bo'yicha production modellarini g'oyadan to ishga tushirishgacha olib chiqasiz.\nIshingiz to'g'ridan-to'g'ri bankning risk va mijoz tajribasi ko'rsatkichlariga ta'sir qiladi.",
      "Наша команда внедряет AI-модели в контур принятия решений банка. Вы выводите production-модели по кредитному риску, скорингу и фроду от идеи до продакшена.\nВаша работа напрямую влияет на риск-метрики и клиентский опыт банка.",
      "Our team embeds AI models into the bank's decision loop. You take production models for credit risk, scoring and fraud from idea to deployment.\nYour work directly affects the bank's risk metrics and customer experience."
    ),
    responsibilities: tri(
      "Kredit risk va skoring modellarini loyihalash, o'qitish va ishga tushirish\nFeature engineering va modellarni production'da monitoring qilish\nRisk va biznes jamoalari bilan birga metrikalarni yaxshilash\nMLOps amaliyotlarini joriy etish",
      "Проектировать, обучать и выводить в прод модели кредитного риска и скоринга\nFeature engineering и мониторинг моделей в проде\nУлучшать метрики вместе с риск- и бизнес-командами\nВнедрять практики MLOps",
      "Design, train and ship credit-risk and scoring models\nFeature engineering and monitoring models in production\nImprove metrics together with risk and business teams\nIntroduce MLOps practices"
    ),
    requirements: tri(
      "Python va ML stack (PyTorch yoki scikit-learn) bo'yicha 3+ yil\nProduction ML va MLOps tajribasi\nSQL va katta ma'lumotlar bilan ishlash\nNatijaga yo'naltirilganlik va o'zbek/rus tili",
      "3+ года Python и ML-стек (PyTorch или scikit-learn)\nОпыт production ML и MLOps\nSQL и работа с большими данными\nОриентация на результат и узбекский/русский язык",
      "3+ years Python and ML stack (PyTorch or scikit-learn)\nProduction ML and MLOps experience\nSQL and large-scale data\nResult-driven mindset and Uzbek/Russian language"
    ),
    offer: OFFER,
  },
  {
    id: "data-engineer",
    type: "full-time",
    icon: "database",
    title: tri("Data muhandisi", "Дата-инженер", "Data Engineer"),
    location: tri("Toshkent", "Ташкент", "Tashkent"),
    description: tri(
      "Bank DWH va ma'lumot pipeline'larini qurasiz va AI jamoasi uchun ishonchli, sifatli ma'lumot oqimini ta'minlaysiz.\nMa'lumot infratuzilmasi barcha AI loyihalarining poydevori - siz uni mustahkam qilasiz.",
      "Вы строите банковский DWH и дата-пайплайны, обеспечивая надёжный и качественный поток данных для AI-команды.\nДата-инфраструктура - фундамент всех AI-проектов, и вы делаете его прочным.",
      "You build the banking DWH and data pipelines, ensuring a reliable, high-quality data flow for the AI team.\nData infrastructure is the foundation of every AI project - you make it solid."
    ),
    responsibilities: tri(
      "ETL/ELT pipeline'larni loyihalash va orkestratsiya qilish\nDWH sxemalari va ma'lumot sifatini ta'minlash\nML jamoasi uchun ma'lumot martlarini tayyorlash\nPipeline monitoringi va optimizatsiyasi",
      "Проектировать и оркестрировать ETL/ELT пайплайны\nОбеспечивать схемы DWH и качество данных\nГотовить витрины данных для ML-команды\nМониторинг и оптимизация пайплайнов",
      "Design and orchestrate ETL/ELT pipelines\nMaintain DWH schemas and data quality\nPrepare data marts for the ML team\nMonitor and optimise pipelines"
    ),
    requirements: tri(
      "SQL va PostgreSQL chuqur bilim\nETL/ELT va pipeline orkestratsiyasi\nPython\nDataOps amaliyotlari",
      "Глубокое знание SQL и PostgreSQL\nETL/ELT и оркестрация пайплайнов\nPython\nПрактики DataOps",
      "Strong SQL and PostgreSQL\nETL/ELT and pipeline orchestration\nPython\nDataOps practices"
    ),
    offer: OFFER,
  },
  {
    id: "nlp-llm-engineer",
    type: "full-time",
    icon: "cpu",
    title: tri("NLP / LLM muhandisi", "NLP / LLM инженер", "NLP / LLM Engineer"),
    location: tri("Toshkent · gibrid", "Ташкент · гибрид", "Tashkent · hybrid"),
    description: tri(
      "Kontakt markazi va ichki yordamchilar uchun ko'p tilli suhbat AI va RAG tizimlarini ishlab chiqasiz.\nO'zbek tili uchun AI'ni rivojlantirishda yetakchi rol o'ynaysiz.",
      "Вы разрабатываете многоязычный разговорный AI и RAG-системы для контакт-центра и внутренних ассистентов.\nВы играете ведущую роль в развитии AI для узбекского языка.",
      "You build multilingual conversational AI and RAG systems for the contact centre and internal assistants.\nYou play a leading role in advancing AI for the Uzbek language."
    ),
    responsibilities: tri(
      "LLM asosidagi yordamchilar va RAG pipeline'larini qurish\nPrompt engineering va modellarni baholash\nVektor bazalar va API integratsiyalari\nJavob sifati va xavfsizligini ta'minlash",
      "Строить ассистентов на LLM и RAG-пайплайны\nPrompt engineering и оценка качества моделей\nВекторные базы и интеграции API\nОбеспечивать качество и безопасность ответов",
      "Build LLM-based assistants and RAG pipelines\nPrompt engineering and model evaluation\nVector databases and API integrations\nEnsure answer quality and safety"
    ),
    requirements: tri(
      "LLM, prompt engineering va RAG tajribasi\nPython va API integratsiyalari\nVektor bazalar bilan ishlash\nO'zbek tili NLP'ga qiziqish",
      "Опыт LLM, prompt engineering и RAG\nPython и интеграции API\nРабота с векторными базами\nИнтерес к NLP узбекского языка",
      "LLM, prompt engineering and RAG experience\nPython and API integrations\nVector databases\nInterest in Uzbek-language NLP"
    ),
    offer: OFFER,
  },
  {
    id: "ai-product-manager",
    type: "full-time",
    icon: "clipboard",
    title: tri("AI Product menejer", "AI Product-менеджер", "AI Product Manager"),
    location: tri("Toshkent", "Ташкент", "Tashkent"),
    description: tri(
      "AI mahsulotlarning yo'l xaritasini belgilaysiz, biznes va muhandislik jamoalarini birlashtirasiz va natijani metrikalarda o'lchaysiz.\nG'oyadan productioncha - har bir mahsulotni siz boshqarasiz.",
      "Вы определяете дорожную карту AI-продуктов, связываете бизнес и инженерные команды и измеряете эффект в метриках.\nОт идеи до прода - каждым продуктом управляете вы.",
      "You own the AI product roadmap, align business and engineering teams, and measure impact in metrics.\nFrom idea to production - you drive each product."
    ),
    responsibilities: tri(
      "AI mahsulotlar yo'l xaritasi va backlog'ini boshqarish\nBiznes talablarni muhandislik vazifalariga aylantirish\nMuvaffaqiyat metrikalarini belgilash va kuzatish\nSteykholderlar bilan muloqot",
      "Управлять дорожной картой и бэклогом AI-продуктов\nПереводить бизнес-требования в инженерные задачи\nОпределять и отслеживать метрики успеха\nКоммуникация со стейкхолдерами",
      "Own the AI product roadmap and backlog\nTranslate business requirements into engineering tasks\nDefine and track success metrics\nCommunicate with stakeholders"
    ),
    requirements: tri(
      "Product yoki loyiha boshqaruvida 3+ yil\nTexnik jamoalar bilan ishlash tajribasi\nMetrikaga asoslangan yondashuv\nO'zbek/rus/ingliz tili",
      "3+ года в product или проектном управлении\nОпыт работы с техническими командами\nПодход на основе метрик\nУзбекский/русский/английский",
      "3+ years in product or project management\nExperience with technical teams\nMetrics-driven approach\nUzbek/Russian/English"
    ),
    offer: OFFER,
  },
  {
    id: "ai-engineer-intern",
    type: "internship",
    icon: "boxes",
    title: tri("AI muhandis-stajyor", "AI инженер-стажёр", "AI Engineer Intern"),
    location: tri("Toshkent", "Ташкент", "Tashkent"),
    description: tri(
      "Real AI loyihalarda senior jamoa yonida ishlaysiz, modellarni o'qitish va integratsiyada tajriba orttirasiz.\nEng yaxshi stajyorlar uchun doimiy ish taklifi mavjud.",
      "Вы работаете над реальными AI-проектами рядом с senior-командой, набираясь опыта в обучении и интеграции моделей.\nДля лучших стажёров есть предложение постоянной работы.",
      "You work on real AI projects alongside a senior team, gaining experience in model training and integration.\nThe best interns receive a full-time offer."
    ),
    responsibilities: tri(
      "Senior muhandislar bilan ML vazifalarida ishlash\nMa'lumotlarni tayyorlash va modellarni o'qitishda yordam\nProof-of-concept'lar va eksperimentlar\nTajriba natijalarini hujjatlashtirish",
      "Работать над ML-задачами с senior-инженерами\nПомогать в подготовке данных и обучении моделей\nProof-of-concept'ы и эксперименты\nДокументировать результаты экспериментов",
      "Work on ML tasks with senior engineers\nHelp with data preparation and model training\nProof-of-concepts and experiments\nDocument experiment results"
    ),
    requirements: tri(
      "Python asoslari va ML'ga qiziqish\nMatematika/statistika bo'yicha tushuncha\nO'rganishga ishtiyoq\nTalaba yoki bitiruvchi",
      "Основы Python и интерес к ML\nПонимание математики/статистики\nЖелание учиться\nСтудент или выпускник",
      "Python basics and interest in ML\nUnderstanding of maths/statistics\nEagerness to learn\nStudent or recent graduate"
    ),
    offer: OFFER,
  },
];

async function main() {
  console.log("Seeding database...");

  // Admin users - only seed on a fresh install. If any admin already
  // exists, leave passwords alone so production credentials rotated
  // out-of-band are preserved.
  const existingAdmins = await prisma.adminUser.count();
  if (existingAdmins === 0) {
    const generated: { email: string; password: string }[] = [];
    for (const u of ADMIN_USERS) {
      const password = generatePassword();
      const passwordHash = await bcrypt.hash(password, 10);
      await prisma.adminUser.create({
        data: { email: u.email, name: u.name, passwordHash },
      });
      generated.push({ email: u.email, password });
    }
    console.log(`  ✓ ${ADMIN_USERS.length} admin users (bootstrapped)`);
    console.log("");
    console.log("  ┌─────────────────────────────────────────────────────────────┐");
    console.log("  │  GENERATED ADMIN CREDENTIALS - shown ONCE, store securely    │");
    console.log("  │  Rotate these passwords after first login.                   │");
    console.log("  └─────────────────────────────────────────────────────────────┘");
    for (const g of generated) {
      console.log(`    ${g.email}  →  ${g.password}`);
    }
    console.log("");
  } else {
    console.log(`  ↷ ${existingAdmins} admin users already exist - skipped`);
  }

  // ──────────────────────────────────────────────────────────────────────
  // SAFE MODE: content (directions, kpis, team, projects, news, events,
  // vacancies, gallery, faq) is seeded ONLY when the database is fresh.
  // If any content already exists, everything below is skipped so that
  // admin-edited data is NEVER overwritten by re-running the seed.
  // ──────────────────────────────────────────────────────────────────────
  const dbIsFresh = (await prisma.teamMember.count()) === 0;
  if (!dbIsFresh) {
    console.log(
      "  ↷ Content already exists - skipping content seed (safe mode, no overwrite)"
    );
    console.log("Done.");
    return;
  }

  // AI Directions
  await prisma.aiDirection.deleteMany();
  for (let i = 0; i < DIRECTIONS_I18N.length; i++) {
    const d = DIRECTIONS_I18N[i];
    await prisma.aiDirection.create({
      data: { title: d.title, description: d.description, order: i },
    });
  }
  console.log(`  ✓ ${DIRECTIONS_I18N.length} AI directions`);

  // KPIs
  await prisma.kpi.deleteMany();
  for (let i = 0; i < KPIS_I18N.length; i++) {
    const k = KPIS_I18N[i];
    await prisma.kpi.create({
      data: {
        label: k.label,
        value: k.value,
        suffix: k.suffix,
        decimals: k.decimals,
        order: i,
      },
    });
  }
  console.log(`  ✓ ${KPIS_I18N.length} KPIs`);

  // Team - name stays as String, role/bio multilingual
  for (let i = 0; i < team.length; i++) {
    const m = team[i];
    const i18n = TEAM_I18N[m.id] ?? {
      role: tri(str(m.role), str(m.role), str(m.role)),
      bio: tri(str(m.bio), str(m.bio), str(m.bio)),
    };
    await prisma.teamMember.upsert({
      where: { id: m.id },
      update: {
        name: m.name,
        role: i18n.role,
        bio: i18n.bio,
        skills: m.skills,
        photo: m.photo,
        order: i,
      },
      create: {
        id: m.id,
        name: m.name,
        role: i18n.role,
        bio: i18n.bio,
        skills: m.skills,
        photo: m.photo,
        order: i,
      },
    });
  }
  console.log(`  ✓ ${team.length} team members`);

  // Build map from short name → team id
  const nameToId = new Map<string, string>();
  for (const m of team) nameToId.set(m.name.split(" ")[0].toLowerCase(), m.id);
  const resolveTeam = (names: string[]) =>
    names
      .map((n) => nameToId.get(n.split(" ")[0].toLowerCase()))
      .filter((id): id is string => Boolean(id));

  // Projects
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    const tx = PROJECTS_I18N[p.id] ?? {
      name: tri(str(p.name), str(p.name), str(p.name)),
      short: tri(str(p.short), str(p.short), str(p.short)),
      problem: tri(str(p.problem), str(p.problem), str(p.problem)),
      solution: tri(str(p.solution), str(p.solution), str(p.solution)),
    };
    const teamIds = resolveTeam(p.team);
    await prisma.project.upsert({
      where: { id: p.id },
      update: {
        name: tx.name,
        short: tx.short,
        problem: tx.problem,
        solution: tx.solution,
        technologies: p.technologies,
        impact: p.impact,
        direction: p.direction,
        status: p.status,
        order: i,
        team: { set: teamIds.map((id) => ({ id })) },
      },
      create: {
        id: p.id,
        name: tx.name,
        short: tx.short,
        problem: tx.problem,
        solution: tx.solution,
        technologies: p.technologies,
        impact: p.impact,
        direction: p.direction,
        status: p.status,
        order: i,
        team: { connect: teamIds.map((id) => ({ id })) },
      },
    });
  }
  console.log(`  ✓ ${projects.length} projects`);

  // News
  for (let i = 0; i < news.length; i++) {
    const n = news[i];
    const tx = NEWS_I18N[n.id] ?? {
      title: tri(str(n.title), str(n.title), str(n.title)),
      excerpt: tri(str(n.excerpt), str(n.excerpt), str(n.excerpt)),
    };
    await prisma.newsItem.upsert({
      where: { id: n.id },
      update: {
        title: tx.title,
        excerpt: tx.excerpt,
        date: new Date(n.date),
        category: n.category,
        image: n.image,
        order: i,
      },
      create: {
        id: n.id,
        title: tx.title,
        excerpt: tx.excerpt,
        date: new Date(n.date),
        category: n.category,
        image: n.image,
        order: i,
      },
    });
  }
  console.log(`  ✓ ${news.length} news items`);

  // Events
  for (let i = 0; i < events.length; i++) {
    const e = events[i];
    const tx = EVENTS_I18N[e.id] ?? {
      name: tri(str(e.name), str(e.name), str(e.name)),
      place: tri(str(e.place), str(e.place), str(e.place)),
      participants: tri(
        str(e.participants),
        str(e.participants),
        str(e.participants)
      ),
    };
    await prisma.eventItem.upsert({
      where: { id: e.id },
      update: {
        name: tx.name,
        date: new Date(e.date),
        place: tx.place,
        participants: tx.participants,
        image: e.image,
        gallery: e.gallery,
        order: i,
      },
      create: {
        id: e.id,
        name: tx.name,
        date: new Date(e.date),
        place: tx.place,
        participants: tx.participants,
        image: e.image,
        gallery: e.gallery,
        order: i,
      },
    });
  }
  console.log(`  ✓ ${events.length} events`);

  // Vacancies
  for (let i = 0; i < VACANCIES.length; i++) {
    const v = VACANCIES[i];
    await prisma.vacancy.upsert({
      where: { id: v.id },
      update: {
        title: v.title,
        location: v.location,
        type: v.type,
        icon: v.icon,
        description: v.description,
        responsibilities: v.responsibilities,
        requirements: v.requirements,
        offer: v.offer,
        order: i,
      },
      create: {
        id: v.id,
        title: v.title,
        location: v.location,
        type: v.type,
        icon: v.icon,
        description: v.description,
        responsibilities: v.responsibilities,
        requirements: v.requirements,
        offer: v.offer,
        order: i,
      },
    });
  }
  console.log(`  ✓ ${VACANCIES.length} vacancies`);

  // Gallery
  await prisma.galleryImage.deleteMany();
  for (let i = 0; i < galleryImages.length; i++) {
    await prisma.galleryImage.create({
      data: { url: galleryImages[i], order: i },
    });
  }
  console.log(`  ✓ ${galleryImages.length} gallery images`);

  // FAQ
  await prisma.faqItem.deleteMany();
  for (let i = 0; i < FAQ_I18N.length; i++) {
    const f = FAQ_I18N[i];
    await prisma.faqItem.create({
      data: { question: f.question, answer: f.answer, order: i },
    });
  }
  console.log(`  ✓ ${FAQ_I18N.length} FAQ items`);

  // suppress unused vars warnings (kpis, aiDirections imported for type)
  void kpis;
  void aiDirections;

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
