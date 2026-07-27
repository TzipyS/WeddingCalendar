import { Countdown } from "@/components/Countdown";
import { WishesWall } from "@/components/WishesWall";
import { siteConfig } from "@/config/site";
import { getWeddingDate } from "@/lib/hebrew-date";

export default function Home() {
  const weddingDate = getWeddingDate();
  const gregorianLabel = new Intl.DateTimeFormat("he-IL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(weddingDate);

  return (
    <div className="page-bg min-h-screen">
      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        {/* Hero */}
        <header className="animate-fade-up text-center">
          <p className="text-sm font-medium tracking-[0.25em] text-gold uppercase">
            ספירה לחתונה
          </p>
          <h1 className="font-display mt-4 text-4xl font-medium leading-tight text-burgundy sm:text-5xl md:text-6xl">
            {siteConfig.coupleNames}
          </h1>
          <p className="mt-4 text-lg text-burgundy/65 sm:text-xl">{siteConfig.subtitle}</p>

          <div className="hero-divider mx-auto mt-8 max-w-xs" />

          <div className="mt-6 space-y-1">
            <p className="font-display text-2xl text-burgundy sm:text-3xl">
              {siteConfig.hebrewDateLabel}
            </p>
            <p className="text-sm text-burgundy/50">{gregorianLabel}</p>
          </div>
        </header>

        {/* Countdown */}
        <section className="animate-fade-up animate-fade-up-delay-1 mt-12 sm:mt-16">
          <Countdown />
        </section>

        {/* Quote */}
        <blockquote className="animate-fade-up animate-fade-up-delay-2 mx-auto mt-14 max-w-md text-center">
          <p className="font-display text-lg italic leading-relaxed text-burgundy/70 sm:text-xl">
            &ldquo;עוד רגע, ונפגש ביום המיוחד שלנו&rdquo;
          </p>
        </blockquote>

        {/* Wishes */}
        <div className="animate-fade-up animate-fade-up-delay-3 mt-16 sm:mt-20">
          <WishesWall />
        </div>

        <footer className="mt-16 pb-8 text-center text-xs text-burgundy/35">
          נבנה באהבה · שתפו את הקישור עם המשפחה והחברים
        </footer>
      </div>
    </div>
  );
}
