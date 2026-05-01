import "server-only";
import { cookies } from "next/headers";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  getStrings,
  type Locale,
  type AdminStrings,
} from "./admin-i18n";

export function getServerLocale(): Locale {
  try {
    const c = cookies().get(LOCALE_COOKIE)?.value;
    if (c === "uz" || c === "ru" || c === "en") return c;
  } catch {
    /* noop */
  }
  return DEFAULT_LOCALE;
}

export function getServerStrings(): AdminStrings {
  return getStrings(getServerLocale());
}

export { getStrings };
