import { Container } from "@/components/ui/Container";

// Temporary page: background candidates for the "Points and streaks" slide.
// Photos are hot-linked for preview only. Delete this folder once the choice is made.

const options = [
  {
    label: "5H · Unsplash",
    page: "https://unsplash.com/photos/4aqtdvN2-ho",
    src: "https://images.unsplash.com/photo-1785217454610-848426570f16?w=1200&q=70&auto=format&fit=crop",
  },
  {
    label: "5I · Pexels",
    page: "https://www.pexels.com/photo/1293269/",
    src: "https://images.pexels.com/photos/1293269/pexels-photo-1293269.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    label: "5J · Unsplash",
    page: "https://unsplash.com/photos/k_pBB5wJtaU",
    src: "https://images.unsplash.com/photo-1546443046-ed1ce6ffd1ab?w=1200&q=70&auto=format&fit=crop",
  },
  {
    label: "5K · Unsplash",
    page: "https://unsplash.com/photos/ZkRG8XYcHkg",
    src: "https://images.unsplash.com/photo-1763986365305-109ad3ddbf2b?w=1200&q=70&auto=format&fit=crop",
  },
];

export default function ImageOptions() {
  return (
    <main className="py-10">
      <Container className="flex flex-col gap-6">
        <h1 className="text-xl font-bold">5. Points and streaks</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {options.map((option) => (
            <div key={option.label} className="flex flex-col gap-2">
              <div
                className="relative flex aspect-video flex-col justify-end overflow-hidden rounded-card border border-border bg-surface bg-cover bg-center p-6"
                style={{ backgroundImage: `url(${option.src})` }}
              >
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/75 to-background/20" />
                <p className="relative text-2xl font-bold">
                  Points and streaks
                </p>
              </div>
              <a
                href={option.page}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted underline hover:text-foreground"
              >
                {option.label}
              </a>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
