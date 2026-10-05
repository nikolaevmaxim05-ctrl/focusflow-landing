interface GooglePlayButtonProps {
  href: string;
  label: string;
}

/** Google Play glyph from Simple Icons (CC0), drawn on a 24x24 grid. */
const GOOGLE_PLAY_PATH =
  "M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z";

/** Large store button: Google Play glyph followed by the label. Opens in a new tab. */
export function GooglePlayButton({ href, label }: GooglePlayButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-16 items-center justify-center gap-3 rounded-[1.25rem] whitespace-nowrap bg-accent px-8 text-lg font-bold text-accent-foreground transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_0_36px_-4px_rgb(45_212_191/0.8)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-hover"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6"
      >
        <path d={GOOGLE_PLAY_PATH} />
      </svg>
      {label}
    </a>
  );
}
