/** Languages of the site. The first one is served at "/", the others at "/<code>". */
export const locales = ["en", "uk", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Short labels shown in the language switcher. */
export const localeLabels: Record<Locale, string> = {
  en: "EN",
  uk: "UA",
  ru: "RU",
};

/** Full language names, read by screen readers in the language switcher. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  uk: "Українська",
  ru: "Русский",
};

/** Address of the page in the given language. */
export function localePath(locale: Locale) {
  return locale === defaultLocale ? "/" : `/${locale}`;
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
