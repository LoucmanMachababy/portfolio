'use client';

import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import PackOpeningScreen from '../components/PackOpeningScreen';
import MainMenu from '../components/MainMenu';
import ProjectsSection from '../components/ProjectsSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import GoldenParticles from '../components/GoldenParticles';
import useSoundEffects from '../hooks/useSoundEffects';
import CustomCursor from '@/components/CustomCursor';
import VideoBackground, { VAREffect } from '@/components/VideoBackground';
import MuteButton from '../components/MuteButton';
import PenaltyMiniGame from '../components/PenaltyMiniGame';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  const [showVAR, setShowVAR] = useState(false);
  const [pendingSection, setPendingSection] = useState(null);
  const { playSwoosh } = useSoundEffects();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // On ne veut pas jouer le son au tout premier chargement de la page
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!loading) {
      playSwoosh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection, loading]);

  const handleLoaded = () => {
    setLoading(false);
  };

  const handleSelectSection = (section) => {
    // Effet VAR uniquement pour contact ou projects
    if (section === 'contact' || section === 'projects') {
      setShowVAR(true);
      setPendingSection(section);
    } else {
      setActiveSection(section);
    }
  };

  // Quand l'effet VAR se termine, on affiche la section
  useEffect(() => {
    if (!showVAR && pendingSection) {
      setActiveSection(pendingSection);
      setPendingSection(null);
    }
  }, [showVAR, pendingSection]);

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
      case 'projects':
        return <ProjectsSection onBack={backToMenu} />;
      case 'about':
        return <AboutSection onBack={backToMenu} />;
      case 'contact':
        return <ContactSection onBack={backToMenu} />;
      case 'penalty':
        return <PenaltyMiniGame onBack={backToMenu} />;
      default:
        return <MainMenu onSelectSection={handleSelectSection} showPenaltyButton />;
    }
  };

  return (
    <div>
      <Head>
        <title>FIFA Portfolio - Loucman MACHABABY</title>
        <meta name="description" content="Portfolio de Loucman MACHABABY - Développeur Full-Stack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CustomCursor />
      <VideoBackground />
      <VAREffect show={showVAR} onComplete={() => setShowVAR(false)} />

      {/* Particules dorées FIFA */}
      <GoldenParticles />
      
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loading">
            <PackOpeningScreen onLoaded={handleLoaded} />
          </motion.div>
        ) : (
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
        )}
      </AnimatePresence>

      {!loading && <MuteButton />}
    </div>
  );
}
