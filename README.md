# Portfolio — Loucman Machababy (Virage Auteuil)

Expérience portfolio immersive en première personne dans les coursives du **Virage Auteuil** (Parc des Princes). Les tables de « matos ultra » ouvrent des panneaux flat UI (identité, projets, stack, Salomon, contact). Zone pédagogique RNCP derrière `/staff`.

## Stack

- Next.js 15 (App Router) + TypeScript
- React Three Fiber + drei + Three.js
- PostCSS + BEM (overlays) + Tailwind utilitaire
- Fallback 2D accessible : `/fallback`

## Démarrage local

```bash
npm install
cp .env.example .env.local
# éditer STAFF_PASSWORD
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

| Route | Contenu |
|-------|---------|
| `/` | Coursive 3D + tables interactives |
| `/fallback` | Même contenu en HTML plat (mobile / a11y) |
| `/staff` | Blocs RNCP31899 (mot de passe) |
| `/cv-loucman-machababy.pdf` | CV téléchargeable |

### Contrôles 3D

- **ZQSD / WASD** + flèches : marcher
- **Souris** (pointer lock) : regarder
- **E** près d’une table : ouvrir le panneau
- **Esc** : fermer panneau / quitter le lock
- **Menu** (toujours visible) : navigation clavier-friendly

## Variables d’environnement

| Variable | Description |
|----------|-------------|
| `STAFF_PASSWORD` | Mot de passe de la zone `/staff` (obligatoire pour l’auth) |
| `STAFF_SESSION_SECRET` | Optionnel — secret de dérivation du cookie (sinon dérivé du password) |

Voir `.env.example`.

## Contenu public vs pédagogique

- **Public** : Maison Mayssa, Water Plomberie, Sportly, bio, Salomon (light), contact (email, téléphone, LinkedIn, GitHub, CV). Pas de photo de profil.
- **Staff** : 6 blocs RNCP31899 (BC01–BC06) avec auto-évaluation et liens de preuves.

## Remotes Git

- **Développement actif** (ce repo) : `https://github.com/LoucmanMachababy/portfolio`
- **Rendu scolaire** (privé, mirror manuel) : `EpitechWebAcademiePromo2026/W-PRO-400-LYN-4-1-portfoliotitre-3`

Les agents / CI n’ont pas accès au remote Epitech. Après validation sur `LoucmanMachababy/portfolio`, Loucman peut mirror / push manuellement vers l’orga Promo2026.

```bash
# Exemple de mirror (à faire depuis une machine autorisée)
git remote add epitech git@github.com:EpitechWebAcademiePromo2026/W-PRO-400-LYN-4-1-portfoliotitre-3.git
git push epitech main
```

## Scripts

```bash
npm run dev         # développement
npm run build       # build production
npm run start       # servir le build
npm run type-check  # TypeScript
npm run lint        # ESLint
```

## Licence

Projet portfolio personnel — tous droits réservés.
