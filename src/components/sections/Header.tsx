import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "@/components/ui/MobileMenu";
import { NavLinks } from "@/components/ui/NavLinks";
import type { SiteConfig, UiStrings } from "@/data/types";
import type { Locale } from "@/i18n/config";

interface HeaderProps {
  site: SiteConfig;
  ui: UiStrings;
  locale: Locale;
}

export function Header({ site, ui, locale }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Logo site={site} />

        <nav aria-label={ui.mainNavigation} className="hidden lg:block">
          <NavLinks items={site.nav} />
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <LanguageSwitcher current={locale} label={ui.language} />
          <ButtonLink href={site.cta.href} external>
            {site.cta.label}
          </ButtonLink>
        </div>

        <MobileMenu nav={site.nav} cta={site.cta} ui={ui}>
          <LanguageSwitcher current={locale} label={ui.language} />
        </MobileMenu>
      </Container>
    </header>
  );
}
