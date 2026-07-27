import { HDate, months } from "@hebcal/core";
import { siteConfig } from "@/config/site";

export function getWeddingDate(): Date {
  const hd = new HDate(
    siteConfig.kislevDay,
    months.KISLEV,
    siteConfig.hebrewYear,
  );
  const date = hd.greg();
  date.setHours(0, 0, 0, 0);
  return date;
}

export type TimeRemaining = {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
};

export function getTimeRemaining(now = new Date()): TimeRemaining {
  const target = getWeddingDate();
  const total = target.getTime() - now.getTime();
  const isPast = total <= 0;
  const remaining = Math.max(0, total);

  return {
    total,
    days: Math.floor(remaining / (1000 * 60 * 60 * 24)),
    hours: Math.floor((remaining / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((remaining / (1000 * 60)) % 60),
    seconds: Math.floor((remaining / 1000) % 60),
    isPast,
  };
}
