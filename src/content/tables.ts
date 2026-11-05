export type TableId =
  | "identite"
  | "projets"
  | "competences"
  | "salomon"
  | "contact"
  | "staff";

export type StandTable = {
  id: TableId;
  title: string;
  shortLabel: string;
  position: [number, number, number];
  rotationY: number;
  clothColor: string;
  accent: string;
  public: boolean;
  hint: string;
};

/** Positions le long de la coursive (±X latéral, Z profondeur). */
export const standTables: StandTable[] = [
  {
    id: "identite",
    title: "Écharpes & identité",
    shortLabel: "Identité",
    position: [-2.4, 0, -4],
    rotationY: 0.15,
    clothColor: "#1a2332",
    accent: "#e8f0ff",
    public: true,
    hint: "Qui je suis",
  },
  {
    id: "projets",
    title: "Maillots collectés",
    shortLabel: "Projets",
    position: [2.5, 0, -8],
    rotationY: -0.2,
    clothColor: "#102018",
    accent: "#7dffb3",
    public: true,
    hint: "Travaux vitrine",
  },
  {
    id: "competences",
    title: "Plan du match",
    shortLabel: "Stack",
    position: [-2.6, 0, -12],
    rotationY: 0.25,
    clothColor: "#241810",
    accent: "#ffb347",
    public: true,
    hint: "Compétences techniques",
  },
  {
    id: "salomon",
    title: "Banc de touche",
    shortLabel: "Salomon",
    position: [2.4, 0, -16],
    rotationY: -0.1,
    clothColor: "#101820",
    accent: "#6ec8ff",
    public: true,
    hint: "Expérience Salomon",
  },
  {
    id: "contact",
    title: "Buvette / contact",
    shortLabel: "Contact",
    position: [-2.2, 0, -20],
    rotationY: 0.18,
    clothColor: "#1c1018",
    accent: "#ff6b8a",
    public: true,
    hint: "Me joindre",
  },
  {
    id: "staff",
    title: "Feuille de match (staff)",
    shortLabel: "Staff",
    position: [0, 0, -24],
    rotationY: 0,
    clothColor: "#141414",
    accent: "#c9a227",
    public: false,
    hint: "Zone pédagogique RNCP",
  },
];

export type NavItem =
  | { id: TableId; label: string; href?: never }
  | { href: string; label: string; id?: never };

export const navItems: NavItem[] = [
  { id: "identite", label: "Identité" },
  { id: "projets", label: "Projets" },
  { id: "competences", label: "Stack" },
  { id: "salomon", label: "Salomon" },
  { id: "contact", label: "Contact" },
  { href: "/staff", label: "Staff RNCP" },
  { href: "/fallback", label: "Version 2D" },
];
