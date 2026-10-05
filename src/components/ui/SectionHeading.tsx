import type { SectionIntro } from "@/data/types";
import { ScrambleText } from "./ScrambleText";

interface SectionHeadingProps {
  intro: SectionIntro;
  /** Assembles the title out of random symbols when it scrolls into view. */
  scramble?: boolean;
}

/** Centered section title with an optional subtitle. */
export function SectionHeading({
  intro,
  scramble = false,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
        {scramble ? <ScrambleText text={intro.title} /> : intro.title}
      </h2>
      {intro.subtitle && <p className="text-lg text-muted">{intro.subtitle}</p>}
    </div>
  );
}
