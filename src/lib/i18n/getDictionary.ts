import { dictionaries } from "./dictionaries";
import type { Locale } from "./config";

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export type Dictionary = ReturnType<typeof getDictionary>;
