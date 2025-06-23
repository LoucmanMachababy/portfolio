'use client';

import React from 'react';
import Image from 'next/image';

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
        role: "Leader",
        company: "BURGER KING | Annecy, France",
        dates: "15/09/2023 - 07/10/2024",
        details: [
            "Préparation des sandwichs",
            "Préparation des commandes Uber Eats",
            "Gestion des équipes",
            "Gestion des stocks"
        ]
    },
    {
        role: "Hôte de caisse polyvalent",
        company: "INTERMARCHÉ | Annecy, France",
        dates: "05/06/2023 - 31/08/2023",
        details: [
            "Accueil et encaissement des clients"
        ]
    },
    {
        role: "Manager",
        company: "KFC | Seynod, France",
        dates: "15/09/2021 - 01/06/2023",
        details: [
            "Management du planning",
            "Placement des équipiers"
        ]
    },
    {
        role: "Agent de nettoyage",
        company: "Mairie d'Annecy | Annecy, France",
        dates: "26/06/2021 - 31/08/2021",
        details: [
            "Nettoyage des salles de classe"
        ]
    }
];

const AboutSection = ({ onBack }) => {
    return (
        <section id="about" className="section active">
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
                            <h3 className="info-title">Biographie</h3>
                            <p className="info-text">
                                Après une expérience en BTS management commercial opérationnel, j'ai choisi de me réorienter vers l'informatique, un secteur d'avenir aligné avec mes ambitions : travailler en ayant le sentiment d'être passionné, flexible et sur des projets épanouissants.
                            </p>
                            <p className="info-text">
                                Actuellement en formation à Epitech Lyon comme Intégrateur/développeur web (2024-2026), je suis à la recherche d'une alternance pour mettre en pratique mes compétences et développer mon expertise.
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
                                <div className="experience-item" key={index}>
                                    <h4 className="experience-role">{exp.role}</h4>
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