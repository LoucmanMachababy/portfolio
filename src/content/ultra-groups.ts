/**
 * Hommage fan-culture Virage Auteuil — pas d’affiliation officielle PSG.
 * Ambiance scène uniquement (pas de glorification de violence / dissolutions).
 */

export type UltraGroup = {
  id: string;
  name: string;
  short: string;
  kind: "current" | "heritage";
  note: string;
};

export const currentGroups: UltraGroup[] = [
  {
    id: "kst",
    name: "K-Soce Team",
    short: "K-SOCE",
    kind: "current",
    note: "Groupe le plus visible du CUP — héritage Supras / Vieille Garde.",
  },
  {
    id: "up",
    name: "Urban Paris",
    short: "UP17",
    kind: "current",
    note: "Ex Ultras Paname — tags URBAN / UP17.",
  },
  {
    id: "lcc",
    name: "Le Combat Continue",
    short: "LCC",
    kind: "current",
    note: "Bannière COMBAT — présence CUP.",
  },
  {
    id: "beriz",
    name: "Beriz Crew",
    short: "BERIZ",
    kind: "current",
    note: "Beriz = Paris — rouge/bleu, place ex-LPA.",
  },
];

export const heritageGroups: UltraGroup[] = [
  {
    id: "supras",
    name: "Supras Auteuil",
    short: "SUPRAS",
    kind: "heritage",
    note: "Panthère iconique — héritage du virage (hommage, pas chronique judiciaire).",
  },
  {
    id: "atk",
    name: "Authentiks",
    short: "ATK",
    kind: "heritage",
    note: "Pilier historique Auteuil, cité ATK.",
  },
  {
    id: "va91",
    name: "VA 91",
    short: "VA91",
    kind: "heritage",
    note: "Virage Auteuil 1991 — identité collective du stand.",
  },
];

export const slogans = [
  "ICI ON CHANTE 90 MINUTES",
  "PARTOUT OÙ TU IRAS, NOUS SERONS TOUJOURS LÀ",
  "PARIS EST MAGIQUE",
  "VILLE LUMIÈRE",
  "VIRAGE AUTEUIL",
] as const;
