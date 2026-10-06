"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { KeyboardEvent, PointerEvent, ReactNode } from "react";
import type { Feature } from "@/data/types";
import { StepNumber } from "./StepNumber";

/** A feature without its icon component, which cannot cross the server/client boundary. */
export type StoryItem = Omit<Feature, "icon">;

interface FeatureStoriesProps {
  items: StoryItem[];
  /** Rendered icon of every item, in the same order. */
  icons: ReactNode[];
  /** Seconds each step stays open before the next one. */
  stepSeconds: number;
  /** Gesture hint shown under the card on touch screens. */
  hint: string;
}

/** Time the leaving card takes to fade before the next one appears, in ms. */
const SWITCH_MS = 280;

/** Pointer contact shorter than this counts as a tap, longer as a hold. */
const TAP_MS = 250;

/** Delay of the first bullet plus the step between bullets, in ms. */
const BULLET_DELAY_MS = 200;
const BULLET_STEP_MS = 110;

/**
 * Longest stretch of time one animation frame may add to the progress, in ms.
 * Frames stop while the tab is hidden; without this cap the first frame after
 * coming back would add the whole absence and skip the step.
 */
const MAX_FRAME_MS = 100;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function stepNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

/**
 * Six features shown like a stories player: a column of tabs with progress
 * bars on the left (bars on top below the lg breakpoint) and one open card on
 * the right. The photo of the open step fills the whole section behind them.
 * Steps advance on their own while the block is on screen (starting the first
 * time it scrolls into view) and respond to clicks, taps and arrow keys. The
 * mouse never pauses them; on touch screens a long press does.
 *
 * The bars are not rendered from state: one effect owns their widths. Every
 * time the open step changes it writes all of them (passed steps full, the
 * open one at its elapsed share, the rest empty) and then moves only the open
 * bar, frame by frame. A generation counter lets a frame scheduled by an
 * earlier run of that effect recognise that it is stale and do nothing.
 */
