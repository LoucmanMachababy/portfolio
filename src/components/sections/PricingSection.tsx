'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, Globe, RefreshCw, ShoppingCart, Wrench, Atom, TrendingUp, GraduationCap, Link, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  {
    icon: Globe,
    title: 'Création de site vitrine',
    description: 'Site web professionnel pour présenter votre activité et attirer de nouveaux clients',
    features: [
      'Design moderne et responsive',
      'Optimisation SEO',
      'Formulaire de contact',
      'Hébergement inclus'
    ],
    price: 'À partir de 400€',
    color: 'bg-blue-500',
    popular: false,
  },
  {
    icon: RefreshCw,
    title: 'Refonte de site web',
    description: 'Modernisation de votre site existant pour améliorer performances et conversions',
    features: [
      'Audit complet',
      'Nouveau design',
      'Optimisation vitesse',
      'Migration sécurisée'
    ],
    price: 'À partir de 300€',
    color: 'bg-green-500',
    popular: false,
  },
  {
    icon: ShoppingCart,
    title: 'Site e-commerce',
    description: 'Boutique en ligne complète pour vendre vos produits sur internet',
    features: [
      'Catalogue produits',
      'Paiement sécurisé',
      'Gestion commandes',
      'Tableau de bord'
    ],
    price: 'À partir de 1000€',
    color: 'bg-purple-500',
    popular: true,
  },
  {
    icon: Wrench,
    title: 'Maintenance & Support',
    description: 'Suivi technique et mises à jour pour garantir la sécurité de votre site',
    features: [
      'Sauvegardes automatiques',
      'Mises à jour sécurité',
      'Support technique',
      'Monitoring 24/7'
    ],
    price: 'À partir de 50€/mois',
    color: 'bg-orange-500',
    popular: false,
  },
  {
    icon: Atom,
    title: 'Applications React/Next.js',
    description: 'Développement d\'applications web modernes et performantes sur mesure',
    features: [
      'Technologies modernes',
      'Interface interactive',
      'Performance optimisée',
      'Évolutivité'
    ],
    price: 'Sur devis',
    color: 'bg-pink-500',
    popular: false,
  },
  {
    icon: TrendingUp,
    title: 'SEO technique',
    description: 'Optimisation pour les moteurs de recherche et amélioration du référencement',
    features: [
      'Audit SEO complet',
      'Optimisation technique',
      'Amélioration vitesse',
      'Suivi positions'
    ],
    price: 'À partir de 300€',
    color: 'bg-red-500',
    popular: false,
  },
  {
    icon: GraduationCap,
    title: 'Formation & Conseil',
    description: 'Accompagnement pour gérer votre site web en autonomie',
    features: [
      'Formation personnalisée',
      'Documentation',
      'Support continu',
      'Conseils stratégiques'
    ],
    price: '150€/session',
    color: 'bg-indigo-500',
    popular: false,
  },
  {
    icon: Link,
    title: 'Intégration API',
    description: 'Connexion de votre site avec des services externes (CRM, paiement, etc.)',
    features: [
      'APIs tierces',
      'Synchronisation données',
      'Automatisation',
      'Tests complets'
    ],
    price: 'Sur devis',
    color: 'bg-teal-500',
    popular: false,
  },
];

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" ref={ref} className="section-padding bg-muted/30">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-heading mb-6">
            Mes <span className="text-gradient">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Solutions web complètes pour développer votre présence en ligne
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={cn(
                  'bg-card border border-border rounded-2xl p-6 h-full transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl',
                  service.popular && 'ring-2 ring-primary'
                )}>
                  {/* Popular badge */}
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        Populaire
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
                    service.color
                  )}>
                    <Icon size={24} className="text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <Check size={16} className="text-green-500 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="mt-auto">
                    <a 
                      href="/contact"
                      className={cn(
                        'w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center space-x-2',
                        service.popular
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                          : 'bg-muted text-foreground hover:bg-muted/80 border border-border'
                      )}
                    >
                      <span>{service.price}</span>
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-gradient-to-br from-primary/10 to-purple-600/10 border border-primary/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Besoin d'un devis personnalisé ?
            </h3>
            <p className="text-muted-foreground mb-6">
              Chaque projet est unique. Contactez-moi pour discuter de vos besoins spécifiques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary px-8 py-3 rounded-lg flex items-center justify-center space-x-2">
                <span>Demander un devis gratuit</span>
                <ArrowRight size={18} />
              </a>
              <a href="/contact" className="btn-outline px-8 py-3 rounded-lg flex items-center justify-center space-x-2">
                <span>Planifier un appel</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


