import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "@/components/ui/MobileMenu";
import { NavLinks } from "@/components/ui/NavLinks";
import { site } from "@/data/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden md:block">
          <NavLinks items={site.nav} />
        </nav>

        <div className="hidden md:block">
          <ButtonLink href={site.cta.href} external>
            {site.cta.label}
          </ButtonLink>
        </div>

        <MobileMenu nav={site.nav} cta={site.cta} />
      </Container>
    </header>
  );
}
