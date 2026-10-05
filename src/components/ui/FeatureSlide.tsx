import Image from "next/image";
import { FeatureIllustration } from "@/components/illustrations/FeatureIllustration";
import type { Feature } from "@/data/types";

interface FeatureSlideProps {
  feature: Feature;
}

/** One carousel slide: background picture, icon, title and description. */
export function FeatureSlide({ feature }: FeatureSlideProps) {
  const { background } = feature;

  return (
    <article className="relative flex min-h-[24rem] flex-col justify-end overflow-hidden rounded-card border border-border bg-surface p-6 md:min-h-[28rem] md:p-10">
      {background.type === "photo" ? (
        <>
          <Image
            src={background.image.src}
            alt={background.image.alt}
            fill
            sizes="(min-width: 1024px) 60vw, (min-width: 768px) 70vw, 88vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/75 to-background/20" />
        </>
      ) : (
        <FeatureIllustration
          name={background.name}
          className="absolute top-3 right-3 h-[55%] md:top-6 md:right-6 md:h-[62%]"
        />
      )}

      <div className="relative flex max-w-md flex-col gap-3">
        <span className="flex size-11 items-center justify-center rounded-control bg-accent text-accent-foreground">
          <feature.icon aria-hidden="true" className="size-6" />
        </span>
        <h3 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
          {feature.title}
        </h3>
        <p className="text-muted md:text-lg">{feature.description}</p>
      </div>
    </article>
  );
}
