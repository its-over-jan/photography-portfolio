import { en } from "./en";
import { de } from "./de";

export type Locale = "en" | "de";
export type Dictionary = typeof en;

export const locales: Locale[] = ["en", "de"];
export const defaultLocale: Locale = "en";

const dictionaries = { en, de } as const;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
