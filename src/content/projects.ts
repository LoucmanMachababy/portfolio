export type Project = {
  id: string;
  name: string;
  url?: string;
  status: string;
  summary: string;
  stack: string[];
};

export const publicProjects: Project[] = [
  {
    id: "maison-mayssa",
    name: "Maison Mayssa",
    url: "https://maison-mayssa.fr",
    status: "En ligne — e-commerce précommande",
    summary:
      "Boutique en ligne de précommande : parcours d'achat clair, vitrine produit soignée et mise en production réelle. Projet vitrine le plus abouti à ce jour.",
    stack: ["Next.js", "TypeScript", "E-commerce", "SEO"],
  },
  {
    id: "water-plomberie",
    name: "Water Plomberie",
    url: "https://www.waterplomberie.pro",
    status: "En ligne — premier site client",
    summary:
      "Site vitrine pour une entreprise de plomberie : pages services, prise de contact et présence locale. Premier projet livré de bout en bout.",
    stack: ["HTML/CSS", "PHP", "Responsive", "SEO local"],
  },
  {
    id: "sportly",
    name: "Sportly",
    status: "Application mobile — en cours",
    summary:
      "App mobile autour du sport et de la motivation : parcours utilisateur, écrans clés et base technique en construction. Version publique à venir — détails volontairement sobres tant que le produit n'est pas figé.",
    stack: ["React Native", "TypeScript", "UX mobile"],
  },
];

export const skills = [
  {
    group: "Frontend",
    items: ["React", "Next.js", "TypeScript", "HTML/CSS", "R3F / Three.js"],
  },
  {
    group: "Backend",
    items: ["Node.js", "PHP", "APIs REST", "MySQL", "Microservices"],
  },
  {
    group: "Outils & cloud",
    items: ["Git / GitLab", "AWS", "Jira", "ServiceNow", "CI/CD"],
  },
  {
    group: "Méthode",
    items: ["MVC", "Accessibilité", "SEO", "Recette", "Documentation"],
  },
];

export const experienceSalomon = {
  title: "Salomon — Développeur Full-Stack IT CRM",
  period: "Depuis septembre 2025 · Annecy",
  bullets: [
    "Contribution au CRM et aux microservices IT internes.",
    "Stack quotidienne : Node.js, React, TypeScript, AWS.",
    "Collaboration via GitLab, Jira et ServiceNow.",
    "Rythme alternance école / entreprise (Web@cadémie puis IPSSI).",
  ],
};