export function FeatureStories({
  items,
  icons,
  stepSeconds,
  hint,
}: FeatureStoriesProps) {
  const [active, setActive] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isHeld, setIsHeld] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLElement | null)[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  /** Time the open step has been running, in ms. Survives re-renders; reset per step. */
  const elapsed = useRef(0);
  /** Bumped by every run of the progress effect, so a stale frame can tell it is stale. */
  const generation = useRef(0);
  /** Step that opens when the running switch ends; a choice made meanwhile replaces it. */
  const nextStep = useRef(0);
  const pressStart = useRef(0);
  /** Timer of the running switch, 0 while none runs. */
  const switchTimer = useRef(0);
  const count = items.length;
  const isStill = useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );

  // Icons draw themselves: every path needs a unit length for the dash animation.
  // The first card starts drawing once the block scrolls into view, and the
  // steps only advance while it stays there.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    root
      .querySelectorAll(".stories-icon svg *")
      .forEach((shape) => shape.setAttribute("pathLength", "1"));

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) setHasEntered(true);
      },
      { threshold: 0.3 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  /**
   * Opens a step: the current card leaves, then the chosen one appears. A
   * choice made while a switch is running is not dropped: it replaces the
   * target of that switch, so the step chosen last is the one that opens.
   */
  const goTo = useCallback(
    (index: number) => {
      if (isStill) {
        // A switch started before motion got reduced must not open its step later.
        window.clearTimeout(switchTimer.current);
        switchTimer.current = 0;
        setIsLeaving(false);
        setActive(index);
        return;
      }
      nextStep.current = index;
      if (switchTimer.current || index === active) return;

      setIsLeaving(true);
      switchTimer.current = window.setTimeout(() => {
        switchTimer.current = 0;
        setActive(nextStep.current);
        setIsLeaving(false);
      }, SWITCH_MS);
    },
    [active, isStill],
  );

  /** Moves by a number of steps from the open one, or from the one about to open. */
  const goBy = (delta: number) => {
    const base = switchTimer.current ? nextStep.current : active;
    goTo((base + delta + count) % count);
  };

  // A new step starts its bar from zero. Declared before the progress effect,
  // so the reset is already done when the bars are painted.
  useEffect(() => {
    elapsed.current = 0;
  }, [active]);

  // Progress of the open step. First every bar gets the width that belongs to
  // the current step. Then, while the block is on screen and nothing pauses
  // it, the open bar fills over stepSeconds and the next step opens. A hold or
  // a running switch stops the loop; restarting it (on any of the
  // dependencies) continues from the stored elapsed time.
  useEffect(() => {
    const run = ++generation.current;
    const bars = barRefs.current;
    const stepMs = stepSeconds * 1000;
    const shareNow = () => Math.min(elapsed.current / stepMs, 1);

    const share = shareNow();
    bars.forEach((bar, index) => {
      if (!bar) return;
      bar.style.width =
        index < active ? "100%" : index === active ? `${share * 100}%` : "0%";
    });

    if (isStill || !hasEntered || !isInView || isHeld || isLeaving) return;

    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      if (run !== generation.current) return;

      if (!document.hidden) {
        elapsed.current += Math.min(now - last, MAX_FRAME_MS);
      }
      last = now;

      const share = shareNow();
      const bar = bars[active];
      if (bar) bar.style.width = `${share * 100}%`;

      if (share >= 1) {
        goTo((active + 1) % count);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [
    active,
    isStill,
    hasEntered,
    isInView,
    isHeld,
    isLeaving,
    stepSeconds,
    count,
    goTo,
  ]);

  useEffect(() => () => window.clearTimeout(switchTimer.current), []);

  const handleTabKey = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const targets: Record<string, number> = {
      ArrowDown: (index + 1) % count,
      ArrowRight: (index + 1) % count,
      ArrowUp: (index - 1 + count) % count,
      ArrowLeft: (index - 1 + count) % count,
      Home: 0,
      End: count - 1,
    };
    const target = targets[event.key];
    if (target === undefined) return;

    event.preventDefault();
    tabRefs.current[target]?.focus();
    goTo(target);
  };

  // Touch: a short tap on the right half goes forward, on the left half back; a hold pauses.
  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    pressStart.current = performance.now();
    setIsHeld(true);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    setIsHeld(false);
    if (performance.now() - pressStart.current > TAP_MS) return;

    const box = event.currentTarget.getBoundingClientRect();
    const isRightHalf = event.clientX - box.left > box.width / 2;
    goBy(isRightHalf ? 1 : -1);
  };

  return (
    <>
      {/* Photo of the open step behind the whole section, fading out at the edges. */}
      <div
        aria-hidden="true"
        className="soft-edges pointer-events-none absolute inset-0 -z-10"
      >
        {items.map((item, index) => (
          <Image
            key={item.title}
            src={item.image.src}
            alt=""
            fill
            sizes="100vw"
            className={`object-cover ${isStill ? "" : "transition-opacity duration-700"} ${
              index === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-x-0 top-0 h-56 bg-linear-to-b from-background to-transparent" />
      </div>
      {/* Fades the photo into the colour of the next section; sits outside the edge mask
          and reaches 1px past the section so a fractional pixel row cannot show the page colour. */}
      <div
        aria-hidden="true"
        className="seam-fade pointer-events-none absolute inset-x-0 -bottom-px -z-10"
      />

      <div className="w-full px-5 md:px-8">
        <div
          ref={rootRef}
          className={`stories relative grid gap-3 lg:grid-cols-[420px_minmax(0,1fr)] lg:gap-5 ${
            isStill ? "is-still" : ""
          }`}
        >
          <div
            role="tablist"
            aria-orientation="vertical"
            className="grid auto-cols-fr grid-flow-col gap-1.5 lg:auto-cols-auto lg:grid-flow-row lg:content-start lg:gap-2.5"
          >
            {items.map((item, index) => {
              const isActive = index === active;

              return (
                <button
                  key={item.title}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`feature-tab-${index}`}
                  aria-selected={isActive}
                  aria-controls={`feature-panel-${index}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => goTo(index)}
                  onKeyDown={(event) => handleTabKey(event, index)}
                  className={`group grid min-w-0 cursor-pointer gap-y-1.5 text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent max-lg:-mx-[3px] max-lg:-my-2.5 max-lg:px-[3px] max-lg:py-2.5 max-lg:focus-visible:outline-offset-0 lg:grid-cols-[44px_1fr] lg:gap-y-3 lg:rounded-[18px] lg:border lg:px-[22px] lg:py-5 ${
                    isActive
                      ? "lg:border-accent/40 lg:bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-accent)_7%,transparent),transparent_70%),var(--color-surface)]"
                      : "lg:border-border lg:bg-surface"
                  }`}
                >
                  {/* Below lg the padding + matching negative margin enlarge the touch target to
                      44px+ without moving the bar or the number; neighbours meet at the 6px gap. */}
                  {/* Progress bar: first in the DOM on small screens (stories bars), last on desktop. */}
                  <span
                    aria-hidden="true"
                    className="order-1 block h-[3px] overflow-hidden rounded-sm bg-white/14 lg:order-3 lg:col-span-2 lg:h-0.5 lg:bg-white/8"
                  >
                    <b
                      ref={(node) => {
                        barRefs.current[index] = node;
                      }}
                      className="block h-full w-0 bg-accent"
                    />
                  </span>
                  <span
                    className={`order-2 text-[11px] tracking-[0.12em] tabular-nums transition-colors duration-300 lg:order-1 lg:pt-1 lg:text-xs ${
                      isActive ? "text-accent" : "text-muted"
                    }`}
                  >
                    {stepNumber(index)}
                  </span>
                  <span
                    className={`sr-only order-3 min-w-0 text-lg font-extrabold transition-colors duration-300 lg:not-sr-only lg:order-2 lg:[overflow-wrap:anywhere] ${
                      isActive ? "text-foreground" : "text-muted"
                    }`}
                  >
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3">
            <div
              className={`relative grid overflow-hidden rounded-[22px] border transition-colors duration-300 bg-background/40 ${isHeld ? "border-white/20" : "border-border"}`}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={() => setIsHeld(false)}
            >
              {items.map((item, index) => {
                const isActive = index === active;
                const isShown = isActive && hasEntered && !isLeaving;

                return (
                  <article
                    key={item.title}
                    id={`feature-panel-${index}`}
                    role="tabpanel"
                    aria-labelledby={`feature-tab-${index}`}
                    className={`stories-card relative col-start-1 row-start-1 min-h-[430px] px-5 pt-6 pb-[26px] lg:px-11 lg:py-10 ${
                      isShown ? "is-show" : ""
                    } ${isActive && isLeaving ? "is-out" : ""}`}
                    style={isActive ? undefined : { visibility: "hidden" }}
                  >
                    <StepNumber
                      value={stepNumber(index)}
                      className="stories-number"
                    />
                    <span
                      aria-hidden="true"
                      className="stories-icon mb-5 block size-12 text-accent lg:mb-[26px] lg:size-[72px]"
                    >
                      {icons[index]}
                    </span>
                    <h3 className="max-w-[80%] text-[32px] leading-[1.33] font-extrabold tracking-tight lg:text-[44px]">
                      {item.title}
                    </h3>
                    <ul className="mt-7 flex flex-col gap-3.5">
                      {item.bullets.map((bullet, bulletIndex) => (
                        <li
                          key={bullet}
                          style={{
                            transitionDelay: isShown
                              ? `${BULLET_DELAY_MS + BULLET_STEP_MS * bulletIndex}ms`
                              : "0ms",
                          }}
                          className="flex items-start gap-3 text-lg leading-[1.45] text-foreground/85 lg:text-xl"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[10.5px] size-[5px] shrink-0 rounded-full bg-accent lg:mt-3"
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>

            <p className="text-center text-[11px] text-muted lg:hidden">
              {hint}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
