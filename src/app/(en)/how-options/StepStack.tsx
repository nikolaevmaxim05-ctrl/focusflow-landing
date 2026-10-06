"use client";

// Temporary prototype of the sticky "one step at a time" How it works block.
// Variants are driven by props so the options page can render them side by side.

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Step } from "@/data/types";

export type Motion = "a" | "b" | "c";
/**
 * small — the current 2xl accent number;
 * outline — hairline outline (reference look, 1.5px);
 * glow — thicker outline with a soft accent glow and a faint fill;
 * cutout — filled with the surface colour, accent rim (solid "cut" into the photo);
 * solid — filled with the accent colour.
 */
export type NumberStyle = "small" | "outline" | "glow" | "cutout" | "solid";

interface StepStackProps {
  title: string;
  steps: Step[];
  motion: Motion;
  numberStyle: NumberStyle;
  /** Scroll length per step as a share of the viewport height (1 = 100vh). */
  stepLength: number;
}

/** Share of a step's scroll length spent on the hand-over between steps. */
const TRANSITION = 0.4;
/** Horizontal travel of a card during the hand-over, in px. */
const SHIFT = 120;
/** Space kept under the sticky header, in px (matches scroll-padding-top). */
const HEADER = 80;

const lanes = ["md:justify-start", "md:justify-center", "md:justify-end"];

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));
const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

type CardState =
  | { kind: "hidden" }
  | { kind: "enter"; e: number }
  | { kind: "exit"; e: number };

function cardStyle(motion: Motion, state: CardState) {
  if (state.kind === "hidden") {
    return { opacity: "0", transform: "", filter: "", visibility: "hidden" };
  }
  const { e } = state;
  const entering = state.kind === "enter";
  const visible = entering ? e : 1 - e;
  let transform = "";
  let filter = "";
  if (motion === "a") {
    transform = entering
      ? `translateY(${(1 - e) * 60}px)`
      : `scale(${1 - 0.04 * e})`;
    filter = entering ? "" : `brightness(${1 - 0.28 * e})`;
  } else if (motion === "c") {
    transform = entering
      ? `translateX(${-(1 - e) * SHIFT}px)`
      : `translateX(${e * SHIFT}px)`;
  }
  return {
    opacity: String(visible),
    transform,
    filter,
    visibility: visible > 0 ? "visible" : "hidden",
  };
}

/**
 * SVG filters that draw the big number. A plain -webkit-text-stroke shows the
 * overlapping contours of the variable font as lines inside the glyphs; eroding
 * the filled glyph and subtracting it gives a clean outline instead.
 */
