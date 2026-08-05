import type { ProjectDetail } from "./types";

// Source: Projects/AI_Ijro_Loyiha_Batafsil_Malumot.docx (Uzbek original).
export const ijro: ProjectDetail = {
  id: "ai-ijro",
  tagline: {
    uz: "Rasmiy hujjatlarni OCR, LLM va vektor qidiruv bilan qabul qilish, tahlil qilish va mas'ul bo'limlarga yo'naltiruvchi to'liq avtomatlashtirilgan pipeline",
    ru: "Полностью автоматизированный конвейер приёма, анализа и маршрутизации официальных документов на базе OCR, LLM и векторного поиска",
    en: "A fully automated pipeline that ingests, analyses and routes official documents using OCR, LLM and vector search",
  },
  sections: [
    {
      kind: "paragraph",
      label: { uz: "Loyiha haqida", ru: "О проекте", en: "Overview" },
      body: {
        uz: "AI-Ijro - sun'iy intellektga asoslangan hujjatlarni avtomatik qayta ishlash tizimi. U rasmiy hujjatlarni qabul qiladi, OCR orqali matnini o'qiydi, hujjat turini aniqlaydi, kerakli ma'lumotlarni ajratib oladi, topshiriqlarni chiqaradi va ularni tegishli bank bo'limlariga yo'naltiradi. Tizim asinxron arxitekturada, RabbitMQ orqali 5 bosqichli pipeline shaklida ishlaydi - har bir bosqich mustaqil consumer bo'lib, yuqori ishonchlilik va kengaytirilishni ta'minlaydi.",
        ru: "AI-Ijro - система автоматической обработки документов на базе ИИ. Она принимает официальные документы, распознаёт текст через OCR, определяет тип документа, извлекает нужные данные, формирует поручения и направляет их в ответственные отделы банка. Система построена на асинхронной архитектуре и работает как 5-этапный конвейер через RabbitMQ - каждый этап является независимым consumer'ом, что обеспечивает высокую надёжность и масштабируемость.",
        en: "AI-Ijro is an AI-powered document-processing system. It ingests official documents, reads their text via OCR, detects the document type, extracts the needed fields, derives tasks, and routes them to the responsible bank departments. It runs on an asynchronous architecture as a 5-stage pipeline over RabbitMQ - each stage an independent consumer, giving high reliability and scalability.",
      },
    },
    {
      kind: "bullets",
      label: { uz: "Yechilayotgan muammo", ru: "Решаемая проблема", en: "The problem we solve" },
      intro: {
        uz: "An'anaviy yondashuvda kiruvchi hujjatlar qo'lda o'qiladi va yo'naltiriladi:",
        ru: "При традиционном подходе входящие документы читаются и маршрутизируются вручную:",
        en: "Traditionally, incoming documents are read and routed by hand:",
      },
      items: [
        { uz: "Hujjatlarni qo'lda o'qish va qayta ishlash ko'p vaqt oladi.", ru: "Ручное чтение и обработка документов отнимают много времени.", en: "Reading and processing documents by hand is slow." },
        { uz: "Topshiriqlarni ajratib olish xatolarga moyil.", ru: "Извлечение поручений подвержено ошибкам.", en: "Extracting tasks is error-prone." },
        { uz: "Bo'limga yo'naltirish subjektiv va kechikishli.", ru: "Маршрутизация в отделы субъективна и с задержками.", en: "Routing to departments is subjective and delayed." },
        { uz: "Hujjat tur va formatlarining xilma-xilligi ishni murakkablashtiradi.", ru: "Разнообразие типов и форматов усложняет обработку.", en: "The variety of types and formats complicates processing." },
        { uz: "Jarayonning shaffofligi va nazorati cheklangan.", ru: "Прозрачность и контроль процесса ограничены.", en: "Process transparency and control are limited." },
        { uz: "Platon EDO bilan qo'lda integratsiya sekin va xatolarga moyil.", ru: "Ручная интеграция с Platon EDO медленная и с ошибками.", en: "Manual integration with Platon EDMS is slow and error-prone." },
      ],
    },
    {
      kind: "cards",
      label: { uz: "5 bosqichli pipeline", ru: "5-этапный конвейер", en: "The 5-stage pipeline" },
      items: [
        { title: { uz: "1. OCR - matnni o'qish", ru: "1. OCR - распознавание текста", en: "1. OCR - text recognition" }, body: { uz: "PaddleOCR yuklangan hujjatni (PDF/DOCX/rasm) o'qiydi; rus va o'zbek tillarini qo'llab-quvvatlaydi, har sahifani alohida qayta ishlaydi.", ru: "PaddleOCR распознаёт документ (PDF/DOCX/изображение); поддерживает русский и узбекский, обрабатывает каждую страницу.", en: "PaddleOCR reads the document (PDF/DOCX/image); supports Russian and Uzbek, processes each page separately." } },
        { title: { uz: "2. Hujjat turini aniqlash", ru: "2. Определение типа", en: "2. Document type detection" }, body: { uz: "LLM matnni tahlil qilib hujjatni 8 ta turdan biriga ajratadi (murojaat, qaror, farmon, xat, ariza va h.k.).", ru: "LLM анализирует текст и относит документ к одному из 8 типов (обращение, постановление, указ, письмо, заявление и т.д.).", en: "An LLM classifies the document into one of 8 types (appeal, resolution, decree, letter, application, etc.)." } },
        { title: { uz: "3. Metadata ajratish", ru: "3. Извлечение метаданных", en: "3. Metadata extraction" }, body: { uz: "Factory pattern orqali turga mos ekstraktor tanlanadi: raqam, sana, yuboruvchi, hudud, til va boshqa maydonlar ajratiladi; Platon ID'lariga moslashtiriladi.", ru: "Через Factory-паттерн выбирается экстрактор под тип: номер, дата, отправитель, регион, язык и др.; сопоставление с ID Platon.", en: "A Factory pattern picks a type-specific extractor: number, date, sender, region, language and more; mapped to Platon IDs." } },
        { title: { uz: "4. Topshiriqlarni chiqarish", ru: "4. Извлечение поручений", en: "4. Task extraction" }, body: { uz: "Hujjat turiga qarab mos sorter strategiyasi (Filter, Numbered, Court va h.k.) topshiriqlarni ajratib oladi.", ru: "В зависимости от типа выбирается стратегия sorter (Filter, Numbered, Court и др.) для извлечения поручений.", en: "A type-specific sorter strategy (Filter, Numbered, Court, etc.) extracts the tasks." } },
        { title: { uz: "5. Bo'limga yo'naltirish", ru: "5. Маршрутизация в отдел", en: "5. Department routing" }, body: { uz: "FAISS vektor qidiruvi + LLM (yoki fine-tuned BERT) topshiriqni 30+ bank bo'limidan mos biriga yo'naltiradi.", ru: "FAISS + LLM (или fine-tuned BERT) направляет поручение в один из 30+ отделов банка.", en: "FAISS vector search + LLM (or a fine-tuned BERT) routes each task to one of 30+ bank departments." } },
      ],
    },
    {
      kind: "cards",
      label: { uz: "Sun'iy intellekt va ML", ru: "ИИ и ML", en: "AI & ML capabilities" },
      items: [
        { title: { uz: "LLM", ru: "LLM", en: "LLM" }, body: { uz: "Tur aniqlash, metadata, topshiriq va yo'naltirish uchun. OpenAI-mos API orqali DeepSeek, Qwen3-32B.", ru: "Для типизации, метаданных, поручений и маршрутизации. Через OpenAI-совместимый API: DeepSeek, Qwen3-32B.", en: "For typing, metadata, tasks and routing. Via an OpenAI-compatible API: DeepSeek, Qwen3-32B." } },
        { title: { uz: "PaddleOCR", ru: "PaddleOCR", en: "PaddleOCR" }, body: { uz: "Ochiq kodli OCR - rus va o'zbek hujjatlarini yuqori aniqlikda tanib oladi.", ru: "Открытый OCR - распознаёт русские и узбекские документы с высокой точностью.", en: "Open-source OCR - recognises Russian and Uzbek documents with high accuracy." } },
        { title: { uz: "FAISS vektor qidiruv", ru: "FAISS", en: "FAISS vector search" }, body: { uz: "Bo'lim tavsiflarini embeddingga aylantirib, kosinus o'xshashlik bo'yicha semantik qidiradi.", ru: "Преобразует описания отделов в эмбеддинги и ищет по косинусной близости.", en: "Embeds department descriptions and searches by cosine similarity." } },
        { title: { uz: "BERT klassifikator", ru: "BERT-классификатор", en: "BERT classifier" }, body: { uz: "Maxsus o'qitilgan multi-label model - 30+ bo'lim bo'yicha topshiriqlarni tasniflaydi.", ru: "Дообученная multi-label модель - классифицирует поручения по 30+ отделам.", en: "A fine-tuned multi-label model - classifies tasks across 30+ departments." } },
        { title: { uz: "Fuzzy matching (RapidFuzz)", ru: "Fuzzy matching (RapidFuzz)", en: "Fuzzy matching (RapidFuzz)" }, body: { uz: "Joy va reestr nomlarini Platon yozuvlariga moslashtiradi (85% chegara, kirill normallashtirish).", ru: "Сопоставляет названия мест и реестров с записями Platon (порог 85%, нормализация кириллицы).", en: "Matches place and registry names to Platon records (85% threshold, Cyrillic normalisation)." } },
      ],
    },
    {
      kind: "keyvalue",
      label: { uz: "Aniqlanadigan hujjat turlari", ru: "Распознаваемые типы документов", en: "Recognised document types" },
      items: [
        { key: { uz: "Murojaat", ru: "Обращение", en: "Appeal" }, value: { uz: "Fuqarolarning murojaat va shikoyatlari", ru: "Обращения и жалобы граждан", en: "Citizens' appeals and complaints" } },
        { key: { uz: "Qaror", ru: "Постановление", en: "Resolution" }, value: { uz: "Vazirlar Mahkamasi, Prezident, Markaziy bank qarorlari", ru: "Постановления Кабмина, Президента, Центробанка", en: "Cabinet, Presidential and Central Bank resolutions" } },
        { key: { uz: "Topshiriqlar bayoni", ru: "Изложение поручений", en: "Task statement" }, value: { uz: "Topshiriqlar bayoni hujjatlari", ru: "Документы с изложением поручений", en: "Documents stating assigned tasks" } },
        { key: { uz: "Farmon", ru: "Указ", en: "Decree" }, value: { uz: "Prezident farmonlari", ru: "Указы Президента", en: "Presidential decrees" } },
        { key: { uz: "Xat", ru: "Письмо", en: "Letter" }, value: { uz: "Rasmiy xatlar (banklar, vazirliklar)", ru: "Официальные письма (банки, министерства)", en: "Official letters (banks, ministries)" } },
        { key: { uz: "Ariza", ru: "Заявление", en: "Application" }, value: { uz: "Xodimlarning arizalari", ru: "Заявления сотрудников", en: "Employee applications" } },
        { key: { uz: "Xabarnoma", ru: "Уведомление", en: "Notice" }, value: { uz: "Sud va ijro organlari xabarnomasi", ru: "Уведомления судов и органов исполнения", en: "Court and enforcement notices" } },
        { key: { uz: "Boshqalar", ru: "Прочее", en: "Other" }, value: { uz: "Boshqa turdagi hujjatlar", ru: "Документы других типов", en: "Documents of other types" } },
      ],
    },
    {
      kind: "stats",
      label: { uz: "Miqyos", ru: "Масштаб", en: "Scale" },
      items: [
        { label: { uz: "Hujjat turlari", ru: "Типы документов", en: "Document types" }, value: "8" },
        { label: { uz: "Bank bo'limlari", ru: "Отделы банка", en: "Bank departments" }, value: "30+" },
        { label: { uz: "Status holatlari", ru: "Статусы", en: "Statuses" }, value: "22" },
        { label: { uz: "Consumer nusxalari", ru: "Реплики consumer", en: "Consumer replicas" }, value: "~50" },
        { label: { uz: "Pipeline bosqichlari", ru: "Этапы конвейера", en: "Pipeline stages" }, value: "5" },
      ],
    },
    {
      kind: "bullets",
      label: { uz: "Natijalar", ru: "Результаты", en: "Results" },
      items: [
        { uz: "Qayta ishlash vaqti 10-15 daqiqadan bir necha soniyagacha qisqardi.", ru: "Время обработки сократилось с 10-15 минут до нескольких секунд.", en: "Processing time dropped from 10-15 minutes to a few seconds." },
        { uz: "Inson xatolari minimallashtirildi - AI izchil natija beradi.", ru: "Человеческие ошибки сведены к минимуму - ИИ даёт стабильный результат.", en: "Human error is minimised - the AI is consistent." },
        { uz: "Har bir hujjatning to'liq hayot sikli 22 ta status orqali kuzatiladi.", ru: "Полный жизненный цикл каждого документа отслеживается через 22 статуса.", en: "Each document's full lifecycle is tracked across 22 statuses." },
        { uz: "Topshiriqlar 30+ bank bo'limiga avtomatik yo'naltiriladi.", ru: "Поручения автоматически направляются в 30+ отделов банка.", en: "Tasks are auto-routed to 30+ bank departments." },
        { uz: "Platon EDO bilan avtomatik integratsiya - natijalar darhol qaytariladi.", ru: "Автоматическая интеграция с Platon EDO - результаты возвращаются сразу.", en: "Automatic Platon EDMS integration - results return immediately." },
        { uz: "WebSocket orqali real-vaqt monitoring.", ru: "Мониторинг в реальном времени через WebSocket.", en: "Real-time monitoring over WebSocket." },
      ],
    },
  ],
};
