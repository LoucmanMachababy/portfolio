'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Code, Palette, Zap, Users } from 'lucide-react';

const features = [
  {
    icon: Code,
    title: 'Développement Web',
    description: 'Création de sites web modernes et performants avec les dernières technologies.',
  },
  {
    icon: Palette,
    title: 'Design UI/UX',
    description: 'Interfaces utilisateur intuitives et esthétiques pour une expérience optimale.',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Optimisation des performances pour des sites rapides et efficaces.',
  },
  {
    icon: Users,
    title: 'Support Client',
    description: 'Accompagnement personnalisé et formation à l\'utilisation de vos outils.',
  },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="section-padding bg-muted/30">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32 rounded-3xl overflow-hidden ring-4 ring-primary/20 shadow-2xl">
              <Image
                src="/images/loucman-machababy.jpg"
                alt="Loucman Machababy"
                fill
                className="object-cover"
                sizes="128px"
                priority
              />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-heading mb-6">
            Pourquoi me choisir ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Avec plus de 2 ans d'expérience dans le développement web et mobile, je vous accompagne 
            dans la création de solutions digitales modernes et performantes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Icon size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">30+</div>
            <div className="text-muted-foreground">Projets réalisés</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">2+</div>
            <div className="text-muted-foreground">Années d'expérience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">100%</div>
            <div className="text-muted-foreground">Clients satisfaits</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
