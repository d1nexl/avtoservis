export const locales = ["ru", "cs"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ru";

export const localeNames: Record<Locale, string> = {
  ru: "Русский",
  cs: "Čeština",
};

export const localeCodes: Record<Locale, string> = {
  ru: "RU",
  cs: "CZ",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
