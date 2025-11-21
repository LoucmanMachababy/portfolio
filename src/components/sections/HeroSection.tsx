'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Download, MapPin, CheckCircle, Sparkles, Code2, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

const stats = [
  { value: '30+', label: 'Projets réalisés', icon: Rocket },
  { value: '2+', label: 'Années d\'expérience', icon: Sparkles },
  { value: '100%', label: 'Clients satisfaits', icon: CheckCircle },
];

const guarantees = [
  'Devis gratuit sous 24h',
  'Maintenance incluse',
  'Formation offerte',
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse-glow delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            className="space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-background/50 backdrop-blur-md border border-primary/20 rounded-full text-sm font-medium shadow-lg shadow-primary/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-foreground/80">Disponible pour de nouveaux projets</span>
            </motion.div>

            {/* Title */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground font-heading leading-tight tracking-tight">
                Je crée des expériences <br />
                <span className="text-gradient">web d'exception</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Développeur <span className="text-foreground font-semibold">Full-Stack</span> passionné.
                Je transforme vos idées complexes en solutions digitales <span className="text-primary font-medium">élégantes</span> et <span className="text-secondary font-medium">performantes</span>.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Link
                href="/contact"
                className="btn-primary px-8 py-4 text-lg rounded-xl flex items-center justify-center space-x-2 group shadow-xl shadow-primary/20"
              >
                <span>Démarrer un projet</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={() => {
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-outline px-8 py-4 text-lg rounded-xl flex items-center justify-center space-x-2 bg-background/50 backdrop-blur-sm"
              >
                <span>Voir mon portfolio</span>
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="pt-8 flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {guarantees.map((item, i) => (
                <div key={i} className="flex items-center space-x-2 bg-card/50 px-3 py-1.5 rounded-lg border border-border/50">
                  <CheckCircle size={16} className="text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            className="relative lg:h-[600px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Main Glass Card */}
            <div className="relative w-full max-w-md aspect-[4/5] glass-card p-4 rotate-3 hover:rotate-0 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 rounded-2xl" />

              <div className="relative h-full w-full rounded-xl overflow-hidden">
                <Image
                  src="/images/loucman-machababy.jpg"
                  alt="Loucman Machababy"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 500px"
                  priority
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Card Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">Loucman Machababy</h3>
                  <p className="text-white/80 flex items-center gap-2">
                    <MapPin size={16} /> Annecy & Lyon
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Stats Cards */}
            <motion.div
              className="absolute top-10 -left-4 sm:left-0 glass-card p-4 flex items-center gap-3 floating"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Code2 size={24} />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Stack</div>
                <div className="font-bold">React & Next.js</div>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-20 -right-4 sm:right-0 glass-card p-4 flex items-center gap-3 floating-delayed"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                <Rocket size={24} />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Projets</div>
                <div className="font-bold">30+ Réalisés</div>
              </div>
            </motion.div>

            {/* Tech Stack Orbit */}
            <div className="absolute inset-0 pointer-events-none">
              {['React', 'Node', 'Next', 'TS'].map((tech, i) => (
                <motion.div
                  key={tech}
                  className="absolute w-12 h-12 glass-card flex items-center justify-center text-xs font-bold text-foreground/80 rounded-full shadow-lg"
                  animate={{
                    y: [0, -10, 0],
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                  style={{
                    top: `${20 + i * 20}%`,
                    left: i % 2 === 0 ? '-10%' : '90%',
                  }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
