import type { Metadata } from "next";
import { Frank_Ruhl_Libre, Heebo, Rubik, Secular_One } from "next/font/google";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import "lenis/dist/lenis.css";
import "./globals.css";
import { siteConfig } from "@/config/site";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
});

const frankRuhl = Frank_Ruhl_Libre({
  variable: "--font-frank",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700", "900"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["hebrew", "latin"],
  weight: ["500", "600", "700", "800"],
});

const secularOne = Secular_One({
  variable: "--font-secular",
  subsets: ["hebrew", "latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: siteConfig.shareLinkName,
  description: `${siteConfig.weddingTitle} - ${siteConfig.subtitle} (${siteConfig.hebrewDateLabel})`,
  openGraph: {
    title: siteConfig.shareLinkName,
    description: `${siteConfig.weddingTitle} - ${siteConfig.hebrewDateLabel}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} ${frankRuhl.variable} ${rubik.variable} ${secularOne.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
