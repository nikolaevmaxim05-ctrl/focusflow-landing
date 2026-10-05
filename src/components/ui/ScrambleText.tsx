"use client";

import { useEffect, useRef } from "react";

interface ScrambleTextProps {
  text: string;
}

const SYMBOLS = "!<>-_\\/[]{}=+*^?#";

/** Time for the whole text to settle, in ms. */
const DURATION_MS = 1100;

/** How often the not yet settled characters change, in ms. */
const SHUFFLE_INTERVAL_MS = 45;

function randomSymbol() {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

/**
 * Text that assembles itself out of random symbols, left to right, every time
 * it scrolls into view. The real text stays in the page for screen readers
 * and keeps the layout steady while the symbols change on top of it. Visitors
 * who ask their system for reduced motion see plain text.
 */
export function ScrambleText({ text }: ScrambleTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const label = textRef.current;
    const overlay = overlayRef.current;
    if (!root || !label || !overlay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer = 0;

    const finish = () => {
      window.clearInterval(timer);
      overlay.textContent = "";
      label.style.opacity = "";
    };

    const play = () => {
      finish();
      const startedAt = performance.now();
      label.style.opacity = "0";

      timer = window.setInterval(() => {
        const progress = (performance.now() - startedAt) / DURATION_MS;
        if (progress >= 1) {
          finish();
          return;
        }

        const settled = Math.floor(progress * text.length);
        overlay.textContent = Array.from(text, (character, index) =>
          index < settled || character === " " ? character : randomSymbol(),
        ).join("");
      }, SHUFFLE_INTERVAL_MS);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
      },
      { threshold: 0.6 },
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      finish();
    };
  }, [text]);

  return (
    <span ref={rootRef} className="relative inline-block">
      <span ref={textRef}>{text}</span>
      <span
        ref={overlayRef}
        aria-hidden="true"
        className="absolute inset-0 text-accent"
      />
    </span>
  );
}
