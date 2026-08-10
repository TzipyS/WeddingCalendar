"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, []);

  if (!siteConfig.backgroundMusicSrc) return null;

  async function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }

  return (
    <>
      <audio ref={audioRef} src={siteConfig.backgroundMusicSrc} loop preload="metadata" />
      <button
        type="button"
        className={`music-toggle-btn${playing ? " music-toggle-btn--playing" : ""}`}
        onClick={toggle}
        aria-label={playing ? "עצירת מוזיקה" : "הפעלת מוזיקה"}
        title={playing ? "עצור מוזיקה" : "נגן מוזיקה"}
      >
        {playing ? "🔊" : "🎵"}
      </button>
    </>
  );
}
