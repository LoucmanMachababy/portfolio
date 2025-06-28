import React from 'react';
import './Projects.css';

const projects = [
  {
    name: 'portfolio',
    description: 'Mon portfolio personnel, site vitrine de mon parcours et de mes projets.',
    github: 'https://github.com/LoucmanMachababy/portfolio',
    image: '/images/maquette.png',
  },
  {
    name: 'salomon-gear-picker',
    description: "Sélecteur d'équipement pour entretien Salomon, interface moderne et optimisée.",
    github: 'https://github.com/LoucmanMachababy/salomon-gear-picker',
    image: null,
  },
  {
    name: 'waterplomberie.pro',
    description: 'Site vitrine et système de réservation pour une entreprise de plomberie.',
    github: 'https://github.com/LoucmanMachababy/waterplomberie.pro',
    image: '/images/waterplomberie.png',
    demoLive: 'https://www.waterplomberie.pro',
  },
  {
    name: 'FCHAIRSLYON',
    description: 'Site web pour salon de coiffure afro avec galerie et prise de rendez-vous.',
    github: 'https://github.com/LoucmanMachababy/FCHAIRSLYON',
    image: null,
    demoLive: 'https://loucmanmachababy.github.io/FCHAIRSLYON/',
  },
  {
    name: 'keylogger_ethique',
    description: 'Simulateur de keylogger local à but pédagogique (Python).',
    github: 'https://github.com/LoucmanMachababy/keylogger_ethique',
    image: null,
  },
  {
    name: 'RacingJS',
    description: 'Jeu de course en JavaScript.',
    github: 'https://github.com/LoucmanMachababy/RacingJS',
    image: null,
  },
  {
    name: 'MyCinema',
    description: 'Gestion de films et utilisateurs (JavaScript).',
    github: 'https://github.com/LoucmanMachababy/MyCinema',
    image: '/images/MYCINEMA.png',
  },
  {
    name: 'MyTar',
    description: 'Projet de manipulation d'archives.',
    github: 'https://github.com/LoucmanMachababy/MyTar',
    image: null,
  },
  {
    name: 'Piscine-PHP-1',
    description: 'Exercices d'initiation PHP.',
    github: 'https://github.com/LoucmanMachababy/Piscine-PHP-1',
    image: null,
  },
  {
    name: 'Piscine-PHP-2',
    description: 'Exercices d'initiation PHP.',
    github: 'https://github.com/LoucmanMachababy/Piscine-PHP-2',
    image: null,
  },
  {
    name: 'Piscine-PHP-3',
    description: 'Exercices d'initiation PHP.',
    github: 'https://github.com/LoucmanMachababy/Piscine-PHP-3',
    image: null,
  },
  {
    name: 'Piscine-PHP-4',
    description: 'Exercices d'initiation PHP.',
    github: 'https://github.com/LoucmanMachababy/Piscine-PHP-4',
    image: null,
  },
  {
    name: 'Maquette-intro',
    description: 'Maquette HTML/CSS d'introduction.',
    github: 'https://github.com/LoucmanMachababy/Maquette-intro',
    image: '/images/maquette.png',
  },
  {
    name: 'MyUtils',
    description: 'Utilitaires JavaScript.',
    github: 'https://github.com/LoucmanMachababy/MyUtils',
    image: null,
  },
  {
    name: 'MyUtils2',
    description: 'Utilitaires JavaScript.',
    github: 'https://github.com/LoucmanMachababy/MyUtils2',
    image: null,
  },
  {
    name: 'Examen-SQL',
    description: 'Exercices et projets SQL.',
    github: 'https://github.com/LoucmanMachababy/Examen-SQL',
    image: null,
  },
  {
    name: 'TaskList-Json',
    description: 'Gestion de tâches en JSON.',
    github: 'https://github.com/LoucmanMachababy/TaskList-Json',
    image: null,
  },
  {
    name: 'Morpion',
    description: 'Jeu du morpion en CSS.',
    github: 'https://github.com/LoucmanMachababy/Morpion',
    image: '/images/morpion.png',
  },
  {
    name: 'PiePHP',
    description: 'Création d'un framework PHP (en cours).',
    github: 'https://github.com/LoucmanMachababy/PiePHP',
    image: null,
  },
  {
    name: 'CSSg-n-rator',
    description: 'Générateur CSS en PHP.',
    github: 'https://github.com/LoucmanMachababy/CSSg-n-rator',
    image: null,
  },
  {
    name: 'MyTwitter',
    description: 'Clone simplifié de Twitter.',
    github: 'https://github.com/LoucmanMachababy/MyTwitter',
    image: '/images/twitterscreen.png',
  },
  {
    name: 'MyMeetic',
    description: 'Clone simplifié de Meetic.',
    github: 'https://github.com/LoucmanMachababy/MyMeetic',
    image: '/images/Meetic.png',
  },
  {
    name: 'Spotify',
    description: 'Projet autour de l'API Spotify.',
    github: 'https://github.com/LoucmanMachababy/Spotify',
    image: '/images/spotify.png',
  },
  {
    name: 'MySnapchat',
    description: 'Clone de Snapchat avec fonctionnalités de base : envoi de photos, filtres et gestion des amis.',
    github: 'https://github.com/LoucmanMachababy/MySnapchat',
    image: null,
    demoVideo: '/video/Demo_my_snapchat.mp4',
  },
  {
    name: 'MyQuizz',
    description: 'Application de quiz interactive avec différentes catégories et système de score.',
    github: 'https://github.com/LoucmanMachababy/MyQuizz',
    image: null,
    demoVideo: '/video/Demy_MyQuizz.mp4',
  },
  // Ajoute ici d'autres projets si besoin
];

const Projects = () => {
  return (
    <section className="projects-section">
      <h2 className="projects-title">Mes Projets</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <div className="project-card" key={project.name}>
            {project.image && (
              <img src={project.image} alt={project.name} className="project-image" />
            )}
            {project.demoVideo && (
              <video 
                className="project-video" 
                controls
                preload="none"
                poster={project.image || '/images/maquette.png'}
              >
                <source src={project.demoVideo} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            )}
            <div className="project-content">
              <h3 className="project-name">{project.name}</h3>
              <p className="project-desc">{project.description}</p>
              <div className="project-links">
                <a href={project.github} className="project-link" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                {project.demoLive && (
                  <a href={project.demoLive} className="project-link demo-live" target="_blank" rel="noopener noreferrer">
                    Demo Live
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects; 