import { ConfettiCelebration } from "@/components/Confetti";
import { Countdown } from "@/components/Countdown";
import { WishesWall } from "@/components/WishesWall";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <div className="page-bg min-h-screen">
      <ConfettiCelebration />
      <div className="page-content mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        {/* Countdown — ימים | שעות | דקות | שניות משמאל לימין */}
        <section className="animate-fade-up text-center">
          <Countdown />
        </section>

        {/* תאריך עברי */}
        <p className="animate-fade-up animate-fade-up-delay-1 mt-10 text-center font-display text-3xl text-gold-dark sm:text-4xl">
          {siteConfig.hebrewDateLabel}
        </p>

        {/* מזל טוב ענק */}
        <h1 className="hero-mazel-tov animate-fade-up animate-fade-up-delay-1 mt-8 text-center font-display">
          מזל טוב
        </h1>

        {/* כותרות */}
        <p className="animate-fade-up animate-fade-up-delay-2 mt-6 text-center text-xl font-medium text-burgundy/80 sm:text-2xl">
          {siteConfig.subtitle}
        </p>
        <p className="animate-fade-up animate-fade-up-delay-2 mt-3 text-center font-display text-3xl font-bold text-burgundy sm:text-4xl md:text-5xl">
          {siteConfig.weddingTitle}
        </p>

        {/* ברכות ואיחולים */}
        <div className="animate-fade-up animate-fade-up-delay-3 mt-16 sm:mt-20">
          <WishesWall />
        </div>

        {/* בנין עדי עד */}
        <footer className="footer-blessing mt-16 pb-10 text-center font-display">
          בנין עדי עד!!!
        </footer>
      </div>
    </div>
  );
}
