import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { LoadingScreen } from '@/components/LoadingScreen';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Loucman Machababy - Développeur Web',
    template: '%s | Loucman Machababy'
  },
  description: 'Développeur web freelance à Annecy et Lyon. Création de sites vitrines, e-commerce, applications React/Next.js. Devis gratuit et maintenance incluse.',
  keywords: [
    'développeur web',
    'Annecy',
    'Lyon',
    'freelance',
    'React',
    'Next.js',
    'TypeScript',
    'site vitrine',
    'e-commerce',
    'création site internet'
  ],
  authors: [{ name: 'Loucman Machababy' }],
  creator: 'Loucman Machababy',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://loucman-machababy.fr',
    title: 'Loucman Machababy - Développeur Web',
    description: 'Développeur web freelance à Annecy et Lyon. Création de sites vitrines, e-commerce, applications React/Next.js.',
    siteName: 'Loucman Machababy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loucman Machababy - Développeur Web',
    description: 'Développeur web freelance à Annecy et Lyon. Création de sites vitrines, e-commerce, applications React/Next.js.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Loucman Machababy',
              jobTitle: 'Développeur Web',
              description: 'Développeur web freelance spécialisé en création de sites vitrines, e-commerce et applications React/Next.js',
              url: 'https://loucman-machababy.fr',
              telephone: '+33627097724',
              email: 'machababyloucman@gmail.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Annecy',
                addressRegion: 'Haute-Savoie',
                addressCountry: 'FR',
              },
              sameAs: [
                'https://github.com/loucmanmachababy',
                'https://linkedin.com/in/loucman-machababy',
              ],
              knowsAbout: [
                'React',
                'Next.js',
                'TypeScript',
                'Node.js',
                'Développement Web',
                'E-commerce',
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        <ThemeProvider>
          <LoadingScreen />
          <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}


