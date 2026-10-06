import { Container } from "@/components/ui/Container";
import { FeatureStories } from "@/components/ui/FeatureStories";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { FeaturesContent, UiStrings } from "@/data/types";

interface FeaturesProps {
  features: FeaturesContent;
  ui: UiStrings;
}

/**
 * The stories block is wider than the page container, and its photo layer
 * fills the whole section, so this section lays itself out instead of using
 * the shared Section component.
 */
export function Features({ features, ui }: FeaturesProps) {
  return (
    <section
      id="features"
      className="relative isolate overflow-x-clip py-16 md:py-24"
    >
      <Container className="relative">
        <SectionHeading intro={features.intro} />
      </Container>
      <div className="mt-12">
        <FeatureStories
          items={features.items.map((item) => ({
            title: item.title,
            bullets: item.bullets,
            image: item.image,
          }))}
          icons={features.items.map((item) => (
            <item.icon
              key={item.title}
              className="size-full"
              strokeWidth={1.6}
            />
          ))}
          stepSeconds={features.autoplaySeconds}
          hint={ui.storiesHint}
        />
      </div>
    </section>
  );
}
