'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Palette, Zap, Server, ArrowUpRight } from 'lucide-react';

const features = [
  {
    icon: Code,
    title: 'Développement Frontend',
    description: 'Création d\'interfaces modernes et réactives avec React, Next.js et TypeScript.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Server,
    title: 'Architecture Backend',
    description: 'APIs robustes et sécurisées avec Node.js, Express et bases de données SQL/NoSQL.',
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  {
    icon: Palette,
    title: 'Design UI/UX',
    description: 'Interfaces intuitives et esthétiques centrées sur l\'expérience utilisateur.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Optimisation avancée pour des temps de chargement ultra-rapides et un SEO optimal.',
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
  },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="section-padding relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-20 pointer-events-none" />

      <div className="container relative z-10">
        <div className="mb-20 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-heading mb-6 leading-tight">
              Plus qu'un simple <br />
              <span className="text-gradient">développeur web</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Avec une double compétence en <span className="text-foreground font-medium">design</span> et en <span className="text-foreground font-medium">développement</span>,
              je ne me contente pas d'écrire du code. Je conçois des solutions complètes qui répondent à vos besoins business tout en offrant une expérience utilisateur exceptionnelle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="p-4 rounded-2xl bg-card border border-border/50 shadow-sm">
                <h4 className="font-bold text-xl text-primary mb-1">Créatif</h4>
                <p className="text-sm text-muted-foreground">Design moderne et unique</p>
              </div>
              <div className="p-4 rounded-2xl bg-card border border-border/50 shadow-sm">
                <h4 className="font-bold text-xl text-secondary mb-1">Technique</h4>
                <p className="text-sm text-muted-foreground">Code propre et optimisé</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Photo */}
        <motion.div
          className="mb-20 max-w-md mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative group overflow-hidden rounded-2xl glass-card p-2">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
              <Image
                src="/images/photo-salomon.JPG"
                alt="Loucman Machababy"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <div className={`w-12 h-12 ${feature.bg} ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 flex items-center justify-between">
                  {feature.title}
                  <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
