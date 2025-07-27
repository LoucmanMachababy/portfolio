import { Inter } from "next/font/google";
import "./globals.css";
import { SoundProvider } from "@/contexts/SoundContext";
import { ThemeProvider } from "@/contexts/ThemeContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Loucman Machababy – Développeur web | Annecy & Lyon",
  description: "Développeur web freelance à Annecy et Lyon. Création de sites vitrines, e-commerce, applications React/Next.js. Devis gratuit et maintenance incluse.",
  keywords: "développeur web Annecy, développeur web Lyon, création site internet, freelance web, React Next.js, site vitrine, e-commerce",
  author: "Loucman Machababy",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Loucman Machababy – Développeur web | Annecy & Lyon",
    description: "Développeur web freelance à Annecy et Lyon. Création de sites vitrines, e-commerce, applications React/Next.js.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Loucman Machababy - Développeur web",
              "description": "Développeur web freelance spécialisé en création de sites vitrines, e-commerce et applications React/Next.js à Annecy et Lyon",
              "url": "https://loucman-machababy.fr",
              "telephone": "+33627097724",
              "email": "machababyloucman@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Annecy",
                "addressRegion": "Haute-Savoie",
                "addressCountry": "FR"
              },
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Annecy"
                },
                {
                  "@type": "City",
                  "name": "Lyon"
                }
              ],
              "serviceType": [
                "Création de site web",
                "Développement e-commerce",
                "Applications React",
                "Maintenance web",
                "SEO technique"
              ],
              "priceRange": "€€",
              "openingHours": "Mo-Fr 09:00-18:00"
            })
          }}
        />
      </head>
      <SoundProvider>
        <ThemeProvider>
          <body className={inter.className}>{children}</body>
        </ThemeProvider>
      </SoundProvider>
    </html>
  );
}
