import { DIGIT_FONT, DIGITS } from "./digitOutlines";

interface StepNumberProps {
  /** Two-digit step number, e.g. "03". */
  value: string;
  className?: string;
}

/** Same tracking the text version had: letter-spacing -0.06em. */
const TRACKING = -0.06 * DIGIT_FONT.unitsPerEm;

const { ascender, descender } = DIGIT_FONT;

/** Lays the digits out left to right, like a text run. */
function layout(value: string) {
  const glyphs: { d: string; x: number }[] = [];
  let x = 0;
  for (const character of value) {
    const digit = DIGITS[Number(character)];
    glyphs.push({ d: digit.d, x });
    x += digit.advance + TRACKING;
  }
  return { glyphs, width: x - TRACKING };
}

/**
 * Big outlined step number drawn from pre-cleaned glyph outlines instead of
 * stroked text, so overlapping contours inside the digits never show. The
 * viewBox spans the font's ascender to descender, so `height` in CSS maps to
 * the font size the same way a line-height: 1 text box did; the stroke width
 * is set in CSS and stays constant on screen (non-scaling-stroke).
 */
export function StepNumber({ value, className = "" }: StepNumberProps) {
  const { glyphs, width } = layout(value);

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 ${-ascender} ${width} ${ascender - descender}`}
      className={className}
    >
      {glyphs.map((glyph) => (
        <path
          key={glyph.x}
          d={glyph.d}
          transform={`translate(${glyph.x} 0)`}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
