'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Server, Database, Shield, Zap, Code, GitBranch, Lock, Cloud, Layers } from 'lucide-react';

const backendFeatures = [
  {
    icon: Server,
    title: 'Architecture Backend',
    description: 'Conception d\'architectures backend modulaires, scalables et maintenables avec Node.js, Express et PHP/Laravel.',
    details: [
      'Architecture MVC & Clean Architecture',
      'API REST & GraphQL',
      'Microservices & Monolith modulaire',
      'Patterns de design (Repository, Factory, etc.)'
    ],
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'hover:border-blue-500/50',
  },
  {
    icon: Database,
    title: 'Bases de Données',
    description: 'Gestion et optimisation de bases de données SQL et NoSQL pour des performances optimales.',
    details: [
      'MySQL, PostgreSQL (SQL)',
      'MongoDB, Firebase (NoSQL)',
      'Optimisation de requêtes',
      'Migrations & schémas'
    ],
    color: 'text-green-500',
    bg: 'bg-green-500/10',
    border: 'hover:border-green-500/50',
  },
  {
    icon: Shield,
    title: 'Sécurité & Authentification',
    description: 'Implémentation de systèmes d\'authentification robustes et sécurisés avec protection contre les vulnérabilités.',
    details: [
      'JWT & OAuth 2.0',
      'RBAC (Role-Based Access Control)',
      'Protection CSRF, XSS, SQL Injection',
      'Chiffrement & hashage sécurisé'
    ],
    color: 'text-red-500',
    bg: 'bg-red-500/10',
    border: 'hover:border-red-500/50',
  },
  {
    icon: Zap,
    title: 'Performance & Scalabilité',
    description: 'Optimisation des performances serveur et préparation à la montée en charge.',
    details: [
      'Cache (Redis, Memcached)',
      'Load balancing',
      'Optimisation des requêtes DB',
      'CDN & compression'
    ],
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
    border: 'hover:border-yellow-500/50',
  },
  {
    icon: Code,
    title: 'APIs & Intégrations',
    description: 'Développement d\'APIs REST/GraphQL et intégration de services tiers (Stripe, SendGrid, etc.).',
    details: [
      'APIs RESTful & GraphQL',
      'Webhooks & Event-driven',
      'Intégrations tierces (Stripe, PayPal)',
      'Documentation API (Swagger/OpenAPI)'
    ],
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    border: 'hover:border-purple-500/50',
  },
  {
    icon: Cloud,
    title: 'DevOps & Déploiement',
    description: 'Mise en place de pipelines CI/CD, containerisation et déploiement cloud.',
    details: [
      'Docker & Docker Compose',
      'CI/CD (GitHub Actions, GitLab CI)',
      'Déploiement cloud (Vercel, AWS, Heroku)',
      'Monitoring & logging'
    ],
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10',
    border: 'hover:border-indigo-500/50',
  },
];

export function BackendSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="backend" ref={ref} className="section-padding relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-background/80 pointer-events-none z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-20">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-xl mb-4">
            <Layers className="w-6 h-6 text-primary mr-2" />
            <span className="text-primary font-semibold">Architecture & Système</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-heading mb-6">
            Développement <span className="text-gradient">Backend</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Création d'architectures robustes, sécurisées et scalables.
            De la conception d'APIs à l'optimisation des bases de données, je développe la logique métier qui fait fonctionner vos applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {backendFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className={`group glass-card p-8 transition-all duration-300 hover:-translate-y-2 ${feature.border}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Icon */}
                <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={28} className={feature.color} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                  {feature.description}
                </p>

                {/* Details */}
                <ul className="space-y-3 pt-6 border-t border-border/50">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start space-x-3 text-sm">
                      <div className={`mt-1 w-1.5 h-1.5 rounded-full ${feature.bg.replace('/10', '')}`} />
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="glass-card p-8 text-center group hover:border-primary/50 transition-colors">
            <div className="text-4xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">15+</div>
            <div className="text-muted-foreground font-medium">APIs développées</div>
          </div>
          <div className="glass-card p-8 text-center group hover:border-secondary/50 transition-colors">
            <div className="text-4xl font-bold text-gradient-secondary mb-2 group-hover:scale-110 transition-transform duration-300">10+</div>
            <div className="text-muted-foreground font-medium">Bases de données optimisées</div>
          </div>
          <div className="glass-card p-8 text-center group hover:border-accent/50 transition-colors">
            <div className="text-4xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-300">100%</div>
            <div className="text-muted-foreground font-medium">Sécurité & Performance</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


