"use client";

import { useEffect } from "react";
import "locomotive-scroll/locomotive-scroll.css";

/** Height of the sticky header that anchor links must stay clear of, in px. */
const HEADER_OFFSET = 80;

/**
 * Turns on Locomotive Scroll for the whole page: smooth scrolling with
 * inertia plus the data-scroll effects used by the sections. Skipped for
 * visitors who ask their system for reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let scroll: { destroy: () => void } | undefined;
    let isCancelled = false;

    import("locomotive-scroll").then(({ default: LocomotiveScroll }) => {
      if (isCancelled) return;
      scroll = new LocomotiveScroll({
        lenisOptions: { anchors: { offset: -HEADER_OFFSET } },
      });
    });

    return () => {
      isCancelled = true;
      scroll?.destroy();
    };
  }, []);

  return null;
}
