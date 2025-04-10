// Fonction pour masquer l'écran de chargement et afficher le menu principal
function finishLoading() {
  document.getElementById('loading-screen').style.display = 'none';
  document.querySelector('.main-menu').style.opacity = '1';
  document.querySelector('.main-menu').style.animationDelay = '0s';
  
  // Jouer le son de démarrage FIFA
  playAudio('game_start');
}

// Fonction pour naviguer entre les sections
function navigateTo(section) {
  // Effet de transition
  const mainMenu = document.querySelector('.main-menu');
  const targetSection = document.getElementById(section);
  
  // Animation de sortie
  if (mainMenu.style.display !== 'none') {
    mainMenu.style.opacity = '0';
    mainMenu.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
      mainMenu.style.display = 'none';
      
      // Masquer toutes les sections
      document.querySelectorAll('.section').forEach(el => {
        el.classList.remove('active');
      });
      
      // Afficher la section sélectionnée
      targetSection.classList.add('active');
      targetSection.style.opacity = '0';
      targetSection.style.transform = 'translateY(20px)';
      
      // Animation d'entrée
      setTimeout(() => {
        targetSection.style.opacity = '1';
        targetSection.style.transform = 'translateY(0)';
      }, 50);
      
    }, 300);
  } else {
    // Masquer toutes les sections
    document.querySelectorAll('.section').forEach(el => {
      if (el.classList.contains('active')) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(-20px)';
      }
      
      setTimeout(() => {
        el.classList.remove('active');
        
        // Afficher la section sélectionnée
        targetSection.classList.add('active');
        targetSection.style.opacity = '0';
        targetSection.style.transform = 'translateY(20px)';
        
        // Animation d'entrée
        setTimeout(() => {
          targetSection.style.opacity = '1';
          targetSection.style.transform = 'translateY(0)';
        }, 50);
        
      }, 300);
    });
  }
  
  // Mettre à jour l'option sélectionnée dans le menu
  document.querySelectorAll('.menu-option').forEach(el => {
    el.classList.remove('selected');
    if (el.dataset.section === section) {
      el.classList.add('selected');
    }
  });
  
  // Scroll vers le haut de la page
  window.scrollTo(0, 0);
}

// Fonction pour revenir au menu principal
function backToMenu() {
  const activeSection = document.querySelector('.section.active');
  
  // Animation de sortie
  activeSection.style.opacity = '0';
  activeSection.style.transform = 'translateY(-20px)';
  
  setTimeout(() => {
    activeSection.classList.remove('active');
    
    // Afficher le menu principal
    const mainMenu = document.querySelector('.main-menu');
    mainMenu.style.display = 'flex';
    mainMenu.style.opacity = '0';
    mainMenu.style.transform = 'translateY(20px)';
    
    // Animation d'entrée
    setTimeout(() => {
      mainMenu.style.opacity = '1';
      mainMenu.style.transform = 'translateY(0)';
    }, 50);
    
  }, 300);
  
  window.scrollTo(0, 0);
  playAudio('menu_back');
}

// Fonction pour créer des effets sonores style FIFA
function playAudio(type) {
  // Simulation d'effets sonores (dans un site réel, vous pourriez ajouter de vrais fichiers audio)
  console.log('Playing sound effect:', type);
  
  // Pour implémenter des sons réels, vous pouvez utiliser cette approche :
  // const audio = new Audio(`sounds/${type}.mp3`);
  // audio.volume = 0.3; // Volume à 30%
  // audio.play();
}

