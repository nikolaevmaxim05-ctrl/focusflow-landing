import type { Feature } from "@/data/types";

interface FeatureSlideProps {
  feature: Feature;
}

/** Text of one carousel slide: icon, title and description. */
export function FeatureSlide({ feature }: FeatureSlideProps) {
  return (
    <article className="flex min-h-[26rem] flex-col items-center justify-center gap-4 px-8 py-12 text-center md:min-h-[32rem]">
      <span className="flex size-14 items-center justify-center rounded-control bg-accent text-accent-foreground">
        <feature.icon aria-hidden="true" className="size-7" />
      </span>
      <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-balance md:text-5xl">
        {feature.title}
      </h3>
      <p className="max-w-xl text-lg text-foreground/85 md:text-xl">
        {feature.description}
      </p>
    </article>
  );
}
