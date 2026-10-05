import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { features } from "@/data/features";

export function Features() {
  return (
    <Section id="features">
      <SectionHeading intro={features.intro} />
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.items.map((feature) => (
          <li
            key={feature.title}
            className="rounded-card border border-border bg-surface p-6"
          >
            <span className="flex size-11 items-center justify-center rounded-control bg-accent/10 text-accent">
              <feature.icon aria-hidden="true" className="size-6" />
            </span>
            <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
            <p className="mt-2 text-muted">{feature.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
