"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/** How much of the number (or of a grouped number) must be visible to start. */
const VISIBLE_THRESHOLD = 0.6;

/** Default time for the number to reach its final value, in ms. */
const DEFAULT_DURATION_MS = 1200;

/** Fast at first, slowing down towards the end. */
function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ------------------------------------------------------------------------- */
/* Group: several numbers that start together                                */
/* ------------------------------------------------------------------------- */

interface Group {
  /** Called once by every number in the group; returns an unregister function. */
  register: (element: Element) => () => void;
  started: boolean;
}

const GroupContext = createContext<Group | null>(null);

/**
 * Makes every CountUp inside start at the same moment: as soon as the first of
 * them scrolls into view, all of them run.
 */
export function CountUpGroup({ children }: { children: ReactNode }) {
  const [started, setStarted] = useState(false);
  // Created on the first registration: children run their effects before the
  // group does, so it cannot be created in an effect of the group itself.
  const observerRef = useRef<IntersectionObserver | null>(null);

  const register = useCallback((element: Element) => {
    observerRef.current ??= new IntersectionObserver(
      (entries, observer) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        setStarted(true);
      },
      { threshold: VISIBLE_THRESHOLD },
    );
    observerRef.current.observe(element);
    return () => observerRef.current?.unobserve(element);
  }, []);

  useEffect(
    () => () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    },
    [],
  );

  return (
    <GroupContext.Provider value={{ register, started }}>
      {children}
    </GroupContext.Provider>
  );
}

/* ------------------------------------------------------------------------- */
/* The number itself                                                         */
/* ------------------------------------------------------------------------- */

interface CountUpProps {
  /** Final value. */
  value: number;
  /**
   * Digits after the decimal point, kept constant while counting (0.00 → 2.99).
   * By default a whole number has none and a fractional one has two.
   */
  decimals?: number;
  durationMs?: number;
  className?: string;
}

function format(value: number, decimals: number) {
  return value.toFixed(decimals);
}

/**
 * Number that counts up from zero to its value the first time it scrolls into
 * view (or, inside a CountUpGroup, when the group starts). The final value
 * stays in the page for screen readers and reserves the width, so nothing
 * shifts while the digits change in an overlay on top of it. Visitors who ask
 * their system for reduced motion see the final value at once.
 */
export function CountUp({
  value,
  decimals = Number.isInteger(value) ? 0 : 2,
  durationMs = DEFAULT_DURATION_MS,
  className = "",
}: CountUpProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLSpanElement>(null);
  const group = useContext(GroupContext);
  const grouped = group !== null;
  const groupStarted = group?.started ?? false;
  const register = group?.register;
  const [played, setPlayed] = useState(false);

  // Inside a group, let the group watch this element.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !register) return;
    return register(root);
  }, [register]);

  // On its own, watch the element itself.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || grouped || played) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setPlayed(true);
      },
      { threshold: VISIBLE_THRESHOLD },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [grouped, played]);

  // Run the count once the start signal arrives.
  useEffect(() => {
    const label = labelRef.current;
    const overlay = overlayRef.current;
    if (!label || !overlay) return;
    if (!(grouped ? groupStarted : played)) return;
    if (reducedMotion()) return;

    let frame = 0;
    // Measured from the first animation frame, so the first value is exactly 0.
    let startedAt: number | null = null;
    label.style.opacity = "0";
    overlay.textContent = format(0, decimals);

    const finish = () => {
      window.cancelAnimationFrame(frame);
      overlay.textContent = "";
      label.style.opacity = "";
    };

    const tick = (now: number) => {
      startedAt ??= now;
      const progress = Math.min(Math.max((now - startedAt) / durationMs, 0), 1);
      if (progress >= 1) {
        finish();
        return;
      }
      overlay.textContent = format(value * easeOutCubic(progress), decimals);
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);

    return finish;
  }, [grouped, groupStarted, played, value, decimals, durationMs]);

  return (
    <span ref={rootRef} className={`relative inline-block ${className}`}>
      <span ref={labelRef}>{format(value, decimals)}</span>
      <span ref={overlayRef} aria-hidden="true" className="absolute inset-0" />
    </span>
  );
}
