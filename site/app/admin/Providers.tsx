"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import { AdminI18nProvider } from "@/components/admin/AdminI18n";
import type { Locale } from "@/lib/admin-i18n";

export function Providers({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <SessionProvider>
      <AdminI18nProvider locale={locale}>{children}</AdminI18nProvider>
    </SessionProvider>
  );
}
