import React from 'react';
import { Metadata } from 'next';
import { ContactPage } from '@/components/pages/ContactPage';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez-moi pour discuter de votre projet web. Devis gratuit sous 24h. Développeur freelance à Annecy et Lyon.',
};

export default function ContactPageRoute() {
  return <ContactPage />;
}


