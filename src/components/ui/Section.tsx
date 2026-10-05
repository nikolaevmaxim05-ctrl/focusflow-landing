import type { ReactNode } from "react";
import { Container } from "./Container";

interface SectionProps {
  /** Anchor id used by the header navigation. */
  id: string;
  children: ReactNode;
  className?: string;
}

/** Page section with the shared vertical rhythm. */
export function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
