'use client';

import React from 'react';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';

const skills = [
    { name: "JavaScript", icon: "/images/skills/javascript.svg" },
    { name: "TypeScript", icon: "/images/skills/typescript.svg" },
    { name: "React", icon: "/images/skills/react.svg" },
    { name: "Next.js", icon: "/images/skills/nextjs.svg" },
    { name: "PHP", icon: "/images/skills/php.svg" },
    { name: "Laravel", icon: "/images/skills/laravel.svg" },
    { name: "MySQL", icon: "/images/skills/mysql.svg" },
    { name: "Tailwind CSS", icon: "/images/skills/tailwindcss.svg" },
    { name: "Git", icon: "/images/skills/git.svg" },
];

const experiences = [
    {
        role: "Développeur Full-Stack Freelance",
        company: "Indépendant | Annecy & Lyon",
        dates: "Novembre 2024 - Présent",
        details: [
            "Développement de sites web et applications sur mesure",
            "Création de sites vitrines et e-commerce",
            "Maintenance et optimisation de sites existants",
            "Conseil technique et accompagnement clients"
        ],
        highlight: true
    },
    {
        role: "Leader",
        company: "BURGER KING | Annecy, France",
        dates: "15/09/2023 - 07/10/2024",
        details: [
            "Gestion d'équipe et coordination des services",
            "Optimisation des processus de préparation",
            "Formation des nouveaux collaborateurs",
            "Gestion des stocks et de la qualité"
        ]
    },
    {
        role: "Manager",
        company: "KFC | Seynod, France",
        dates: "15/09/2021 - 01/06/2023",
        details: [
            "Management d'équipe et planification",
            "Optimisation des performances du restaurant",
            "Formation et développement des équipes"
        ]
    }
];

const AboutSection = ({ onBack }) => {
    return (
        <section id="about" className="section active">
            <ThemeToggle />
            <div className="container">
                <div className="section-header">
                    <button className="back-button" onClick={onBack} style={{ marginRight: 16 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        Retour au menu
                    </button>
                    <h2 className="section-title">À Propos de Moi</h2>
                </div>

                <div className="profile-content">
                    <div className="profile-card">
                        <div className="profile-info">
                            <h3 className="info-title">Mon Parcours</h3>
                            <p className="info-text">
                                Développeur Full-Stack passionné, j'ai fait le choix de me spécialiser dans le développement web après une expérience enrichissante en management. Cette transition m'a permis d'allier ma passion pour la technologie avec mes compétences en gestion de projet et relation client.
                            </p>
                            <p className="info-text">
                                Depuis novembre 2024, j'exerce en tant que développeur freelance, créant des solutions web sur mesure pour mes clients dans la région Annecy-Lyon. Actuellement en formation à Epitech Lyon (2024-2026), je combine apprentissage continu et pratique professionnelle.
                            </p>
                            <p className="info-text">
                                <strong>Projet 2025 :</strong> Une opportunité d'alternance chez Salomon pourrait enrichir mon parcours à partir de septembre 2025, me permettant d'évoluer dans un environnement corporate tout en maintenant mon activité freelance.
                            </p>
                        </div>
                        <div className="profile-info">
                             <h3 className="info-title">Compétences Techniques</h3>
                             <div className="skills-cards">
                                {skills.map(skill => (
                                    <div className="skill-card" key={skill.name}>
                                        <div className="skill-card-content">
                                            <Image src={skill.icon} alt={skill.name} className="skill-icon" width={50} height={50} />
                                            <div className="skill-name">{skill.name}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="profile-card">
                        <div className="profile-info">
                            <h3 className="info-title">Expérience Professionnelle</h3>
                            {experiences.map((exp, index) => (
                                <div className={`experience-item ${exp.highlight ? 'current-role' : ''}`} key={index}>
                                    <h4 className="experience-role">
                                        {exp.role}
                                        {exp.highlight && <span className="current-badge">Actuel</span>}
                                    </h4>
                                    <p className="experience-company">{exp.company}</p>
                                    <p className="experience-dates">{exp.dates}</p>
                                    <div className="experience-details">
                                        <ul>
                                            {exp.details.map((item, i) => <li key={i}>{item}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection; 