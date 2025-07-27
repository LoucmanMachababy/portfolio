'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const services = [
  {
    title: "Création de site vitrine",
    description: "Site web professionnel pour présenter votre activité et attirer de nouveaux clients",
    features: ["Design moderne et responsive", "Optimisation SEO", "Formulaire de contact", "Hébergement inclus"],
    icon: "🌐",
    price: "À partir de 600€"
  },
  {
    title: "Refonte de site web",
    description: "Modernisation de votre site existant pour améliorer performances et conversions",
    features: ["Audit complet", "Nouveau design", "Optimisation vitesse", "Migration sécurisée"],
    icon: "🔄",
    price: "À partir de 400€"
  },
  {
    title: "Site e-commerce",
    description: "Boutique en ligne complète pour vendre vos produits sur internet",
    features: ["Catalogue produits", "Paiement sécurisé", "Gestion commandes", "Tableau de bord"],
    icon: "🛒",
    price: "À partir de 1200€"
  },
  {
    title: "Maintenance & Support",
    description: "Suivi technique et mises à jour pour garantir la sécurité de votre site",
    features: ["Sauvegardes automatiques", "Mises à jour sécurité", "Support technique", "Monitoring 24/7"],
    icon: "🔧",
    price: "À partir de 50€/mois"
  },
  {
    title: "Applications React/Next.js",
    description: "Développement d'applications web modernes et performantes sur mesure",
    features: ["Technologies modernes", "Interface interactive", "Performance optimisée", "Évolutivité"],
    icon: "⚛️",
    price: "Sur devis"
  },
  {
    title: "SEO technique",
    description: "Optimisation pour les moteurs de recherche et amélioration du référencement",
    features: ["Audit SEO complet", "Optimisation technique", "Amélioration vitesse", "Suivi positions"],
    icon: "📈",
    price: "À partir de 300€"
  },
  {
    title: "Formation & Conseil",
    description: "Accompagnement pour gérer votre site web en autonomie",
    features: ["Formation personnalisée", "Documentation", "Support continu", "Conseils stratégiques"],
    icon: "🎓",
    price: "150€/session"
  },
  {
    title: "Intégration API",
    description: "Connexion de votre site avec des services externes (CRM, paiement, etc.)",
    features: ["APIs tierces", "Synchronisation données", "Automatisation", "Tests complets"],
    icon: "🔗",
    price: "Sur devis"
  }
];

const ServicesSection = ({ onBack }) => {
  return (
    <section className="services-section">
      <ThemeToggle />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="section-header">
          <button className="back-button" onClick={onBack} style={{ marginRight: 16 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Retour au menu
          </button>
          <h2 className="section-title">Mes Services</h2>
          <p className="section-subtitle">Solutions web complètes pour développer votre présence en ligne</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="service-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <div className="service-price">{service.price}</div>
            </motion.div>
          ))}
        </div>

        <div className="services-cta">
          <h3>Besoin d'un devis personnalisé ?</h3>
          <p>Chaque projet est unique. Contactez-moi pour discuter de vos besoins spécifiques.</p>
          <div className="cta-buttons">
            <a 
              href="mailto:machababyloucman@gmail.com?subject=Demande de devis - Développement web&body=Bonjour Loucman,%0D%0A%0D%0AJe souhaiterais obtenir un devis pour :" 
              className="cta-primary"
            >
              Demander un devis gratuit
            </a>
            <a
              href="https://calendly.com/machababyloucman/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-secondary"
            >
              Planifier un appel
            </a>
          </div>
        </div>

        <div className="process-section">
          <h3>Comment ça marche ?</h3>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h4>Échange initial</h4>
              <p>Discussion de vos besoins et objectifs</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h4>Devis détaillé</h4>
              <p>Proposition technique et commerciale</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h4>Développement</h4>
              <p>Création de votre solution sur mesure</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h4>Livraison</h4>
              <p>Mise en ligne et formation</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ServicesSection;
