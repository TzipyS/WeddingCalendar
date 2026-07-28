import dynamic from "next/dynamic";
import { BackgroundMusic } from "@/components/BackgroundMusic";
import { ShareByEmailButton } from "@/components/ShareByEmailButton";
import { Countdown } from "@/components/Countdown";
import { ScrollMazelTov } from "@/components/ScrollMazelTov";
import { ScrollReveal } from "@/components/ScrollReveal";
import { WishesWall } from "@/components/WishesWall";
import { siteConfig } from "@/config/site";

const ConfettiCelebration = dynamic(
  () => import("@/components/Confetti").then((mod) => mod.ConfettiCelebration),
  { ssr: false },
);

export default function Home() {
  return (
    <div className="page-bg min-h-screen">
      <ScrollMazelTov />
      <ShareByEmailButton />
      <BackgroundMusic />
      <ConfettiCelebration />
      <div className="page-content mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        {/* ספירה */}
        <ScrollReveal>
          <section className="text-center">
            <div className="frame-countdown">
              <Countdown />
            </div>
          </section>
        </ScrollReveal>

        {/* תאריך עברי */}
        <ScrollReveal delay={80}>
          <p className="text-date mt-12 text-center font-display">{siteConfig.hebrewDateLabel}</p>
          <div className="festive-divider" aria-hidden="true" />
        </ScrollReveal>

        {/* מזל טוב */}
        <ScrollReveal delay={120}>
          <div className="mt-8 flex justify-center">
            <h1 className="hero-mazel-tov-badge font-secular">מזל טוב</h1>
          </div>
        </ScrollReveal>

        {/* כותרות */}
        <ScrollReveal delay={160}>
          <p className="text-subtitle mt-10 text-center font-rubik">{siteConfig.subtitle}</p>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <div className="mt-8">
            <p className="text-wedding-title festive-panel--hero font-secular">
              {siteConfig.weddingTitle}
            </p>
          </div>
        </ScrollReveal>

        {/* ברכות ואיחולים */}
        <ScrollReveal delay={240}>
          <div className="mt-16 sm:mt-20">
            <WishesWall />
          </div>
        </ScrollReveal>

        {/* בנין עדי עד */}
        <ScrollReveal delay={280}>
          <footer className="footer-blessing mt-16 pb-10 text-center font-display">
            בנין עדי עד!!!
          </footer>
          <div className="festive-divider" aria-hidden="true" />
        </ScrollReveal>
      </div>
    </div>
  );
}