// Animation 3D pour les cartes de joueur
function init3DCardEffect() {
  const cards = document.querySelectorAll('.player-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleY = (x - centerX) / 8;
      const angleX = (centerY - y) / 8;
      
      this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
      
      // Effet de brillance qui suit le pointeur
      const glare = this.querySelector('.card-glare');
      if (glare) {
        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 60%)`;
      }
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      const glare = this.querySelector('.card-glare');
      if (glare) {
        glare.style.background = 'none';
      }
    });
    
    // Ajouter l'élément de brillance s'il n'existe pas
    if (!card.querySelector('.card-glare')) {
      const glare = document.createElement('div');
      glare.className = 'card-glare';
      glare.style.position = 'absolute';
      glare.style.top = '0';
      glare.style.left = '0';
      glare.style.width = '100%';
      glare.style.height = '100%';
      glare.style.pointerEvents = 'none';
      glare.style.zIndex = '10';
      card.appendChild(glare);
    }
  });
}

// Effet de survol pour les cartes de projet
function initProjectCardHover() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      playAudio('card_hover');
      
      // Animation de survol
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
      
      // Effet de surbrillance
      const projectTitle = this.querySelector('.project-title');
      if (projectTitle) {
        projectTitle.style.color = 'white';
        setTimeout(() => {
          projectTitle.style.color = '';
        }, 300);
      }
      
      // Animation des tags de technologie
      const techTags = this.querySelectorAll('.tech-tag');
      techTags.forEach((tag, index) => {
        tag.style.transform = 'scale(1.1)';
        tag.style.backgroundColor = 'var(--primary)';
        tag.style.color = 'black';
        tag.style.transitionDelay = `${index * 50}ms`;
      });
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
      
      // Réinitialiser les tags de technologie
      const techTags = this.querySelectorAll('.tech-tag');
      techTags.forEach(tag => {
        tag.style.transform = '';
        tag.style.backgroundColor = '';
        tag.style.color = '';
        tag.style.transitionDelay = '';
      });
    });
  });
}

// Animation pour les barres de compétences
function animateSkillBars() {
  const skills = document.querySelectorAll('.skill');
  
  skills.forEach((skill, index) => {
    const progressBar = skill.querySelector('.skill-progress');
    if (progressBar) {
      const width = progressBar.style.width;
      
      // Animation initiale
      progressBar.style.width = '0%';
      
      // Observer pour l'animation au défilement
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              progressBar.style.width = width;
            }, index * 100);
            observer.unobserve(skill);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(skill);
    }
  });
}

// Animation pour les sections d'expérience
function animateExperienceItems() {
  const items = document.querySelectorAll('.experience-item');
  
  items.forEach((item, index) => {
    // Configuration initiale
    item.style.opacity = '0';
    item.style.transform = 'translateX(20px)';
    item.style.transition = 'all 0.5s ease';
    
    // Observer pour l'animation au défilement
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
          }, index * 150);
          observer.unobserve(item);
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(item);
  });
}

// Effet de frappe pour le texte dans l'en-tête
function typewriterEffect() {
  const titleElement = document.querySelector('.menu-title');
  const subtitleElement = document.querySelector('.menu-subtitle');
  
  if (titleElement && subtitleElement) {
    const titleText = titleElement.textContent;
    const subtitleText = subtitleElement.textContent;
    
    titleElement.textContent = '';
    subtitleElement.textContent = '';
    titleElement.style.opacity = '1';
    subtitleElement.style.opacity = '0';
    
    let titleIndex = 0;
    let subtitleIndex = 0;
    
    // Effet de frappe pour le titre
    function typeTitle() {
      if (titleIndex < titleText.length) {
        titleElement.textContent += titleText.charAt(titleIndex);
        titleIndex++;
        setTimeout(typeTitle, 50);
      } else {
        setTimeout(() => {
          subtitleElement.style.opacity = '1';
          typeSubtitle();
        }, 300);
      }
    }
    
    // Effet de frappe pour le sous-titre
    function typeSubtitle() {
      if (subtitleIndex < subtitleText.length) {
        subtitleElement.textContent += subtitleText.charAt(subtitleIndex);
        subtitleIndex++;
        setTimeout(typeSubtitle, 50);
      }
    }
    
    setTimeout(typeTitle, 300);
  }
}

// Effet de particules pour le fond
function createParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  document.body.prepend(canvas);
  
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '-1';
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const particleCount = 50; // Nombre de particules
  
  // Création des particules
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      color: 'rgba(250, 204, 21, ' + (Math.random() * 0.3 + 0.1) + ')',
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25
    });
  }
  
  // Animation des particules
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
      
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Rebonds sur les bords
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.speedX = -particle.speedX;
      }
      
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.speedY = -particle.speedY;
      }
    });
    
    requestAnimationFrame(animateParticles);
  }
  
  animateParticles();
  
  // Ajuster la taille du canvas lors du redimensionnement
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Attendre que la page soit chargée
document.addEventListener('DOMContentLoaded', function() {
  // Programmer la fin du chargement après 3 secondes
  setTimeout(finishLoading, 3000);
  
  // Initialiser les effets interactifs
  setTimeout(() => {
    init3DCardEffect();
    initProjectCardHover();
    typewriterEffect();
    createParticles();
    
    // Ajouter les observateurs pour les animations au défilement
    const aboutSection = document.getElementById('about');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkillBars();
          animateExperienceItems();
          observer.unobserve(aboutSection);
        }
      });
    }, { threshold: 0.1 });
    
    if (aboutSection) {
      observer.observe(aboutSection);
    }
  }, 3100);
  
  // Ajouter des écouteurs d'événements aux options du menu
  document.querySelectorAll('.menu-option').forEach(option => {
      option.addEventListener('click', function() {
          playAudio('menu_select');
          navigateTo(this.dataset.section);
      });
      
      // Ajouter des effets sonores au survol
      option.addEventListener('mouseenter', function() {
          playAudio('menu_hover');
          this.style.transform = 'scale(1.05)';
      });
      
      option.addEventListener('mouseleave', function() {
          this.style.transform = '';
      });
  });
  
  // Ajouter des écouteurs d'événements pour les boutons de retour
  document.querySelectorAll('.back-button').forEach(button => {
      button.addEventListener('click', function() {
          playAudio('menu_back');
      });
      
      button.addEventListener('mouseenter', function() {
          this.style.transform = 'scale(1.1)';
          this.style.color = 'white';
      });
      
      button.addEventListener('mouseleave', function() {
          this.style.transform = '';
          this.style.color = '';
      });
  });
  
  // Ajouter des écouteurs d'événements pour la navigation au clavier
  document.addEventListener('keydown', function(e) {
      const selectedOption = document.querySelector('.menu-option.selected');
      const options = Array.from(document.querySelectorAll('.menu-option'));
      const currentIndex = options.indexOf(selectedOption);
      
      if (e.key === 'ArrowUp' && currentIndex > 0) {
          playAudio('menu_hover');
          options[currentIndex].classList.remove('selected');
          options[currentIndex - 1].classList.add('selected');
          options[currentIndex - 1].style.transform = 'scale(1.05)';
          setTimeout(() => {
              options[currentIndex - 1].style.transform = '';
          }, 300);
      } else if (e.key === 'ArrowDown' && currentIndex < options.length - 1) {
          playAudio('menu_hover');
          options[currentIndex].classList.remove('selected');
          options[currentIndex + 1].classList.add('selected');
          options[currentIndex + 1].style.transform = 'scale(1.05)';
          setTimeout(() => {
              options[currentIndex + 1].style.transform = '';
          }, 300);
      } else if (e.key === 'Enter') {
          playAudio('menu_select');
          navigateTo(selectedOption.dataset.section);
      } else if (e.key === 'Escape') {
          playAudio('menu_back');
          backToMenu();
      }
  });
  
  // Animation des cartes de projets
  document.querySelectorAll('.project-card').forEach((card, index) => {
      card.style.animationDelay = `${0.1 * index}s`;
  });
  
  // Précharger la photo si nécessaire
  const playerImage = new Image();
  playerImage.src = 'images/loucman-machababy.jpg';
});

// Modification pour ajouter les redirections vers les pages de détail des projets
function initProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
      // Récupérer le titre du projet
      const projectTitle = card.querySelector('.project-title').textContent;
      // Créer un slug à partir du titre (pour l'URL)
      const projectSlug = projectTitle.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      
      // Ajouter un attribut data-slug pour référence
      card.setAttribute('data-slug', projectSlug);
      
      // Ajouter un bouton "Voir détails"
      const projectContent = card.querySelector('.project-content');
      const detailButton = document.createElement('a');
      detailButton.className = 'project-detail-btn';
      detailButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          Voir détails
      `;
      
      // Ajouter l'événement de clic
      card.addEventListener('click', () => {
          playAudio('card_select');
          window.location.href = `projects/detail-${projectSlug}.html`;
      });
      
      // Si un bouton détail existe déjà, ne pas l'ajouter à nouveau
      if (!projectContent.querySelector('.project-detail-btn')) {
          projectContent.appendChild(detailButton);
      }
  });
}

