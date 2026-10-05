import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { hero } from "@/data/hero";

export function Hero() {
  return (
    <section className="py-16 md:py-24">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <h1 className="max-w-xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="max-w-lg text-lg text-muted">{hero.description}</p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href={hero.primaryCta.href} size="lg" external>
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={hero.secondaryCta.href}
              size="lg"
              variant="secondary"
            >
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <PhoneMockup content={hero.mockup} />
        </div>
      </Container>
    </section>
  );
}
