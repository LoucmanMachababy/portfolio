import React from 'react';
import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { ContactSection } from '@/components/sections/ContactSection';

export const metadata: Metadata = {
  title: 'Accueil',
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
  openGraph: {
    title: 'Loucman Machababy - Développeur Web',
    description: 'Développeur web freelance à Annecy et Lyon. Création de sites vitrines, e-commerce, applications React/Next.js.',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <PricingSection />
      <ContactSection />
    </>
  );
}
