import type { PhoneMockupContent } from "@/data/types";

interface PhoneMockupProps {
  content: PhoneMockupContent;
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

/** App screen drawn in code: a working focus timer and focus sound buttons. */
export function PhoneMockup({
  content,
  remainingSeconds,
  session,
  isRunning,
  activeSound,
  onToggleTimer,
  onSelectSound,
}: PhoneMockupProps) {
  const remainingShare = remainingSeconds / (content.sessionMinutes * 60);

  return (
    <div
      role="group"
      aria-label={content.label}
      className="w-full max-w-[18rem] rounded-[2.75rem] border border-border bg-surface p-3"
    >
      <div className="flex flex-col items-center gap-8 rounded-[2rem] bg-background px-5 pt-4 pb-6">
        <span
          aria-hidden="true"
          className="h-1.5 w-16 rounded-full bg-surface-raised"
        />

        <p className="text-sm font-semibold text-muted">
          {content.sessionLabel}
        </p>

        <div className="relative flex aspect-square w-full max-w-52 items-center justify-center">
          <svg
            aria-hidden="true"
            viewBox="0 0 200 200"
            className="absolute inset-0 -rotate-90"
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
          <div className="flex flex-col items-center gap-1">
            <span
              role="timer"
              className="text-5xl font-extrabold tracking-tight tabular-nums"
            >
              {formatTime(remainingSeconds)}
            </span>
            <span className="text-xs text-subtle">
              Session {session} of {content.sessionsTotal}
            </span>
          </div>
        </div>

        <button
          type="button"
          aria-label={isRunning ? "Pause timer" : "Resume timer"}
          onClick={onToggleTimer}
          className="flex size-14 cursor-pointer items-center justify-center rounded-full bg-accent text-accent-foreground hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-hover"
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

        <div className="flex w-full flex-col gap-3">
          <p className="text-xs font-semibold text-subtle">
            {content.soundsLabel}
          </p>
          <ul className="grid grid-cols-3 gap-2">
            {content.sounds.map((sound) => {
              const isActive = sound.name === activeSound;

              return (
                <li key={sound.name}>
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => onSelectSound(sound.name)}
                    className={`w-full cursor-pointer rounded-control border py-2 text-center text-xs font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-hover ${
                      isActive
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border text-muted hover:border-muted hover:text-foreground"
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
