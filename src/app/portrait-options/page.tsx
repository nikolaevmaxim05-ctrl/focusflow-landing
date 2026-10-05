import { Container } from "@/components/ui/Container";
import { testimonials } from "@/data/testimonials";

// Temporary page: stock portrait candidates for the testimonials.
// Photos are hot-linked for preview only. Delete this folder once the choice is made.

interface Portrait {
  label: string;
  page: string;
  src: string;
}

const unsplash = (
  label: string,
  pageId: string,
  photoId: string,
): Portrait => ({
  label,
  page: `https://unsplash.com/photos/${pageId}`,
  src: `https://images.unsplash.com/${photoId}?w=400&h=400&q=70&auto=format&fit=crop&crop=faces`,
});

const candidates: Portrait[][] = [
  [
    unsplash("1A", "QXevDflbl8A", "photo-1544005313-94ddf0286df2"),
    unsplash("1B", "93BsHRWB1yQ", "photo-1552699611-e2c208d5d9cf"),
    unsplash("1C", "AfcSlj6c0pU", "photo-1708098746991-ad0a97313727"),
  ],
  [
    unsplash("2A", "DItYlc26zVI", "photo-1568602471122-7832951cc4c5"),
    unsplash("2B", "2EGNqazbAMk", "photo-1522529599102-193c0d76b5b6"),
    unsplash("2C", "rifCUO-4X8k", "photo-1757744705465-ea08b0ddc38a"),
  ],
  [
    unsplash("3A", "XbEWASqbaVo", "photo-1628477116196-48afe0d209e0"),
    unsplash("3B", "C7m7RSFONYc", "photo-1463335361701-e90f4c5045d0"),
    unsplash("3C", "YhMFYJZgMA0", "photo-1674932668403-33398b81c92f"),
  ],
];

export default function PortraitOptions() {
  return (
    <main className="py-10">
      <Container className="flex flex-col gap-10">
        {testimonials.items.map((person, index) => (
          <section key={person.name} className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">
              {index + 1}. {person.name}, {person.role}
            </h2>
            <div className="flex flex-wrap gap-8">
              {candidates[index].map((portrait) => (
                <div key={portrait.label} className="flex flex-col gap-2">
                  <div
                    className="size-40 rounded-full border border-border bg-surface bg-cover bg-center"
                    style={{ backgroundImage: `url(${portrait.src})` }}
                  />
                  <a
                    href={portrait.page}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center text-sm text-muted underline hover:text-foreground"
                  >
                    {portrait.label} · Unsplash
                  </a>
                </div>
              ))}
            </div>
          </section>
        ))}
      </Container>
    </main>
  );
}
