"use client";

import { useState } from "react";
import { HowItWorks } from "@/components/sections/HowItWorks";
import type {
  ScrollEffect,
  StepAccent,
} from "@/components/sections/HowItWorks";

// Temporary page: compares scroll effects and step accents for "How it works".
// Delete this folder once the choice is made.

const effects: { value: ScrollEffect; label: string }[] = [
  { value: "parallax", label: "A · Появление + параллакс" },
  { value: "reveal", label: "B · Только появление" },
  { value: "locomotive", label: "C · Locomotive Scroll" },
];

const accents: { value: StepAccent; label: string }[] = [
  { value: "ui", label: "1 · Мини-экраны" },
  { value: "icon", label: "2 · Иконка + номер" },
  { value: "photo", label: "3 · Фото" },
];

const buttonClassName = (isActive: boolean) =>
  `rounded-control border px-3 py-1.5 text-sm font-semibold ${
    isActive
      ? "border-accent bg-accent text-accent-foreground"
      : "border-border text-muted hover:text-foreground"
  }`;

export default function HowItWorksOptions() {
  const [effect, setEffect] = useState<ScrollEffect>("parallax");
  const [accent, setAccent] = useState<StepAccent>("ui");

  return (
    <>
      <div className="sticky top-0 z-50 flex flex-wrap gap-x-8 gap-y-2 border-b border-border bg-background px-5 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-subtle">Эффект:</span>
          {effects.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setEffect(option.value);
                window.scrollTo(0, 0);
              }}
              className={buttonClassName(effect === option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-subtle">Акцент шага:</span>
          {accents.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setAccent(option.value);
                window.scrollTo(0, 0);
              }}
              className={buttonClassName(accent === option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <main>
        <div className="flex min-h-[80vh] items-center justify-center text-2xl text-muted">
          Прокрутите вниз ↓
        </div>
        <HowItWorks
          key={`${effect}-${accent}`}
          effect={effect}
          accent={accent}
        />
        <div className="min-h-[70vh]" />
      </main>
    </>
  );
}