// Son pour la sélection de carte
function playProjectSelectSound() {
  playAudio('card_select');
}

// Ajouter à l'initialisation
document.addEventListener('DOMContentLoaded', function() {
  // Appeler après le délai pour s'assurer que l'interface est chargée
  setTimeout(() => {
      initProjectCards();
  }, 3200);
});

// Système audio pour le portfolio
let backgroundMusic = null;
let audioEnabled = true;

// Fonction pour démarrer la musique de fond
function startBackgroundMusic() {
  if (!backgroundMusic) {
    backgroundMusic = new Audio('sounds/fifa-theme.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.3; // Volume à 30%
  }
  
  // On joue la musique seulement après une interaction utilisateur (politique des navigateurs)
  document.addEventListener('click', function audioInitializer() {
    if (audioEnabled) {
      backgroundMusic.play().catch(e => console.log('Erreur audio:', e));
      // On retire l'écouteur d'événement après le premier clic
      document.removeEventListener('click', audioInitializer);
      
      // Ajouter un bouton pour activer/désactiver le son
      const audioToggle = document.createElement('button');
      audioToggle.className = 'audio-toggle';
      audioToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>';
      audioToggle.title = "Activer/Désactiver le son";
      document.body.appendChild(audioToggle);
      
      audioToggle.addEventListener('click', toggleAudio);
    }
  }, { once: false });
}

// Fonction pour activer/désactiver le son
function toggleAudio() {
  audioEnabled = !audioEnabled;
  
  if (audioEnabled) {
    backgroundMusic.play();
    document.querySelector('.audio-toggle').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>';
  } else {
    backgroundMusic.pause();
    document.querySelector('.audio-toggle').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>';
  }
}

// Amélioration de la fonction de son existante
function playAudio(type) {
  if (!audioEnabled) return;
  
  const soundEffects = {
    'game_start': 'sounds/fifa-start.mp3',
    'menu_select': 'sounds/menu-select.mp3',
    'menu_hover': 'sounds/menu-hover.mp3',
    'menu_back': 'sounds/menu-back.mp3',
    'card_hover': 'sounds/card-hover.mp3',
    'card_select': 'sounds/card-select.mp3'
  };
  
  if (soundEffects[type]) {
    const audio = new Audio(soundEffects[type]);
    audio.volume = 0.4; // Volume à 40%
    audio.play().catch(e => console.log('Erreur effet sonore:', e));
  } else {
    console.log('Son non trouvé:', type);
  }
}

// Ajout de l'initialisation audio à notre fonction de démarrage
document.addEventListener('DOMContentLoaded', function() {
  // Programmer la fin du chargement après 3 secondes
  setTimeout(finishLoading, 3000);
  
  // Démarrer la musique
  startBackgroundMusic();
  
  // Initialiser les effets interactifs (code déjà existant)
  setTimeout(() => {
    init3DCardEffect();
    initProjectCardHover();
    typewriterEffect();
    createParticles();
    
    // Ajouter les observateurs pour les animations au défilement
    const aboutSection = document.getElementById('about');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkillBars();
          animateExperienceItems();
          observer.unobserve(aboutSection);
        }
      });
    }, { threshold: 0.1 });
    
    if (aboutSection) {
      observer.observe(aboutSection);
    }
  }, 3100);
  
  // Le reste du code reste identique...
});

