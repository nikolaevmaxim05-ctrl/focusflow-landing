import Image from "next/image";
import { FeatureIllustration } from "@/components/illustrations/FeatureIllustration";
import { Carousel } from "@/components/ui/Carousel";
import { Container } from "@/components/ui/Container";
import { FeatureSlide } from "@/components/ui/FeatureSlide";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { features } from "@/data/features";
import type { FeatureBackground } from "@/data/types";

function Background({ background }: { background: FeatureBackground }) {
  if (background.type === "illustration") {
    return (
      <FeatureIllustration
        name={background.name}
        className="absolute inset-0 m-auto h-4/5"
      />
    );
  }

  return (
    <Image
      src={background.image.src}
      alt={background.image.alt}
      fill
      sizes="(min-width: 1600px) 1600px, 100vw"
      className="object-cover"
    />
  );
}

export function Features() {
  return (
    <section id="features" className="py-16 md:py-24">
      <Container>
        <SectionHeading intro={features.intro} />
      </Container>
      <div className="mx-auto mt-8 max-w-[100rem]">
        <Carousel
          label={features.intro.title}
          intervalSeconds={features.autoplaySeconds}
          backgrounds={features.items.map((feature) => (
            <Background key={feature.title} background={feature.background} />
          ))}
        >
          {features.items.map((feature) => (
            <FeatureSlide key={feature.title} feature={feature} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
