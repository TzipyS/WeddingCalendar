"use client";

import { useEffect, useState } from "react";
import { getTimeRemaining, type TimeRemaining } from "@/lib/hebrew-date";
import { siteConfig } from "@/config/site";

const UNITS: { key: keyof Pick<TimeRemaining, "days" | "hours" | "minutes" | "seconds">; label: string }[] = [
  { key: "days", label: "ימים" },
  { key: "hours", label: "שעות" },
  { key: "minutes", label: "דקות" },
  { key: "seconds", label: "שניות" },
];

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function Countdown() {
  const [remaining, setRemaining] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(getTimeRemaining());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!remaining) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {UNITS.map(({ label }) => (
          <div key={label} className="countdown-unit animate-pulse opacity-60">
            <span className="countdown-number">—</span>
            <span className="countdown-label">{label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (remaining.isPast) {
    return (
      <div className="rounded-2xl border border-gold/30 bg-white/60 px-8 py-10 text-center backdrop-blur-sm">
        <p className="font-display text-3xl text-burgundy sm:text-4xl">
          הגיע היום הגדול!
        </p>
        <p className="mt-3 text-lg text-burgundy/70">מזל טוב ל{siteConfig.coupleNames}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {UNITS.map(({ key, label }) => (
        <div key={key} className="countdown-unit">
          <span className="countdown-number">{pad(remaining[key])}</span>
          <span className="countdown-label">{label}</span>
        </div>
      ))}
    </div>
  );
}
