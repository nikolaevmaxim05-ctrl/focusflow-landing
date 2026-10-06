// Temporary page: one variant of the sticky How it works block between two
// placeholder sections, under a fake 80px header. Delete once chosen.

import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { getContent } from "@/data";
import { StepStack, type Motion, type NumberStyle } from "../StepStack";

const motions: Motion[] = ["a", "b", "c"];
const numberStyles: NumberStyle[] = ["small", "outline", "glow", "cutout", "solid"];

interface DemoProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const pick = <T extends string>(value: unknown, allowed: T[], fallback: T): T =>
  allowed.includes(value as T) ? (value as T) : fallback;

export default async function HowOptionsDemo({ searchParams }: DemoProps) {
  const params = await searchParams;
  const motion = pick(params.motion, motions, "c");
  const numberStyle = pick(params.num, numberStyles, "outline");
  const smooth = params.smooth !== "0";
  const stepLength = Number(params.len) || 1;
  const { howItWorks } = getContent("en");

  return (
    <>
      {smooth && <SmoothScroll />}
      <style>{`
        .step-number {
          color: rgba(255, 255, 255, 0.18);
          transition: color 0.5s ease;
        }
        [data-current] .step-number {
          color: var(--color-accent);
        }
        [data-current] .step-number--solid {
          color: color-mix(in srgb, var(--color-accent) 85%, transparent);
        }
      `}</style>
      <div className="fixed inset-x-0 top-0 z-50 flex h-20 items-center border-b border-border bg-background px-8 text-sm font-semibold">
        FocusFlow — fake header (80px)
      </div>
      <div className="flex h-screen items-center justify-center bg-background text-muted">
        ↑ previous section (Features) — scroll down ↓
      </div>
      <StepStack
        title={howItWorks.intro.title}
        steps={howItWorks.steps}
        motion={motion}
        numberStyle={numberStyle}
        stepLength={stepLength}
      />
      <div className="flex h-screen items-center justify-center bg-background text-muted">
        next section (Pricing)
      </div>
    </>
  );
}
