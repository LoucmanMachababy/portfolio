'use client';

import React from 'react';
import ThemeToggle from './ThemeToggle';

const projectsData = [
    {
        featured: true,
        title: "WaterPlomberie.pro",
        description: "Plateforme de réservation en ligne pour entreprise de plomberie",
        objective: "Digitaliser les prises de rendez-vous et optimiser la gestion du planning",
        solution: "Développement d'une application web avec système de réservation intelligent",
        result: "Réduction de 60% du temps de gestion administrative et amélioration de l'expérience client",
        bulletPoints: [
            "🎯 Objectif : Automatiser la prise de RDV et réduire les appels téléphoniques",
            "💡 Solution : Interface intuitive avec sélection de créneaux en temps réel",
            "📈 Résultat : +40% de réservations en ligne, gain de temps significatif"
        ],
        tech: ["React", "Next.js", "TypeScript", "API REST"],
        github: "https://github.com/LoucmanMachababy/waterplomberie.pro",
        demo: "https://www.waterplomberie.pro/"
    },
    {
        featured: true,
        title: "FCHAIRSLYON",
        description: "Site vitrine moderne pour salon de coiffure afro à Lyon",
        objective: "Créer une présence en ligne professionnelle pour attirer de nouveaux clients",
        solution: "Site responsive avec galerie photos et système de contact optimisé",
        result: "Amélioration de la visibilité en ligne et augmentation des prises de contact",
        bulletPoints: [
            "🎯 Objectif : Développer la notoriété digitale du salon et faciliter les prises de contact",
            "💡 Solution : Design moderne avec galerie photos haute qualité et formulaire de contact",
            "📈 Résultat : Site responsive optimisé SEO, amélioration de l'image de marque"
        ],
        tech: ["React", "Next.js", "JavaScript", "CSS3"],
        github: "https://github.com/LoucmanMachababy/FCHAIRSLYON",
        demo: "https://loucmanmachababy.github.io/FCHAIRSLYON/"
    },
    {
        featured: true,
        title: "Salomon Refund Tool",
        description: "Outil de gestion des remboursements pour l'équipe Salomon",
        objective: "Simplifier et automatiser le processus de traitement des remboursements",
        solution: "Interface web moderne avec workflow optimisé et suivi en temps réel",
        result: "Réduction du temps de traitement et amélioration de la traçabilité",
        bulletPoints: [
            "🎯 Objectif : Optimiser le processus de remboursement et réduire les erreurs",
            "💡 Solution : Interface intuitive avec validation automatique et suivi détaillé",
            "📈 Résultat : Processus plus fluide, meilleure satisfaction des équipes internes"
        ],
        tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        github: "https://github.com/LoucmanMachababy/Refund-tool",
        demo: "https://salomon-refund-pnoldohes-loucmans-projects.vercel.app/new"
    },
];

const ProjectsSection = ({ onBack }) => {
  return (
    <section id="projects" className="section active">
      <ThemeToggle />
      <div className="container">
        <div className="section-header">
          <button className="back-button" onClick={onBack} style={{ marginRight: 16 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Retour au menu
          </button>
          <h2 className="section-title">Projets Réalisés</h2>
          <p className="section-subtitle">Découvrez quelques réalisations concrètes et leurs résultats</p>
        </div>
        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <div className={`project-card ${project.featured ? 'featured' : ''}`} key={index}>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-results">
                  {project.bulletPoints.map((point, i) => (
                    <div key={i} className="result-point">{point}</div>
                  ))}
                </div>

                <div className="project-tech">
                  <strong>Technologies :</strong>
                  {project.tech.map(tech => <span className="tech-tag" key={tech}>{tech}</span>)}
                </div>

                <div className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                      Code source
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link demo-link">
                      Voir le site
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="projects-cta">
          <h3>Vous avez un projet similaire ?</h3>
          <p>Discutons de vos besoins et voyons comment je peux vous aider à atteindre vos objectifs.</p>
          <div className="cta-buttons">
            <a
              href="mailto:machababyloucman@gmail.com?subject=Demande de devis - Projet web&body=Bonjour Loucman,%0D%0A%0D%0AJ'ai vu vos réalisations et j'aimerais discuter d'un projet similaire :"
              className="cta-primary"
            >
              Demander un devis
            </a>
            <a
              href="https://calendly.com/machababyloucman/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-secondary"
            >
              Planifier un échange
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection; 