export type RncpBlock = {
  id: string;
  code: string;
  title: string;
  selfAssessment: 1 | 2 | 3 | 4 | 5;
  summary: string;
  proofs: { label: string; href: string; note?: string }[];
};

/**
 * Blocs RNCP31899 — auto-évaluation honnête + preuves GitHub / projets livrés.
 * Échelle : 1 = découverte → 5 = autonomie solide en contexte pro.
 */
export const rncpBlocks: RncpBlock[] = [
  {
    id: "bc05",
    code: "BC05 / C1",
    title: "Analyse du besoin",
    selfAssessment: 4,
    summary:
      "Recueillir le besoin, rédiger un CDC / specs techniques, arbitrer framework vs from scratch. Pratiqué sur les sites clients et les tickets CRM Salomon.",
    proofs: [
      {
        label: "Maison Mayssa — cadrage e-commerce",
        href: "https://maison-mayssa.fr",
        note: "Besoin métier précommande → parcours & stack",
      },
      {
        label: "Water Plomberie — brief client",
        href: "https://www.waterplomberie.pro",
        note: "Premier cadrage site vitrine local",
      },
      {
        label: "Repos GitHub LoucmanMachababy",
        href: "https://github.com/LoucmanMachababy",
      },
    ],
  },
  {
    id: "bc03",
    code: "BC03 / C2",
    title: "Conception de l'architecture",
    selfAssessment: 4,
    summary:
      "Structurer l'information, concevoir la BDD et l'architecture du site / de l'API. Renforcé par PiePHP (MVC maison) et les microservices côté Salomon.",
    proofs: [
      {
        label: "PiePHP — framework MVC from scratch",
        href: "https://github.com/LoucmanMachababy",
        note: "Router, modèles, structure dossier",
      },
      {
        label: "Projets My* (MyCinema, etc.)",
        href: "https://github.com/LoucmanMachababy",
        note: "Modélisation données & écrans",
      },
    ],
  },
  {
    id: "bc04",
    code: "BC04 / C3",
    title: "Développement",
    selfAssessment: 4,
    summary:
      "Développer en respectant langages, patterns MVC, accessibilité, ergonomie et SEO. Cœur de mon quotidien école + entreprise.",
    proofs: [
      {
        label: "Maison Mayssa",
        href: "https://maison-mayssa.fr",
      },
      {
        label: "Water Plomberie",
        href: "https://www.waterplomberie.pro",
      },
      {
        label: "Portfolio immersif (ce repo)",
        href: "https://github.com/LoucmanMachababy/portfolio",
        note: "Next.js + R3F + UI accessible fallback",
      },
    ],
  },
  {
    id: "bc01",
    code: "BC01 / C4",
    title: "Recette",
    selfAssessment: 3,
    summary:
      "Écrire et exécuter un plan de test (unitaires, intégration), corriger les anomalies. Niveau en progression : tests manuels solides, automatisation à renforcer.",
    proofs: [
      {
        label: "Recettes sites clients (checklists navigateur / mobile)",
        href: "https://www.waterplomberie.pro",
      },
      {
        label: "Projets école — corrections itératives",
        href: "https://github.com/LoucmanMachababy",
      },
    ],
  },
  {
    id: "bc02",
    code: "BC02 / C5",
    title: "Support technique",
    selfAssessment: 3,
    summary:
      "Documenter, former les utilisateurs, suivre le post-lancement et appliquer les correctifs. Pratiqué via tickets ServiceNow / Jira chez Salomon et suivi des sites livrés.",
    proofs: [
      {
        label: "Suivi post-mise en ligne Water Plomberie",
        href: "https://www.waterplomberie.pro",
      },
      {
        label: "Pratique CRM / ServiceNow (Salomon)",
        href: "https://linkedin.com/in/loucman-machababy",
        note: "Contexte entreprise — pas de repo public",
      },
    ],
  },
  {
    id: "bc06",
    code: "BC06 / C6",
    title: "Ajustement de la solution",
    selfAssessment: 3,
    summary:
      "Veille, prise en compte de nouveaux besoins, préconisations d'évolution. Appliqué quand un client ou un ticket métier fait évoluer le périmètre.",
    proofs: [
      {
        label: "Évolutions Maison Mayssa (précommande)",
        href: "https://maison-mayssa.fr",
      },
      {
        label: "Sportly — itérations produit en cours",
        href: "https://github.com/LoucmanMachababy",
        note: "App mobile WIP",
      },
    ],
  },
];
