'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import useSound from 'use-sound';

const VideoBackground = () => {
  return (
    <>
      <div className="video-overlay"></div>
      <video
        className="video-background"
        autoPlay
        loop
        muted
        playsInline
        src="/video/stadium.mp4"
      >
        Votre navigateur ne supporte pas les vidéos HTML5.
      </video>
    </>
  );
};

export const VAREffect = ({ show, onComplete, verdict = 'GOAL VALIDÉ' }) => {
  const [visible, setVisible] = useState(show);
  const [step, setStep] = useState(0); // 0: bip, 1: scan, 2: verdict
  const [playBip] = useSound('/sounds/var_bip.mp3', { volume: 0.5 });
  const [playScan] = useSound('/sounds/var_scan.mp3', { volume: 0.5 });
  const [playVerdict] = useSound('/sounds/var_verdict.mp3', { volume: 0.7 });

  useEffect(() => {
    if (show) {
      setVisible(true);
      setStep(0);
      playBip();
      setTimeout(() => {
        setStep(1);
        playScan();
      }, 500);
      setTimeout(() => {
        setStep(2);
        playVerdict();
      }, 1300);
      setTimeout(() => {
        setVisible(false);
        if (onComplete) onComplete();
      }, 2200);
    }
  }, [show, onComplete, playBip, playScan, playVerdict]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="var-effect-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.95)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              color: '#00eaff',
              fontWeight: 'bold',
              fontSize: '3rem',
              border: '8px solid #00eaff',
              borderRadius: '20px',
              padding: '2rem 4rem',
              background: 'rgba(0,0,0,0.8)',
              boxShadow: '0 0 40px #00eaff',
              textShadow: '0 0 20px #00eaff',
              letterSpacing: '0.2em',
            }}
          >
            VAR
          </motion.div>
          {/* Animation de scan */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                width: '320px',
                height: '40px',
                margin: '2rem auto',
                background: 'linear-gradient(90deg, #00eaff 20%, #fff 50%, #00eaff 80%)',
                boxShadow: '0 0 40px #00eaff',
                borderRadius: '8px',
                position: 'relative',
                overflow: 'hidden',
                animation: 'scan-move 0.8s linear infinite',
              }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                background: 'repeating-linear-gradient(135deg, #00eaff 0 8px, #fff 8px 16px)',
                opacity: 0.3,
                position: 'absolute',
                top: 0,
                left: 0,
              }} />
            </motion.div>
          )}
          {/* Verdict animé */}
          {step === 2 && (
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                color: '#ffd700',
                fontWeight: 'bold',
                fontSize: '2.5rem',
                marginTop: '2rem',
                textAlign: 'center',
                letterSpacing: '0.1em',
                textShadow: '0 0 20px #ffd700, 0 0 40px #fff',
              }}
            >
              {verdict}
            </motion.div>
          )}
          {/* Message d'attente */}
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                color: '#fff',
                fontSize: '1.5rem',
                marginTop: '2rem',
                textAlign: 'center',
                letterSpacing: '0.1em',
              }}
            >
              REVUE VIDÉO EN COURS...
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoBackground; 