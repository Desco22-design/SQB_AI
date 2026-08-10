import type { ProjectDetail } from "./types";

// Source: docs/ULAB_Loyiha_Batafsil_Malumot.docx (Uzbek original).
export const ulab: ProjectDetail = {
  id: "ulab",
  tagline: {
    uz: "O'zbek tilidagi AI modellarini ob'ektiv baholash platformasi - 17 model, 1 377 test savoli",
    ru: "Платформа объективной оценки AI-моделей узбекского языка - 17 моделей, 1 377 тестовых вопросов",
    en: "A platform for objectively benchmarking Uzbek-language AI models - 17 models, 1,377 test questions",
  },
  sections: [
    {
      kind: "paragraph",
      label: { uz: "Loyiha haqida", ru: "О проекте", en: "Overview" },
      body: {
        uz: "ULAB (Uzbek Language AI Benchmark) - o'zbek tilidagi sun'iy intellekt modellarining til bilim darajasini ob'ektiv va standartlashtirilgan tarzda baholash uchun yaratilgan ichki platforma. Bank ichki bo'limlari uchun o'zbek tilida AI yordamchi joriy etishni rejalashtirgan va qaysi model o'zbek tilini eng yaxshi tushunishini aniqlash zarur edi. ULAB 1 377 ta test savoli va interaktiv dashboard orqali 17 ta yetakchi AI modelini solishtirdi - model tanlashni sub'ektiv fikrdan raqamli ko'rsatkichlarga o'tkazdi.",
        ru: "ULAB (Uzbek Language AI Benchmark) - внутренняя платформа для объективной и стандартизированной оценки владения узбекским языком у AI-моделей. Банк планировал внедрить AI-ассистента на узбекском для внутренних отделов, и нужно было определить, какая модель лучше понимает узбекский. ULAB сравнил 17 ведущих AI-моделей на 1 377 вопросах через интерактивный дашборд - переведя выбор модели с субъективного мнения на цифровые показатели.",
        en: "ULAB (Uzbek Language AI Benchmark) is an internal platform for objectively and consistently measuring how well AI models handle the Uzbek language. The bank planned to roll out an Uzbek-language AI assistant for internal departments and needed to know which model understands Uzbek best. ULAB compared 17 leading AI models across 1,377 questions via an interactive dashboard - moving model selection from opinion to hard numbers.",
      },
    },
    {
      kind: "stats",
      label: { uz: "Miqyos", ru: "Масштаб", en: "Scale" },
      items: [
        { value: "17", label: { uz: "AI modellar", ru: "AI-модели", en: "AI models" } },
        { value: "1 377", label: { uz: "Test savollari", ru: "Тестовых вопросов", en: "Benchmark questions" } },
        { value: "10", label: { uz: "Vazifa turi", ru: "Типов задач", en: "Task types" } },
        { value: "3", label: { uz: "Til uslubi", ru: "Регистра языка", en: "Language registers" } },
        { value: "72.3%", label: { uz: "Eng yuqori aniqlik", ru: "Лучшая точность", en: "Top accuracy" } },
      ],
    },
    {
      kind: "bullets",
      label: { uz: "Loyiha vazifalari", ru: "Задачи проекта", en: "Project goals" },
      items: [
        { uz: "Bank uchun o'zbek tilidagi AI modellar reytingini tuzish.", ru: "Составить рейтинг AI-моделей узбекского языка для банка.", en: "Build a ranking of Uzbek-language AI models for the bank." },
        { uz: "MCQ (A/B/C/D) formatida 1 377 savol bilan avtomatik, standart baholash.", ru: "Автоматическая стандартная оценка на 1 377 вопросах в формате MCQ (A/B/C/D).", en: "Automatic, standardized scoring on 1,377 MCQ (A/B/C/D) questions." },
        { uz: "O'zbek vendorlarini (Kotib LLM, Muxlisa LLM) mustaqil test qilish.", ru: "Независимое тестирование узбекских вендоров (Kotib LLM, Muxlisa LLM).", en: "Independent testing of Uzbek vendors (Kotib LLM, Muxlisa LLM)." },
        { uz: "Boshqaruv uchun interaktiv dashboard va Excel hisobotlar.", ru: "Интерактивный дашборд и Excel-отчёты для руководства.", en: "An interactive dashboard and Excel reports for management." },
        { uz: "Keyingi baholashlar uchun qayta ishlatiladigan infratuzilma.", ru: "Переиспользуемая инфраструктура для будущих оценок.", en: "Reusable infrastructure for future evaluations." },
      ],
    },
    {
      kind: "cards",
      label: { uz: "Tarkibiy modullar", ru: "Модули системы", en: "System modules" },
      items: [
        { title: { uz: "MCQ Benchmark", ru: "MCQ Benchmark", en: "MCQ Benchmark" }, body: { uz: "Asosiy modul: 1 377 savol, 17 model, avtomatik baholash va natijalar dashboard'i.", ru: "Основной модуль: 1 377 вопросов, 17 моделей, автооценка и дашборд результатов.", en: "Core module: 1,377 questions, 17 models, automatic scoring and a results dashboard." } },
        { title: { uz: "Dataset generatsiya", ru: "Генерация датасета", en: "Dataset generation" }, body: { uz: "gpt-4o-mini orqali savollarni avtomatik yaratuvchi konveyer: sifat filtri va deduplikatsiya.", ru: "Конвейер автогенерации вопросов через gpt-4o-mini: фильтр качества и дедупликация.", en: "A pipeline that auto-generates questions via gpt-4o-mini with quality filtering and deduplication." } },
        { title: { uz: "Ovozli benchmark (ULAB-Voice)", ru: "Голосовой бенчмарк (ULAB-Voice)", en: "Voice benchmark (ULAB-Voice)" }, body: { uz: "ASR (nutq->matn), TTS (matn->nutq) va ovoz orqali identifikatsiyani baholash.", ru: "Оценка ASR (речь->текст), TTS (текст->речь) и верификации по голосу.", en: "Evaluates ASR (speech-to-text), TTS (text-to-speech) and speaker verification." } },
        { title: { uz: "Vendorlarni test qilish", ru: "Тестирование вендоров", en: "Vendor testing" }, body: { uz: "Kotib va Muxlisa vendorlarini bevosita test qilish va solishtirma hisobot.", ru: "Прямое тестирование вендоров Kotib и Muxlisa и сравнительный отчёт.", en: "Directly tests the Kotib and Muxlisa vendors and produces a comparison report." } },
      ],
    },
    {
      kind: "keyvalue",
      label: { uz: "Yetakchi modellar natijasi", ru: "Результаты лидеров", en: "Top model results" },
      items: [
        { key: { uz: "Kotib LLM v1 (mahalliy vendor)", ru: "Kotib LLM v1 (локальный вендор)", en: "Kotib LLM v1 (local vendor)" }, value: { uz: "72.8% - eng yaxshi, ma'lumot mamlakat ichida qoladi", ru: "72.8% - лучший, данные остаются в стране", en: "72.8% - best; data stays in-country" } },
        { key: { uz: "Kimi K2.5 (open source)", ru: "Kimi K2.5 (open source)", en: "Kimi K2.5 (open source)" }, value: { uz: "72.3% - eng yaxshi open-source model", ru: "72.3% - лучшая open-source модель", en: "72.3% - best open-source model" } },
        { key: { uz: "Mistral Large 2512 (commercial)", ru: "Mistral Large 2512 (commercial)", en: "Mistral Large 2512 (commercial)" }, value: { uz: "71.3% - eng yaxshi commercial model", ru: "71.3% - лучшая коммерческая модель", en: "71.3% - best commercial model" } },
        { key: { uz: "Cogito 671B / Llama 4 Maverick", ru: "Cogito 671B / Llama 4 Maverick", en: "Cogito 671B / Llama 4 Maverick" }, value: { uz: "70.2% / 70.1% - kuchli open-source alternativalar", ru: "70.2% / 70.1% - сильные open-source альтернативы", en: "70.2% / 70.1% - strong open-source alternatives" } },
      ],
    },
    {
      kind: "bullets",
      label: { uz: "Asosiy topilmalar", ru: "Ключевые выводы", en: "Key findings" },
      items: [
        { uz: "Birorta ham model 75% dan oshmadi - o'zbek tili AI uchun hali hal etilmagan muammo.", ru: "Ни одна модель не превысила 75% - узбекский остаётся нерешённой задачей для AI.", en: "No model passed 75% - Uzbek remains an unsolved challenge for AI." },
        { uz: "14 modeldan 13 tasi 61-72% oralig'ida - tanlov narx va latensiya asosida qilinadi.", ru: "13 из 14 моделей в диапазоне 61-72% - выбор по цене и задержке.", en: "13 of 14 models sit in 61-72% - so choose on price and latency." },
        { uz: "Matnni tushunish (RC) eng oson - deyarli barcha modellar 90%+ ko'rsatdi.", ru: "Понимание текста (RC) - легче всего, почти все модели 90%+.", en: "Reading comprehension (RC) was easiest - nearly all models scored 90%+." },
        { uz: "To'ldirish va so'z ma'nosi eng qiyin (32-42%) - chuqur semantik tushunishda zaiflik.", ru: "Заполнение и значение слов - сложнее всего (32-42%), слабая глубокая семантика.", en: "Fill-in and word meaning were hardest (32-42%) - weak deep semantics." },
        { uz: "Kotib LLM mahalliy vendor sifatida global open-source modellar bilan tenglashdi (72.8%).", ru: "Kotib LLM как локальный вендор сравнялся с лучшими open-source (72.8%).", en: "Kotib LLM, a local vendor, matched the best open-source models (72.8%)." },
      ],
    },
    {
      kind: "cards",
      label: { uz: "Ovozli texnologiyalar (ULAB-Voice)", ru: "Голосовые технологии (ULAB-Voice)", en: "Voice technologies (ULAB-Voice)" },
      items: [
        { title: { uz: "ASR - nutqni matnga", ru: "ASR - речь в текст", en: "ASR - speech to text" }, body: { uz: "Whisper va Kotib/uzbek_stt_v1 baholandi; asosiy metrika CER/WER. Kotib eng past xato (WER 16.7%).", ru: "Оценены Whisper и Kotib/uzbek_stt_v1; метрика CER/WER. У Kotib наименьшая ошибка (WER 16.7%).", en: "Whisper and Kotib/uzbek_stt_v1 evaluated; CER/WER metrics. Kotib had the lowest error (WER 16.7%)." } },
        { title: { uz: "TTS - matnni nutqqa", ru: "TTS - текст в речь", en: "TTS - text to speech" }, body: { uz: "UTMOS, Intelligibility WER va inson MOS (Toloka'da 30+ so'zlovchi) bo'yicha baholash.", ru: "Оценка по UTMOS, Intelligibility WER и человеческому MOS (30+ дикторов в Toloka).", en: "Assessed via UTMOS, intelligibility WER and human MOS (30+ speakers on Toloka)." } },
        { title: { uz: "Speaker Verification", ru: "Верификация диктора", en: "Speaker verification" }, body: { uz: "Biometrik autentifikatsiya uchun kritik; ECAPA-TDNN baseline, maqsad EER <= 2%.", ru: "Критично для биометрии; baseline ECAPA-TDNN, цель EER <= 2%.", en: "Critical for biometric auth; ECAPA-TDNN baseline, target EER <= 2%." } },
      ],
    },
    {
      kind: "bullets",
      label: { uz: "Tavsiyalar va keyingi qadamlar", ru: "Рекомендации и следующие шаги", en: "Recommendations and next steps" },
      items: [
        { uz: "Tavsiya etilgan modellar: Kotib LLM v1 (72.8%), Kimi K2.5 (72.3%), Mistral Large (71.3%).", ru: "Рекомендованные модели: Kotib LLM v1 (72.8%), Kimi K2.5 (72.3%), Mistral Large (71.3%).", en: "Recommended models: Kotib LLM v1 (72.8%), Kimi K2.5 (72.3%), Mistral Large (71.3%)." },
        { uz: "Tanlangan modelni 3 bo'limda pilot test qilish.", ru: "Пилотное тестирование выбранной модели в 3 отделах.", en: "Pilot the chosen model in 3 departments." },
        { uz: "Bank domenida fine-tuning imkoniyatini o'rganish.", ru: "Изучить возможность fine-tuning под домен банка.", en: "Explore fine-tuning for the bank's domain." },
        { uz: "Har chorakda benchmarkni qayta o'tkazish (yangi modellar uchun).", ru: "Повторять бенчмарк ежеквартально (для новых моделей).", en: "Re-run the benchmark quarterly (for new models)." },
      ],
    },
  ],
};
