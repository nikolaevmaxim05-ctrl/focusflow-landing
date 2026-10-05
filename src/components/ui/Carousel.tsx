"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Children, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface CarouselProps {
  /** Accessible name of the carousel, e.g. "Features". */
  label: string;
  /** Seconds between automatic slides. */
  intervalSeconds: number;
  /** One background per slide, in the same order as the slides. */
  backgrounds: ReactNode[];
  /** One child per slide. */
  children: ReactNode;
}

const arrowClassName =
  "inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground hover:border-muted hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-hover";

/** How long the track must stay still before a copy is swapped for its original. */
const SETTLE_DELAY_MS = 120;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Position in the track. The track holds a copy of the last slide, then the
 * real slides, then a copy of the first one, so real slides sit at 1..count.
 */
function trackPosition(track: HTMLElement) {
  return Math.round(track.scrollLeft / track.clientWidth);
}

/** When a copy is in view, jumps without animation to the slide it copies. */
function leaveCopy(track: HTMLElement) {
  const count = track.children.length - 2;
  const position = trackPosition(track);

  if (position === 0) track.scrollLeft = count * track.clientWidth;
  if (position === count + 1) track.scrollLeft = track.clientWidth;
}

/** Scrolls one slide forward or back. */
function step(track: HTMLElement, direction: 1 | -1) {
  leaveCopy(track);
  track.scrollTo({
    left: (trackPosition(track) + direction) * track.clientWidth,
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}

/**
 * Endless slider with one slide in view. The slide content scrolls
 * horizontally while the background stays in place and cross-fades to the
 * picture of the current slide. Advances on its own and pauses while the
 * pointer or keyboard focus is inside it. Visitors who ask their system for
 * reduced motion get no automatic movement.
 */
export function Carousel({
  label,
  intervalSeconds,
  backgrounds,
  children,
}: CarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const settleTimer = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = Children.toArray(children);
  const count = slides.length;

  // Start on the first real slide, past the leading copy.
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (track) track.scrollLeft = track.clientWidth;
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion()) return;

    const timer = window.setInterval(() => {
      if (trackRef.current) step(trackRef.current, 1);
    }, intervalSeconds * 1000);
    return () => window.clearInterval(timer);
  }, [isPaused, intervalSeconds]);

  useEffect(() => () => window.clearTimeout(settleTimer.current), []);

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;

    setActiveIndex((trackPosition(track) - 1 + count) % count);
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(
      () => leaveCopy(track),
      SETTLE_DELAY_MS,
    );
  };

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
      <div className="relative">
        <div aria-hidden="true" className="soft-edges absolute inset-0">
          {backgrounds.map((background, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === activeIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              {background}
            </div>
          ))}
          <div className="absolute inset-0 bg-background/50" />
        </div>

        <ul
          ref={trackRef}
          onScroll={handleScroll}
          className="relative flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <li aria-hidden="true" className="w-full shrink-0 snap-center">
            {slides[count - 1]}
          </li>
          {slides.map((slide, index) => (
            <li
              key={index}
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}`}
              className="w-full shrink-0 snap-center"
            >
              {slide}
            </li>
          ))}
          <li aria-hidden="true" className="w-full shrink-0 snap-center">
            {slides[0]}
          </li>
        </ul>
      </div>

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
