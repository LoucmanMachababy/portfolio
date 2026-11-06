/** Playlist cortège CUP — fichiers dans /public/audio/chants/ */
export const CHANT_PLAYLIST = [
  { id: "tous-ensemble", file: "tous-ensemble-on-chantera.mp3", title: "Tous ensemble on chantera" },
  { id: "qu-importe", file: "qu-importe-le-discours.mp3", title: "Qu'importe le discours" },
  { id: "ne-jamais", file: "ne-jamais-rien-lacher.mp3", title: "Ne jamais rien lâcher" },
  { id: "allez-paris", file: "allez-paris-allez.mp3", title: "Allez Paris allez" },
  { id: "nous-sommes", file: "nous-sommes-les-parisiens.mp3", title: "Nous sommes les Parisiens" },
  { id: "ville-lumiere", file: "o-ville-lumiere.mp3", title: "Ô Ville Lumière" },
  { id: "psg-allez", file: "psg-allez.mp3", title: "PSG Allez" },
  { id: "pour-paris", file: "pour-paris-mon-coeur.mp3", title: "Pour Paris mon cœur" },
  { id: "repense", file: "quand-je-repense-a-mon-passe.mp3", title: "Quand je repense à mon passé" },
  { id: "o-paris", file: "o-paris-sg.mp3", title: "Ô Paris SG" },
  { id: "psg", file: "paris-saint-germain.mp3", title: "Paris Saint-Germain" },
] as const;

export type ChantId = (typeof CHANT_PLAYLIST)[number]["id"];

/** État partagé beat → batteur (mis à jour par ChantPlayer). */
export const chantBeat = {
  /** 0..1 énergie basse récente */
  energy: 0,
  /** true si un rythme clair de grosse caisse est détecté */
  hasClearBeat: false,
  /** pulse 0..1 sur les hits */
  pulse: 0,
};
