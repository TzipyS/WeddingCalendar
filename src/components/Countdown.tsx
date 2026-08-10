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

function formatValue(
  key: keyof Pick<TimeRemaining, "days" | "hours" | "minutes" | "seconds">,
  n: number,
) {
  if (key === "days") return n.toString();
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
      <div className="countdown-row" dir="ltr">
        {UNITS.map(({ label }) => (
          <div key={label} className="countdown-unit countdown-unit-large animate-pulse opacity-60">
            <span className="countdown-number countdown-number-large">-</span>
            <span className="countdown-label countdown-label-large">{label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (remaining.isPast) {
    return (
      <div className="countdown-celebration">
        <p className="font-display text-4xl text-gold-dark sm:text-5xl">
          🎉 הגיע היום הגדול! 🎉
        </p>
        <p className="mt-4 text-2xl font-medium text-burgundy/80">
          מזל טוב ל{siteConfig.coupleNames}
        </p>
      </div>
    );
  }

  return (
    <div className="countdown-row" dir="ltr">
      {UNITS.map(({ key, label }) => {
        const value = formatValue(key, remaining[key]);
        return (
          <div key={key} className="countdown-unit countdown-unit-large">
            <span
              className="countdown-number countdown-number-large"
              data-digits={value.length}
            >
              {value}
            </span>
            <span className="countdown-label countdown-label-large">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
