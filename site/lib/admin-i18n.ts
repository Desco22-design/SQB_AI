export type Locale = "uz" | "ru" | "en";
export const LOCALES: Locale[] = ["uz", "ru", "en"];
export const LOCALE_LABELS: Record<Locale, string> = {
  uz: "UZ",
  ru: "RU",
  en: "EN",
};
export const DEFAULT_LOCALE: Locale = "ru";
export const LOCALE_COOKIE = "admin_locale";

type DictShape = {
  common: {
    save: string;
    saving: string;
    cancel: string;
    delete: string;
    edit: string;
    add: string;
    back: string;
    loading: string;
    actions: string;
    empty: string;
    confirmDelete: string;
    required: string;
    search: string;
    upload: string;
    uploading: string;
    replace: string;
    remove: string;
    of: string;
    yes: string;
    no: string;
  };
  sidebar: {
    main: string;
    sections: string;
    dashboard: string;
    about: string;
    directions: string;
    projects: string;
    kpis: string;
    team: string;
    news: string;
    events: string;
    gallery: string;
    faq: string;
    submissions: string;
    audit: string;
    openSite: string;
    brand: string;
  };
  topbar: {
    notifications: string;
    profile: string;
    logout: string;
  };
  login: {
    title: string;
    sub: string;
    email: string;
    password: string;
    submit: string;
    submitting: string;
    error: string;
    placeholder: string;
  };
  dashboard: {
    title: string;
    sub: string;
    totalLabel: string;
  };
  stats: {
    title: string;
    sub: string;
    visits: string;
    visitsHint: string;
    submissions: string;
    submissionsHint: string;
    pageViews: string;
    pageViewsHint: string;
    avgSession: string;
    avgSessionHint: string;
    last30: string;
    monthlyTrend: string;
    monthlyTrendSub: string;
    months: string[];
  };
  page: {
    about: { title: string; sub: string };
    directions: { title: string; sub: string };
    projects: { title: string; sub: string };
    kpis: { title: string; sub: string };
    team: { title: string; sub: string; headlineLabel: string; headlineHint: string };
    news: { title: string; sub: string };
    events: { title: string; sub: string };
    gallery: { title: string; sub: string };
    faq: { title: string; sub: string };
    submissions: {
      title: string;
      sub: string;
      detailTitle: string;
      noMessage: string;
      from: string;
      received: string;
    };
    audit: {
      title: string;
      sub: string;
      empty: string;
      when: string;
      who: string;
      action: string;
      entity: string;
      summary: string;
      actions: { create: string; update: string; delete: string };
      entities: {
        about: string;
        directions: string;
        projects: string;
        kpis: string;
        team: string;
        news: string;
        events: string;
        gallery: string;
        faq: string;
        submissions: string;
      };
    };
  };
  form: {
    new: { about: string; directions: string; projects: string; kpis: string; team: string; news: string; events: string; faq: string };
    edit: { about: string; directions: string; projects: string; kpis: string; team: string; news: string; events: string; faq: string };
    title: string;
    description: string;
    eyebrow: string;
    details: string;
    detailsHint: string;
    order: string;
    idSlug: string;
    idPlaceholder: string;
    name: string;
    role: string;
    bio: string;
    skills: string;
    skillsPlaceholder: string;
    photo: string;
    image: string;
    cover: string;
    gallery: string;
    galleryHint: string;
    addImages: string;
    date: string;
    place: string;
    participants: string;
    category: string;
    technologies: string;
    techPlaceholder: string;
    impact: string;
    impactMetric: string;
    impactValue: string;
    direction: string;
    status: string;
    short: string;
    body: string;
    bodyPlaceholder: string;
    problem: string;
    solution: string;
    teamMembers: string;
    label: string;
    valueNum: string;
    suffix: string;
    decimals: string;
    question: string;
    answer: string;
    csvHint: string;
  };
  table: {
    no: string;
    cover: string;
    photo: string;
    title: string;
    name: string;
    role: string;
    description: string;
    answer: string;
    date: string;
    category: string;
    status: string;
    place: string;
    galleryCount: string;
    teamCount: string;
    direction: string;
    label: string;
    value: string;
    question: string;
    people: string;
    photos: string;
  };
  gallery: {
    addImages: string;
    empty: string;
    moveLeft: string;
    moveRight: string;
    deleteConfirm: string;
  };
  enums: {
    direction: {
      Risk: string;
      "Credit Scoring": string;
      Automation: string;
      "NLP / Chatbots": string;
      "Computer Vision": string;
    };
    status: {
      PoC: string;
      Production: string;
    };
    category: {
      Update: string;
      Insight: string;
      Announcement: string;
    };
  };
};

