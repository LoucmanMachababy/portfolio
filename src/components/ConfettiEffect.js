'use client';

import React, { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';

const ConfettiEffect = () => {
  const [windowDimension, setWindowDimension] = useState({ width: 0, height: 0 });
  const [isExploding, setIsExploding] = useState(true);

  useEffect(() => {
    // We need to get window dimensions for confetti to work correctly
    setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
    
    // Stop the confetti after a few seconds
    const timer = setTimeout(() => setIsExploding(false), 5000);
    
    return () => clearTimeout(timer);
  }, []);

  if (!windowDimension.width || !windowDimension.height) {
    return null;
  }

  return (
    <ReactConfetti
      width={windowDimension.width}
      height={windowDimension.height}
      numberOfPieces={isExploding ? 500 : 0}
      recycle={false}
      gravity={0.3}
      initialVelocityY={20}
      colors={['#ffd700', '#ffffff', '#1a1a1a']}
      onConfettiComplete={() => setIsExploding(false)}
    />
  );
};

export default ConfettiEffect; 