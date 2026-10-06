import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CenterSpotlight } from "@/components/ui/CenterSpotlight";
import { CountUp, CountUpGroup } from "@/components/ui/CountUp";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PricingContent } from "@/data/types";

interface PricingProps {
  pricing: PricingContent;
}

/**
 * The card highlight (lift, accent border, glow, accent price, brighter check
 * marks) lives in globals.css under .plan-card: it is shown on mouse hover, on
 * keyboard focus of the button inside, and, on touch screens, on the card
 * nearest the middle of the screen (CenterSpotlight).
 */
export function Pricing({ pricing }: PricingProps) {
  return (
    <Section id="pricing">
      <SectionHeading intro={pricing.intro} />
      <CountUpGroup>
        <CenterSpotlight itemSelector=".plan-card" dimmedClass="is-dimmed">
          <ul className="mx-auto mt-14 grid max-w-md gap-6 lg:max-w-none lg:grid-cols-3">
            {pricing.plans.map((plan) => {
              const isHighlighted = Boolean(plan.badge);

              return (
                <li
                  key={plan.name}
                  data-highlighted={isHighlighted || undefined}
                  className={`plan-card relative flex flex-col rounded-card border bg-surface p-8 ${
                    isHighlighted ? "border-accent" : "border-border"
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
                      {plan.badge}
                    </span>
                  )}

                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="mt-4 flex items-baseline gap-2">
                    <span className="plan-price text-5xl font-extrabold tracking-tight tabular-nums">
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
                          className="plan-check mt-0.5 size-5 shrink-0 text-accent"
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
        </CenterSpotlight>
      </CountUpGroup>
    </Section>
  );
}
