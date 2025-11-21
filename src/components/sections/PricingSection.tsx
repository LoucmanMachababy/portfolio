'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, Globe, RefreshCw, ShoppingCart, Wrench, Atom, TrendingUp, GraduationCap, Link as LinkIcon, ArrowRight, Server, Database, Sparkles } from 'lucide-react';
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
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
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
    color: 'text-green-500',
    bg: 'bg-green-500/10',
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
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
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
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
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
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
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
    color: 'text-red-500',
    bg: 'bg-red-500/10',
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
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10',
    popular: false,
  },
  {
    icon: LinkIcon,
    title: 'Intégration API',
    description: 'Connexion de votre site avec des services externes (CRM, paiement, etc.)',
    features: [
      'APIs tierces',
      'Synchronisation données',
      'Automatisation',
      'Tests complets'
    ],
    price: 'Sur devis',
    color: 'text-teal-500',
    bg: 'bg-teal-500/10',
    popular: false,
  },
  {
    icon: Server,
    title: 'Développement API REST',
    description: 'Création d\'APIs RESTful robustes et documentées pour vos applications',
    features: [
      'API REST/GraphQL',
      'Documentation Swagger',
      'Authentification JWT',
      'Tests & validation'
    ],
    price: 'À partir de 800€',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    popular: false,
  },
  {
    icon: Database,
    title: 'Architecture Backend',
    description: 'Conception et développement d\'architectures backend scalables et sécurisées',
    features: [
      'Architecture modulaire',
      'Base de données optimisée',
      'Sécurité renforcée',
      'Scalabilité'
    ],
    price: 'Sur devis',
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
    popular: false,
  },
];

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" ref={ref} className="section-padding relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 skew-x-12 translate-x-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-secondary/5 -skew-x-12 -translate-x-20 pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-xl mb-4">
            <Sparkles className="w-6 h-6 text-primary mr-2" />
            <span className="text-primary font-semibold">Offres & Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-heading mb-6">
            Mes <span className="text-gradient">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Des solutions web sur mesure, adaptées à vos besoins et à votre budget.
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
                  'glass-card p-6 h-full transition-all duration-300 group-hover:-translate-y-2',
                  service.popular ? 'border-primary shadow-lg shadow-primary/10 ring-1 ring-primary/50' : 'hover:border-primary/30'
                )}>
                  {/* Popular badge */}
                  {service.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                      <span className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                        Populaire
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={cn(
                    'w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300',
                    service.bg
                  )}>
                    <Icon size={28} className={service.color} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed min-h-[60px]">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <div className="mt-1 w-4 h-4 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                          <Check size={10} className="text-green-500" />
                        </div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="mt-auto pt-6 border-t border-border/50">
                    <div className="text-lg font-bold text-foreground mb-4 text-center">
                      {service.price}
                    </div>
                    <a
                      href="/contact"
                      className={cn(
                        'w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center space-x-2 group/btn',
                        service.popular
                          ? 'btn-primary shadow-lg shadow-primary/20'
                          : 'bg-card border border-border hover:border-primary/50 hover:bg-primary/5 text-foreground'
                      )}
                    >
                      <span>Commander</span>
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative overflow-hidden rounded-3xl p-1">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-20 blur-xl" />
            <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-[22px] p-10 max-w-4xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Besoin d'un devis personnalisé ?
              </h3>
              <p className="text-muted-foreground mb-8 text-lg">
                Chaque projet est unique. Contactez-moi pour discuter de vos besoins spécifiques et obtenir une estimation précise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="btn-primary px-8 py-4 rounded-xl flex items-center justify-center space-x-2 text-lg shadow-xl shadow-primary/20">
                  <span>Demander un devis gratuit</span>
                  <ArrowRight size={20} />
                </a>
                <a href="/contact" className="px-8 py-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 flex items-center justify-center space-x-2 text-lg font-medium">
                  <span>Planifier un appel</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


