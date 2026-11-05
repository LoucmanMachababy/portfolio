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
  /** Centre du volet / stand */
  position: [number, number, number];
  rotationY: number;
  /** Teinte dominante du rideau métallique */
  shutterColor: string;
  accent: string;
  public: boolean;
  hint: string;
  accessLabel: string;
};

/**
 * Stands = volets métalliques ondulés (refs Auteuil),
 * calés le long des murs de la coursive.
 */
export const standTables: StandTable[] = [
  {
    id: "identite",
    title: "Écharpes & identité",
    shortLabel: "Identité",
    position: [2.95, 0, -5],
    rotationY: -Math.PI / 2,
    shutterColor: "#c9a227",
    accent: "#DA291C",
    public: true,
    hint: "Qui je suis",
    accessLabel: "311",
  },
  {
    id: "projets",
    title: "Maillots collectés",
    shortLabel: "Projets",
    position: [-2.95, 0, -8.5],
    rotationY: Math.PI / 2,
    shutterColor: "#d4b43a",
    accent: "#004170",
    public: true,
    hint: "Travaux vitrine",
    accessLabel: "312",
  },
  {
    id: "competences",
    title: "Plan du match",
    shortLabel: "Stack",
    position: [2.95, 0, -12],
    rotationY: -Math.PI / 2,
    shutterColor: "#b8860b",
    accent: "#DA291C",
    public: true,
    hint: "Compétences techniques",
    accessLabel: "411",
  },
  {
    id: "salomon",
    title: "Banc de touche",
    shortLabel: "Salomon",
    position: [-2.95, 0, -15.5],
    rotationY: Math.PI / 2,
    shutterColor: "#c9a227",
    accent: "#004170",
    public: true,
    hint: "Expérience Salomon",
    accessLabel: "312",
  },
  {
    id: "contact",
    title: "Buvette / contact",
    shortLabel: "Contact",
    position: [2.95, 0, -19],
    rotationY: -Math.PI / 2,
    shutterColor: "#daa520",
    accent: "#DA291C",
    public: true,
    hint: "Me joindre",
    accessLabel: "311",
  },
  {
    id: "staff",
    title: "Feuille de match (staff)",
    shortLabel: "Staff",
    position: [-2.95, 0, -22.5],
    rotationY: Math.PI / 2,
    shutterColor: "#8a7350",
    accent: "#c9a227",
    public: false,
    hint: "Zone pédagogique RNCP",
    accessLabel: "STAFF",
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
