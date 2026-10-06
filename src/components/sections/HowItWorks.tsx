"use client";

import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";
import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { HowItWorksContent, Step } from "@/data/types";

interface HowItWorksProps {
  howItWorks: HowItWorksContent;
}

/** Scroll length per step as a share of the viewport height. */
const STEP_LENGTH = 0.7;
/** Share of a step's scroll length spent on the hand-over of the highlight. */
const TRANSITION = 0.4;
/**
 * Visitors who ask for reduced motion, and screens too short for the sticky
 * block, get the static staircase instead of the scroll-driven highlight.
 */
const STATIC_QUERY = "(prefers-reduced-motion: reduce), (max-height: 639px)";
/** From here up the steps stand in a row; below they form a list. */
const ROW_QUERY = "(min-width: 768px)";

const staircase = ["md:mr-auto", "md:mx-auto md:mt-24", "md:ml-auto md:mt-24"];

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function useMediaQuery(query: string, serverValue: boolean) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

/**
 * Draws the big step number as an outline with a soft glow. A plain
 * -webkit-text-stroke would show the overlapping contours of the variable
 * font as lines inside the glyphs; eroding the filled glyph and subtracting
 * it gives a clean ring instead.
 */
function NumberGlowFilter() {
  return (
    <svg width="0" height="0" aria-hidden="true" className="absolute">
      <defs>
        <filter id="step-number-glow" x="-20%" y="-20%" width="140%" height="140%">
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
      </defs>
    </svg>
  );
}

/** Outlined step number; its colour follows --w (see .step-number in globals.css). */
function StepNumber({ index, className = "" }: { index: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`step-number block leading-none font-extrabold tracking-tight tabular-nums select-none ${className}`}
    >
      <svg className="block overflow-visible" style={{ width: "1.3em", height: "0.74em" }}>
        <text x="0" y="0.72em" fontSize="1em" fill="currentColor" filter="url(#step-number-glow)">
          {String(index + 1).padStart(2, "0")}
        </text>
      </svg>
    </span>
  );
}

function StepPhoto({ step, sizes }: { step: Step; sizes: string }) {
  return (
    <div className="step-photo relative aspect-[4/3] overflow-hidden rounded-card border">
      <Image src={step.image.src} alt={step.image.alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

/** Photo above, big number biting into its bottom edge, then title and text. */
function StepCard({ step, index }: { step: Step; index: number }) {
  return (
    <>
      <StepPhoto step={step} sizes="(min-width: 768px) 28rem, 100vw" />
      {/* relative: keeps the number above the absolutely positioned photo. */}
      <div className="relative flex flex-col gap-2">
        <StepNumber index={index} className="-mt-[0.42em] text-[clamp(72px,40cqw,180px)]" />
        <h3 className="text-2xl font-bold tracking-tight @[18rem]:text-3xl @[22rem]:text-4xl">
          {step.title}
        </h3>
        <p className="text-base text-muted @[18rem]:text-lg">{step.description}</p>
      </div>
    </>
  );
}

/**
 * The section sticks under the header while the page scrolls 70vh per step.
 * All steps stay visible; the highlight (full opacity, bright photo with an
 * accent rim and glow, accent number, a slight lift) moves from one to the
 * next with the scroll. Progress comes from the wrapper's position in a
 * requestAnimationFrame loop that only runs while the section is on screen;
 * the native scroll (and Lenis on top of it) is left alone.
 */
export function HowItWorks({ howItWorks }: HowItWorksProps) {
  const isStatic = useMediaQuery(STATIC_QUERY, false);
  const isRow = useMediaQuery(ROW_QUERY, true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const stepCount = howItWorks.steps.length;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    if (isStatic || !wrapper || !sticky) return;

    const update = () => {
      const scrollable = Math.max(1, wrapper.offsetHeight - sticky.offsetHeight);
      const progress = clamp(
        (sticky.getBoundingClientRect().top - wrapper.getBoundingClientRect().top) / scrollable,
        0,
        1,
      );
      const position = progress * stepCount;
      const active = Math.min(Math.floor(position), stepCount - 1);
      // Hand-over progress of the highlight: 0 = just arriving, 1 = settled.
      const t =
        active === 0 ? 1 : easeInOut(clamp((position - active) / TRANSITION, 0, 1));

      wrapper.querySelectorAll<HTMLElement>("[data-step]").forEach((card) => {
        const index = Number(card.dataset.step);
        const weight = index === active ? t : index === active - 1 ? 1 - t : 0;
        card.style.setProperty("--w", weight.toFixed(4));
        card.toggleAttribute("data-current", index === active);
      });
    };

    let frame = 0;
    let running = false;
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
  }, [isStatic, isRow, stepCount]);

  if (isStatic) {
    return (
      <Section id="how-it-works" className="step-block overflow-hidden border-y border-border bg-surface">
        <NumberGlowFilter />
        <SectionHeading intro={howItWorks.intro} />
        <ol className="mt-16 flex flex-col gap-16 md:gap-0">
          {howItWorks.steps.map((step, index) => (
            <li
              key={step.title}
              className={`step-card @container flex w-full flex-col gap-5 md:w-[24rem] lg:w-[28rem] ${staircase[index]}`}
              style={{ "--w": 1 } as CSSProperties}
            >
              <StepCard step={step} index={index} />
            </li>
          ))}
        </ol>
      </Section>
    );
  }

  return (
    <div
      id="how-it-works"
      ref={wrapperRef}
      className="step-block border-y border-border bg-surface"
      style={{ height: `calc(${stepCount * STEP_LENGTH * 100}vh + 100svh - 5rem)` }}
    >
      <div
        ref={stickyRef}
        className="sticky top-20 flex flex-col overflow-hidden"
        style={{ height: "calc(100svh - 5rem)" }}
      >
        <NumberGlowFilter />
        <Container className="pt-6 pb-4 md:pt-12 md:pb-6">
          <SectionHeading intro={howItWorks.intro} />
        </Container>

        {isRow ? (
          <div className="mx-auto flex w-full max-w-[88rem] min-h-0 flex-1 items-center px-8 pb-6">
            <ol
              className="step-row mx-auto grid w-full grid-cols-3 gap-8"
              style={{
                // Shrinks the row on short screens so photo, text and staircase fit.
                maxWidth: "calc(3 * (100svh - var(--step-fixed)) * 4 / 3 + 4rem)",
              }}
            >
              {howItWorks.steps.map((step, index) => (
                <li
                  key={step.title}
                  data-step={index}
                  data-current={index === 0 ? "" : undefined}
                  className="step-card @container flex flex-col gap-4"
                  style={{ marginTop: `calc(${index} * var(--step-stair))` }}
                >
                  <StepCard step={step} index={index} />
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <ol className="mx-auto flex w-full max-w-content min-h-0 flex-1 flex-col justify-center gap-3 px-5 pb-6">
            {howItWorks.steps.map((step, index) => (
              <li
                key={step.title}
                data-step={index}
                data-current={index === 0 ? "" : undefined}
                className="step-card @container flex flex-col rounded-card border border-border bg-background/40 p-4"
                style={{ "--w": index === 0 ? 1 : 0 } as CSSProperties}
              >
                <div className="step-list-photo overflow-hidden">
                  <StepPhoto step={step} sizes="100vw" />
                </div>
                <div className="flex items-center gap-4">
                  <StepNumber index={index} className="shrink-0 text-[56px]" />
                  <h3 className="text-xl font-bold tracking-tight">{step.title}</h3>
                </div>
                <p className="step-list-text text-base text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