// Ajouter à main.js
function createPackOpeningAnimation() {
  // Créer l'overlay pour l'animation d'ouverture de pack
  const packOverlay = document.createElement('div');
  packOverlay.className = 'pack-opening-overlay';
  
  // Créer le pack
  const pack = document.createElement('div');
  pack.className = 'fut-pack';
  pack.innerHTML = `
    <div class="pack-front">
      <div class="pack-shine"></div>
      <img src="images/fut-pack.png" alt="FUT Pack" onerror="this.src='images/loucman-machababy.jpg'">
    </div>
    <div class="pack-opening-effect"></div>
  `;
  
  packOverlay.appendChild(pack);
  document.body.appendChild(packOverlay);
  
  // Animation d'ouverture
  setTimeout(() => {
    packOverlay.classList.add('active');
    playAudio('pack_opening');
    
    pack.addEventListener('click', () => {
      pack.classList.add('opening');
      playAudio('rare_player');
      
      setTimeout(() => {
        // Révéler la carte avec votre profil
        const playerReveal = document.createElement('div');
        playerReveal.className = 'player-reveal';
        playerReveal.innerHTML = `
          <div class="player-card opening-card">
            <div class="player-card-bg"></div>
            <div class="card-header">
              <div class="rating-position">
                <div class="rating">90</div>
                <div class="position">DEV</div>
              </div>
              <div class="card-badge">
                <span>W@C</span>
              </div>
            </div>
            <div class="card-image">
              <img src="images/loucman-machababy.jpg" alt="Loucman MACHABABY" class="player-image">
            </div>
            <div class="card-name">Loucman MACHABABY</div>
            <div class="card-stats">
              <div class="stat">
                <span class="stat-name">HTML</span>
              </div>
              <div class="stat">
                <span class="stat-name">CSS</span>
              </div>
              <div class="stat">
                <span class="stat-name">JS</span>
              </div>
              <div class="stat">
                <span class="stat-name">PHP</span>
              </div>
              <div class="stat">
                <span class="stat-name">SQL</span>
              </div>
              <div class="stat">
                <span class="stat-name">REACT</span>
              </div>
            </div>
          </div>
          <div class="walkout-effect"></div>
          <div class="confetti-container"></div>
        `;
        packOverlay.appendChild(playerReveal);
        
        // Animer la carte
        setTimeout(() => {
          playerReveal.classList.add('active');
          createConfetti();
        }, 500);
        
        // Permettre de passer à l'interface principale
        setTimeout(() => {
          const continueBtn = document.createElement('button');
          continueBtn.className = 'continue-button';
          continueBtn.textContent = 'CONTINUER';
          playerReveal.appendChild(continueBtn);
          
          continueBtn.addEventListener('click', () => {
            packOverlay.classList.add('fade-out');
            setTimeout(() => {
              packOverlay.remove();
              finishLoading();
            }, 1000);
          });
        }, 3000);
      }, 1500);
    });
    
    // Message pour indiquer de cliquer
    setTimeout(() => {
      const clickPrompt = document.createElement('div');
      clickPrompt.className = 'click-prompt';
      clickPrompt.textContent = 'CLIQUEZ POUR OUVRIR';
      packOverlay.appendChild(clickPrompt);
    }, 1000);
  }, 1000);
}

