import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pricing } from "@/data/pricing";

export function Pricing() {
  return (
    <Section id="pricing">
      <SectionHeading intro={pricing.intro} />
      <ul className="mx-auto mt-14 grid max-w-md gap-6 lg:max-w-none lg:grid-cols-3">
        {pricing.plans.map((plan) => {
          const isHighlighted = Boolean(plan.badge);

          return (
            <li
              key={plan.name}
              className={`relative flex flex-col rounded-card border bg-surface p-8 ${
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
                <span className="text-5xl font-extrabold tracking-tight tabular-nums">
                  {pricing.currency}
                  {plan.price}
                </span>
                <span className="text-muted">{pricing.period}</span>
              </p>

              <ul className="mt-8 mb-10 flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-accent"
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
    </Section>
  );
}
