import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { HowItWorksContent } from "@/data/types";

interface HowItWorksProps {
  howItWorks: HowItWorksContent;
}

/** Staircase from md up: first step on the left, second centered, third on the right. */
const stepPosition = [
  "md:mr-auto",
  "md:mx-auto md:mt-24",
  "md:ml-auto md:mt-24",
];

/**
 * Steps fade in while scrolling down and fade back out while scrolling up.
 * The data-scroll attributes are read by Locomotive Scroll (see SmoothScroll);
 * the fade itself is the .reveal rule in globals.css.
 */
export function HowItWorks({ howItWorks }: HowItWorksProps) {
  return (
    <Section
      id="how-it-works"
      className="overflow-hidden border-y border-border bg-surface"
    >
      <SectionHeading intro={howItWorks.intro} />
      <ol className="mt-16 flex flex-col gap-16 md:gap-0">
        {howItWorks.steps.map((step, index) => (
          <li
            key={step.title}
            data-scroll
            data-scroll-repeat
            data-scroll-offset="20%,10%"
            className={`reveal flex w-full flex-col gap-6 md:w-[24rem] lg:w-[28rem] ${stepPosition[index]}`}
          >
            <div
              data-scroll
              data-scroll-speed="0.03"
              className="relative aspect-[4/3] overflow-hidden rounded-card border border-border"
            >
              <Image
                src={step.image.src}
                alt={step.image.alt}
                fill
                sizes="(min-width: 1024px) 28rem, (min-width: 768px) 24rem, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-3">
              <span
                aria-hidden="true"
                className="text-2xl font-extrabold text-accent tabular-nums"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-3xl font-bold tracking-tight md:text-4xl">
                {step.title}
              </h3>
              <p className="text-lg text-muted">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
