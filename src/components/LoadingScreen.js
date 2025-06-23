'use client';

import React, { useEffect, useState } from 'react';

const LoadingScreen = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      onLoaded();
    }, 3000); // Simule un temps de chargement de 3 secondes

    const progressInterval = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress === 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onLoaded]);

  return (
    <div id="loading-screen">
      <div className="ea-logo">
        <div className="logo-img">LM</div>
        <div className="logo-text">BIENVENUE SUR MON PORTFOLIO</div>
      </div>
      <div className="loader-container">
        <div className="loader"></div>
      </div>
      <div className="loading-text">Chargement du portfolio...</div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default LoadingScreen; 