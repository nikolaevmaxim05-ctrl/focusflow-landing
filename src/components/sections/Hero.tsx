"use client";

import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { GooglePlayButton } from "@/components/ui/GooglePlayButton";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { hero } from "@/data/hero";

const { mockup } = hero;
const SESSION_SECONDS = mockup.sessionMinutes * 60;

/** Volume of the focus sounds, from 0 to 1. */
const SOUND_VOLUME = 0.6;

const videoClassName =
  "absolute inset-0 size-full object-cover transition-opacity duration-1000";

/**
 * Hero with a live demo: the phone timer counts down from page load and the
 * focus sound buttons play a looping sound and switch the background video
 * to match it. Sounds start only on click because browsers block autoplay
 * with audio.
 */
export function Hero() {
  const [remainingSeconds, setRemainingSeconds] = useState(SESSION_SECONDS);
  const [session, setSession] = useState(mockup.firstSession);
  const [isRunning, setIsRunning] = useState(true);
  const [activeSound, setActiveSound] = useState<string | null>(null);
  /** Sounds picked at least once: their videos stay loaded for quick switching. */
  const [loadedSounds, setLoadedSounds] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  // Countdown: one tick per second while running; a finished session starts the next one.
  useEffect(() => {
    if (!isRunning) return;

    const timer = window.setInterval(() => {
      setRemainingSeconds((seconds) => {
        if (seconds > 1) return seconds - 1;
        setSession((current) => (current % mockup.sessionsTotal) + 1);
        return SESSION_SECONDS;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isRunning]);

  // Visitors who ask their system for reduced motion get still video frames.
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    backgroundRef.current
      ?.querySelectorAll("video")
      .forEach((video) => video.pause());
  }, [loadedSounds]);

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
    setLoadedSounds((names) =>
      names.includes(name) ? names : [...names, name],
    );
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
          className={`${videoClassName} ${activeSound ? "opacity-0" : "opacity-100"}`}
        />
        {mockup.sounds
          .filter((sound) => loadedSounds.includes(sound.name))
          .map((sound) => (
            <video
              key={sound.name}
              src={sound.video}
              autoPlay
              muted
              loop
              playsInline
              className={`${videoClassName} ${
                sound.name === activeSound ? "opacity-100" : "opacity-0"
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
