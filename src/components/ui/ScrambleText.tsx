"use client";

import { useEffect, useRef } from "react";

interface ScrambleTextProps {
  text: string;
}

const DIGITS = "0123456789";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = LOWERCASE.toUpperCase();

/** Time for the whole text to settle, in ms. */
export const DEFAULT_SCRAMBLE_MS = 1100;

/** How often the not yet settled characters change, in ms. */
const SHUFFLE_INTERVAL_MS = 45;

/** TEMPORARY: lets ScrambleSpeedPicker try other durations and replay the effect. */
export const SCRAMBLE_REPLAY_EVENT = "scramble-replay";

function pick(characters: string) {
  return characters[Math.floor(Math.random() * characters.length)];
}

/** Random stand-in of the same kind: digit for digit, letter for letter. */
function standIn(character: string) {
  if (DIGITS.includes(character)) return pick(DIGITS);
  if (LOWERCASE.includes(character)) return pick(LOWERCASE);
  if (UPPERCASE.includes(character)) return pick(UPPERCASE);
  return character;
}

/**
 * Text that assembles itself out of random characters, left to right, every
 * time it scrolls into view. Digits shuffle through digits and letters through
 * letters; spaces and punctuation stay put. The real text stays in the page
 * for screen readers and keeps the layout steady while the characters change
 * on top of it. Visitors who ask their system for reduced motion see plain
 * text.
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

    const play = (durationMs = DEFAULT_SCRAMBLE_MS) => {
      finish();
      const startedAt = performance.now();
      label.style.opacity = "0";

      const shuffle = () => {
        const progress = (performance.now() - startedAt) / durationMs;
        if (progress >= 1) {
          finish();
          return;
        }

        const settled = Math.floor(progress * text.length);
        overlay.textContent = Array.from(text, (character, index) =>
          index < settled ? character : standIn(character),
        ).join("");
      };
      shuffle();
      timer = window.setInterval(shuffle, SHUFFLE_INTERVAL_MS);
    };

    let durationMs = DEFAULT_SCRAMBLE_MS;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play(durationMs);
      },
      { threshold: 0.6 },
    );
    observer.observe(root);

    // TEMPORARY: speed comparison, remove together with ScrambleSpeedPicker.
    const replay = (event: Event) => {
      durationMs = (event as CustomEvent<number>).detail;
      play(durationMs);
    };
    window.addEventListener(SCRAMBLE_REPLAY_EVENT, replay);

    return () => {
      observer.disconnect();
      window.removeEventListener(SCRAMBLE_REPLAY_EVENT, replay);
      finish();
    };
  }, [text]);

  return (
    <span ref={rootRef} className="relative inline-block">
      <span ref={textRef}>{text}</span>
      <span ref={overlayRef} aria-hidden="true" className="absolute inset-0" />
    </span>
  );
}
