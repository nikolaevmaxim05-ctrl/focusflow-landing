import type { IllustrationName } from "@/data/types";

interface FeatureIllustrationProps {
  name: IllustrationName;
  className?: string;
}

const BAR_HEIGHTS = [90, 150, 120, 200, 170, 240, 300];
const WAVE_HEIGHTS = [
  40, 90, 150, 220, 130, 260, 180, 300, 200, 110, 240, 150, 70, 120, 50,
];
const STREAK_ROWS = 4;
const STREAK_COLUMNS = 7;
const STREAK_LENGTH = 18;
const SWATCHES = [
  { cx: 470, cy: 180, fill: "#a78bfa" },
  { cx: 570, cy: 250, fill: "#f472b6" },
  { cx: 670, cy: 180, fill: "#fbbf24" },
  { cx: 570, cy: 120, fill: "#2dd4bf" },
];

function Drawing({ name }: { name: IllustrationName }) {
  switch (name) {
    case "timer":
      return (
        <g fill="none" strokeLinecap="round">
          <circle
            cx="590"
            cy="215"
            r="150"
            strokeWidth="18"
            className="stroke-surface-raised"
          />
          <circle
            cx="590"
            cy="215"
            r="150"
            strokeWidth="18"
            strokeDasharray="942"
            strokeDashoffset="300"
            transform="rotate(-90 590 215)"
            className="stroke-accent"
          />
          <path
            d="M590 215V125M590 215l55 35"
            strokeWidth="12"
            className="stroke-muted"
          />
        </g>
      );
    case "minimal":
      return (
        <g fill="none">
          <circle
            cx="590"
            cy="215"
            r="190"
            strokeWidth="2"
            className="stroke-border"
          />
          <circle
            cx="590"
            cy="215"
            r="125"
            strokeWidth="2"
            className="stroke-border"
          />
          <circle
            cx="590"
            cy="215"
            r="60"
            strokeWidth="2"
            className="stroke-subtle"
          />
          <circle cx="590" cy="215" r="14" className="fill-accent" />
        </g>
      );
    case "stats":
      return (
        <g>
          {BAR_HEIGHTS.map((height, index) => (
            <rect
              key={index}
              x={400 + index * 52}
              y={360 - height}
              width="34"
              height={height}
              rx="8"
              className={
                index === BAR_HEIGHTS.length - 1
                  ? "fill-accent"
                  : "fill-surface-raised"
              }
            />
          ))}
        </g>
      );
    case "sounds":
      return (
        <g strokeWidth="12" strokeLinecap="round">
          {WAVE_HEIGHTS.map((height, index) => (
            <path
              key={index}
              d={`M${400 + index * 26} ${215 - height / 2}v${height}`}
              className={
                index % 3 === 1 ? "stroke-accent" : "stroke-surface-raised"
              }
            />
          ))}
        </g>
      );
    case "streak":
      return (
        <g>
          {Array.from({ length: STREAK_ROWS * STREAK_COLUMNS }, (_, index) => (
            <circle
              key={index}
              cx={420 + (index % STREAK_COLUMNS) * 56}
              cy={130 + Math.floor(index / STREAK_COLUMNS) * 56}
              r="18"
              className={
                index < STREAK_LENGTH ? "fill-accent" : "fill-surface-raised"
              }
            />
          ))}
        </g>
      );
    case "themes":
      return (
        <g opacity="0.85">
          {SWATCHES.map((swatch) => (
            <circle key={swatch.fill} r="95" {...swatch} />
          ))}
        </g>
      );
  }
}

/** Decorative slide background drawn in code. */
export function FeatureIllustration({
  name,
  className = "",
}: FeatureIllustrationProps) {
  return (
    <svg aria-hidden="true" viewBox="380 0 420 430" className={className}>
      <Drawing name={name} />
    </svg>
  );
}
