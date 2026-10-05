"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { FeatureIllustration } from "@/components/illustrations/FeatureIllustration";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howItWorks } from "@/data/howItWorks";
import type { Step } from "@/data/types";
import "locomotive-scroll/locomotive-scroll.css";

export type ScrollEffect = "parallax" | "reveal" | "locomotive";
export type StepAccent = "ui" | "icon" | "photo";

interface HowItWorksProps {
  effect?: ScrollEffect;
  accent?: StepAccent;
}

/** Staircase from md up: first step on the left, second centered, third on the right. */
const stepPosition = [
  "md:mr-auto",
  "md:mx-auto md:-mt-20",
  "md:ml-auto md:-mt-20",
];

/** How far the step picture drifts against the page scroll in "parallax" mode. */
const PARALLAX_STRENGTH = 0.12;

function stepNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

function StepVisual({
  step,
  index,
  accent,
}: {
  step: Step;
  index: number;
  accent: StepAccent;
}) {
  if (accent === "icon") {
    return (
      <div className="relative flex h-44 items-center">
        <span
          aria-hidden="true"
          className="absolute -top-4 left-16 text-[11rem] leading-none font-extrabold tracking-tighter text-surface-raised"
        >
          {stepNumber(index)}
        </span>
        <span className="relative flex size-24 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <step.icon aria-hidden="true" className="size-12" />
        </span>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-border bg-background">
      {accent === "photo" ? (
        <Image
          src={step.image.src}
          alt={step.image.alt}
          fill
          sizes="(min-width: 768px) 28rem, 100vw"
          className="object-cover"
        />
      ) : (
        <FeatureIllustration
          name={step.illustration}
          className="absolute inset-0 m-auto h-4/5"
        />
      )}
    </div>
  );
}

export function HowItWorks({
  effect = "parallax",
  accent = "ui",
}: HowItWorksProps) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    if (effect === "locomotive") {
      let scroll: { destroy: () => void } | undefined;
      let isCancelled = false;
      import("locomotive-scroll").then(({ default: LocomotiveScroll }) => {
        if (!isCancelled) scroll = new LocomotiveScroll();
      });
      return () => {
        isCancelled = true;
        scroll?.destroy();
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-inview");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 },
    );
    list.querySelectorAll(".reveal").forEach((item) => observer.observe(item));

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (effect !== "parallax" || reduceMotion)
      return () => observer.disconnect();

    let frame = 0;
    const moveVisuals = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        list
          .querySelectorAll<HTMLElement>("[data-parallax]")
          .forEach((visual) => {
            const box = visual.parentElement?.getBoundingClientRect();
            if (!box) return;
            const distanceFromCenter =
              box.top + box.height / 2 - window.innerHeight / 2;
            visual.style.transform = `translateY(${(-distanceFromCenter * PARALLAX_STRENGTH).toFixed(1)}px)`;
          });
      });
    };
    window.addEventListener("scroll", moveVisuals, { passive: true });
    moveVisuals();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", moveVisuals);
      cancelAnimationFrame(frame);
    };
  }, [effect]);

  const isLocomotive = effect === "locomotive";

  return (
    <Section
      id="how-it-works"
      className="overflow-hidden border-y border-border bg-surface"
    >
      <SectionHeading intro={howItWorks.intro} />
      <ol ref={listRef} className="mt-16 flex flex-col gap-16 md:gap-0">
        {howItWorks.steps.map((step, index) => (
          <li
            key={step.title}
            {...(isLocomotive ? { "data-scroll": "" } : {})}
            className={`reveal flex w-full flex-col gap-6 md:w-[24rem] lg:w-[28rem] ${stepPosition[index]}`}
          >
            <div
              data-parallax
              {...(isLocomotive
                ? { "data-scroll": "", "data-scroll-speed": "0.08" }
                : {})}
            >
              <StepVisual step={step} index={index} accent={accent} />
            </div>
            <div className="flex flex-col gap-3">
              {accent !== "icon" && (
                <span
                  aria-hidden="true"
                  className="text-2xl font-extrabold text-accent tabular-nums"
                >
                  {stepNumber(index)}
                </span>
              )}
              <h3 className="text-3xl font-bold tracking-tight md:text-4xl">
                {step.title}
              </h3>
              <p className="text-lg text-muted">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
