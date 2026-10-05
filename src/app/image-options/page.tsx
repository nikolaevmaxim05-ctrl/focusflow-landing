import { FeatureIllustration } from "@/components/illustrations/FeatureIllustration";
import { Container } from "@/components/ui/Container";
import { features } from "@/data/features";
import type { IllustrationName } from "@/data/types";

// Temporary page: background candidates for the Features carousel.
// Photos are hot-linked for preview only. Delete this folder once the choice is made.

interface PhotoOption {
  /** Photo page on the stock site. */
  page: string;
  /** Direct image URL. */
  src: string;
}

interface Candidates {
  unsplash: PhotoOption;
  pexels: PhotoOption;
  illustration: IllustrationName;
}

const unsplash = (pageId: string, photoId: string): PhotoOption => ({
  page: `https://unsplash.com/photos/${pageId}`,
  src: `https://images.unsplash.com/${photoId}?w=1200&q=70&auto=format&fit=crop`,
});

const pexels = (id: string): PhotoOption => ({
  page: `https://www.pexels.com/photo/${id}/`,
  src: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`,
});

const candidates: Candidates[] = [
  {
    unsplash: unsplash("Cv1IZqKJQzU", "photo-1633265486501-0cf524a07213"),
    pexels: pexels("1078057"),
    illustration: "timer",
  },
  {
    unsplash: unsplash("gVpXbCGG6jI", "photo-1639413665566-2f75adf7b7ca"),
    pexels: pexels("8004107"),
    illustration: "minimal",
  },
  {
    unsplash: unsplash("JKUTrJ4vK00", "photo-1551288049-bebda4e38f71"),
    pexels: pexels("590045"),
    illustration: "stats",
  },
  {
    unsplash: unsplash("GI6L2pkiZgQ", "photo-1484704849700-f032a568e944"),
    pexels: pexels("1707232"),
    illustration: "sounds",
  },
  {
    unsplash: unsplash("_XTY6lD8jgM", "photo-1578269174936-2709b6aeb913"),
    pexels: pexels("2278647"),
    illustration: "streak",
  },
  {
    unsplash: unsplash("PtabTe6iJ_8", "photo-1581079289196-67865ea83118"),
    pexels: pexels("459278"),
    illustration: "themes",
  },
];

const cardClassName =
  "relative flex aspect-video flex-col justify-end overflow-hidden rounded-card border border-border bg-surface bg-cover bg-center p-4";

function PhotoCard({ option, title }: { option: PhotoOption; title: string }) {
  return (
    <div
      className={cardClassName}
      style={{ backgroundImage: `url(${option.src})` }}
    >
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/75 to-background/20" />
      <p className="relative text-lg font-bold">{title}</p>
    </div>
  );
}

export default function ImageOptions() {
  return (
    <main className="py-10">
      <Container className="flex flex-col gap-10">
        {features.items.map((feature, index) => {
          const option = candidates[index];
          return (
            <section key={feature.title} className="flex flex-col gap-3">
              <h2 className="text-xl font-bold">
                {index + 1}. {feature.title}
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <PhotoCard option={option.unsplash} title={feature.title} />
                  <a
                    href={option.unsplash.page}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted underline hover:text-foreground"
                  >
                    {index + 1}A · Unsplash
                  </a>
                </div>
                <div className="flex flex-col gap-2">
                  <PhotoCard option={option.pexels} title={feature.title} />
                  <a
                    href={option.pexels.page}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted underline hover:text-foreground"
                  >
                    {index + 1}B · Pexels
                  </a>
                </div>
                <div className="flex flex-col gap-2">
                  <div className={cardClassName}>
                    <FeatureIllustration
                      name={option.illustration}
                      className="absolute top-2 right-2 h-[75%]"
                    />
                    <p className="relative text-lg font-bold">
                      {feature.title}
                    </p>
                  </div>
                  <span className="text-sm text-muted">
                    {index + 1}C · Illustration
                  </span>
                </div>
              </div>
            </section>
          );
        })}
      </Container>
    </main>
  );
}
