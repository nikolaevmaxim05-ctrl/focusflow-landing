import { Header } from "@/components/sections/Header";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

// Temporary design-token preview. Replaced by the real sections one by one.
const swatches = [
  { name: "background", className: "bg-background" },
  { name: "surface", className: "bg-surface" },
  { name: "surface-raised", className: "bg-surface-raised" },
  { name: "border", className: "bg-border" },
  { name: "foreground", className: "bg-foreground" },
  { name: "muted", className: "bg-muted" },
  { name: "subtle", className: "bg-subtle" },
  { name: "accent", className: "bg-accent" },
  { name: "accent-hover", className: "bg-accent-hover" },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="py-12">
        <Container className="flex flex-col gap-12">
          <section className="flex flex-col gap-4">
            <p className="text-sm text-subtle">Colors</p>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {swatches.map((swatch) => (
                <li key={swatch.name} className="flex flex-col gap-2">
                  <div
                    className={`h-16 rounded-card border border-border ${swatch.className}`}
                  />
                  <span className="text-sm text-muted">{swatch.name}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-4">
            <p className="text-sm text-subtle">Typography — Manrope</p>
            <p className="text-4xl font-extrabold tracking-tight md:text-6xl">
              Heading 1 / 800
            </p>
            <p className="text-3xl font-bold tracking-tight md:text-4xl">
              Heading 2 / 700
            </p>
            <p className="text-xl font-semibold">Heading 3 / 600</p>
            <p className="max-w-xl text-lg text-muted">
              Lead text / 400, muted. 0123456789
            </p>
            <p className="max-w-xl text-base text-muted">
              Body text / 400, muted. 0123456789
            </p>
            <p className="text-sm text-subtle">Small text / 400, subtle.</p>
          </section>

          <section className="flex flex-col gap-4">
            <p className="text-sm text-subtle">Buttons and card</p>
            <div className="flex flex-wrap items-center gap-4">
              <ButtonLink href="#" size="lg">
                Primary lg
              </ButtonLink>
              <ButtonLink href="#">Primary md</ButtonLink>
              <ButtonLink href="#" variant="secondary" size="lg">
                Secondary lg
              </ButtonLink>
              <ButtonLink href="#" variant="secondary">
                Secondary md
              </ButtonLink>
            </div>
            <div className="max-w-sm rounded-card border border-border bg-surface p-6">
              <p className="text-xl font-semibold">Card</p>
              <p className="mt-2 text-muted">surface + border + radius-card</p>
            </div>
          </section>
        </Container>
      </main>
    </>
  );
}
