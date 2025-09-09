'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'machababyloucman@gmail.com',
    href: 'mailto:machababyloucman@gmail.com',
  },
  {
    icon: Phone,
    label: 'Téléphone',
    value: '+33 6 27 09 77 24',
    href: 'tel:+33627097724',
  },
  {
    icon: MapPin,
    label: 'Localisation',
    value: 'Annecy & Lyon, France',
    href: '#',
  },
  {
    icon: Clock,
    label: 'Disponibilité',
    value: 'Lun - Ven, 9h - 18h',
    href: '#',
  },
];

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-padding">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-heading mb-6">
            Travaillons ensemble
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Vous avez un projet en tête ? N'hésitez pas à me contacter pour discuter 
            de vos besoins et obtenir un devis personnalisé.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Informations de contact
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Icon size={24} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        {info.href.startsWith('mailto:') || info.href.startsWith('tel:') ? (
                          <a
                            href={info.href}
                            className="text-foreground hover:text-primary transition-colors font-medium"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-foreground font-medium">{info.value}</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Quick response */}
            <motion.div
              className="bg-card border border-border rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="text-lg font-semibold text-foreground mb-3">
                Réponse rapide garantie
              </h4>
              <p className="text-muted-foreground text-sm mb-4">
                Je m'engage à vous répondre dans les 24h pour tous vos projets.
              </p>
              <div className="flex items-center space-x-2 text-primary">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-medium">Disponible maintenant</span>
              </div>
            </motion.div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            className="bg-gradient-to-br from-primary/10 to-purple-600/10 border border-primary/20 rounded-2xl p-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto">
                <Mail size={32} className="text-white" />
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  Prêt à démarrer ?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Contactez-moi dès maintenant pour discuter de votre projet 
                  et obtenir un devis gratuit sous 24h.
                </p>
              </div>

              <div className="space-y-4">
                <Link
                  href="/contact"
                  className="btn-primary px-8 py-3 rounded-lg flex items-center justify-center space-x-2 w-full group"
                >
                  <span>Me contacter</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                
              </div>

              <div className="pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  <strong>Devis gratuit</strong> • <strong>Maintenance incluse 3 mois</strong> • <strong>Formation à l'utilisation</strong>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


