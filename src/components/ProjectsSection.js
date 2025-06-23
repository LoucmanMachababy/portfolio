'use client';

import React from 'react';

const projectsData = [
    {
        featured: true,
        title: "Salomon Gear Picker",
        description: "Projet réalisé pour un entretien chez Salomon - sélecteur d'équipement avec interface moderne et expérience utilisateur optimisée",
        features: ["Interface intuitive", "Responsive design", "Filtres avancés"],
        challenges: "Création d'une interface utilisateur moderne en quelques heures, optimisation des performances",
        tech: ["Angular", "TypeScript", "HTML"],
        metrics: ["⭐ Projet d'entretien", "🚀 Interface moderne"],
        github: "https://github.com/LoucmanMachababy/salomon-gear-picker",
        detailsId: "salomon-gear-picker"
    },
    {
        featured: true,
        title: "WaterPlomberie.pro",
        description: "Système de réservation en ligne pour services de plomberie avec sélection d'interventions et gestion de planning",
        features: ["Système de réservation", "Gestion de planning", "Interface admin"],
        challenges: "Gestion des créneaux horaires, validation des réservations, interface responsive",
        tech: ["React", "Next.js", "TypeScript"],
        metrics: ["⭐ Projet professionnel", "🔧 Système complet"],
        github: "https://github.com/LoucmanMachababy/waterplomberie.pro",
        demo: "https://www.waterplomberie.pro/"
    },
    {
        featured: true,
        title: "FCHAIRSLYON",
        description: "Site web pour salon de coiffure afro avec design moderne, galerie de photos et système de prise de rendez-vous",
        features: ["Galerie photos", "Prise de RDV", "Design moderne"],
        challenges: "Création d'un design attractif, optimisation pour mobile, intégration de la galerie",
        tech: ["React", "Next.js", "JavaScript"],
        metrics: ["⭐ Site commercial", "🎨 Design moderne"],
        github: "https://github.com/LoucmanMachababy/FCHAIRSLYON",
        demo: "https://loucmanmachababy.github.io/FCHAIRSLYON/"
    },
    {
        title: "Keylogger Éthique",
        description: "Simulateur de keylogger local à but pédagogique pour l'apprentissage de la cybersécurité et la sensibilisation",
        features: ["Éducatif", "Sécurité", "Simulation locale"],
        challenges: "Création d'un outil éducatif sécurisé, interface claire pour l'apprentissage",
        tech: ["Python", "Éducation"],
        metrics: ["🔒 Projet éducatif", "📚 Cybersécurité"],
        github: "https://github.com/LoucmanMachababy/keylogger_ethique"
    },
    {
        title: "MyCinema",
        description: "Site de gestion de cinéma avec base de données complète, gestion des films, séances et réservations",
        features: ["Gestion de films", "Réservations", "Base de données"],
        challenges: "Conception de la base de données, gestion des conflits de réservation, interface utilisateur intuitive",
        tech: ["JavaScript", "HTML", "CSS", "MySQL"],
        metrics: ["🎬 Gestion complète", "💾 Base de données"],
        github: "https://github.com/LoucmanMachababy/MyCinema",
    },
    {
        title: "MyTar",
        description: "Implémentation d'un système de compression et décompression de fichiers inspiré de l'utilitaire tar Unix",
        features: ["Compression", "Décompression", "Gestion fichiers"],
        challenges: "Gestion de la mémoire, algorithmes de compression, manipulation de fichiers binaires",
        tech: ["C", "Système"],
        metrics: ["⚙️ Système", "📦 Compression"],
        github: "https://github.com/LoucmanMachababy/MyTar"
    }
];

const ProjectsSection = ({ onBack }) => {
  return (
    <section id="projects" className="section active">
      <div className="container">
        <div className="section-header">
          <button className="back-button" onClick={onBack} style={{ marginRight: 16 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Retour au menu
          </button>
          <h2 className="section-title">Mes Projets</h2>
        </div>
        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <div className={`project-card ${project.featured ? 'featured' : ''}`} key={index}>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-features">
                  {project.features.map(feature => <span className="feature-tag" key={feature}>{feature}</span>)}
                </div>
                <div className="project-challenges">
                  <strong>Défis :</strong> {project.challenges}
                </div>
                <div className="project-tech">
                    {project.tech.map(tech => <span className="tech-tag" key={tech}>{tech}</span>)}
                </div>
                <div className="project-metrics">
                    {project.metrics.map(metric => <span className="metric" key={metric}>{metric}</span>)}
                </div>
                <div className="project-links">
                  {project.github && <a href={project.github} target="_blank" className="project-link">GitHub</a>}
                  {project.demo && <a href={project.demo} target="_blank" className="project-link demo-link">Demo Live</a>}
                  {project.detailsId && <a href="#" className="project-link details-link" data-project={project.detailsId}>Détails</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection; 