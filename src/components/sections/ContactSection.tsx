'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Phone, MapPin, Clock, ArrowRight, Send, MessageSquare } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'machababyloucman@gmail.com',
    href: 'mailto:machababyloucman@gmail.com',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Phone,
    label: 'Téléphone',
    value: '+33 6 27 09 77 24',
    href: 'tel:+33627097724',
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  {
    icon: MapPin,
    label: 'Localisation',
    value: 'Annecy & Lyon, France',
    href: '#',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Clock,
    label: 'Disponibilité',
    value: 'Lun - Ven, 9h - 18h',
    href: '#',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
  },
];

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" ref={ref} className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-xl mb-4">
            <MessageSquare className="w-6 h-6 text-primary mr-2" />
            <span className="text-primary font-semibold">Contact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-heading mb-6">
            Travaillons <span className="text-gradient">ensemble</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Vous avez un projet en tête ? N'hésitez pas à me contacter pour discuter
            de vos besoins et obtenir un devis personnalisé.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-foreground mb-8">
                Informations de contact
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-4 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className={`w-12 h-12 ${info.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={24} className={info.color} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        {info.href.startsWith('mailto:') || info.href.startsWith('tel:') ? (
                          <a
                            href={info.href}
                            className="text-foreground hover:text-primary transition-colors font-medium text-lg"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-foreground font-medium text-lg">{info.value}</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Quick response */}
            <motion.div
              className="glass-card p-6 border-l-4 border-l-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary/10 rounded-full shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-2">
                    Réponse rapide garantie
                  </h4>
                  <p className="text-muted-foreground text-sm mb-3">
                    Je m'engage à vous répondre dans les 24h pour tous vos projets.
                  </p>
                  <div className="flex items-center space-x-2 text-green-500 bg-green-500/10 px-3 py-1 rounded-full w-fit">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wide">Disponible maintenant</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-3xl rotate-6 opacity-20 blur-xl" />
            <div className="glass-card p-10 relative">
              <div className="text-center space-y-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-primary/20 rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Send size={40} className="text-white" />
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-4">
                    Prêt à démarrer ?
                  </h3>
                  <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                    Contactez-moi dès maintenant pour discuter de votre projet
                    et obtenir un devis gratuit sous 24h.
                  </p>
                </div>

                <div className="space-y-6">
                  <Link
                    href="/contact"
                    className="btn-primary w-full py-4 text-lg rounded-xl flex items-center justify-center space-x-2 group shadow-xl shadow-primary/20"
                  >
                    <span>Me contacter</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border/50">
                    <div className="text-center">
                      <div className="text-primary font-bold mb-1">Gratuit</div>
                      <div className="text-xs text-muted-foreground">Devis détaillé</div>
                    </div>
                    <div className="text-center border-l border-r border-border/50">
                      <div className="text-primary font-bold mb-1">3 Mois</div>
                      <div className="text-xs text-muted-foreground">Maintenance offerte</div>
                    </div>
                    <div className="text-center">
                      <div className="text-primary font-bold mb-1">Inclus</div>
                      <div className="text-xs text-muted-foreground">Formation admin</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