const ru: DictShape = {
  common: {
    save: "Сохранить",
    saving: "Сохранение...",
    cancel: "Отмена",
    delete: "Удалить",
    edit: "Изменить",
    add: "Добавить",
    back: "Назад",
    loading: "Загрузка...",
    actions: "Действия",
    empty: "Записей нет",
    confirmDelete: "Удалить запись?",
    required: "обязательно",
    search: "Поиск",
    upload: "Загрузить",
    uploading: "Загрузка...",
    replace: "Заменить",
    remove: "Удалить",
    of: "из",
    yes: "Да",
    no: "Нет",
  },
  sidebar: {
    main: "Главная",
    sections: "Разделы сайта",
    dashboard: "Дашборд",
    about: "О нас",
    directions: "Возможности",
    projects: "Проекты",
    kpis: "Эффект (KPI)",
    team: "Команда",
    news: "Новости",
    events: "События",
    gallery: "Медиагалерея",
    faq: "Вопросы",
    submissions: "Заявки",
    audit: "История действий",
    openSite: "Открыть сайт",
    brand: "Админ-панель",
  },
  topbar: {
    notifications: "Уведомления",
    profile: "Профиль",
    logout: "Выйти",
  },
  login: {
    title: "SQB AI",
    sub: "Вход в админ-панель",
    email: "Email",
    password: "Пароль",
    submit: "Войти",
    submitting: "Входим...",
    error: "Неверный email или пароль",
    placeholder: "admin@sqb.uz",
  },
  dashboard: {
    title: "Дашборд",
    sub: "Всего записей в системе",
    totalLabel: "записей",
  },
  stats: {
    title: "Статистика",
    sub: "Активность пользователей и метрики сайта",
    visits: "Посещения сайта",
    visitsHint: "Уникальные пользователи за 30 дней",
    submissions: "Заявки",
    submissionsHint: "Заполненные формы обратной связи",
    pageViews: "Просмотры страниц",
    pageViewsHint: "Общее количество просмотров",
    avgSession: "Среднее время на сайте",
    avgSessionHint: "Длительность одного визита",
    last30: "Последние 30 дней",
    monthlyTrend: "Динамика по месяцам",
    monthlyTrendSub: "Изменение метрик за последние 12 месяцев",
    months: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
  },
  page: {
    about: { title: "О нас", sub: "Преимущества, отображаемые в блоке «О нас»" },
    directions: { title: "Возможности", sub: "AI-направления, отображаемые на главной странице" },
    projects: { title: "Проекты", sub: "AI-проекты департамента" },
    kpis: { title: "Эффект (KPI)", sub: "Числовые показатели на главной странице" },
    team: {
      title: "Команда",
      sub: "Сотрудники AI-департамента",
      headlineLabel: "Число сотрудников (баннер на сайте)",
      headlineHint: "Большая цифра в блоке «Команда» на главной странице — например, «20+»",
    },
    news: { title: "Новости", sub: "Записи раздела «Новости»" },
    events: { title: "События", sub: "Конференции, митапы, партнёрства" },
    gallery: { title: "Медиагалерея", sub: "Изображения раздела на главной странице" },
    faq: { title: "Вопросы", sub: "Часто задаваемые вопросы — блок на главной странице" },
    submissions: {
      title: "Заявки",
      sub: "Обращения, отправленные через контактную форму на сайте",
      detailTitle: "Просмотр заявки",
      noMessage: "Заявок пока нет",
      from: "От",
      received: "Получено",
    },
    audit: {
      title: "История действий",
      sub: "Кто и когда что-то менял в админке",
      empty: "История пока пуста",
      when: "Когда",
      who: "Кто",
      action: "Действие",
      entity: "Раздел",
      summary: "Объект",
      actions: { create: "Создание", update: "Изменение", delete: "Удаление" },
      entities: {
        about: "О нас",
        directions: "Направления",
        projects: "Проекты",
        kpis: "KPI",
        team: "Команда",
        news: "Новости",
        events: "События",
        gallery: "Галерея",
        faq: "Вопросы",
        submissions: "Заявки",
      },
    },
  },
  form: {
    new: {
      about: "Новое преимущество",
      directions: "Новая возможность",
      projects: "Новый проект",
      kpis: "Новый KPI",
      team: "Новый сотрудник",
      news: "Новая новость",
      events: "Новое событие",
      faq: "Новый вопрос",
    },
    edit: {
      about: "Редактировать преимущество",
      directions: "Редактировать возможность",
      projects: "Редактировать проект",
      kpis: "Редактировать KPI",
      team: "Редактировать сотрудника",
      news: "Редактировать новость",
      events: "Редактировать событие",
      faq: "Редактировать вопрос",
    },
    title: "Название",
    description: "Описание",
    eyebrow: "Подзаголовок (надпись над названием)",
    details: "Подробности (раскрываются в модалке)",
    detailsHint: "Каждый абзац — с новой строки",
    order: "Порядок",
    idSlug: "ID (slug)",
    idPlaceholder: "автоматически из названия",
    name: "Имя",
    role: "Должность",
    bio: "Био",
    skills: "Навыки",
    skillsPlaceholder: "AI Strategy, Banking, Architecture",
    photo: "Фото",
    image: "Изображение",
    cover: "Обложка",
    gallery: "Галерея",
    galleryHint: "Добавьте несколько изображений",
    addImages: "Добавить изображения",
    date: "Дата",
    place: "Место",
    participants: "Участники",
    category: "Категория",
    technologies: "Технологии",
    techPlaceholder: "Python, LLM, PostgreSQL",
    impact: "Эффект (метрики)",
    impactMetric: "Метрика",
    impactValue: "Значение",
    direction: "Направление",
    status: "Статус",
    short: "Краткое описание",
    body: "Полный текст",
    bodyPlaceholder: "Полный текст статьи. Разделяйте абзацы пустой строкой.",
    problem: "Проблема",
    solution: "Решение",
    teamMembers: "Команда",
    label: "Подпись",
    valueNum: "Значение",
    suffix: "Суффикс",
    decimals: "Знаков после запятой",
    question: "Вопрос",
    answer: "Ответ",
    csvHint: "через запятую",
  },
  table: {
    no: "№",
    cover: "Обложка",
    photo: "Фото",
    title: "Название",
    name: "Имя",
    role: "Должность",
    description: "Описание",
    answer: "Ответ",
    date: "Дата",
    category: "Категория",
    status: "Статус",
    place: "Место",
    galleryCount: "Галерея",
    teamCount: "Команда",
    direction: "Направление",
    label: "Подпись",
    value: "Значение",
    question: "Вопрос",
    people: "чел.",
    photos: "фото",
  },
  gallery: {
    addImages: "Добавить изображения",
    empty: "Изображений пока нет",
    moveLeft: "Переместить влево",
    moveRight: "Переместить вправо",
    deleteConfirm: "Удалить изображение?",
  },
  enums: {
    direction: {
      Risk: "Риски",
      "Credit Scoring": "Кредитный скоринг",
      Automation: "Автоматизация",
      "NLP / Chatbots": "NLP / Чат-боты",
      "Computer Vision": "Компьютерное зрение",
    },
    status: {
      PoC: "Прототип",
      Production: "В продакшене",
    },
    category: {
      Update: "Обновление",
      Insight: "Аналитика",
      Announcement: "Анонс",
    },
  },
};

