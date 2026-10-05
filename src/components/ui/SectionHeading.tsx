import type { SectionIntro } from "@/data/types";

interface SectionHeadingProps {
  intro: SectionIntro;
}

/** Centered section title with an optional subtitle. */
export function SectionHeading({ intro }: SectionHeadingProps) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
        {intro.title}
      </h2>
      {intro.subtitle && <p className="text-lg text-muted">{intro.subtitle}</p>}
    </div>
  );
}
