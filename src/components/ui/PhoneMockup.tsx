import type { PhoneMockupContent } from "@/data/types";

interface PhoneMockupProps {
  content: PhoneMockupContent;
}

const RING_RADIUS = 88;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

/** App screen drawn in code: a focus timer with a row of focus sounds. */
export function PhoneMockup({ content }: PhoneMockupProps) {
  return (
    <div
      role="img"
      aria-label={content.alt}
      className="w-full max-w-[18rem] rounded-[2.75rem] border border-border bg-surface p-3"
    >
      <div
        aria-hidden="true"
        className="flex flex-col items-center gap-8 rounded-[2rem] bg-background px-5 pb-6 pt-4"
      >
        <span className="h-1.5 w-16 rounded-full bg-surface-raised" />

        <p className="text-sm font-semibold text-muted">
          {content.sessionLabel}
        </p>

        <div className="relative flex aspect-square w-full max-w-52 items-center justify-center">
          <svg viewBox="0 0 200 200" className="absolute inset-0 -rotate-90">
            <circle
              cx="100"
              cy="100"
              r={RING_RADIUS}
              fill="none"
              strokeWidth="10"
              className="stroke-surface-raised"
            />
            <circle
              cx="100"
              cy="100"
              r={RING_RADIUS}
              fill="none"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={RING_LENGTH}
              strokeDashoffset={RING_LENGTH * (1 - content.ringProgress)}
              className="stroke-accent"
            />
          </svg>
          <div className="flex flex-col items-center gap-1">
            <span className="text-5xl font-extrabold tracking-tight tabular-nums">
              {content.time}
            </span>
            <span className="text-xs text-subtle">
              {content.sessionProgress}
            </span>
          </div>
        </div>

        <span className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <svg viewBox="0 0 24 24" className="size-6" fill="currentColor">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        </span>

        <div className="flex w-full flex-col gap-3">
          <p className="text-xs font-semibold text-subtle">
            {content.soundsLabel}
          </p>
          <ul className="grid grid-cols-3 gap-2">
            {content.sounds.map((sound) => (
              <li
                key={sound.name}
                className={`rounded-control border py-2 text-center text-xs font-semibold ${
                  sound.active
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted"
                }`}
              >
                {sound.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
