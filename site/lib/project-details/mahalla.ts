import type { ProjectDetail } from "./types";

// Source: Projects/SQB_Mahalla_loyiha_tavsifi.docx (Uzbek original).
// SQB Mahalla is the umbrella platform - the "Mahalla Bankiri" mobile app and
// the AI Advisor are modules inside it, not separate projects.
export const mahalla: ProjectDetail = {
  id: "sqb-mahalla",
  tagline: {
    uz: "«Oʻzsanoatqurilishbank» uchun yagona raqamli tahliliy va bankchilik platformasi",
    ru: "Единая цифровая аналитическая и банковская платформа для «Узпромстройбанка»",
    en: "A single digital analytics and banking platform built for Uzsanoatqurilishbank (SQB)",
  },
  heroImage: {
    src: "/projects/mahalla/hero-tablet.webp",
    w: 1500,
    h: 1207,
    alt: "SQB Mahalla platformasi planshetda",
    bare: true,
  },
  sections: [
    {
      kind: "paragraph",
      label: { uz: "Loyiha haqida", ru: "О проекте", en: "Overview" },
      body: {
        uz: "«SQB Mahalla» - bank uchun yaratilgan yagona raqamli platforma boʻlib, u ikki vazifani birlashtiradi: Oʻzbekiston hududlari (viloyat, tuman va mahallalar) boʻyicha ijtimoiy-iqtisodiy maʼlumotlarni yigʻish hamda sunʼiy intellekt yordamida tahlil qilish; va mahalla bankirlari uchun bevosita mijoz yonida ishlash imkonini beruvchi mobil (PWA) ish oʻrni. Platforma orqali bank hududiy rivojlanishni monitoring qiladi, tadbirkorlarga kredit va biznes-tahlil xizmatlarini koʻrsatadi va arizalarni bankning ichki tizimlariga uzatadi.",
        ru: "«SQB Mahalla» - единая цифровая платформа банка, объединяющая две задачи: сбор и анализ социально-экономических данных по регионам Узбекистана (вилояты, туманы и махалли) с помощью искусственного интеллекта; и мобильное (PWA) рабочее место для махаллинских банкиров, позволяющее работать прямо рядом с клиентом. Через платформу банк отслеживает региональное развитие, оказывает предпринимателям кредитные и бизнес-аналитические услуги и передаёт заявки во внутренние системы банка.",
        en: "SQB Mahalla is the bank's single digital platform, uniting two jobs: collecting and AI-analysing socio-economic data across Uzbekistan's regions (viloyats, districts and mahallas); and a mobile (PWA) workplace for mahalla bankers that works right next to the client. Through it the bank monitors regional development, delivers lending and business-analytics services to entrepreneurs, and routes applications into the bank's internal systems.",
      },
    },
    {
      kind: "bullets",
      label: { uz: "Yechilayotgan muammo", ru: "Решаемая проблема", en: "The problem we solve" },
      intro: {
        uz: "Anʼanaviy yondashuvda hududiy koʻrsatkichlar tarqoq manbalarda saqlanadi, mahalla bankiri esa mijoz bilan ishlashda qogʻoz jarayonlarga bogʻliq boʻladi. Platforma quyidagilarni hal etadi:",
        ru: "При традиционном подходе региональные показатели хранятся в разрозненных источниках, а махаллинский банкир при работе с клиентом зависит от бумажных процессов. Платформа решает:",
        en: "Traditionally, regional indicators live in scattered sources, and the mahalla banker depends on paper processes when working with a client. The platform solves:",
      },
      items: [
        {
          uz: "barcha hududlar boʻyicha koʻrsatkichlarni yagona bazada toʻplash va vizuallashtirish;",
          ru: "сбор и визуализацию показателей по всем регионам в единой базе;",
          en: "collecting and visualising indicators for every region in one database;",
        },
        {
          uz: "mijozni joyida identifikatsiya qilish (MyID) va kredit arizasini elektron rasmiylashtirish;",
          ru: "идентификацию клиента на месте (MyID) и электронное оформление кредитной заявки;",
          en: "on-site client identification (MyID) and electronic loan-application filing;",
        },
        {
          uz: "sunʼiy intellekt yordamida biznes-tahlil va tavsiyalar shakllantirish;",
          ru: "формирование бизнес-анализа и рекомендаций с помощью ИИ;",
          en: "generating business analysis and recommendations with AI;",
        },
        {
          uz: "arizalarni bankning CRM va ichki tizimlariga avtomatik uzatish;",
          ru: "автоматическую передачу заявок в CRM и внутренние системы банка;",
          en: "auto-routing applications into the bank's CRM and internal systems;",
        },
        {
          uz: "bankirlarning hududiy faoliyatini shaffof monitoring qilish.",
          ru: "прозрачный мониторинг региональной работы банкиров.",
          en: "transparent monitoring of bankers' field activity.",
        },
      ],
    },
    {
      kind: "cards",
      label: { uz: "Asosiy modullar", ru: "Основные модули", en: "Core modules" },
      items: [
        {
          title: { uz: "Umumiy tahliliy dashboard", ru: "Аналитический дашборд", en: "Analytics dashboard" },
          body: {
            uz: "Barcha hududlar boʻyicha ijtimoiy-iqtisodiy koʻrsatkichlarni interaktiv xarita va kartochkalarda koʻrsatadi; viloyat → tuman → mahalla kesimida batafsillashtirish.",
            ru: "Показывает социально-экономические показатели по всем регионам на интерактивной карте и карточках; детализация вилоят → туман → махалля.",
            en: "Shows socio-economic indicators for every region on an interactive map and cards; drill-down from viloyat → district → mahalla.",
          },
        },
        {
          title: { uz: "«Mahalla Bankiri» mobil ilova (PWA)", ru: "Мобильное приложение «Махаллинский банкир» (PWA)", en: "“Mahalla Banker” mobile app (PWA)" },
          body: {
            uz: "Bankirning joyida ishlashi uchun oʻrnatiladigan, oflayn rejimni qoʻllab-quvvatlaydigan ilova: kredit kalkulyatori, MyID orqali ariza, geotreking, ovozli yozuv va oflaynda saqlab, tarmoq qaytganda yuborish.",
            ru: "Устанавливаемое приложение с поддержкой офлайна для работы банкира на месте: кредитный калькулятор, заявка через MyID, геотрекинг, аудиозапись и сохранение офлайн с отправкой при возврате сети.",
            en: "An installable, offline-capable app for the banker in the field: loan calculator, MyID-based application, geotracking, voice recording, and offline save that sends when the network returns.",
          },
        },
        {
          title: { uz: "AI-maslahatchi (Advisor)", ru: "AI-советник (Advisor)", en: "AI Advisor" },
          body: {
            uz: "Tadbirkorlarga tanlangan yoʻnalish va hudud boʻyicha biznes-gʻoyalar va tavsiyalar beruvchi sunʼiy intellekt moduli; hududiy maʼlumotlarga moslashtirilgan javoblar va biznes-reja.",
            ru: "Модуль ИИ, дающий предпринимателям бизнес-идеи и рекомендации по выбранному направлению и региону; ответы и бизнес-план, адаптированные под региональные данные.",
            en: "An AI module that gives entrepreneurs business ideas and recommendations for a chosen sector and region; answers and a business plan tuned to regional data.",
          },
        },
        {
          title: { uz: "Boshqaruv paneli (admin)", ru: "Панель управления (админ)", en: "Admin control panel" },
          body: {
            uz: "Regionlar, tumanlar va mahallalar maʼlumotnomasi, indikatorlar va kartochka shablonlarini boshqarish; Excel orqali yuklash; faoliyat jurnali (audit log).",
            ru: "Управление справочником регионов, туманов и махаллей, индикаторами и шаблонами карточек; загрузка через Excel; журнал действий (audit log).",
            en: "Manages the reference book of regions, districts and mahallas, indicators and card templates; Excel import; an activity audit log.",
          },
        },
        {
          title: { uz: "Maʼlumotnoma va AI-pipeline", ru: "Справочник и AI-конвейер", en: "Reference book & AI pipeline" },
          body: {
            uz: "Regionlar/tumanlar/mahallalar tarkibi va chegaralarini boshqarish; Excel maʼlumotlarini avtomatik qayta ishlab, koʻrsatkichlarga aylantirish.",
            ru: "Управление составом и границами регионов/туманов/махаллей; автоматическая обработка Excel-данных в показатели.",
            en: "Manages the composition and boundaries of regions/districts/mahallas; automatically turns Excel data into indicators.",
          },
        },
        {
          title: { uz: "Hisobotlar", ru: "Отчёты", en: "Reports" },
          body: {
            uz: "PDF, PPTX va DOCX formatlarida hisobotlarni shakllantirish - hudud kesimida tayyor hujjatlar.",
            ru: "Формирование отчётов в форматах PDF, PPTX и DOCX - готовые документы в разрезе региона.",
            en: "Generates reports in PDF, PPTX and DOCX - ready documents by region.",
          },
        },
      ],
    },
    {
      kind: "bullets",
      label: { uz: "Foydalanuvchilar va rollar", ru: "Пользователи и роли", en: "Users and roles" },
      intro: {
        uz: "Platforma rolga asoslangan kirish modeli bilan ishlaydi; har bir foydalanuvchi faqat oʻz vakolatlari doirasida amal bajaradi:",
        ru: "Платформа работает с ролевой моделью доступа; каждый пользователь действует только в рамках своих полномочий:",
        en: "The platform uses a role-based access model; each user acts only within their permissions:",
      },
      items: [
        { uz: "Administrator - tizim va foydalanuvchilarni boshqarish, maʼlumot va kalitlarni sozlash.", ru: "Администратор - управление системой и пользователями, настройка данных и ключей.", en: "Administrator - manages the system and users, configures data and keys." },
        { uz: "Muharrir - hududiy maʼlumotlarni yuklash va chop etish.", ru: "Редактор - загрузка и публикация региональных данных.", en: "Editor - uploads and publishes regional data." },
        { uz: "Mahalla bankiri - joyida identifikatsiya, kredit kalkulyatori, ariza va AI-tahlil.", ru: "Махаллинский банкир - идентификация на месте, кредитный калькулятор, заявка и AI-анализ.", en: "Mahalla banker - on-site identification, loan calculator, application and AI analysis." },
        { uz: "Filial menejeri - filialda xuddi shu funksiyalar (hududiy funksiyalarsiz).", ru: "Менеджер филиала - те же функции в филиале (без региональных).", en: "Branch manager - the same functions in the branch (without regional ones)." },
        { uz: "Kuzatuvchi - respublika/hudud kesimida statistikani kuzatish.", ru: "Наблюдатель - просмотр статистики в разрезе республики/региона.", en: "Observer - views statistics across the republic/region." },
        { uz: "Mijoz - oʻz shaxsiy kabineti orqali hujjatlarni yuklash.", ru: "Клиент - загрузка документов через личный кабинет.", en: "Client - uploads documents via a personal cabinet." },
      ],
    },
    {
      kind: "stats",
      label: { uz: "Maʼlumotlar qamrovi", ru: "Охват данных", en: "Data coverage" },
      items: [
        { label: { uz: "Viloyatlar", ru: "Вилояты", en: "Regions" }, value: "15" },
        { label: { uz: "Tuman va shaharlar", ru: "Туманы и города", en: "Districts & cities" }, value: "201" },
        { label: { uz: "Mahallalar (MFY)", ru: "Махалли (МФЙ)", en: "Mahallas" }, value: "3 234" },
        { label: { uz: "Indikator taʼriflari", ru: "Определения индикаторов", en: "Indicator definitions" }, value: "670" },
        { label: { uz: "Indikator qiymatlari", ru: "Значения индикаторов", en: "Indicator values" }, value: "5 323" },
      ],
    },
    {
      kind: "cards",
      label: { uz: "Tashqi integratsiyalar", ru: "Внешние интеграции", en: "External integrations" },
      items: [
        { title: { uz: "MyID", ru: "MyID", en: "MyID" }, body: { uz: "Mijozni biometrik identifikatsiya qilish.", ru: "Биометрическая идентификация клиента.", en: "Biometric client identification." } },
        { title: { uz: "CRM «Fido Biznes» / IABS", ru: "CRM «Fido Biznes» / IABS", en: "CRM “Fido Biznes” / IABS" }, body: { uz: "Arizalar asosida lid yaratish va bankning ichki tizimi (IABS) bilan aloqa.", ru: "Создание лида по заявке и связь с внутренней системой банка (IABS).", en: "Creates a lead from an application and links to the bank's core system (IABS)." } },
        { title: { uz: "Markaziy bank (CBU)", ru: "Центральный банк (CBU)", en: "Central Bank (CBU)" }, body: { uz: "Rasmiy valyuta kurslari.", ru: "Официальные курсы валют.", en: "Official currency rates." } },
        { title: { uz: "SMS-shlyuz", ru: "SMS-шлюз", en: "SMS gateway" }, body: { uz: "Bankning ichki SMS-shlyuzi orqali bildirishnomalar.", ru: "Уведомления через внутренний SMS-шлюз банка.", en: "Notifications via the bank's internal SMS gateway." } },
      ],
    },
    {
      kind: "bullets",
      label: { uz: "Texnologiyalar steki", ru: "Технологический стек", en: "Technology stack" },
      items: [
        { uz: "Bekend: Python 3.11, Django 5.2, Django REST Framework (JWT).", ru: "Бэкенд: Python 3.11, Django 5.2, Django REST Framework (JWT).", en: "Backend: Python 3.11, Django 5.2, Django REST Framework (JWT)." },
        { uz: "Baza: PostgreSQL (asosiy), Redis (kesh va navbatlar).", ru: "БД: PostgreSQL (основная), Redis (кэш и очереди).", en: "Database: PostgreSQL (primary), Redis (cache & queues)." },
        { uz: "Asinxron ishlov: Celery (fon vazifalari va AI-pipeline).", ru: "Асинхронная обработка: Celery (фоновые задачи и AI-конвейер).", en: "Async processing: Celery (background jobs & AI pipeline)." },
        { uz: "Frontend: veb-ilova + PWA (oʻrnatiladigan, oflayn ishlaydigan).", ru: "Фронтенд: веб-приложение + PWA (устанавливаемое, офлайн).", en: "Frontend: web app + PWA (installable, offline-capable)." },
        { uz: "Sunʼiy intellekt: OpenAI (GPT-4o-mini) - tahlil, tavsiya, chatbot.", ru: "ИИ: OpenAI (GPT-4o-mini) - анализ, рекомендации, чат-бот.", en: "AI: OpenAI (GPT-4o-mini) - analysis, recommendations, chatbot." },
        { uz: "Ishga tushirish: Gunicorn + Nginx/Apache; xavfsiz HTTPS.", ru: "Развёртывание: Gunicorn + Nginx/Apache; безопасный HTTPS.", en: "Deployment: Gunicorn + Nginx/Apache; secure HTTPS." },
      ],
    },
    {
      kind: "paragraph",
      label: { uz: "Axborot xavfsizligi", ru: "Информационная безопасность", en: "Information security" },
      body: {
        uz: "Platforma bank talablariga muvofiq himoyalangan: rolga asoslangan kirish nazorati, JWT-tokenlar va sessiyalarni bekor qilish, maxfiy kalitlarni shifrlash, kirish urinishlarini cheklash (bloklash), barcha muhim amallarni audit jurnaliga yozish va tashqi xizmatlar bilan HTTPS orqali xavfsiz almashinuv. Loyiha uchun Oʻz DSt 1987:2018 talablariga mos axborot xavfsizligi texnik topshirigʻi (ikki tilda) ishlab chiqilgan.",
        ru: "Платформа защищена в соответствии с требованиями банка: ролевой контроль доступа, JWT-токены и отзыв сессий, шифрование секретных ключей, ограничение попыток входа (блокировка), запись всех важных действий в аудит-журнал и безопасный обмен с внешними сервисами по HTTPS. Для проекта разработано техническое задание по информационной безопасности (на двух языках) в соответствии с O‘z DSt 1987:2018.",
        en: "The platform is protected to the bank's requirements: role-based access control, JWT tokens with session revocation, encryption of secret keys, login-attempt throttling (lockout), an audit log of every important action, and secure HTTPS exchange with external services. A bilingual information-security specification was produced for the project in line with O‘z DSt 1987:2018.",
      },
    },
    {
      kind: "bullets",
      label: { uz: "Loyiha holati va natijalar", ru: "Статус и результаты", en: "Status and results" },
      items: [
        { uz: "Barcha 15 viloyat, 201 tuman va 3 234 mahalla boʻyicha maʼlumotlar bazasi shakllantirilgan.", ru: "Сформирована база по всем 15 вилоятам, 201 туману и 3 234 махаллям.", en: "A database covering all 15 regions, 201 districts and 3,234 mahallas is in place." },
        { uz: "Bankir platformasi ishlaydi: kredit kalkulyatori, MyID orqali ariza, AI-tahlil va CRM-integratsiya.", ru: "Платформа банкира работает: кредитный калькулятор, заявка через MyID, AI-анализ и интеграция с CRM.", en: "The banker platform works: loan calculator, MyID application, AI analysis and CRM integration." },
        { uz: "Sunʼiy intellekt moduli biznes-tahlil va tavsiyalarni real vaqtda shakllantiradi.", ru: "Модуль ИИ формирует бизнес-анализ и рекомендации в реальном времени.", en: "The AI module produces business analysis and recommendations in real time." },
        { uz: "Geotreking, oflayn rejim va PWA orqali bankirning dala sharoitida uzluksiz ishlashi taʼminlangan.", ru: "Геотрекинг, офлайн-режим и PWA обеспечивают непрерывную работу банкира в поле.", en: "Geotracking, offline mode and PWA keep the banker working uninterrupted in the field." },
      ],
    },
  ],
};
