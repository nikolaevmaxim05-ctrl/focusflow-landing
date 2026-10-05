"use client";

import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { GooglePlayButton } from "@/components/ui/GooglePlayButton";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import type { HeroContent, UiStrings } from "@/data/types";

interface HeroProps {
  hero: HeroContent;
  ui: UiStrings;
}

/** Volume of the focus sounds, from 0 to 1. */
const SOUND_VOLUME = 0.6;

/** Length of the cross-fade between background videos, in ms. Matches duration-1000. */
const FADE_MS = 1000;

const videoClassName =
  "absolute inset-0 size-full object-cover transition-opacity duration-1000";

/**
 * Hero with a live demo: the phone timer counts down from page load and the
 * focus sound buttons play a looping sound and fade the background video to
 * the one that matches it. Sounds start only on click because browsers block
 * autoplay with audio.
 */
export function Hero({ hero, ui }: HeroProps) {
  const { mockup } = hero;
  const sessionSeconds = mockup.sessionMinutes * 60;

  const [remainingSeconds, setRemainingSeconds] = useState(sessionSeconds);
  const [session, setSession] = useState(mockup.firstSession);
  const [isRunning, setIsRunning] = useState(true);
  const [activeSound, setActiveSound] = useState<string | null>(null);
  /** Sounds whose video has loaded enough to be faded in. */
  const [readyVideos, setReadyVideos] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  // Countdown: one tick per second while running; a finished session starts the next one.
  useEffect(() => {
    if (!isRunning) return;

    const timer = window.setInterval(() => {
      setRemainingSeconds((seconds) => {
        if (seconds > 1) return seconds - 1;
        setSession((current) => (current % mockup.sessionsTotal) + 1);
        return sessionSeconds;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isRunning, sessionSeconds, mockup.sessionsTotal]);

  // Visitors who ask their system for reduced motion get a still frame.
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    backgroundRef.current?.querySelector("video")?.pause();
  }, []);

  // Sound videos play only while selected; the others stop once they have faded out.
  useEffect(() => {
    const videos =
      backgroundRef.current?.querySelectorAll<HTMLVideoElement>(
        "video[data-sound]",
      ) ?? [];
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    videos.forEach((video) => {
      if (video.dataset.sound === activeSound && !reduceMotion) {
        void video.play();
      }
    });
    const timer = window.setTimeout(() => {
      videos.forEach((video) => {
        if (video.dataset.sound !== activeSound) video.pause();
      });
    }, FADE_MS);
    return () => window.clearTimeout(timer);
  }, [activeSound]);

  const handleSelectSound = (name: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (name === activeSound) {
      audio.pause();
      setActiveSound(null);
      return;
    }

    const sound = mockup.sounds.find((item) => item.name === name);
    if (!sound) return;

    audio.src = sound.audio;
    audio.volume = SOUND_VOLUME;
    void audio.play();
    setActiveSound(name);
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div ref={backgroundRef} aria-hidden="true" className="absolute inset-0">
        <video
          src={hero.backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 size-full object-cover"
        />
        {/* Sound videos sit on top of the default one and fade in once loaded, so there is never a blank frame. */}
        {mockup.sounds.map((sound) => (
          <video
            key={sound.name}
            data-sound={sound.name}
            src={sound.video}
            muted
            loop
            playsInline
            preload="none"
            onCanPlay={() =>
              setReadyVideos((names) =>
                names.includes(sound.name) ? names : [...names, sound.name],
              )
            }
            className={`${videoClassName} ${
              sound.name === activeSound && readyVideos.includes(sound.name)
                ? "opacity-100"
                : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent" />
      </div>

      <audio ref={audioRef} loop preload="none" />

      <Container className="relative grid items-center gap-14 lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <h1 className="max-w-xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="max-w-lg text-lg text-foreground/80">
            {hero.description}
          </p>
          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start">
            <GooglePlayButton
              href={hero.primaryCta.href}
              label={hero.primaryCta.label}
            />
            <ButtonLink
              href={hero.secondaryCta.href}
              size="lg"
              variant="secondary"
              className="sm:h-16"
            >
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <PhoneMockup
            content={mockup}
            ui={ui}
            remainingSeconds={remainingSeconds}
            session={session}
            isRunning={isRunning}
            activeSound={activeSound}
            onToggleTimer={() => setIsRunning((running) => !running)}
            onSelectSound={handleSelectSound}
          />
        </div>
      </Container>
    </section>
  );
}
