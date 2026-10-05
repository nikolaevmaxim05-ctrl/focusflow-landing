"use client";

import { useEffect, useState } from "react";
import type { NavItem } from "@/data/types";

interface NavLinksProps {
  items: NavItem[];
}

/** Soft accent glow of the current link; the hover state repeats it. */
const activeClassName =
  "text-accent [text-shadow:0_0_14px_rgb(45_212_191/0.7)]";
const hoverClassName =
  "hover:text-accent hover:[text-shadow:0_0_14px_rgb(45_212_191/0.7)]";

/**
 * Header links. A link lights up on hover, and the link of the section that
 * is currently on screen stays lit.
 */
export function NavLinks({ items }: NavLinksProps) {
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.querySelector(item.href))
      .filter((section) => section !== null);

    // A section counts as current while it crosses a thin band in the upper half of the screen.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const href = `#${entry.target.id}`;
          if (entry.isIntersecting) setActiveHref(href);
          else setActiveHref((current) => (current === href ? null : current));
        });
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [items]);

  return (
    <ul className="flex items-center gap-8">
      {items.map((item) => {
        const isActive = item.href === activeHref;

        return (
          <li key={item.href}>
            <a
              href={item.href}
              aria-current={isActive ? "true" : undefined}
              className={`rounded-control text-sm font-medium transition-all duration-300 ${hoverClassName} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-hover ${
                isActive ? activeClassName : "text-muted"
              }`}
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