const uz: DictShape = {
  common: {
    save: "Saqlash",
    saving: "Saqlanmoqda...",
    cancel: "Bekor qilish",
    delete: "O'chirish",
    edit: "Tahrirlash",
    add: "Qo'shish",
    back: "Orqaga",
    loading: "Yuklanmoqda...",
    actions: "Amallar",
    empty: "Yozuvlar yo'q",
    confirmDelete: "Yozuvni o'chirasizmi?",
    required: "majburiy",
    search: "Qidirish",
    upload: "Yuklash",
    uploading: "Yuklanmoqda...",
    replace: "Almashtirish",
    remove: "O'chirish",
    of: "dan",
    yes: "Ha",
    no: "Yo'q",
  },
  sidebar: {
    main: "Bosh menyu",
    sections: "Sayt bo'limlari",
    dashboard: "Boshqaruv paneli",
    about: "Biz haqimizda",
    directions: "Imkoniyatlar",
    projects: "Loyihalar",
    kpis: "Samaradorlik (KPI)",
    team: "Jamoa",
    news: "Yangiliklar",
    events: "Tadbirlar",
    gallery: "Media galereya",
    faq: "Savollar",
    submissions: "Zayavkalar",
    audit: "Faoliyat tarixi",
    openSite: "Saytni ochish",
    brand: "Admin panel",
  },
  topbar: {
    notifications: "Bildirishnomalar",
    profile: "Profil",
    logout: "Chiqish",
  },
  login: {
    title: "SQB AI",
    sub: "Admin panelga kirish",
    email: "Email",
    password: "Parol",
    submit: "Kirish",
    submitting: "Kirilmoqda...",
    error: "Email yoki parol noto'g'ri",
    placeholder: "admin@sqb.uz",
  },
  dashboard: {
    title: "Boshqaruv paneli",
    sub: "Tizimdagi jami yozuvlar",
    totalLabel: "yozuv",
  },
  stats: {
    title: "Statistika",
    sub: "Foydalanuvchi faolligi va sayt metrikalari",
    visits: "Sayt tashriflari",
    visitsHint: "30 kunda noyob foydalanuvchilar",
    submissions: "Arizalar",
    submissionsHint: "To'ldirilgan aloqa formalari",
    pageViews: "Sahifa ko'rishlar",
    pageViewsHint: "Umumiy ko'rishlar soni",
    avgSession: "O'rtacha tashrif vaqti",
    avgSessionHint: "Bir tashrif davomiyligi",
    last30: "Oxirgi 30 kun",
    monthlyTrend: "Oy ma oy dinamika",
    monthlyTrendSub: "Oxirgi 12 oydagi metrikalar o'zgarishi",
    months: ["Yan", "Fev", "Mar", "Apr", "May", "Iyn", "Iyl", "Avg", "Sen", "Okt", "Noy", "Dek"],
  },
  page: {
    about: { title: "Biz haqimizda", sub: "«Biz haqimizda» blokida ko'rsatiladigan afzalliklar" },
    directions: { title: "Imkoniyatlar", sub: "Bosh sahifada ko'rsatiladigan AI yo'nalishlari" },
    projects: { title: "Loyihalar", sub: "Departamentning AI loyihalari" },
    kpis: { title: "Samaradorlik (KPI)", sub: "Bosh sahifadagi sonli ko'rsatkichlar" },
    team: {
      title: "Jamoa",
      sub: "AI departamenti xodimlari",
      headlineLabel: "Xodimlar soni (saytdagi banner)",
      headlineHint: "Bosh sahifadagi «Jamoa» blokidagi katta raqam — masalan, «20+»",
    },
    news: { title: "Yangiliklar", sub: "«Yangiliklar» bo'limi yozuvlari" },
    events: { title: "Tadbirlar", sub: "Konferensiyalar, mitaplar, hamkorliklar" },
    gallery: { title: "Media galereya", sub: "Bosh sahifadagi rasmlar" },
    faq: { title: "Savollar", sub: "Tez-tez beriladigan savollar — bosh sahifa bloki" },
    submissions: {
      title: "Zayavkalar",
      sub: "Saytdagi aloqa formasi orqali yuborilgan murojaatlar",
      detailTitle: "Zayavkani ko'rish",
      noMessage: "Zayavkalar hali yo'q",
      from: "Kimdan",
      received: "Qabul qilindi",
    },
    audit: {
      title: "Faoliyat tarixi",
      sub: "Admin panelda kim, qachon nima qilgani",
      empty: "Tarix hali bo'sh",
      when: "Qachon",
      who: "Kim",
      action: "Harakat",
      entity: "Bo'lim",
      summary: "Obyekt",
      actions: { create: "Yaratish", update: "O'zgartirish", delete: "O'chirish" },
      entities: {
        about: "Biz haqimizda",
        directions: "Yo'nalishlar",
        projects: "Loyihalar",
        kpis: "KPI",
        team: "Jamoa",
        news: "Yangiliklar",
        events: "Tadbirlar",
        gallery: "Galereya",
        faq: "Savollar",
        submissions: "Zayavkalar",
      },
    },
  },
  form: {
    new: {
      about: "Yangi afzallik",
      directions: "Yangi imkoniyat",
      projects: "Yangi loyiha",
      kpis: "Yangi KPI",
      team: "Yangi xodim",
      news: "Yangi yangilik",
      events: "Yangi tadbir",
      faq: "Yangi savol",
    },
    edit: {
      about: "Afzallikni tahrirlash",
      directions: "Imkoniyatni tahrirlash",
      projects: "Loyihani tahrirlash",
      kpis: "KPI'ni tahrirlash",
      team: "Xodimni tahrirlash",
      news: "Yangilikni tahrirlash",
      events: "Tadbirni tahrirlash",
      faq: "Savolni tahrirlash",
    },
    title: "Nomi",
    description: "Tavsif",
    eyebrow: "Subtitle (nomi ustidagi yorliq)",
    details: "Tafsilotlar (modalda ochiladi)",
    detailsHint: "Har bir abzats yangi qatordan",
    order: "Tartib",
    idSlug: "ID (slug)",
    idPlaceholder: "nomdan avtomatik",
    name: "Ism",
    role: "Lavozim",
    bio: "Bio",
    skills: "Ko'nikmalar",
    skillsPlaceholder: "AI Strategy, Banking, Architecture",
    photo: "Rasm",
    image: "Rasm",
    cover: "Muqova",
    gallery: "Galereya",
    galleryHint: "Bir nechta rasm qo'shing",
    addImages: "Rasmlar qo'shish",
    date: "Sana",
    place: "Joy",
    participants: "Ishtirokchilar",
    category: "Kategoriya",
    technologies: "Texnologiyalar",
    techPlaceholder: "Python, LLM, PostgreSQL",
    impact: "Samaradorlik (metrikalar)",
    impactMetric: "Metrika",
    impactValue: "Qiymat",
    direction: "Yo'nalish",
    status: "Holat",
    short: "Qisqacha tavsif",
    body: "To'liq matn",
    bodyPlaceholder: "Maqolaning to'liq matni. Abzatslarni bo'sh qator bilan ajrating.",
    problem: "Muammo",
    solution: "Yechim",
    teamMembers: "Jamoa",
    label: "Yorliq",
    valueNum: "Qiymat",
    suffix: "Suffiks",
    decimals: "Kasr xonalari",
    question: "Savol",
    answer: "Javob",
    csvHint: "vergul bilan ajrating",
  },
  table: {
    no: "№",
    cover: "Muqova",
    photo: "Rasm",
    title: "Nomi",
    name: "Ism",
    role: "Lavozim",
    description: "Tavsif",
    answer: "Javob",
    date: "Sana",
    category: "Kategoriya",
    status: "Holat",
    place: "Joy",
    galleryCount: "Galereya",
    teamCount: "Jamoa",
    direction: "Yo'nalish",
    label: "Yorliq",
    value: "Qiymat",
    question: "Savol",
    people: "kishi",
    photos: "rasm",
  },
  gallery: {
    addImages: "Rasmlar qo'shish",
    empty: "Rasmlar hali yo'q",
    moveLeft: "Chapga ko'chirish",
    moveRight: "O'ngga ko'chirish",
    deleteConfirm: "Rasmni o'chirasizmi?",
  },
  enums: {
    direction: {
      Risk: "Risklar",
      "Credit Scoring": "Kredit skoringi",
      Automation: "Avtomatlashtirish",
      "NLP / Chatbots": "NLP / Chat-botlar",
      "Computer Vision": "Kompyuter ko'rishi",
    },
    status: {
      PoC: "Prototip",
      Production: "Ishlamoqda",
    },
    category: {
      Update: "Yangilanish",
      Insight: "Tahlil",
      Announcement: "E'lon",
    },
  },
};