function NumberFilters() {
  return (
    <svg width="0" height="0" aria-hidden="true" className="absolute">
      <defs>
        <filter id="num-outline" x="-20%" y="-20%" width="140%" height="140%">
          <feMorphology in="SourceAlpha" operator="erode" radius="1.5" result="inner" />
          <feComposite in="SourceGraphic" in2="inner" operator="out" />
        </filter>
        <filter id="num-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feMorphology in="SourceAlpha" operator="erode" radius="2.5" result="inner" />
          <feComposite in="SourceGraphic" in2="inner" operator="out" result="ring" />
          <feGaussianBlur in="ring" stdDeviation="6" result="blur" />
          <feComponentTransfer in="SourceGraphic" result="faint">
            <feFuncA type="linear" slope="0.1" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="faint" />
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="ring" />
          </feMerge>
        </filter>
        <filter id="num-cutout" x="-20%" y="-20%" width="140%" height="140%">
          <feMorphology in="SourceAlpha" operator="erode" radius="2.5" result="inner" />
          <feFlood floodColor="var(--color-surface)" result="surface" />
          <feComposite in="surface" in2="inner" operator="in" result="innerFill" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="innerFill" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

const numberFilter: Partial<Record<NumberStyle, string>> = {
  outline: "url(#num-outline)",
  glow: "url(#num-glow)",
  cutout: "url(#num-cutout)",
};

function StepNumber({ index, style }: { index: number; style: NumberStyle }) {
  const label = String(index + 1).padStart(2, "0");
  if (style === "small") {
    return (
      <span
        aria-hidden="true"
        className="text-2xl font-extrabold text-accent tabular-nums"
      >
        {label}
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`step-number step-number--${style} -mt-[0.42em] block text-[clamp(96px,40cqw,180px)] leading-none font-extrabold tracking-tight tabular-nums select-none`}
    >
      <svg className="block overflow-visible" style={{ width: "1.3em", height: "0.74em" }}>
        <text
          x="0"
          y="0.72em"
          fontSize="1em"
          fill="currentColor"
          filter={numberFilter[style]}
        >
          {label}
        </text>
      </svg>
    </span>
  );
}

export function StepStack({
  title,
  steps,
  motion,
  numberStyle,
  stepLength,
}: StepStackProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const n = steps.length;
    let frame = 0;
    let running = false;

    const update = () => {
      const rect = wrapper.getBoundingClientRect();
      const stickyHeight = window.innerHeight - HEADER;
      const scrollable = Math.max(1, rect.height - stickyHeight);
      const p = clamp((HEADER - rect.top) / scrollable, 0, 1);
      const x = p * n;
      const active = Math.min(Math.floor(x), n - 1);
      const u = x - active;
      const e = active === 0 ? 1 : ease(clamp(u / TRANSITION, 0, 1));

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        let state: CardState = { kind: "hidden" };
        if (i === active) state = { kind: "enter", e };
        else if (i === active - 1 && e < 1) state = { kind: "exit", e };
        const style = cardStyle(motion, state);
        card.style.opacity = style.opacity;
        card.style.transform = style.transform;
        card.style.filter = style.filter;
        card.style.visibility = style.visibility;
        card.setAttribute("aria-hidden", String(i !== active));
        card.toggleAttribute("data-current", i === active);
      });
    };

    const loop = () => {
      update();
      if (running) frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const observer = new IntersectionObserver(([entry]) =>
      entry.isIntersecting ? start() : stop(),
    );
    observer.observe(wrapper);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    update();

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [steps.length, motion]);

  return (
    <div
      id="how-it-works"
      ref={wrapperRef}
      className="border-y border-border bg-surface"
      style={{
        height: `calc(${steps.length * stepLength * 100}vh + 100vh - ${HEADER}px)`,
      }}
    >
      <div
        className="sticky flex flex-col overflow-hidden"
        style={{ top: HEADER, height: `calc(100vh - ${HEADER}px)` }}
      >
        <NumberFilters />
        <div className="mx-auto w-full max-w-content px-5 pt-8 pb-6 md:px-8 md:pt-12">
          <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-balance md:text-4xl">
            {title}
          </h2>
        </div>
        <ol className="relative mx-auto w-full max-w-content flex-1 px-5 pb-6 md:px-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`pointer-events-none absolute inset-x-5 top-0 bottom-6 flex items-center justify-center md:inset-x-8 ${lanes[index]}`}
            >
              <li
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="@container pointer-events-auto flex max-w-full flex-col gap-5"
                style={{
                  // Fits the card to the viewport height: the 4:3 photo plus the
                  // text block must stay under the heading; 27rem covers header,
                  // heading and text, the rest scales the photo.
                  width: "clamp(14rem, (100vh - 27rem) * 4 / 3, 28rem)",
                  transformOrigin: "50% 0",
                  willChange: "transform, opacity",
                }}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-border">
                  <Image
                    src={step.image.src}
                    alt={step.image.alt}
                    fill
                    sizes="(min-width: 768px) 28rem, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative flex flex-col gap-3">
                  <StepNumber index={index} style={numberStyle} />
                  <h3 className="text-3xl font-bold tracking-tight md:text-4xl">
                    {step.title}
                  </h3>
                  <p className="text-lg text-muted">{step.description}</p>
                </div>
              </li>
            </div>
          ))}
        </ol>
      </div>
    </div>
  );
}
