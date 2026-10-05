import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howItWorks } from "@/data/howItWorks";

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="border-y border-border bg-surface">
      <SectionHeading intro={howItWorks.intro} />
      <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
        {howItWorks.steps.map((step, index) => (
          <li
            key={step.title}
            className="flex flex-col gap-3 border-t border-border pt-6"
          >
            <span
              aria-hidden="true"
              className="text-5xl font-extrabold tracking-tight text-accent tabular-nums"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
            <p className="text-muted">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
