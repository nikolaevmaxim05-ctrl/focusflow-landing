"use client";

import { useState } from "react";
import { DEFAULT_SCRAMBLE_MS, SCRAMBLE_REPLAY_EVENT } from "./ScrambleText";

// TEMPORARY: lets the site owner compare scramble speeds. Remove once a speed is chosen.

const speeds = [
  { label: "A · 0.6 с", durationMs: 600 },
  { label: "B · 1.1 с", durationMs: 1100 },
  { label: "C · 1.8 с", durationMs: 1800 },
  { label: "D · 2.6 с", durationMs: 2600 },
];

export function ScrambleSpeedPicker() {
  const [activeMs, setActiveMs] = useState(DEFAULT_SCRAMBLE_MS);

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <span className="text-sm text-subtle">Скорость анимации:</span>
      {speeds.map((speed) => (
        <button
          key={speed.durationMs}
          type="button"
          onClick={() => {
            setActiveMs(speed.durationMs);
            window.dispatchEvent(
              new CustomEvent(SCRAMBLE_REPLAY_EVENT, {
                detail: speed.durationMs,
              }),
            );
          }}
          className={`rounded-control border px-3 py-1.5 text-sm font-semibold ${
            activeMs === speed.durationMs
              ? "border-accent bg-accent text-accent-foreground"
              : "border-border text-muted hover:text-foreground"
          }`}
        >
          {speed.label}
        </button>
      ))}
    </div>
  );
}
