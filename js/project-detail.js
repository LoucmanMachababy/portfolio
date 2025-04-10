// JavaScript pour la page détail des projets

// Fonction pour masquer l'écran de chargement et afficher le contenu
function finishDetailLoading() {
    document.getElementById('loading-screen').style.display = 'none';
    document.querySelector('.project-detail').style.opacity = '1';
}

// Effet 3D pour la carte du projet
function init3DProjectEffect() {
    const showcase = document.querySelector('.project-showcase');
    
    if (showcase) {
        showcase.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleY = (x - centerX) / 20;
            const angleX = (centerY - y) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            
            // Effet de brillance qui suit le pointeur
            const glare = this.querySelector('.project-glare');
            if (glare) {
                const percentX = (x / rect.width) * 100;
                const percentY = (y / rect.height) * 100;
                glare.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 60%)`;
            }
        });
        
        showcase.addEventListener('mouseleave', function() {
            this.style.transform = '';
            const glare = this.querySelector('.project-glare');
            if (glare) {
                glare.style.background = 'none';
            }
        });
        
        // Ajouter l'élément de brillance s'il n'existe pas
        if (!showcase.querySelector('.project-glare')) {
            const glare = document.createElement('div');
            glare.className = 'project-glare';
            glare.style.position = 'absolute';
            glare.style.top = '0';
            glare.style.left = '0';
            glare.style.width = '100%';
            glare.style.height = '100%';
            glare.style.pointerEvents = 'none';
            glare.style.zIndex = '10';
            showcase.appendChild(glare);
        }
    }
}

// Fonction pour animer les caractéristiques du projet
function animateFeatures() {
    const features = document.querySelectorAll('.project-feature-item');
    
    features.forEach((feature, index) => {
        // Configuration initiale
        feature.style.opacity = '0';
        feature.style.transform = 'translateX(-20px)';
        feature.style.transition = 'all 0.5s ease';
        
        // Observer pour l'animation au défilement
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        feature.style.opacity = '1';
                        feature.style.transform = 'translateX(0)';
                    }, index * 150);
                    observer.unobserve(feature);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(feature);
    });
}

// Effet de particules pour le fond (version spécifique à la page détail)
function createDetailParticles() {
    if (document.getElementById('detail-particles-canvas')) return;
    
    const canvas = document.createElement('canvas');
    canvas.id = 'detail-particles-canvas';
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

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Programmer la fin du chargement après 2 secondes (plus court que la page principale)
    setTimeout(finishDetailLoading, 2000);
    
    // Initialiser les effets
    setTimeout(() => {
        init3DProjectEffect();
        animateFeatures();
        createDetailParticles();
    }, 2100);
    
    // Effet de flottement pour les mini-cartes de projet
    const miniCards = document.querySelectorAll('.project-mini-card');
    miniCards.forEach((card, index) => {
        card.style.animationDelay = `${0.2 * index}s`;
        card.style.animation = 'float 3s ease-in-out infinite';
    });
});