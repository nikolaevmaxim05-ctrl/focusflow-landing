import type { Locale } from "@/i18n/config";
import { en } from "./en";
import { ru } from "./ru";
import type { SiteContent } from "./types";
import { uk } from "./uk";

const content: Record<Locale, SiteContent> = { en, uk, ru };

/** All texts and assets of the page in the given language. */
export function getContent(locale: Locale): SiteContent {
  return content[locale];
}
