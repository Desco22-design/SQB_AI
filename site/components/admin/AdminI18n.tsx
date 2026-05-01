"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { adminDict, type AdminStrings, type Locale } from "@/lib/admin-i18n";

type Ctx = { locale: Locale; t: AdminStrings };

const I18nCtx = createContext<Ctx>({ locale: "ru", t: adminDict.ru });

export function AdminI18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const value = useMemo(() => ({ locale, t: adminDict[locale] }), [locale]);
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useT(): AdminStrings {
  return useContext(I18nCtx).t;
}

export function useLocale(): Locale {
  return useContext(I18nCtx).locale;
}
