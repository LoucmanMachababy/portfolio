'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSoundEffects from '../hooks/useSoundEffects';
import ConfettiEffect from './ConfettiEffect';
import './PackOpeningScreen.css';
import { useSound as useSoundContext } from '../contexts/SoundContext';
import useSound from 'use-sound';

const PackOpeningScreen = ({ onLoaded }) => {
  const [stage, setStage] = useState('selection'); // selection, opening, revealing, complete
  const [selectedPack, setSelectedPack] = useState(null);
  const [revealStep, setRevealStep] = useState(0); // 0: nom, 1: note, 2: stats
  const [celebrationActive, setCelebrationActive] = useState(false);
  const { playClick, playSwoosh } = useSoundEffects();
  const { isMuted } = useSoundContext();
  const [playCelebration, { stop: stopCelebration, sound: celebrationSound }] = useSound('/sounds/celebration.mp3', { volume: isMuted ? 0 : 0.7, interrupt: true });
  const celebrationRef = useRef();
  const [floatingCards, setFloatingCards] = useState([]);

  // Votre carte personnalisée
  const playerCard = {
    firstName: 'Loucman',
    lastName: 'MACHABABY',
    rating: 90,
    type: 'Icon',
    isRare: true,
    skills: [
      { name: 'React', level: 92 },
      { name: 'PHP', level: 90 },
      { name: 'SQL', level: 88 },
    ],
    specialities: ['Full-Stack', 'Backend', 'Frontend'],
    club: 'Portfolio FC',
    league: 'Developer League'
  };

  const handlePackSelection = () => {
    playClick();
    setSelectedPack({ name: 'Gold Pack', color: '#ffd700', rarity: 'rare' });
    setStage('opening');
    
    // Démarrer l'animation d'ouverture
    setTimeout(() => {
      playSwoosh();
      setStage('revealing');
    }, 2000);
  };

  const handleCardReveal = () => {
    // Révélation progressive
    if (revealStep < 3) {
      setTimeout(() => {
        setRevealStep(prev => prev + 1);
      }, 1000);
    } else {
      // Activer la célébration
      playCelebration();
      celebrationRef.current = celebrationSound;
      setCelebrationActive(true);
      // Après la révélation complète, passer à l'étape finale
      setTimeout(() => {
        setStage('complete');
        setTimeout(() => {
          onLoaded();
        }, 2000);
      }, 5000); // Attendre la fin de la célébration
    }
  };

  useEffect(() => {
    if (stage === 'revealing') {
      handleCardReveal();
    }
  }, [stage, revealStep]);

  // Stoppe le son celebration si mute pendant la célébration
  useEffect(() => {
    if (celebrationActive && isMuted) {
      stopCelebration && stopCelebration();
      if (celebrationRef.current) {
        celebrationRef.current.stop();
      }
    }
  }, [celebrationActive, isMuted, stopCelebration]);

  useEffect(() => {
    // Génère les positions aléatoires une seule fois côté client
    const cards = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${3 + Math.random() * 4}s`
    }));
    setFloatingCards(cards);
  }, []);

  const packVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 20 
      }
    },
    hover: { 
      scale: 1.1, 
      rotate: 5,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const cardVariants = {
    hidden: { 
      x: -1000, 
      y: -500, 
      rotate: -45,
      opacity: 0 
    },
    visible: { 
      x: 0, 
      y: 0, 
      rotate: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }
    },
    exit: { 
      x: 1000, 
      y: -500, 
      rotate: 45,
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  const glowVariants = {
    pulse: {
      boxShadow: [
        "0 0 20px rgba(255, 215, 0, 0.5)",
        "0 0 40px rgba(255, 215, 0, 0.8)",
        "0 0 20px rgba(255, 215, 0, 0.5)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const revealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className={`pack-opening-screen ${celebrationActive ? 'screen-shake' : ''}`}>
      {/* Arrière-plan animé */}
      <div className="pack-bg-animation">
        <div className="floating-cards">
          {floatingCards.map((card, i) => (
            <div 
              key={i} 
              className="floating-card"
              style={card}
            />
          ))}
        </div>
      </div>
      
      {celebrationActive && <ConfettiEffect />}
      
      <AnimatePresence mode="wait">
        {stage === 'selection' && (
          <motion.div 
            key="selection"
            className="pack-selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.h1 
              className="pack-title"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              OUVREZ VOTRE PACK
            </motion.h1>
            
            <motion.div
              className="pack-option"
              variants={packVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              onClick={handlePackSelection}
            >
              <img src="/images/pack-gold.png" alt="Gold Pack" className="pack-image" />
            </motion.div>
          </motion.div>
        )}

        {stage === 'opening' && (
          <motion.div 
            key="opening"
            className="pack-opening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="pack-container"
              initial={{ scale: 0.5, rotate: 0 }}
              animate={{ 
                scale: [0.5, 1.2, 1],
                rotate: [0, 360, 720],
                transition: { duration: 2, ease: "easeInOut" }
              }}
            >
              <div className="pack-design">
                 <img src="/images/pack-gold.png" alt="Gold Pack" className="pack-image" />
              </div>
            </motion.div>
            
            <motion.div 
              className="opening-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              OUVERTURE EN COURS...
            </motion.div>
          </motion.div>
        )}

        {stage === 'revealing' && (
          <motion.div 
            key="revealing"
            className="card-reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {celebrationActive && (
              <div className="celebration-overlay">
              </div>
            )}
            <motion.div
              className="card rare"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="card-glow"
                variants={glowVariants}
                animate="pulse"
              />
              
              <div className="card-content">
                <div className="card-header">
                  <div className="card-rating">{playerCard.rating}</div>
                  <div className="card-position">DEV</div>
                </div>
                
                {/* Révélation progressive */}
                {revealStep >= 1 && (
                  <motion.div 
                    className="player-name"
                    variants={revealVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {playerCard.firstName}<br/>{playerCard.lastName}
                  </motion.div>
                )}
                
                {revealStep >= 2 && (
                  <motion.div 
                    className="card-type"
                    variants={revealVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {playerCard.type}
                  </motion.div>
                )}
                
                {revealStep >= 3 && (
                  <motion.div 
                    className="player-stats"
                    variants={revealVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {playerCard.skills.map((skill, index) => (
                      <div key={skill.name} className="stat" style={{ animationDelay: `${index * 0.1}s` }}>
                        <span className="stat-name">{skill.name}</span>
                        <span className="stat-value">{skill.level}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
                
                <motion.div 
                  className="rare-indicator"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  ICON !
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {stage === 'complete' && (
          <motion.div 
            key="complete"
            className="pack-complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.h2
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              PACK TERMINÉ !
            </motion.h2>
            
            <motion.div 
              className="complete-animation"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              ⚽
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PackOpeningScreen; 