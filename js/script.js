document.addEventListener('DOMContentLoaded', () => {
    // Navigation smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Effet de parallax sur la section d'accueil
    const heroSection = document.getElementById('accueil');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });

    // Animation des compétences au scroll
    const skillSections = document.querySelectorAll('#competences .bg-gray-700');
    const observerOptions = {
        threshold: 0.7
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.bg-green-500');
                progressBar.style.width = progressBar.getAttribute('data-progress') + '%';
            }
        });
    }, observerOptions);

    skillSections.forEach(section => {
        skillObserver.observe(section);
    });

    // Modal pour les détails de projet
    const projectButtons = document.querySelectorAll('.details-btn');
    const modal = document.createElement('div');
    modal.classList.add('fixed', 'inset-0', 'bg-black', 'bg-opacity-70', 'z-100', 'hidden', 'items-center', 'justify-center');
    
    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const project = button.closest('.projet-card');
            const projectName = project.getAttribute('data-project');
            
            modal.innerHTML = `
                <div class="bg-white text-black p-8 rounded-lg max-w-md">
                    <h2>${projectName}</h2>
                    <p>Détails du projet...</p>
                    <button class="close-modal bg-red-500 text-white px-4 py-2 rounded">Fermer</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            
            modal.querySelector('.close-modal').addEventListener('click', () => {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            });
        });
    });
});