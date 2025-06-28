'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import useSoundEffects from '../hooks/useSoundEffects';

const MainMenu = ({ onSelectSection, showPenaltyButton }) => {
  const { playClick } = useSoundEffects();
  const cardRef = useRef(null);

  const handleNavigation = (section) => {
    playClick();
    // On attend un tout petit peu pour que le son ait le temps de se jouer avant la navigation
    setTimeout(() => {
      onSelectSection(section);
    }, 150);
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty('--shimmer-x', `${x}px`);
    cardRef.current.style.setProperty('--shimmer-y', `${y}px`);
  };

  return (
    <main className="menu-container">
      <h1 className="menu-title">Portfolio Thème "FUT"</h1>
      <p className="menu-subtitle">Édition Développeur Full-Stack</p>
      
      <div 
        className="player-card" 
        ref={cardRef} 
        onMouseMove={handleMouseMove}
        style={{ maxWidth: 340, margin: '0 auto', padding: '2rem 1.2rem 1.5rem', borderRadius: 28, boxShadow: '0 0 40px #ffd70055', border: '3px solid #ffd700', background: 'rgba(30,30,30,0.98)', position: 'relative' }}
      >
        <div className="player-card-bg"></div>
        <div className="card-header" style={{ marginBottom: 10 }}>
          <div className="rating-position">
            <div className="rating" style={{ fontSize: '2.5rem', color: '#ffd700', textShadow: '0 0 10px #ffd700' }}>90</div>
            <div className="position" style={{ fontSize: '1.1rem', fontWeight: 700, background: '#ffd700', color: '#222', borderRadius: 8, padding: '0.2rem 0.8rem', marginTop: 4 }}>DEV</div>
          </div>
          <div className="card-badge" style={{ background: 'linear-gradient(45deg,rgb(186, 220, 230),rgb(22, 80, 156))', color: '#fff', borderRadius: 10, padding: '0.4rem 1.1rem', fontWeight: 700, fontSize: '1rem', boxShadow: '0 2px 8pxrgba(255, 255, 255, 0.53)' }}>
            FC EPITECH
          </div>
        </div>
        <div className="card-image" style={{ textAlign: 'center', marginBottom: 10, position: 'relative' }}>
          <div style={{ display: 'inline-block', borderRadius: '50%', border: '4px solid #ffd700', boxShadow: '0 0 24px #ffd70088', padding: 4, background: '#222' }}>
            <Image src="/images/loucman-machababy.jpg" alt="Loucman MACHABABY" className="player-image" width={160} height={160} style={{ borderRadius: '50%', objectFit: 'cover', background: '#fff' }} />
          </div>
        </div>
        <div className="card-name" style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: 8, letterSpacing: 1 }}>Loucman<br />MACHABABY</div>
        <div style={{ textAlign: 'center', color: '#ffd700', fontWeight: 600, fontSize: 15, marginBottom: 10 }}>France</div>
      </div>

      <div className="menu-buttons">
        <button onClick={() => handleNavigation('projects')} className="menu-button">
          Projets
        </button>
        <button onClick={() => handleNavigation('about')} className="menu-button">
          À propos
        </button>
        <button onClick={() => handleNavigation('contact')} className="menu-button">
          Contact
        </button>
        {showPenaltyButton && (
          <button onClick={() => handleNavigation('penalty')} className="menu-button special">
            Mini-jeu Penalty ⚽️
          </button>
        )}
      </div>
    </main>
  );
};

export default MainMenu;