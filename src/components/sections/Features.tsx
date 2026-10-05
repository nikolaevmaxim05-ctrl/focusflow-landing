import Image from "next/image";
import { Carousel } from "@/components/ui/Carousel";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { FeaturesContent, UiStrings } from "@/data/types";

interface FeaturesProps {
  features: FeaturesContent;
  ui: UiStrings;
}

export function Features({ features, ui }: FeaturesProps) {
  return (
    <section id="features" className="py-16 md:py-24">
      <Container>
        <SectionHeading intro={features.intro} />
      </Container>
      <div className="mx-auto mt-8 max-w-[100rem]">
        <Carousel
          label={features.intro.title}
          intervalSeconds={features.autoplaySeconds}
          labels={{
            previous: ui.previousSlide,
            next: ui.nextSlide,
            slideOf: ui.slideOf,
          }}
          backgrounds={features.items.map((feature) => (
            <Image
              key={feature.title}
              src={feature.image.src}
              alt={feature.image.alt}
              fill
              sizes="(min-width: 1600px) 1600px, 100vw"
              className="object-cover"
            />
          ))}
        >
          {features.items.map((feature) => (
            <article
              key={feature.title}
              className="flex min-h-[26rem] flex-col items-center justify-center gap-4 px-8 py-12 text-center md:min-h-[32rem]"
            >
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
          ))}
        </Carousel>
      </div>
    </section>
  );
}
