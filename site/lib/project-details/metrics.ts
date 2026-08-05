import type { Tri } from "./types";

// Localized metric tiles for every project. The DB `impact` field is
// English-only, so both the project cards and the detail-page hero read their
// three tiles from here instead, keeping them translated in all languages.
export type Metric = { value: Tri; label: Tri };

const t = (uz: string, ru: string, en: string): Tri => ({ uz, ru, en });

export const PROJECT_METRICS: Record<string, Metric[]> = {
  "sqb-mahalla": [
    { value: t("15", "15", "15"), label: t("Viloyatlar", "Вилояты", "Regions") },
    { value: t("3 234", "3 234", "3 234"), label: t("Mahallalar", "Махалли", "Mahallas") },
    { value: t("Daqiqalar", "Минуты", "Minutes"), label: t("Biznes-reja", "Бизнес-план", "Business plan") },
  ],
  "sqb-fleet-ai": [
    { value: t("129", "129", "129"), label: t("Avtomobil va generator", "Авто и генераторы", "Vehicles & generators") },
    { value: t("13", "13", "13"), label: t("Mintaqa", "Регионы", "Regions covered") },
    { value: t("100%", "100%", "100%"), label: t("Haydovchi baholash avtomatik", "Автооценка водителей", "Driver scoring automation") },
  ],
  "ai-ijro": [
    { value: t("8", "8", "8"), label: t("Hujjat turlari", "Типы документов", "Document types") },
    { value: t("30+", "30+", "30+"), label: t("Bank bo'limlari", "Отделы банка", "Bank departments") },
    { value: t("22", "22", "22"), label: t("Status holatlari", "Статусы", "Status stages") },
  ],
  "ai-callcenter": [
    { value: t("Kamroq", "Меньше", "Lower"), label: t("Operator yuki", "Нагрузка оператора", "Operator workload") },
    { value: t("Avto-hal", "Авто-решение", "Auto-resolved"), label: t("Oddiy savollar", "Рутинные вопросы", "Routine queries") },
    { value: t("Jonli operator", "Живой оператор", "Live operator"), label: t("Nozik holatlar", "Чувствительные кейсы", "Sensitive cases") },
  ],
  "ai-lex": [
    { value: t("-50-70%", "-50-70%", "-50-70%"), label: t("Hujjat tekshiruv vaqti", "Время проверки документов", "Document review time") },
    { value: t("+90%", "+90%", "+90%"), label: t("Xato aniqlash", "Обнаружение ошибок", "Error detection") },
    { value: t("-70-80%", "-70-80%", "-70-80%"), label: t("Muvofiqlik-xatar", "Комплаенс-риск", "Compliance risk") },
  ],
};

export function getProjectMetrics(id: string): Metric[] | null {
  return PROJECT_METRICS[id] ?? null;
}
