import { en } from "./en";
import { de } from "./de";

export type Locale = "en" | "de";

export type Dictionary = {
  metadata: { title: string; description: string };
  nav: { about: string; openMenu: string; closeMenu: string };
  home: { seriesLabel: string };
  about: {
    title: string;
    metaDescription: string;
    para1: string;
    para2: string;
    contactText: string;
  };
  series: Record<string, { title: string; subtitle: string; description: string }>;
  seriesNav: { previous: string; next: string; ariaLabel: string };
  lightbox: {
    close: string;
    ariaClose: string;
    ariaPrev: string;
    ariaNext: string;
    openPhoto: string;
  };
};

export const locales: Locale[] = ["en", "de"];
export const defaultLocale: Locale = "en";

const dictionaries: Record<Locale, Dictionary> = { en, de };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
