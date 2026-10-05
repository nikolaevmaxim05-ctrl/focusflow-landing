"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Children, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface CarouselProps {
  /** Accessible name of the carousel, e.g. "Features". */
  label: string;
  /** Seconds between automatic slides. */
  intervalSeconds: number;
  /** One child per slide. */
  children: ReactNode;
}

const arrowClassName =
  "inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground hover:border-muted hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-hover";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Index of the slide closest to the center of the track. */
function centeredSlideIndex(track: HTMLElement) {
  const center = track.scrollLeft + track.clientWidth / 2;
  let closest = 0;
  let closestDistance = Infinity;

  Array.from(track.children).forEach((child, index) => {
    const slide = child as HTMLElement;
    const distance = Math.abs(
      slide.offsetLeft + slide.clientWidth / 2 - center,
    );
    if (distance < closestDistance) {
      closest = index;
      closestDistance = distance;
    }
  });
  return closest;
}

/** Scrolls the track by one slide, wrapping around at both ends. */
function step(track: HTMLElement, direction: 1 | -1) {
  const count = track.children.length;
  const index = (centeredSlideIndex(track) + direction + count) % count;
  const slide = track.children[index] as HTMLElement;

  track.scrollTo({
    left: slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2,
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}

/**
 * Horizontal slider showing one large slide at a time. Advances on its own
 * and pauses while the pointer or keyboard focus is inside it. Visitors who
 * ask their system for reduced motion get no automatic movement.
 */
export function Carousel({ label, intervalSeconds, children }: CarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const slides = Children.toArray(children);

  useEffect(() => {
    if (isPaused || prefersReducedMotion()) return;

    const timer = window.setInterval(() => {
      if (trackRef.current) step(trackRef.current, 1);
    }, intervalSeconds * 1000);
    return () => window.clearInterval(timer);
  }, [isPaused, intervalSeconds]);

  const handleArrow = (direction: 1 | -1) => {
    if (trackRef.current) step(trackRef.current, direction);
  };

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <ul
        ref={trackRef}
        className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto px-[6%] [scrollbar-width:none] md:gap-6 md:px-[15%] lg:px-[20%] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, index) => (
          <li
            key={index}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
            className="w-full shrink-0 snap-center"
          >
            {slide}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => handleArrow(-1)}
          className={arrowClassName}
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => handleArrow(1)}
          className={arrowClassName}
        >
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
      </div>
    </div>
  );
}
