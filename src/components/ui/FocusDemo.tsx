import type { PhoneMockupContent, UiStrings } from "@/data/types";

interface FocusDemoProps {
  content: PhoneMockupContent;
  ui: UiStrings;
  remainingSeconds: number;
  session: number;
  isRunning: boolean;
  /** Name of the selected focus sound, or null when none is playing. */
  activeSound: string | null;
  onToggleTimer: () => void;
  onSelectSound: (name: string) => void;
}

const RING_RADIUS = 88;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

/**
 * The app screen drawn in code: a working focus timer and focus sound
 * buttons. The content exists once; only its wrapper and layout change with
 * the breakpoint. From md up it sits inside a phone frame. Below md the frame
 * would look like a phone inside a phone, so the demo becomes a compact glass
 * panel: a small ring with the time on the left, the session labels and the
 * pause button on the right, and the sounds as a segmented control below.
 */
export function FocusDemo({
  content,
  ui,
  remainingSeconds,
  session,
  isRunning,
  activeSound,
  onToggleTimer,
  onSelectSound,
}: FocusDemoProps) {
  const remainingShare = remainingSeconds / (content.sessionMinutes * 60);
  const sessionCaption = ui.sessionOf
    .replace("{current}", String(session))
    .replace("{total}", String(content.sessionsTotal));
  // The ring and the time dim while the timer is paused.
  const dimmed = `transition-opacity duration-300 ${
    isRunning ? "opacity-100" : "opacity-40"
  }`;

  return (
    <div
      role="group"
      aria-label={content.label}
      className="w-full max-w-sm rounded-card border border-border bg-background/50 p-5 backdrop-blur-md md:max-w-[18rem] md:rounded-[2.75rem] md:bg-surface md:p-3 md:backdrop-blur-none"
    >
      {/* Below md: a two-column grid, the ring on the left spanning the three rows on the right. */}
      <div className="max-md:grid max-md:grid-cols-[auto_1fr] max-md:gap-x-5 max-md:gap-y-2 md:flex md:flex-col md:items-center md:gap-8 md:rounded-[2rem] md:bg-background md:px-5 md:pt-4 md:pb-6">
        <span
          aria-hidden="true"
          className="hidden h-1.5 w-16 rounded-full bg-surface-raised md:block"
        />

        <p className="text-sm font-semibold text-muted max-md:col-start-2 max-md:row-start-1 max-md:self-end">
          {content.sessionLabel}
        </p>

        {/* Below md the wrappers dissolve (contents) so the ring, time and caption are placed on the grid directly. */}
        <div className="relative flex aspect-square w-full max-w-52 items-center justify-center max-md:contents">
          <svg
            aria-hidden="true"
            viewBox="0 0 200 200"
            className={`absolute inset-0 -rotate-90 max-md:static max-md:col-start-1 max-md:row-span-3 max-md:row-start-1 max-md:w-24 max-md:self-center ${dimmed}`}
          >
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
              strokeDashoffset={RING_LENGTH * (1 - remainingShare)}
              className="stroke-accent"
            />
          </svg>
          <div className="flex flex-col items-center gap-1 max-md:contents">
            <span
              role="timer"
              className={`text-5xl font-extrabold tracking-tight tabular-nums max-md:col-start-1 max-md:row-span-3 max-md:row-start-1 max-md:self-center max-md:justify-self-center max-md:text-xl ${dimmed}`}
            >
              {formatTime(remainingSeconds)}
            </span>
            <span
              className={`text-xs text-subtle max-md:col-start-2 max-md:row-start-2 ${dimmed}`}
            >
              {sessionCaption}
            </span>
          </div>
        </div>

        <button
          type="button"
          aria-label={isRunning ? ui.pauseTimer : ui.resumeTimer}
          onClick={onToggleTimer}
          className="flex size-14 cursor-pointer items-center justify-center rounded-full bg-accent text-accent-foreground transition-all duration-300 max-md:col-start-2 max-md:row-start-3 max-md:self-start hover:bg-accent-hover hover:shadow-[0_0_28px_-4px_rgb(45_212_191/0.8)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-hover"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-6"
            fill="currentColor"
          >
            {isRunning ? (
              <>
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </>
            ) : (
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5z" />
            )}
          </svg>
        </button>

        <div className="flex w-full flex-col gap-3 max-md:col-span-2 max-md:row-start-4 max-md:mt-3">
          {/* The sounds caption stays for screen readers below md, where the buttons speak for themselves. */}
          <p className="text-xs font-semibold text-subtle max-md:sr-only">
            {content.soundsLabel}
          </p>
          <ul className="max-md:flex max-md:gap-1 max-md:rounded-control max-md:border max-md:border-border max-md:p-1 md:grid md:grid-cols-3 md:gap-2">
            {content.sounds.map((sound) => {
              const isActive = sound.name === activeSound;

              return (
                <li key={sound.name} className="max-md:flex-1">
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => onSelectSound(sound.name)}
                    className={`w-full cursor-pointer rounded-control border py-2 text-center text-xs font-semibold transition-all duration-300 max-md:min-h-11 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-hover ${
                      isActive
                        ? "border-accent bg-accent/10 text-accent"
                        : "text-muted max-md:border-transparent md:border-border hover:border-accent hover:text-accent"
                    }`}
                  >
                    {sound.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
