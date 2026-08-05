import type { ProjectDetail } from "./types";

// Source: Projects/Fleet AI.md (bilingual EN/RU original; UZ translated here).
export const fleet: ProjectDetail = {
  id: "sqb-fleet-ai",
  tagline: {
    uz: "SQB Bank uchun bank-yoʻnaltirilgan aqlli avtopark boshqaruv platformasi",
    ru: "Интеллектуальная банк-ориентированная платформа управления автопарком для SQB Bank",
    en: "An intelligent, bank-oriented fleet management platform for SQB Bank",
  },
  heroImage: {
    src: "/projects/fleet/hero-laptop.webp",
    w: 1600,
    h: 816,
    alt: "SQB Fleet AI boshqaruv paneli noutbukda",
    bare: true,
    wrapClass: "lg:w-[108%] lg:translate-x-[2%] xl:translate-x-[4%]",
  },
  sections: [
    {
      kind: "paragraph",
      label: { uz: "Loyiha haqida", ru: "О проекте", en: "Overview" },
      body: {
        uz: "SQB Fleet AI - Oʻzbekistonning 16 mintaqasidagi barcha 129 korporativ avtomobil va generatorni real vaqtda monitoring qilish, tahlil qilish va optimallashtirish uchun qurilgan bank-yoʻnaltirilgan avtopark platformasi. U mavjud GoGPS xizmatidan olinadigan xom GPS maʼlumotlarni bankning operatsion, moliyaviy va komplaens ehtiyojlariga moslashtirilgan biznes-insaytlarga aylantiradi.",
        ru: "SQB Fleet AI - банк-ориентированная платформа автопарка для мониторинга, анализа и оптимизации всех 129 корпоративных автомобилей и генераторов в 16 регионах Узбекистана в реальном времени. Она превращает сырые GPS-данные из существующего сервиса GoGPS в бизнес-инсайты под операционные, финансовые и комплаенс-задачи банка.",
        en: "SQB Fleet AI is a bank-oriented fleet platform that monitors, analyses and optimises all 129 corporate vehicles and generators across 16 regions of Uzbekistan in real time. It turns raw GPS data from the existing GoGPS service into business insights tailored to the bank's operational, financial and compliance needs.",
      },
    },
    {
      kind: "bullets",
      label: { uz: "Yechilayotgan muammo", ru: "Решаемая проблема", en: "The problem we solved" },
      intro: {
        uz: "SQB Bank GoGPS orqali GPS-trekingga ega edi, biroq u universal transport vositasi - bank qarorlarini qoʻllab-quvvatlash tizimi emas. Uning cheklovlari real operatsion boʻshliqlarni yaratdi:",
        ru: "У SQB Bank был GPS-трекинг через GoGPS, но это универсальный инструмент, а не система поддержки банковских решений. Его ограничения создавали реальные операционные пробелы:",
        en: "SQB Bank had GPS tracking through GoGPS, but it is a generic tool - not a banking decision-support system. Its limitations created real operational gaps:",
      },
      items: [
        { uz: "Universal, standart hisobotlar - bankning filial va mintaqa asosidagi tuzilmasiga mos emas.", ru: "Универсальные стандартные отчёты - не под филиально-региональную структуру банка.", en: "Generic, one-size-fits-all reports - not built for the bank's branch- and region-based structure." },
        { uz: "Faqat GPS-tahlil - tezlik va joylashuv; biznes-konteksti (filial, mintaqaviy xarajat) yoʻq.", ru: "Только GPS-аналитика - скорость и позиция; без бизнес-контекста (филиал, региональные затраты).", en: "Pure GPS analytics - speed and position; no business context (branch, regional cost)." },
        { uz: "Bank-maxsus dashbordlar yoʻq - menejerlar xom maʼlumotni qoʻlda talqin qilardi.", ru: "Нет банк-ориентированных дашбордов - менеджеры вручную интерпретировали сырые данные.", en: "No bank-specific dashboards - managers had to translate raw data by hand." },
        { uz: "Kengaytirib boʻlmaydi - GoGPS'ga maxsus KPI yoki hisobot qoʻshib boʻlmaydi.", ru: "Нет расширяемости - в GoGPS нельзя добавить свои KPI или отчёты.", en: "No extensibility - GoGPS does not allow custom KPIs or reports." },
        { uz: "Generatorlar umuman monitoring qilinmasdi - filial elektr uzluksizligi uchun kritik.", ru: "Генераторы вообще не мониторились - критично для бесперебойного питания филиалов.", en: "Generators were not monitored at all - critical for branch power continuity." },
      ],
    },
    {
      kind: "cards",
      label: { uz: "Platforma nima qiladi", ru: "Что делает платформа", en: "What the platform does" },
      items: [
        { title: { uz: "Real vaqt avtopark xaritasi", ru: "Карта автопарка в реальном времени", en: "Real-time fleet map" }, body: { uz: "16 mintaqadagi har bir avtomobil va generatorni jonli xaritada, SQB filial tuzilmasi boʻyicha koʻrsatadi.", ru: "Живая карта каждого авто и генератора в 16 регионах по структуре филиалов SQB.", en: "Live map of every vehicle and generator across 16 regions, organised by SQB's branch structure." } },
        { title: { uz: "Haydovchi xatti-harakati bahosi", ru: "Оценка поведения водителей", en: "Driver behavior scoring" }, body: { uz: "Har bir haydovchiga kunlik xavfsizlik balli (0-100): tezlik oshirish, keskin tormoz, boʻsh yurish asosida - obyektiv.", ru: "Ежедневный балл безопасности (0-100) по превышениям, резким торможениям, простоям - объективно.", en: "A daily safety score (0-100) from speeding, hard braking and idling - objective, bias-free." } },
        { title: { uz: "Yuk taqsimoti", ru: "Распределение нагрузки", en: "Workload distribution" }, body: { uz: "Qaysi mintaqa va avtomobil koʻproq yuk koʻtarishini koʻrsatadi; kam ishlatilganlarni aniqlaydi.", ru: "Показывает, какие регионы и авто несут больше нагрузки; выявляет малозагруженные.", en: "Shows which regions and vehicles carry the most load; flags underused ones." } },
        { title: { uz: "Yoqilgʻi va xarajat tahlili", ru: "Аналитика топлива и затрат", en: "Fuel & cost analytics" }, body: { uz: "Kunlik/oylik masofa, yoqilgʻi va xarajatni avtomobil, mintaqa, filial kesimida kuzatadi.", ru: "Отслеживает пробег, топливо и затраты по авто, региону и филиалу.", en: "Tracks distance, fuel and cost per vehicle, region and branch." } },
        { title: { uz: "Prediktiv texnik xizmat", ru: "Прогнозное ТО", en: "Predictive maintenance" }, body: { uz: "Real odometr va dvigatel-soat asosida moy, kamar, shina xizmatini oldindan ogohlantiradi.", ru: "Предупреждает о замене масла, ремней и шин по реальным данным одометра.", en: "Warns about oil, belt and tyre service from real odometer and engine-hour data." } },
        { title: { uz: "Generator monitoringi", ru: "Мониторинг генераторов", en: "Generator monitoring" }, body: { uz: "Har bir generatorning ish vaqti va batareya holatini kuzatadi - filial elektr uzluksizligi uchun.", ru: "Отслеживает время работы и заряд батарей генераторов - для питания филиалов.", en: "Tracks runtime and battery health of every generator - for branch power continuity." } },
      ],
    },
    {
      kind: "compare",
      label: { uz: "Nega maxsus platforma - nega GoGPS emas?", ru: "Почему своя платформа, а не GoGPS?", en: "Why a custom platform - why not just GoGPS?" },
      columns: [
        { uz: "Ehtiyoj", ru: "Потребность", en: "Need" },
        { uz: "GoGPS", ru: "GoGPS", en: "GoGPS" },
        { uz: "SQB Fleet AI", ru: "SQB Fleet AI", en: "SQB Fleet AI" },
      ],
      rows: [
        { need: { uz: "Real vaqt treking", ru: "Трекинг в реальном времени", en: "Real-time tracking" }, a: { uz: "Bor", ru: "Есть", en: "Yes" }, b: { uz: "Bor (GoGPS maʼlumotida)", ru: "Есть (на данных GoGPS)", en: "Yes (built on GoGPS data)" } },
        { need: { uz: "Filial/mintaqa dashbordlari", ru: "Дашборды по филиалам/регионам", en: "Branch/region dashboards" }, a: { uz: "Yoʻq", ru: "Нет", en: "No" }, b: { uz: "Bor", ru: "Есть", en: "Yes" } },
        { need: { uz: "SQB jarayonlariga maxsus tahlil", ru: "Кастомная аналитика под SQB", en: "Custom analytics for SQB" }, a: { uz: "Yoʻq", ru: "Нет", en: "No" }, b: { uz: "Bor", ru: "Есть", en: "Yes" } },
        { need: { uz: "Generator va filial quvvati monitoringi", ru: "Мониторинг генераторов и питания", en: "Generator & power monitoring" }, a: { uz: "Yoʻq", ru: "Нет", en: "No" }, b: { uz: "Bor", ru: "Есть", en: "Yes" } },
        { need: { uz: "Real foydalanishga asoslangan prediktiv TX", ru: "Прогнозное ТО по реальному использованию", en: "Usage-based predictive maintenance" }, a: { uz: "Cheklangan", ru: "Ограниченно", en: "Limited" }, b: { uz: "Bor", ru: "Есть", en: "Yes" } },
        { need: { uz: "Yangi SQB-funksiyalar qoʻshish", ru: "Добавление функций SQB", en: "Add SQB-specific features" }, a: { uz: "Yoʻq", ru: "Нет", en: "No" }, b: { uz: "Bor", ru: "Есть", en: "Yes" } },
      ],
    },
    {
      kind: "keyvalue",
      label: { uz: "Biznes-qiymat", ru: "Бизнес-ценность", en: "Business value" },
      items: [
        { key: { uz: "Operatsion samaradorlik", ru: "Операционная эффективность", en: "Operational efficiency" }, value: { uz: "Bitta dashbord oʻnlab qoʻlda hisobotlarni almashtiradi.", ru: "Один дашборд заменяет десятки ручных отчётов.", en: "One dashboard replaces dozens of manual reports." } },
        { key: { uz: "Xavfsizlik madaniyati", ru: "Культура безопасности", en: "Safety culture" }, value: { uz: "Obyektiv haydovchi bahosi xulq-atvorni oʻzgartiradi.", ru: "Объективная оценка водителей меняет поведение.", en: "Objective driver scoring drives behaviour change." } },
        { key: { uz: "Xarajatni kamaytirish", ru: "Сокращение затрат", en: "Cost reduction" }, value: { uz: "Yoqilgʻi va boʻsh yurish tahlili mintaqa boʻyicha isrofni koʻrsatadi.", ru: "Аналитика топлива и простоев выявляет потери по регионам.", en: "Fuel and idle analytics surface waste region by region." } },
        { key: { uz: "Komplaens", ru: "Комплаенс", en: "Compliance" }, value: { uz: "Ish vaqtidan tashqari va mintaqadan tashqari foydalanish avtomatik belgilanadi.", ru: "Использование вне графика и региона отмечается автоматически.", en: "Off-hours and out-of-region use is flagged automatically." } },
        { key: { uz: "Qaror qabul qilish", ru: "Принятие решений", en: "Decision-making" }, value: { uz: "Filial va bosh ofis bir xil jonli maʼlumotni koʻradi.", ru: "Филиалы и головной офис видят одни и те же данные.", en: "Branches and HQ see the same live data." } },
      ],
    },
    {
      kind: "paragraph",
      label: { uz: "Nega «AI»?", ru: "Почему «AI»?", en: "Why “AI”?" },
      body: {
        uz: "«AI» - platformaning xom GPS-pinglarni tayyor boshqaruv qarorlariga aylantirishida: haydovchi bahosi koʻp oʻzgaruvchili, vaznlangan va bosqichli jarima modelidan foydalanadi (oddiy chegara emas); texnik xizmat prognozi har bir avtomobilning real foydalanishiga moslashadi; anomaliyani aniqlash normal patternga mos kelmaydigan yurishlarni belgilaydi. Aynan shu avtomatik intellekt GoGPS beradigan (maʼlumot) va SQB'ga kerak boʻlgan (qaror) oʻrtasidagi boʻshliqni yopadi.",
        ru: "«AI» - в том, как платформа превращает сырые GPS-пинги в готовые управленческие решения: оценка водителей использует многофакторную взвешенную градуированную модель штрафов (а не простые пороги); прогноз ТО адаптируется к реальному использованию каждого авто; обнаружение аномалий отмечает нетипичные поездки. Именно этот автоматизированный интеллект закрывает разрыв между тем, что даёт GoGPS (данные), и тем, что нужно SQB (решения).",
        en: "The “AI” is in how the platform turns raw GPS pings into management-ready decisions: driver scoring uses a multi-variable, weighted, graduated penalty model (not simple thresholds); maintenance predictions adapt to each vehicle's real usage; anomaly detection flags trips that don't fit the normal pattern. This automated intelligence closes the gap between what GoGPS gives (data) and what SQB needs (decisions).",
      },
    },
    {
      kind: "paragraph",
      label: { uz: "Vizyon", ru: "Видение", en: "The vision" },
      body: {
        uz: "SQB Fleet AI - shunchaki treking vositasi emas, balki avtopark operatsiyalari uchun bank-egalik qiladigan qaror qoʻllab-quvvatlash platformasi. U bankka oʻz tuzilmasiga qurilgan koʻrinish, ishonchli metrikalar va kech kutilmagan hodisalar oʻrniga erta ogohlantirish beradi. GoGPS bizga maʼlumot beradi - SQB Fleet AI esa oʻsha maʼlumotni biz boshqaradigan biznes-platformaga aylantiradi.",
        ru: "SQB Fleet AI - не просто инструмент трекинга, а банк-собственная платформа поддержки решений для автопарка. Она даёт видимость, построенную вокруг структуры банка, надёжные метрики и раннее предупреждение вместо поздних сюрпризов. GoGPS даёт данные - SQB Fleet AI превращает их в бизнес-платформу, которой управляем мы.",
        en: "SQB Fleet AI is not just a tracking tool - it is a bank-owned decision-support platform for fleet operations. It gives visibility built around the bank's own structure, metrics it can trust, and early warnings instead of late surprises. GoGPS gives us the data - SQB Fleet AI turns it into a business platform we control.",
      },
    },
  ],
};
