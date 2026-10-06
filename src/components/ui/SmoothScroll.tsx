"use client";

import { useEffect } from "react";
import type LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/locomotive-scroll.css";
import { ANCHOR_SCROLL_EVENT, type AnchorScrollDetail } from "./anchorScroll";

/** Height of the sticky header that anchor links must stay clear of, in px. */
const HEADER_OFFSET = 80;
/** An anchor scroll covers this many pixels per second, within the bounds below. */
const SCROLL_SPEED = 1400;
const MIN_DURATION = 0.8;
const MAX_DURATION = 2;

type Lenis = NonNullable<LocomotiveScroll["lenisInstance"]>;

/** Soft start and stop instead of the exponential default of Lenis. */
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

const clamp = (min: number, value: number, max: number) =>
  Math.min(Math.max(value, min), max);

function announce(detail: AnchorScrollDetail) {
  window.dispatchEvent(
    new CustomEvent<AnchorScrollDetail>(ANCHOR_SCROLL_EVENT, { detail }),
  );
}

/** Finds the element a same-page hash link points to; "#" and "#top" mean the top. */
function hashTarget(hash: string): HTMLElement | null {
  const id = decodeURIComponent(hash.slice(1));
  return id === "" ? document.body : document.getElementById(id);
}

/**
 * Moves the keyboard focus to the section so Tab continues from it, as after
 * a native jump. The section only lends itself to focus for that moment and
 * shows no ring: the visible landing spot is the scroll position itself.
 */
function focusTarget(target: HTMLElement) {
  if (!target.hasAttribute("tabindex")) {
    const outline = target.style.outline;
    target.setAttribute("tabindex", "-1");
    target.style.outline = "none";
    target.addEventListener(
      "blur",
      () => {
        target.removeAttribute("tabindex");
        target.style.outline = outline;
      },
      { once: true },
    );
  }
  target.focus({ preventScroll: true });
}

/** Picks the plain left click on a same-page hash link out of a click event. */
function sameDocumentAnchor(event: MouseEvent): HTMLAnchorElement | null {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return null;
  }
  const anchor =
    event.target instanceof Element ? event.target.closest("a[href]") : null;
  if (!(anchor instanceof HTMLAnchorElement)) return null;
  if (anchor.target && anchor.target !== "_self") return null;

  const url = new URL(anchor.href);
  const here = window.location;
  const isSamePage =
    url.origin === here.origin &&
    url.pathname === here.pathname &&
    url.search === here.search;
  const hasHash = url.hash !== "" || anchor.getAttribute("href")?.endsWith("#");
  return isSamePage && hasHash ? anchor : null;
}

/**
 * Animates the scroll to a hash link's target with Lenis. The browser's own
 * instant jump is prevented, the URL hash is updated without a jump, and the
 * duration grows with the distance. A wheel or touch during the animation
 * takes over without a jolt.
 */
function scrollToAnchor(lenis: Lenis, anchor: HTMLAnchorElement, event: MouseEvent) {
  const hash = new URL(anchor.href).hash;
  const target = hashTarget(hash);
  if (!target || lenis.isStopped || lenis.isLocked) return;

  event.preventDefault();
  if (hash !== "" && hash !== window.location.hash) {
    window.history.pushState(null, "", hash);
  }

  const destination = clamp(
    0,
    target.getBoundingClientRect().top + lenis.animatedScroll - HEADER_OFFSET,
    lenis.limit,
  );
  const duration = clamp(
    MIN_DURATION,
    Math.abs(destination - lenis.animatedScroll) / SCROLL_SPEED,
    MAX_DURATION,
  );

  // Lenis forwards userData with every scroll event; a scroll started by the
  // visitor (wheel, touch, another link) replaces it, which ends this one.
  const ticket = {};
  let isFinished = false;
  const finish = (hasArrived: boolean) => {
    if (isFinished) return;
    isFinished = true;
    unsubscribe();
    announce({ href: hash, phase: "end" });
    if (hasArrived) focusTarget(target);
  };
  const unsubscribe = lenis.on("scroll", (instance) => {
    if (instance.userData.ticket !== ticket) finish(false);
  });

  announce({ href: hash, phase: "start" });
  lenis.scrollTo(target, {
    offset: -HEADER_OFFSET,
    duration,
    easing: easeInOutCubic,
    userData: { ticket },
    onComplete: () => finish(true),
  });
}

/**
 * Turns on Locomotive Scroll for the whole page: smooth scrolling with
 * inertia plus the data-scroll effects used by the sections, and animated
 * same-page anchor links. Skipped for visitors who ask their system for
 * reduced motion: they keep the browser's instant jumps.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let scroll: LocomotiveScroll | undefined;
    let isCancelled = false;
    let onClick: ((event: MouseEvent) => void) | undefined;

    import("locomotive-scroll").then(({ default: LocomotiveScroll }) => {
      if (isCancelled) return;
      scroll = new LocomotiveScroll();
      const lenis = scroll.lenisInstance;
      if (!lenis) return;

      // A page opened with a hash: settle exactly under the header even if
      // the layout moved after the browser's own jump.
      const initialTarget =
        window.location.hash === "" ? null : hashTarget(window.location.hash);
      if (initialTarget) {
        lenis.scrollTo(initialTarget, {
          offset: -HEADER_OFFSET,
          immediate: true,
          force: true,
        });
      }

      onClick = (event) => {
        const anchor = sameDocumentAnchor(event);
        if (anchor) scrollToAnchor(lenis, anchor, event);
      };
      document.addEventListener("click", onClick);
    });

    return () => {
      isCancelled = true;
      if (onClick) document.removeEventListener("click", onClick);
      scroll?.destroy();
    };
  }, []);

  return null;
}
