"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CopyEmailProps {
  email: string;
  /** Notification shown after the address is copied. */
  copiedMessage: string;
}

/** How long the notification stays on screen, in ms. */
const NOTICE_MS = 2500;

/**
 * Email address that copies itself to the clipboard on click and confirms it
 * with a short notification. If the browser refuses clipboard access, the
 * click opens the mail app instead.
 */
export function CopyEmail({ email, copiedMessage }: CopyEmailProps) {
  const [isCopied, setIsCopied] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      window.location.href = `mailto:${email}`;
      return;
    }

    setIsCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setIsCopied(false), NOTICE_MS);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-control text-left text-sm font-semibold [overflow-wrap:anywhere] text-accent transition-all duration-300 hover:text-accent-hover hover:[text-shadow:0_0_14px_rgb(45_212_191/0.7)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-hover"
      >
        {email}
        {isCopied ? (
          <Check aria-hidden="true" className="size-4 shrink-0" />
        ) : (
          <Copy aria-hidden="true" className="size-4 shrink-0" />
        )}
      </button>

      <p
        role="status"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-control border border-accent bg-surface px-5 py-3 text-sm font-semibold whitespace-nowrap text-foreground shadow-[0_0_28px_-6px_rgb(45_212_191/0.7)] transition-opacity duration-300 ${
          isCopied ? "opacity-100" : "opacity-0"
        }`}
      >
        {isCopied ? copiedMessage : ""}
      </p>
    </>
  );
}
