'use client';

import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import MainMenu from '../components/MainMenu';
import ProjectsSection from '../components/ProjectsSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import ServicesSection from '../components/ServicesSection';

export default function Home() {
  const [activeSection, setActiveSection] = useState(null);

  const handleSelectSection = (section) => {
    setActiveSection(section);
  };

  const backToMenu = () => {
    setActiveSection(null);
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: -20,
    },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'services':
        return <ServicesSection onBack={backToMenu} />;
      case 'projects':
        return <ProjectsSection onBack={backToMenu} />;
      case 'about':
        return <AboutSection onBack={backToMenu} />;
      case 'contact':
        return <ContactSection onBack={backToMenu} />;
      default:
        return <MainMenu onSelectSection={handleSelectSection} />;
    }
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection || 'main'}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
