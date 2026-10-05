import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";
import type { Testimonial } from "@/data/types";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

function Avatar({ person }: { person: Testimonial }) {
  if (person.photo) {
    return (
      <Image
        src={person.photo.src}
        alt={person.photo.alt}
        width={person.photo.width}
        height={person.photo.height}
        className="size-12 rounded-full object-cover"
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="flex size-12 items-center justify-center rounded-full bg-accent/15 text-sm font-bold text-accent"
    >
      {initials(person.name)}
    </span>
  );
}

export function Testimonials() {
  return (
    <Section id="testimonials" className="border-t border-border bg-surface">
      <SectionHeading intro={testimonials.intro} />
      <ul className="mx-auto mt-14 grid max-w-md gap-6 lg:max-w-none lg:grid-cols-3">
        {testimonials.items.map((person) => (
          <li key={person.name}>
            <figure className="flex h-full flex-col justify-between gap-8 rounded-card border border-border bg-background p-8">
              <blockquote className="text-lg text-foreground">
                <p>“{person.quote}”</p>
              </blockquote>
              <figcaption className="flex items-center gap-4">
                <Avatar person={person} />
                <span className="flex flex-col">
                  <span className="font-semibold">{person.name}</span>
                  <span className="text-sm text-muted">{person.role}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
