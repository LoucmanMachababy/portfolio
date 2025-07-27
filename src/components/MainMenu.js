'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import useSoundEffects from '../hooks/useSoundEffects';
import ThemeToggle from './ThemeToggle';

const MainMenu = ({ onSelectSection, showPenaltyButton }) => {
  const { playClick } = useSoundEffects();
  const cardRef = useRef(null);
  const particlesRef = useRef(null);
  const heroRef = useRef(null);

  // Effets visuels élégants et professionnels
  useEffect(() => {
    // Animation de compteur fluide
    const animateCounter = (element, target) => {
      let current = 0;
      const increment = target / 60;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
          // Petit effet de pulsation à la fin
          element.style.animation = 'pulse 0.5s ease-out';
        }
        element.textContent = Math.floor(current);
      }, 25);
    };

    // Réseau de particules connectées (inspiré de ReactBits)
    const createConnectedParticles = () => {
      const canvas = document.createElement('canvas');
      canvas.className = 'connected-particles-canvas';
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      document.body.appendChild(canvas);

      const ctx = canvas.getContext('2d');
      const particles = [];
      const particleCount = 50;
      const maxDistance = 150;

      // Créer les particules
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Mettre à jour et dessiner les particules
        particles.forEach((particle, i) => {
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Rebond sur les bords
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

          // Dessiner la particule avec couleur adaptée au thème
          const isDarkTheme = document.documentElement.getAttribute('data-theme') !== 'light';
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = isDarkTheme ? 'rgba(37, 99, 235, 0.6)' : 'rgba(37, 99, 235, 0.8)';
          ctx.fill();

          // Connecter les particules proches
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[j].x - particle.x;
            const dy = particles[j].y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
              const isDarkTheme = document.documentElement.getAttribute('data-theme') !== 'light';
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = isDarkTheme
                ? `rgba(37, 99, 235, ${0.3 * (1 - distance / maxDistance)})`
                : `rgba(37, 99, 235, ${0.4 * (1 - distance / maxDistance)})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });

        requestAnimationFrame(animate);
      };

      animate();

      // Redimensionner le canvas
      window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });
    };

    // Effet de parallax subtil avec particules réactives
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        heroRef.current.style.transform = `translateY(${rate}px)`;
      }

      // Faire réagir les particules au scroll
      const particles = document.querySelectorAll('.elegant-particle');
      particles.forEach((particle, index) => {
        const speed = (index % 3 + 1) * 0.5;
        const yPos = window.pageYOffset * speed;
        particle.style.transform = `translateY(${yPos}px)`;
      });
    };

    // Démarrer les compteurs
    setTimeout(() => {
      const counters = document.querySelectorAll('.counter');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        animateCounter(counter, target);
      });
    }, 1000);

    // Effet de typing élégant
    const typeWriter = (element, text, speed = 80) => {
      let i = 0;
      element.textContent = '';
      const timer = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(timer);
        }
      }, speed);
    };

    // Démarrer l'effet de typing
    setTimeout(() => {
      const titleElement = document.querySelector('.hero-title');
      if (titleElement) {
        const originalText = titleElement.textContent;
        typeWriter(titleElement, originalText, 100);
      }
    }, 500);

    // Effet de vague élégante qui traverse l'écran
    const createWaveEffect = () => {
      const wave = document.createElement('div');
      wave.className = 'elegant-wave';
      document.body.appendChild(wave);

      setTimeout(() => {
        wave.remove();
      }, 4000);
    };

    // Effet de brillance sur les éléments interactifs
    const addSparkleEffect = () => {
      const sparkleElements = document.querySelectorAll('.proof-item, .menu-button, .menu-button-hero');
      sparkleElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          const sparkle = document.createElement('div');
          sparkle.className = 'sparkle-effect';
          element.appendChild(sparkle);

          setTimeout(() => {
            sparkle.remove();
          }, 600);
        });
      });
    };

    // Effet de curseur splash (inspiré de ReactBits)
    const addSplashCursor = () => {
      let isPointerDown = false;

      document.addEventListener('pointerdown', () => {
        isPointerDown = true;
      });

      document.addEventListener('pointerup', () => {
        isPointerDown = false;
      });

      document.addEventListener('pointermove', (e) => {
        if (isPointerDown) {
          const splash = document.createElement('div');
          splash.className = 'cursor-splash';
          splash.style.left = e.clientX + 'px';
          splash.style.top = e.clientY + 'px';
          document.body.appendChild(splash);

          setTimeout(() => {
            splash.remove();
          }, 1000);
        }
      });
    };

    // Effet de magnetic buttons (inspiré de ReactBits)
    const addMagneticEffect = () => {
      const magneticElements = document.querySelectorAll('.menu-button-hero');

      magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
          const rect = element.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        element.addEventListener('mouseleave', () => {
          element.style.transform = 'translate(0, 0)';
        });
      });
    };

    // Effet ripple sur les boutons (inspiré de ReactBits)
    const addRippleEffect = () => {
      const rippleButtons = document.querySelectorAll('.ripple-button');

      rippleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          const rect = button.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          const x = e.clientX - rect.left - size / 2;
          const y = e.clientY - rect.top - size / 2;

          const ripple = document.createElement('span');
          ripple.className = 'ripple-effect';
          ripple.style.width = ripple.style.height = size + 'px';
          ripple.style.left = x + 'px';
          ripple.style.top = y + 'px';

          button.appendChild(ripple);

          setTimeout(() => {
            ripple.remove();
          }, 600);
        });
      });
    };

    // Initialiser les effets
    createConnectedParticles();
    addSparkleEffect();
    addSplashCursor();
    addMagneticEffect();
    addRippleEffect();
    window.addEventListener('scroll', handleScroll);

    // Lancer la vague toutes les 15 secondes
    setInterval(createWaveEffect, 15000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);

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
      {/* Bouton de thème */}
      <ThemeToggle />

      {/* Fond animé avec particules */}
      <div className="animated-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
        <div className="grid-overlay"></div>
      </div>

      <div className="hero-section morphing-border" ref={heroRef}>
        <div className="hero-badge">
          <span className="badge-text">✨ Disponible pour nouveaux projets</span>
        </div>

        <h1 className="hero-title text-reveal">Loucman Machababy</h1>
        <p className="hero-tagline">Je transforme vos idées en sites web qui convertissent</p>
        <p className="hero-location">Full Remote · Sites vitrines, e‑commerce, maintenance</p>

        {/* Navigation principale - remontée */}
        <div className="main-navigation-hero">
          <h3 className="nav-title-hero">Découvrez mon expertise</h3>
          <div className="menu-buttons-hero">
            <button onClick={() => handleNavigation('services')} className="menu-button-hero ripple-button glow-pulse">
              <span className="button-icon">🛠️</span>
              <div className="button-content">
                <span className="button-title">Services</span>
                <span className="button-subtitle">Solutions web complètes</span>
              </div>
            </button>
            <button onClick={() => handleNavigation('projects')} className="menu-button-hero ripple-button">
              <span className="button-icon">💼</span>
              <div className="button-content">
                <span className="button-title">Projets</span>
                <span className="button-subtitle">Réalisations récentes</span>
              </div>
            </button>
            <button onClick={() => handleNavigation('about')} className="menu-button-hero ripple-button">
              <span className="button-icon">👨‍💻</span>
              <div className="button-content">
                <span className="button-title">À propos</span>
                <span className="button-subtitle">Mon parcours</span>
              </div>
            </button>
          </div>
        </div>

        {/* Preuves sociales réalistes */}
        <div className="social-proof">
          <div className="proof-item">
            <span className="proof-number counter" data-target="3">0</span>
            <span className="proof-label">Projets réalisés</span>
          </div>
          <div className="proof-item">
            <span className="proof-number">2024</span>
            <span className="proof-label">Année de lancement</span>
          </div>
          <div className="proof-item">
            <span className="proof-number">24h</span>
            <span className="proof-label">Réponse garantie</span>
          </div>
        </div>



        <div className="profile-card">
          <div className="profile-image">
            <div className="image-container">
              <Image
                src="/images/loucman-machababy.jpg"
                alt="Loucman Machababy - Développeur web freelance"
                width={200}
                height={200}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
              <div className="status-indicator">
                <span className="status-dot"></span>
                <span className="status-text">Disponible</span>
              </div>
            </div>
          </div>
          <div className="profile-info">
            <h2>Développeur web freelance</h2>
            <p className="profile-description">Spécialisé en React, Next.js et développement sur mesure</p>

            <div className="key-benefits">
              <div className="benefit-item">
                <span className="benefit-icon">⚡</span>
                <span>Sites ultra-rapides</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">📱</span>
                <span>100% responsive</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🔍</span>
                <span>SEO optimisé</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🛡️</span>
                <span>Sécurisé & maintenu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technologies badges */}
        <div className="tech-badges">
          <div className="tech-badge">React</div>
          <div className="tech-badge">Next.js</div>
          <div className="tech-badge">TypeScript</div>
          <div className="tech-badge">Node.js</div>
          <div className="tech-badge">PHP</div>
          <div className="tech-badge">MySQL</div>
        </div>

        <div className="cta-buttons">
          <a
            href="mailto:machababyloucman@gmail.com?subject=Demande de devis - Développement web&body=Bonjour Loucman,%0D%0A%0D%0AJe souhaiterais obtenir un devis pour :"
            className="cta-primary"
          >
            📧 Devis gratuit sous 24h
          </a>
          <a
            href="https://calendly.com/machababyloucman/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-secondary"
          >
            📅 Prendre RDV
          </a>
          <button
            onClick={() => handleNavigation('projects')}
            className="cta-tertiary"
          >
            👁️ Voir mes réalisations
          </button>
        </div>

        {/* Garanties */}
        <div className="guarantees-mini">
          <div className="guarantee-mini">
            <span className="guarantee-icon">✅</span>
            <span>Devis gratuit</span>
          </div>
          <div className="guarantee-mini">
            <span className="guarantee-icon">⚡</span>
            <span>Réponse sous 24h</span>
          </div>
          <div className="guarantee-mini">
            <span className="guarantee-icon">🔧</span>
            <span>Support inclus</span>
          </div>
        </div>

      </div>

      {/* Navigation principale */}
      <div className="main-navigation">
        <h3 className="nav-title">Découvrez mon expertise</h3>
        <div className="menu-buttons">
          <button onClick={() => handleNavigation('services')} className="menu-button">
            <span className="button-icon">🛠️</span>
            <div className="button-content">
              <span className="button-title">Services</span>
              <span className="button-subtitle">Solutions web complètes</span>
            </div>
          </button>
          <button onClick={() => handleNavigation('projects')} className="menu-button">
            <span className="button-icon">💼</span>
            <div className="button-content">
              <span className="button-title">Projets</span>
              <span className="button-subtitle">Réalisations concrètes</span>
            </div>
          </button>
          <button onClick={() => handleNavigation('about')} className="menu-button">
            <span className="button-icon">👨‍💻</span>
            <div className="button-content">
              <span className="button-title">À propos</span>
              <span className="button-subtitle">Mon parcours</span>
            </div>
          </button>
          <button onClick={() => handleNavigation('contact')} className="menu-button">
            <span className="button-icon">📞</span>
            <div className="button-content">
              <span className="button-title">Contact</span>
              <span className="button-subtitle">Parlons de votre projet</span>
            </div>
          </button>
        </div>
      </div>
    </main>
  );
};

export default MainMenu;