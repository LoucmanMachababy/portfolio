import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import "./globals.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://loucmanmachababy.dev"),
  title: {
    default: "Loucman Machababy — Portfolio Virage Auteuil",
    template: "%s | Loucman Machababy",
  },
  description:
    "Portfolio immersif de Loucman Machababy, développeur fullstack — coursives du Virage Auteuil, projets Maison Mayssa, Water Plomberie, Sportly.",
  keywords: [
    "Loucman Machababy",
    "développeur fullstack",
    "portfolio",
    "Epitech Web@cadémie",
    "Salomon",
    "Next.js",
  ],
  authors: [{ name: "Loucman Machababy" }],
  openGraph: {
    title: "Loucman Machababy — Portfolio Virage Auteuil",
    description:
      "Expérience première personne dans les coursives du Parc des Princes — projets et contact.",
    locale: "fr_FR",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0b0f14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Loucman Machababy",
              jobTitle: "Fullstack Developer",
              email: "mailto:machababyloucman@gmail.com",
              telephone: "+33627097724",
              url: "https://github.com/LoucmanMachababy",
              sameAs: [
                "https://github.com/LoucmanMachababy",
                "https://linkedin.com/in/loucman-machababy",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
