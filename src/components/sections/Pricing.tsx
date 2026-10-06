import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CountUp, CountUpGroup } from "@/components/ui/CountUp";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PricingContent } from "@/data/types";

interface PricingProps {
  pricing: PricingContent;
}

/**
 * Hover (mouse only) and keyboard focus on the button inside: the card lifts,
 * its border turns accent and it glows. The highlighted plan already has an
 * accent border, so it lifts higher and glows stronger.
 */
const CARD_HOVER =
  "hover:-translate-y-1.5 hover:border-accent hover:shadow-[0_0_28px_-4px_rgb(45_212_191/0.8)] has-focus-visible:-translate-y-1.5 has-focus-visible:border-accent has-focus-visible:shadow-[0_0_28px_-4px_rgb(45_212_191/0.8)]";
const CARD_HOVER_HIGHLIGHTED =
  "hover:-translate-y-2.5 hover:shadow-[0_0_44px_-2px_rgb(45_212_191/1)] has-focus-visible:-translate-y-2.5 has-focus-visible:shadow-[0_0_44px_-2px_rgb(45_212_191/1)]";

export function Pricing({ pricing }: PricingProps) {
  return (
    <Section id="pricing">
      <SectionHeading intro={pricing.intro} />
      <CountUpGroup>
        <ul className="mx-auto mt-14 grid max-w-md gap-6 lg:max-w-none lg:grid-cols-3">
          {pricing.plans.map((plan) => {
            const isHighlighted = Boolean(plan.badge);

            return (
              <li
                key={plan.name}
                className={`group relative flex flex-col rounded-card border bg-surface p-8 transition-all duration-300 ${
                  isHighlighted
                    ? `border-accent ${CARD_HOVER_HIGHLIGHTED}`
                    : `border-border ${CARD_HOVER}`
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
                    {plan.badge}
                  </span>
                )}

                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-4 flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold tracking-tight tabular-nums transition-colors duration-300 group-hover:text-accent group-has-focus-visible:text-accent">
                    {pricing.currency}
                    <CountUp value={plan.price} />
                  </span>
                  <span className="text-muted">{pricing.period}</span>
                </p>

                <ul className="mt-8 mb-10 flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 size-5 shrink-0 text-accent transition-all duration-300 group-hover:scale-110 group-hover:text-accent-hover group-has-focus-visible:scale-110 group-has-focus-visible:text-accent-hover"
                      />
                      <span className="text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>

                <ButtonLink
                  href={plan.cta.href}
                  size="lg"
                  variant={isHighlighted ? "primary" : "secondary"}
                  external
                  className="mt-auto"
                >
                  {plan.cta.label}
                </ButtonLink>
              </li>
            );
          })}
        </ul>
      </CountUpGroup>
    </Section>
  );
}
