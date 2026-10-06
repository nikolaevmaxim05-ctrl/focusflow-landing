"use client";

import { useEffect, useRef } from "react";
import type { PointerEvent, ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

/** Largest tilt of the card, in degrees. */
const MAX_TILT = 7;

/** How much the card grows while hovered. */
const HOVER_SCALE = 1.04;

/** Opacity of the gloss when the cursor reaches the edge of the card. */
const MAX_GLOSS = 0.3;

/**
 * Card that reacts to the mouse: it grows a little, gets a white outline and
 * glow, tilts so the side under the cursor sinks away from the viewer, and a
 * soft gloss slides to the opposite side, brighter the closer the cursor is
 * to an edge. Touch input and visitors who ask their system for reduced
 * motion get a plain card.
 */
export function TiltCard({ children, className = "" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glossRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  // All layout reads and style writes happen once per animation frame, not
  // on every pointer event, so a fast mouse never forces repeated layouts.
  const apply = () => {
    frame.current = null;
    const card = cardRef.current;
    const gloss = glossRef.current;
    if (!card || !gloss) return;

    const box = card.getBoundingClientRect();
    const halfW = box.width / 2;
    const halfH = box.height / 2;
    if (!halfW || !halfH) return;

    const deltaX = pointer.current.x - (box.left + halfW);
    const deltaY = pointer.current.y - (box.top + halfH);
    // Cursor offset from the centre, -1 at the left / top edge, 1 at the right / bottom.
    const rx = deltaY / halfH;
    const ry = deltaX / halfW;
    const distance = Math.hypot(deltaX, deltaY);
    const maxDistance = Math.max(halfW, halfH);

    card.style.transform = `perspective(900px) rotateX(${(-rx * MAX_TILT).toFixed(2)}deg) rotateY(${(ry * MAX_TILT).toFixed(2)}deg) scale(${HOVER_SCALE})`;
    gloss.style.transform = `translate(${(-ry * 100).toFixed(1)}%, ${(-rx * 100).toFixed(1)}%) scale(2.4)`;
    gloss.style.opacity = Math.min((distance * MAX_GLOSS) / maxDistance, MAX_GLOSS).toFixed(3);
  };

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    pointer.current = { x: event.clientX, y: event.clientY };
    if (frame.current === null) frame.current = requestAnimationFrame(apply);
  };

  const handleLeave = () => {
    if (frame.current !== null) {
      cancelAnimationFrame(frame.current);
      frame.current = null;
    }
    if (cardRef.current) cardRef.current.style.transform = "";
    if (glossRef.current) glossRef.current.style.opacity = "0";
  };

  useEffect(() => {
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`tilt-card relative hover:border-white/80 hover:shadow-[0_0_2.5rem_rgb(255_255_255/0.18)] ${className}`}
    >
      <div className="card-gloss-wrap" aria-hidden="true">
        <div ref={glossRef} className="card-gloss" />
      </div>
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
