import { localeLabels, localeNames, localePath, locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

interface LanguageSwitcherProps {
  current: Locale;
  /** Accessible name of the group, e.g. "Language". */
  label: string;
}

/** Row of language codes; each one opens the page in that language. */
export function LanguageSwitcher({ current, label }: LanguageSwitcherProps) {
  return (
    <ul aria-label={label} className="flex items-center gap-1">
      {locales.map((locale) => {
        const isCurrent = locale === current;

        return (
          <li key={locale}>
            <a
              href={localePath(locale)}
              hrefLang={locale}
              lang={locale}
              aria-label={localeNames[locale]}
              aria-current={isCurrent ? "true" : undefined}
              className={`rounded-control px-1.5 py-1 text-sm font-semibold transition-all duration-300 hover:text-accent hover:[text-shadow:0_0_14px_rgb(45_212_191/0.7)] focus-visible:outline-2 focus-visible:outline-accent-hover ${
                isCurrent
                  ? "text-accent [text-shadow:0_0_14px_rgb(45_212_191/0.7)]"
                  : "text-muted"
              }`}
            >
              {localeLabels[locale]}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