const en: DictShape = {
  common: {
    save: "Save",
    saving: "Saving...",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
    back: "Back",
    loading: "Loading...",
    actions: "Actions",
    empty: "No records",
    confirmDelete: "Delete this record?",
    required: "required",
    search: "Search",
    upload: "Upload",
    uploading: "Uploading...",
    replace: "Replace",
    remove: "Remove",
    of: "of",
    yes: "Yes",
    no: "No",
  },
  sidebar: {
    main: "Main",
    sections: "Site sections",
    dashboard: "Dashboard",
    about: "About",
    directions: "Capabilities",
    projects: "Projects",
    kpis: "Impact (KPI)",
    team: "Team",
    news: "News",
    events: "Events",
    gallery: "Media gallery",
    faq: "FAQ",
    submissions: "Submissions",
    audit: "Activity log",
    openSite: "Open site",
    brand: "Admin panel",
  },
  topbar: {
    notifications: "Notifications",
    profile: "Profile",
    logout: "Log out",
  },
  login: {
    title: "SQB AI",
    sub: "Sign in to admin panel",
    email: "Email",
    password: "Password",
    submit: "Sign in",
    submitting: "Signing in...",
    error: "Incorrect email or password",
    placeholder: "admin@sqb.uz",
  },
  dashboard: {
    title: "Dashboard",
    sub: "Total records in the system",
    totalLabel: "records",
  },
  stats: {
    title: "Statistics",
    sub: "User activity and site metrics",
    visits: "Site visits",
    visitsHint: "Unique users in the last 30 days",
    submissions: "Submissions",
    submissionsHint: "Contact form fills",
    pageViews: "Page views",
    pageViewsHint: "Total pages viewed",
    avgSession: "Avg. session",
    avgSessionHint: "Average time per visit",
    last30: "Last 30 days",
    monthlyTrend: "Monthly trend",
    monthlyTrendSub: "Metrics over the last 12 months",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  },
  page: {
    about: { title: "About", sub: "Benefits shown in the About section" },
    directions: { title: "Capabilities", sub: "AI directions shown on the homepage" },
    projects: { title: "Projects", sub: "Department's AI projects" },
    kpis: { title: "Impact (KPI)", sub: "Numerical indicators on the homepage" },
    team: {
      title: "Team",
      sub: "AI department staff",
      headlineLabel: "Headline number (site banner)",
      headlineHint: "The large number on the homepage Team block — e.g. «20+»",
    },
    news: { title: "News", sub: "News section entries" },
    events: { title: "Events", sub: "Conferences, meetups, partnerships" },
    gallery: { title: "Media gallery", sub: "Images shown on the homepage" },
    faq: { title: "FAQ", sub: "Frequently asked questions — homepage block" },
    submissions: {
      title: "Submissions",
      sub: "Messages sent through the contact form on the site",
      detailTitle: "View submission",
      noMessage: "No submissions yet",
      from: "From",
      received: "Received",
    },
    audit: {
      title: "Activity log",
      sub: "Who changed what in the admin panel, and when",
      empty: "No activity yet",
      when: "When",
      who: "Who",
      action: "Action",
      entity: "Section",
      summary: "Item",
      actions: { create: "Created", update: "Updated", delete: "Deleted" },
      entities: {
        about: "About",
        directions: "Directions",
        projects: "Projects",
        kpis: "KPIs",
        team: "Team",
        news: "News",
        events: "Events",
        gallery: "Gallery",
        faq: "FAQ",
        submissions: "Submissions",
      },
    },
  },
  form: {
    new: {
      about: "New benefit",
      directions: "New capability",
      projects: "New project",
      kpis: "New KPI",
      team: "New team member",
      news: "New news",
      events: "New event",
      faq: "New FAQ item",
    },
    edit: {
      about: "Edit benefit",
      directions: "Edit capability",
      projects: "Edit project",
      kpis: "Edit KPI",
      team: "Edit team member",
      news: "Edit news",
      events: "Edit event",
      faq: "Edit FAQ item",
    },
    title: "Title",
    description: "Description",
    eyebrow: "Eyebrow (small label above title)",
    details: "Details (shown in the modal)",
    detailsHint: "Each paragraph on its own line",
    order: "Order",
    idSlug: "ID (slug)",
    idPlaceholder: "auto from name",
    name: "Name",
    role: "Role",
    bio: "Bio",
    skills: "Skills",
    skillsPlaceholder: "AI Strategy, Banking, Architecture",
    photo: "Photo",
    image: "Image",
    cover: "Cover",
    gallery: "Gallery",
    galleryHint: "Add multiple images",
    addImages: "Add images",
    date: "Date",
    place: "Place",
    participants: "Participants",
    category: "Category",
    technologies: "Technologies",
    techPlaceholder: "Python, LLM, PostgreSQL",
    impact: "Impact (metrics)",
    impactMetric: "Metric",
    impactValue: "Value",
    direction: "Direction",
    status: "Status",
    short: "Short description",
    body: "Full text",
    bodyPlaceholder: "Full article text. Separate paragraphs with a blank line.",
    problem: "Problem",
    solution: "Solution",
    teamMembers: "Team",
    label: "Label",
    valueNum: "Value",
    suffix: "Suffix",
    decimals: "Decimal places",
    question: "Question",
    answer: "Answer",
    csvHint: "comma-separated",
  },
  table: {
    no: "#",
    cover: "Cover",
    photo: "Photo",
    title: "Title",
    name: "Name",
    role: "Role",
    description: "Description",
    answer: "Answer",
    date: "Date",
    category: "Category",
    status: "Status",
    place: "Place",
    galleryCount: "Gallery",
    teamCount: "Team",
    direction: "Direction",
    label: "Label",
    value: "Value",
    question: "Question",
    people: "ppl",
    photos: "photos",
  },
  gallery: {
    addImages: "Add images",
    empty: "No images yet",
    moveLeft: "Move left",
    moveRight: "Move right",
    deleteConfirm: "Delete this image?",
  },
  enums: {
    direction: {
      Risk: "Risk",
      "Credit Scoring": "Credit Scoring",
      Automation: "Automation",
      "NLP / Chatbots": "NLP / Chatbots",
      "Computer Vision": "Computer Vision",
    },
    status: {
      PoC: "PoC",
      Production: "Production",
    },
    category: {
      Update: "Update",
      Insight: "Insight",
      Announcement: "Announcement",
    },
  },
};

const dict: Record<Locale, DictShape> = { uz, ru, en };

export type AdminStrings = DictShape;

export function getStrings(locale: Locale): AdminStrings {
  return dict[locale] ?? dict[DEFAULT_LOCALE];
}

export const adminDict = dict;