function createSimplePackOpening() {
  // Créer un overlay fullscreen
  const overlay = document.createElement('div');
  overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.9);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      overflow: hidden;
  `;

  // Créer le conteneur de confettis
  const confettiContainer = document.createElement('div');
  confettiContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
  `;
  overlay.appendChild(confettiContainer);

  // Créer la carte du joueur
  const playerCard = document.createElement('div');
  playerCard.style.cssText = `
      width: 300px;
      height: 400px;
      background: linear-gradient(135deg, #facc15, #ca8a04);
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0 20px 50px rgba(0,0,0,0.5);
      position: relative;
      z-index: 10;
  `;

  // Image du joueur
  const playerImage = document.createElement('img');
  playerImage.src = 'images/loucman-machababy.jpg';
  playerImage.style.cssText = `
      width: 200px;
      height: 200px;
      border-radius: 50%;
      object-fit: cover;
      border: 5px solid white;
      margin-bottom: 20px;
  `;

  // Texte de la carte
  const playerName = document.createElement('div');
  playerName.textContent = 'Loucman MACHABABY';
  playerName.style.cssText = `
      font-size: 1.5rem;
      font-weight: bold;
      color: black;
      text-align: center;
  `;

  // Rating
  const rating = document.createElement('div');
  rating.textContent = '90';
  rating.style.cssText = `
      position: absolute;
      top: 15px;
      right: 15px;
      background: rgba(0,0,0,0.7);
      color: white;
      padding: 5px 10px;
      border-radius: 5px;
  `;

  playerCard.appendChild(rating);
  playerCard.appendChild(playerImage);
  playerCard.appendChild(playerName);
  overlay.appendChild(playerCard);

  // Ajouter au body
  document.body.appendChild(overlay);

  // Créer des confettis
  function createConfetti() {
      const colors = ['#facc15', '#1e293b', '#ffffff', '#ca8a04'];
      
      for (let i = 0; i < 200; i++) {
          const confetti = document.createElement('div');
          confetti.style.cssText = `
              position: absolute;
              width: ${Math.random() * 10 + 5}px;
              height: ${Math.random() * 10 + 5}px;
              background-color: ${colors[Math.floor(Math.random() * colors.length)]};
              left: ${Math.random() * 100}%;
              top: -10px;
              border-radius: 50%;
              animation: fall ${Math.random() * 3 + 2}s linear infinite;
              opacity: 0.7;
          `;
          
          confettiContainer.appendChild(confetti);
      }
  }

  // Ajouter une animation de chute pour les confettis
  const style = document.createElement('style');
  style.textContent = `
      @keyframes fall {
          to {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
          }
      }
  `;
  document.head.appendChild(style);

  // Créer les confettis
  createConfetti();

  // Fermer l'overlay au clic
  overlay.addEventListener('click', () => {
      overlay.style.opacity = '0';
      setTimeout(() => {
          document.body.removeChild(overlay);
      }, 500);
  });
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  // Créer le bouton d'ouverture de pack
  const packOpenButton = document.createElement('button');
  packOpenButton.textContent = 'Open Player Pack';
  packOpenButton.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #facc15;
      color: black;
      padding: 15px 30px;
      border: none;
      border-radius: 50px;
      font-weight: 900;
      text-transform: uppercase;
      box-shadow: 0 10px 20px rgba(0,0,0,0.3);
      z-index: 1000;
      cursor: pointer;
      transition: all 0.3s ease;
  `;

  packOpenButton.addEventListener('mouseenter', () => {
      packOpenButton.style.transform = 'translateX(-50%) scale(1.1) rotate(5deg)';
  });

  packOpenButton.addEventListener('mouseleave', () => {
      packOpenButton.style.transform = 'translateX(-50%)';
  });

  packOpenButton.addEventListener('click', createSimplePackOpening);

  document.body.appendChild(packOpenButton);
});

// DÉBUT DES NOUVEAUX EFFETS

// Particules de fond avancées
function createAdvancedParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'background-particles';
  canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      pointer-events: none;
  `;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Particle {
      constructor() {
          this.reset();
      }

      reset() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.radius = Math.random() * 2 + 1;
          this.speedX = (Math.random() - 0.5) * 0.5;
          this.speedY = (Math.random() - 0.5) * 0.5;
          this.color = `rgba(250, 204, 21, ${Math.random() * 0.5})`;
      }

      update() {
          this.x += this.speedX;
          this.y += this.speedY;

          // Rebondir sur les bords
          if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
          if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
      }
  }

  const particlesArray = [];
  const particleCount = 150;

  for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle());
  }

  function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Lignes de connexion entre particules proches
      for (let i = 0; i < particlesArray.length; i++) {
          for (let j = i + 1; j < particlesArray.length; j++) {
              const dx = particlesArray[i].x - particlesArray[j].x;
              const dy = particlesArray[i].y - particlesArray[j].y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < 100) {
                  ctx.beginPath();
                  ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                  ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                  ctx.strokeStyle = `rgba(250, 204, 21, ${1 - distance / 100})`;
                  ctx.lineWidth = 0.5;
                  ctx.stroke();
              }
          }
      }

      particlesArray.forEach(particle => {
          particle.update();
          particle.draw();
      });

      requestAnimationFrame(animate);
  }

  animate();

  // Redimensionnement responsif
  window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  });
}

