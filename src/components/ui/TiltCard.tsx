"use client";

import { useRef } from "react";
import type { PointerEvent, ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

/** Largest tilt of the card, in degrees. */
const MAX_TILT = 7;

/** How much the card grows while hovered. */
const HOVER_SCALE = 1.04;

/**
 * Card that reacts to the mouse: it grows a little, gets a white outline and
 * glow, and tilts so the side under the cursor rises toward the viewer. Touch
 * input and visitors who ask their system for reduced motion get a plain card.
 */
export function TiltCard({ children, className = "" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card || event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const box = card.getBoundingClientRect();
    // Cursor position from -1 (left / top edge) to 1 (right / bottom edge).
    const x = ((event.clientX - box.left) / box.width) * 2 - 1;
    const y = ((event.clientY - box.top) / box.height) * 2 - 1;

    card.style.transform = `perspective(900px) rotateX(${(y * MAX_TILT).toFixed(2)}deg) rotateY(${(-x * MAX_TILT).toFixed(2)}deg) scale(${HOVER_SCALE})`;
  };

  const handleLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`transition-[transform,border-color,box-shadow] duration-200 ease-out hover:border-white/80 hover:shadow-[0_0_2.5rem_rgb(255_255_255/0.18)] ${className}`}
    >
      {children}
    </div>
  );
}
