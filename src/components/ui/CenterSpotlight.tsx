"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface CenterSpotlightProps {
  children: ReactNode;
  /** Which elements inside take the highlight. */
  itemSelector: string;
  /** Class put on every other item while one is highlighted. */
  dimmedClass?: string;
  className?: string;
}

/** Class put on the item nearest the middle of the screen. */
const CENTERED_CLASS = "is-centered";

/** Below this width the cards stand in one column. */
const SINGLE_COLUMN_QUERY = "(max-width: 1023.98px)";

/** Screens where there is no mouse to hover with. */
const NO_HOVER_QUERY = "(hover: none)";

/** An item counts only while its centre is within this share of the screen height from the middle. */
const REACH = 0.5;

/** A new item takes over only when it is closer to the middle by this share of the screen height. */
const HYSTERESIS = 0.08;

/**
 * On touch screens, where there is nothing to hover with, marks the item whose
 * centre is nearest the middle of the screen with "is-centered" while the user
 * scrolls, so the CSS can show it the hover state, and every other item with
 * `dimmedClass`. Only one item is marked at a time, none when every item is
 * far from the middle or the whole group is off screen. A small hysteresis
 * keeps the mark from flickering between two items at the hand-over point.
 * Does nothing on screens with a mouse or wide enough for the items to sit
 * side by side.
 */
export function CenterSpotlight({
  children,
  itemSelector,
  dimmedClass,
  className = "",
}: CenterSpotlightProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const singleColumn = window.matchMedia(SINGLE_COLUMN_QUERY);
    const noHover = window.matchMedia(NO_HOVER_QUERY);

    let frame = 0;
    let inView = false;
    let active: HTMLElement | null = null;
    let observer: IntersectionObserver | null = null;

    const items = () =>
      Array.from(root.querySelectorAll<HTMLElement>(itemSelector));

    /** Writes the classes only when the highlighted item changes. */
    const setActive = (next: HTMLElement | null) => {
      if (next === active) return;
      active = next;
      for (const item of items()) {
        item.classList.toggle(CENTERED_CLASS, item === next);
        if (dimmedClass) {
          item.classList.toggle(dimmedClass, next !== null && item !== next);
        }
      }
    };

    const clear = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      setActive(null);
    };

    /** Picks the item nearest the middle of the screen, if one is close enough. */
    const update = () => {
      frame = 0;
      if (!inView) return;

      const height = window.innerHeight;
      const middle = height / 2;
      let nearest: HTMLElement | null = null;
      let nearestDistance = Infinity;
      let activeDistance = Infinity;

      for (const item of items()) {
        const box = item.getBoundingClientRect();
        const distance = Math.abs((box.top + box.bottom) / 2 - middle);
        if (item === active) activeDistance = distance;
        if (distance < nearestDistance) {
          nearest = item;
          nearestDistance = distance;
        }
      }

      if (nearestDistance > height * REACH) nearest = null;

      // Keep the current item while it is still in reach and the challenger
      // is not clearly closer, so the mark does not flicker at the boundary.
      const keepActive =
        active !== null &&
        activeDistance <= height * REACH &&
        activeDistance - nearestDistance <= height * HYSTERESIS;

      setActive(keepActive ? active : nearest);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const start = () => {
      if (observer) return;
      observer = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        if (inView) schedule();
        else clear();
      });
      observer.observe(root);
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
    };

    const stop = () => {
      if (!observer) return;
      observer.disconnect();
      observer = null;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      inView = false;
      clear();
    };

    const apply = () => {
      if (singleColumn.matches && noHover.matches) start();
      else stop();
    };

    apply();
    singleColumn.addEventListener("change", apply);
    noHover.addEventListener("change", apply);

    return () => {
      singleColumn.removeEventListener("change", apply);
      noHover.removeEventListener("change", apply);
      stop();
    };
  }, [itemSelector, dimmedClass]);

  return (
    <div ref={rootRef} className={`spotlight ${className}`}>
      {children}
    </div>
  );
}
