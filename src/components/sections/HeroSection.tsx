'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Download, MapPin, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const stats = [
  { value: '30+', label: 'Projets réalisés' },
  { value: '2+', label: 'Années d\'expérience' },
  { value: '100%', label: 'Clients satisfaits' },
  { value: '24h', label: 'Temps de réponse' },
];

const guarantees = [
  'Devis gratuit sous 24h',
  'Maintenance incluse 3 mois',
  'Formation à l\'utilisation',
];

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 pb-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
              Disponible pour de nouveaux projets
            </motion.div>

            {/* Title */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground font-heading leading-tight">
                Bonjour, je suis{' '}
                <span className="text-gradient">Loucman Machababy</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Développeur web passionné, je transforme vos idées en solutions digitales innovantes. 
                Spécialisé en e-commerce, applications web modernes et expériences utilisateur exceptionnelles.
              </p>
            </motion.div>

            {/* Location */}
            <motion.div
              className="flex items-center space-x-2 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <MapPin size={20} />
              <span>Annecy & Lyon, France</span>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                href="/contact"
                className="btn-primary px-8 py-3 rounded-lg flex items-center justify-center space-x-2 group"
              >
                <span>Me contacter</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={() => {
                  const element = document.getElementById('projects');
                  if (element) {
                    element.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
                className="btn-outline px-8 py-3 rounded-lg flex items-center justify-center space-x-2"
              >
                <span>Voir mes projets</span>
              </button>
            </motion.div>

            {/* Guarantees */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {guarantees.map((guarantee, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-primary" />
                  <span className="text-muted-foreground">{guarantee}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-3xl blur-3xl" />
              
              {/* Main card */}
              <div className="relative bg-card border border-border rounded-3xl p-8 shadow-2xl">
                <div className="space-y-6">
                  {/* Profile */}
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-primary/20">
                      <Image
                        src="/images/loucman-machababy.jpg"
                        alt="Loucman Machababy"
                        fill
                        className="object-cover"
                        sizes="64px"
                        priority
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">
                        Loucman Machababy
                      </h3>
                      <p className="text-muted-foreground">
                        Développeur Web Full-Stack
                      </p>
                    </div>
                  </div>

                  {/* Skills badges */}
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind'].map((skill, index) => (
                      <motion.span
                        key={skill}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                    <div>
                      <p className="text-sm text-muted-foreground">Statut</p>
                      <p className="font-semibold text-foreground">Disponible</p>
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-white text-sm">💻</span>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <span className="text-white text-xs">⚡</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