// Animations de révélation au scroll
function initScrollRevealAnimations() {
  const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
  };

  const revealElements = [
      '.project-card', 
      '.experience-item', 
      '.skill-card', 
      '.profile-info', 
      '.contact-item'
  ];

  const animationClasses = [
      'slide-in-left',
      'slide-in-right',
      'fade-in-up',
      'zoom-in',
      'rotate-in'
  ];

  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const element = entry.target;
              
              // Choisir une animation aléatoire
              const randomAnimation = animationClasses[Math.floor(Math.random() * animationClasses.length)];
              
              // Ajouter des classes d'animation
              element.classList.add('reveal', randomAnimation);
              
              // Ne plus observer cet élément
              observer.unobserve(element);
          }
      });
  }, observerOptions);

  // Ajouter les styles d'animation
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
      /* Animations de révélation */
      .reveal {
          opacity: 0;
          transition: all 0.8s ease-out;
          transform: translateY(50px);
      }

      .reveal.fade-in-up {
          animation: fade-in-up 1s forwards;
      }

      .reveal.slide-in-left {
          animation: slide-in-left 1s forwards;
      }

      .reveal.slide-in-right {
          animation: slide-in-right 1s forwards;
      }

      .reveal.zoom-in {
          animation: zoom-in 1s forwards;
      }

      .reveal.rotate-in {
          animation: rotate-in 1s forwards;
      }

      @keyframes fade-in-up {
          to {
              opacity: 1;
              transform: translateY(0);
          }
      }

      @keyframes slide-in-left {
          to {
              opacity: 1;
              transform: translateX(0);
          }
      }

      @keyframes slide-in-right {
          to {
              opacity: 1;
              transform: translateX(0);
          }
      }

      @keyframes zoom-in {
          to {
              opacity: 1;
              transform: scale(1);
          }
      }

      @keyframes rotate-in {
          to {
              opacity: 1;
              transform: rotate(0);
          }
      }
  `;
  document.head.appendChild(styleSheet);

  // Observer tous les éléments
  revealElements.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
          // Réinitialiser l'état initial
          element.style.opacity = '0';
          element.style.transform = 'translateY(50px) scale(0.9)';
          
          // Commencer l'observation
          observer.observe(element);
      });
  });
}

// Effets de survol avancés
function initAdvancedHoverEffects() {
  // Ajouter des effets de survol dynamiques
  const elementsToEnhance = [
      '.project-card', 
      '.skill-card', 
      '.experience-item', 
      '.contact-item', 
      '.menu-option'
  ];

  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
      .hover-3d {
          transition: all 0.4s ease;
          transform-style: preserve-3d;
      }

      .hover-3d:hover {
          transform: 
              perspective(1000px) 
              rotateX(5deg) 
              rotateY(10deg) 
              scale(1.05);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          z-index: 10;
      }
  `;
  document.head.appendChild(styleSheet);

  // Fonction pour ajouter des effets de survol
  function enhanceElement(element) {
      // Ajouter des classes d'effet
      element.classList.add('hover-3d');

      // Effet de brillance
      const glareOverlay = document.createElement('div');
      glareOverlay.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
              circle at center, 
              rgba(255,255,255,0.2) 0%, 
              transparent 70%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 10;
      `;
      
      element.style.position = 'relative';
      element.appendChild(glareOverlay);

      // Effets de survol
      element.addEventListener('mouseenter', () => {
          glareOverlay.style.opacity = '1';
      });

      element.addEventListener('mouseleave', () => {
          glareOverlay.style.opacity = '0';
      });

      // Effet de tremblement subtil
      element.addEventListener('mousemove', (e) => {
          const rect = element.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / 20;
          const rotateY = -(x - centerX) / 20;
          
          element.style.transform = `
              perspective(1000px) 
              rotateX(${rotateX}deg) 
              rotateY(${rotateY}deg) 
              scale(1.05)
          `;
      });

      element.addEventListener('mouseleave', () => {
          element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      });
  }

  // Appliquer les effets à différents éléments
  elementsToEnhance.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(enhanceElement);
  });
}

// Initialisation des effets avancés
document.addEventListener('DOMContentLoaded', () => {
  createAdvancedParticles();
  initScrollRevealAnimations();
  initAdvancedHoverEffects();
});

function initFullscreenImageViewer() {
  // Sélectionner toutes les images dans les projets
  const projectImages = document.querySelectorAll(
      '.project-showcase img, ' + 
      '.project-image-placeholder img, ' + 
      '.project-content-detail img'
  );

  // Créer l'overlay pour la vue en plein écran
  const createFullscreenOverlay = (imageSrc) => {
      // Supprimer les overlays existants
      const existingOverlay = document.querySelector('.fullscreen-image-overlay');
      if (existingOverlay) {
          existingOverlay.remove();
      }

      // Créer le nouvel overlay
      const overlay = document.createElement('div');
      overlay.classList.add('fullscreen-image-overlay');
      overlay.innerHTML = `
          <div class="fullscreen-image-container">
              <img src="${imageSrc}" alt="Image en plein écran" class="fullscreen-image">
              <button class="fullscreen-close-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
              </button>
          </div>
      `;

      // Ajouter des styles dynamiques
      const styleSheet = document.createElement('style');
      styleSheet.textContent = `
          .fullscreen-image-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(0, 0, 0, 0.9);
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 9999;
              animation: fadeIn 0.3s ease;
              cursor: zoom-out;
          }

          .fullscreen-image-container {
              position: relative;
              max-width: 90%;
              max-height: 90%;
              display: flex;
              justify-content: center;
              align-items: center;
          }

          .fullscreen-image {
              max-width: 100%;
              max-height: 100%;
              object-fit: contain;
              animation: zoomIn 0.4s ease;
              box-shadow: 0 10px 50px rgba(0,0,0,0.5);
              border-radius: 10px;
          }

          .fullscreen-close-btn {
              position: absolute;
              top: -40px;
              right: 0;
              background: rgba(255,255,255,0.2);
              color: white;
              border: none;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              transition: all 0.3s ease;
          }

          .fullscreen-close-btn:hover {
              background: rgba(255,255,255,0.4);
              transform: rotate(90deg);
          }

          @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
          }

          @keyframes zoomIn {
              from { 
                  opacity: 0;
                  transform: scale(0.8);
              }
              to { 
                  opacity: 1;
                  transform: scale(1);
              }
          }
      `;
      document.head.appendChild(styleSheet);

      // Ajouter l'overlay au body
      document.body.appendChild(overlay);

      // Fermer l'overlay au clic
      overlay.addEventListener('click', (e) => {
          if (e.target === overlay || e.target.closest('.fullscreen-close-btn')) {
              overlay.style.animation = 'fadeOut 0.3s ease';
              setTimeout(() => {
                  overlay.remove();
              }, 290);
          }
      });

      // Ajouter une animation de fadeOut
      const fadeOutStyle = document.createElement('style');
      fadeOutStyle.textContent = `
          @keyframes fadeOut {
              from { opacity: 1; }
              to { opacity: 0; }
          }
      `;
      document.head.appendChild(fadeOutStyle);
  };

  // Ajouter des écouteurs d'événements aux images
  projectImages.forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
          createFullscreenOverlay(img.src);
      });
  });
}

// Initialiser le viewer d'images en plein écran
document.addEventListener('DOMContentLoaded', initFullscreenImageViewer);

// FIN DES NOUVEAUX EFFETS