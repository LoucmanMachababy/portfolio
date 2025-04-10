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
<<<<<<< HEAD
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

=======
});
>>>>>>> 9fb19aa65e28c692928e7bc4fd8e1d7517f7a292
