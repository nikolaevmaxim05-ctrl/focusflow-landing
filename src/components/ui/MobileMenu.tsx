"use client";

import { useEffect, useState } from "react";
import type { CallToAction, NavItem } from "@/data/types";
import { ButtonLink } from "./ButtonLink";
import { Container } from "./Container";

interface MobileMenuProps {
  nav: NavItem[];
  cta: CallToAction;
}

const MENU_ID = "mobile-menu";

/** Burger button and the dropdown panel it toggles. Shown below the md breakpoint. */
export function MobileMenu({ nav, cta }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={MENU_ID}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen((open) => !open)}
        className="-mr-2 inline-flex size-10 items-center justify-center rounded-control text-foreground hover:bg-surface focus-visible:outline-2 focus-visible:outline-accent-hover"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          {isOpen ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div
          id={MENU_ID}
          className="absolute inset-x-0 top-full border-b border-border bg-background"
        >
          <Container className="flex flex-col gap-4 py-4">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={close}
                    className="block rounded-control py-3 text-base font-medium text-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent-hover"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <ButtonLink href={cta.href} size="lg" external>
              {cta.label}
            </ButtonLink>
          </Container>
        </div>
      )}
    </div>
  );
}
