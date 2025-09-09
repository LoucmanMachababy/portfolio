'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ProjectVideoCarousel } from '@/components/ProjectVideoCarousel';

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" ref={ref} className="section-padding bg-muted/30">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-heading mb-6">
            Projets en démonstration
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Découvrez mes projets récents en action à travers ces démonstrations vidéo 
            qui montrent l'interface utilisateur et les fonctionnalités en temps réel.
          </p>
        </motion.div>

        {/* Video Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ProjectVideoCarousel />
        </motion.div>
      </div>
    </section>
  );
}
