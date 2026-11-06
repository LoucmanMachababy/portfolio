"use client";

import * as THREE from "three";

/** Palette fan-culture Auteuil (hommage, pas IP officielle). */
export const AUTEUIL = {
  rouge: "#DA291C",
  bleu: "#004170",
  jauneVolet: "#c9a227",
  solRouge: "#8a4a3a",
  beton: "#7a7e84",
  betonFonce: "#4e5359",
  plafond: "#c4b8a8",
  fluo: "#f5f0d8",
} as const;

function canvasTex(
  draw: (ctx: CanvasRenderingContext2D, size: number) => void,
  size = 512,
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  draw(ctx, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

/** Rideau métallique ondulé + tag groupe (ambiance). */
export function makeShutterTexture(
  base: string = AUTEUIL.jauneVolet,
  accent: string = AUTEUIL.rouge,
  crewTag = "VA91",
) {
  return canvasTex((ctx, size) => {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, size, size);
    for (let y = 0; y < size; y += 10) {
      const g = ctx.createLinearGradient(0, y, 0, y + 10);
      g.addColorStop(0, "rgba(255,255,255,0.18)");
      g.addColorStop(0.45, "rgba(0,0,0,0.08)");
      g.addColorStop(1, "rgba(0,0,0,0.28)");
      ctx.fillStyle = g;
      ctx.fillRect(0, y, size, 10);
    }
    ctx.fillStyle = accent;
    ctx.fillRect(size * 0.1, 0, size * 0.07, size);
    ctx.fillStyle = AUTEUIL.bleu;
    ctx.fillRect(size * 0.19, 0, size * 0.07, size);
    ctx.fillStyle = accent;
    ctx.fillRect(size * 0.74, 0, size * 0.07, size);
    ctx.fillStyle = AUTEUIL.bleu;
    ctx.fillRect(size * 0.83, 0, size * 0.07, size);

    // Tag crew bubble style
    ctx.save();
    ctx.translate(size * 0.5, size * 0.48);
    ctx.rotate(-0.08);
    ctx.font = "bold 64px Impact, sans-serif";
    ctx.textAlign = "center";
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#000";
    ctx.strokeText(crewTag, 0, 0);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(crewTag, 0, 0);
    ctx.restore();

    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.font = "bold 26px sans-serif";
    ctx.fillText("CUP", size * 0.72, size * 0.88);
  });
}

export function makeFloorTexture() {
  return canvasTex((ctx, size) => {
    ctx.fillStyle = AUTEUIL.solRouge;
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 80; i++) {
      ctx.fillStyle = `rgba(40,20,15,${0.04 + Math.random() * 0.08})`;
      ctx.beginPath();
      ctx.ellipse(
        Math.random() * size,
        Math.random() * size,
        20 + Math.random() * 60,
        8 + Math.random() * 30,
        Math.random() * Math.PI,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }
    ctx.save();
    ctx.translate(size * 0.28, size * 0.55);
    ctx.rotate(-0.35);
    ctx.font = "bold 90px Impact, sans-serif";
    ctx.strokeStyle = AUTEUIL.bleu;
    ctx.lineWidth = 8;
    ctx.strokeText("1970", 0, 0);
    ctx.fillStyle = AUTEUIL.rouge;
    ctx.fillText("1970", 0, 0);
    ctx.restore();

    ctx.fillStyle = "rgba(0,40,80,0.4)";
    ctx.font = "bold 40px sans-serif";
    ctx.fillText("VA91", size * 0.62, size * 0.28);
    ctx.fillStyle = "rgba(180,30,30,0.4)";
    ctx.fillText("K-SOCE", size * 0.55, size * 0.72);
    ctx.fillStyle = "rgba(0,40,80,0.35)";
    ctx.font = "bold 32px sans-serif";
    ctx.fillText("BERIZ", size * 0.15, size * 0.35);
  }, 1024);
}

export function makeConcreteTexture(tint = "#6e7379") {
  return canvasTex((ctx, size) => {
    ctx.fillStyle = tint;
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 1200; i++) {
      const v = 80 + Math.floor(Math.random() * 80);
      ctx.fillStyle = `rgba(${v},${v},${v + 5},${0.04 + Math.random() * 0.08})`;
      ctx.fillRect(Math.random() * size, Math.random() * size, 2, 2);
    }
    ctx.strokeStyle = "rgba(0,0,0,0.12)";
    ctx.lineWidth = 2;
    for (let x = 0; x < size; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, size);
      ctx.stroke();
    }
  });
}

export function makeAccessSignTexture(title: string, seats?: string) {
  return canvasTex((ctx, size) => {
    ctx.fillStyle = AUTEUIL.bleu;
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 64px Impact, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(title, size / 2, size * 0.42);
    if (seats) {
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.font = "26px sans-serif";
      ctx.fillText(seats, size / 2, size * 0.7);
    }
  }, 512);
}

export function makeBannerTexture(text: string, bg = "#0a0a0a", fg = "#f5a623") {
  const w = 1024;
  const h = 160;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = fg;
  ctx.font = "bold 48px Impact, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, w / 2, h / 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

/** Sticker patrimoine (Supras / ATK / VA91). */
export function makeHeritageSticker(label: string, variant: "supras" | "atk" | "va91") {
  return canvasTex((ctx, size) => {
    if (variant === "va91") {
      ctx.fillStyle = AUTEUIL.rouge;
      ctx.fillRect(0, 0, size, size / 2);
      ctx.fillStyle = AUTEUIL.bleu;
      ctx.fillRect(0, size / 2, size, size / 2);
      ctx.font = "bold 110px Impact, sans-serif";
      ctx.textAlign = "center";
      ctx.lineWidth = 12;
      ctx.strokeStyle = "#000";
      ctx.strokeText("VA91", size / 2, size * 0.58);
      ctx.fillStyle = "#fff";
      ctx.fillText("VA91", size / 2, size * 0.58);
      return;
    }
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, size, size);
    if (variant === "supras") {
      // Panthère simplifiée (cercle + museau)
      ctx.fillStyle = "#f5f5f5";
      ctx.beginPath();
      ctx.arc(size / 2, size * 0.42, size * 0.28, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#111";
      ctx.beginPath();
      ctx.ellipse(size * 0.4, size * 0.38, 18, 22, 0, 0, Math.PI * 2);
      ctx.ellipse(size * 0.6, size * 0.38, 18, 22, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = AUTEUIL.rouge;
      ctx.beginPath();
      ctx.moveTo(size * 0.5, size * 0.48);
      ctx.lineTo(size * 0.42, size * 0.58);
      ctx.lineTo(size * 0.58, size * 0.58);
      ctx.fill();
    }
    ctx.fillStyle = variant === "atk" ? AUTEUIL.bleu : AUTEUIL.rouge;
    ctx.font = "bold 56px Impact, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(label, size / 2, size * 0.86);
  });
}

export function makeCrewFlagTexture(name: string, accent: string) {
  return canvasTex((ctx, size) => {
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = accent;
    ctx.fillRect(0, size * 0.12, size, size * 0.1);
    ctx.fillStyle = AUTEUIL.bleu;
    ctx.fillRect(0, size * 0.78, size, size * 0.1);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 54px Impact, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(name, size / 2, size * 0.52);
  }, 512);
}

/** Tee / hoodie print pour NPCs (labels CUP / crews). */
export function makeTeeTexture(label: string, primary: string, secondary: string) {
  return canvasTex((ctx, size) => {
    ctx.fillStyle = primary;
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = secondary;
    ctx.fillRect(0, size * 0.08, size, size * 0.07);
    ctx.fillRect(0, size * 0.85, size, size * 0.07);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 42px Impact, sans-serif";
    ctx.textAlign = "center";
    const lines = label.split("\n");
    lines.forEach((line, i) => {
      ctx.lineWidth = 6;
      ctx.strokeStyle = "#000";
      ctx.strokeText(line, size / 2, size * (0.42 + i * 0.14));
      ctx.fillText(line, size / 2, size * (0.42 + i * 0.14));
    });
  }, 512);
}

/** Écharpe pliée type ultras-schal (bandes rouge/bleu + tag). */
export function makeScarfTexture(tag: string) {
  return canvasTex((ctx, size) => {
    const band = size / 8;
    for (let i = 0; i < 8; i++) {
      ctx.fillStyle = i % 2 === 0 ? AUTEUIL.rouge : AUTEUIL.bleu;
      ctx.fillRect(0, i * band, size, band);
    }
    ctx.fillStyle = "#fff";
    ctx.font = "bold 56px Impact, sans-serif";
    ctx.textAlign = "center";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 8;
    ctx.strokeText(tag, size / 2, size * 0.55);
    ctx.fillText(tag, size / 2, size * 0.55);
  }, 512);
}

export type StylizedMuralKind =
  | "ksoce"
  | "panther"
  | "va91"
  | "stairs"
  | "ville"
  | "pitch"
  | "parisGraff"
  | "uclMunich"
  | "uclPodium"
  | "cortegeCapo"
  | "cortegeDrum"
  | "cortegeBanner";

/**
 * Fresques fan-hommage redessinées (canvas) — inspiration refs Auteuil,
 * jamais de photo brute importée.
 */
export function makeStylizedMural(kind: StylizedMuralKind) {
  return canvasTex((ctx, size) => {
    const w = size;
    const h = size;

    const paintBg = (a: string, b: string) => {
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, a);
      g.addColorStop(1, b);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    };

    const tag = (text: string, x: number, y: number, color: string, font = 48) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(-0.08);
      ctx.font = `bold ${font}px Impact, sans-serif`;
      ctx.textAlign = "center";
      ctx.lineWidth = Math.max(6, font / 8);
      ctx.strokeStyle = "#000";
      ctx.strokeText(text, 0, 0);
      ctx.fillStyle = color;
      ctx.fillText(text, 0, 0);
      ctx.restore();
    };

    const sprayDots = (n: number) => {
      for (let i = 0; i < n; i++) {
        ctx.fillStyle = `rgba(255,255,255,${0.03 + Math.random() * 0.08})`;
        ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
      }
    };

    switch (kind) {
      case "ksoce": {
        paintBg("#0a0a0c", "#1a1018");
        // éclairs
        ctx.strokeStyle = "rgba(240,240,240,0.35)";
        ctx.lineWidth = 3;
        for (let i = 0; i < 7; i++) {
          ctx.beginPath();
          ctx.moveTo(w * (0.1 + i * 0.12), h * 0.1);
          ctx.lineTo(w * (0.15 + i * 0.12), h * 0.9);
          ctx.stroke();
        }
        for (let i = 0; i < 3; i++) {
          const cx = w * (0.22 + i * 0.28);
          const cy = h * 0.48;
          ctx.fillStyle = "#e8e8e8";
          ctx.beginPath();
          ctx.arc(cx, cy, 55, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#111";
          ctx.beginPath();
          ctx.ellipse(cx - 18, cy - 8, 10, 14, 0, 0, Math.PI * 2);
          ctx.ellipse(cx + 18, cy - 8, 10, 14, 0, 0, Math.PI * 2);
          ctx.fill();
          // bandana rouge/bleu
          ctx.fillStyle = AUTEUIL.bleu;
          ctx.fillRect(cx - 50, cy + 8, 100, 14);
          ctx.fillStyle = AUTEUIL.rouge;
          ctx.fillRect(cx - 50, cy + 22, 100, 14);
        }
        tag("K-SOCE", w * 0.5, h * 0.18, "#fff", 64);
        tag("VIEILLE GARDE", w * 0.5, h * 0.88, AUTEUIL.rouge, 42);
        sprayDots(200);
        break;
      }
      case "panther": {
        paintBg("#101820", "#2a1018");
        // bandes diagonales
        for (let i = -4; i < 10; i++) {
          ctx.fillStyle = i % 2 === 0 ? AUTEUIL.bleu : AUTEUIL.rouge;
          ctx.globalAlpha = 0.35;
          ctx.beginPath();
          ctx.moveTo(i * 80, 0);
          ctx.lineTo(i * 80 + 120, 0);
          ctx.lineTo(i * 80 + 40, h);
          ctx.lineTo(i * 80 - 80, h);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#f2f2f2";
        ctx.beginPath();
        ctx.arc(w / 2, h * 0.48, 120, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#111";
        ctx.beginPath();
        ctx.ellipse(w / 2 - 40, h * 0.42, 22, 28, 0, 0, Math.PI * 2);
        ctx.ellipse(w / 2 + 40, h * 0.42, 22, 28, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = AUTEUIL.rouge;
        ctx.beginPath();
        ctx.moveTo(w / 2, h * 0.52);
        ctx.lineTo(w / 2 - 35, h * 0.66);
        ctx.lineTo(w / 2 + 35, h * 0.66);
        ctx.fill();
        // dents
        ctx.fillStyle = "#fff";
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.moveTo(w / 2 - 40 + i * 20, h * 0.66);
          ctx.lineTo(w / 2 - 30 + i * 20, h * 0.78);
          ctx.lineTo(w / 2 - 20 + i * 20, h * 0.66);
          ctx.fill();
        }
        tag("SUPRAS", w / 2, h * 0.16, "#7ec8ff", 72);
        tag("AUTEUIL", w / 2, h * 0.92, AUTEUIL.rouge, 48);
        break;
      }
      case "va91": {
        ctx.fillStyle = AUTEUIL.rouge;
        ctx.fillRect(0, 0, w, h / 2);
        ctx.fillStyle = AUTEUIL.bleu;
        ctx.fillRect(0, h / 2, w, h / 2);
        // ondulations style tôle
        ctx.strokeStyle = "rgba(0,0,0,0.15)";
        for (let x = 0; x < w; x += 14) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        tag("VA91", w / 2, h * 0.55, "#ffffff", 140);
        sprayDots(80);
        break;
      }
      case "stairs": {
        paintBg("#8a9098", "#5c636c");
        for (let i = 0; i < 8; i++) {
          ctx.fillStyle = AUTEUIL.bleu;
          ctx.fillRect(w * 0.15, h * 0.15 + i * 40, w * 0.55, 22);
          ctx.fillStyle = AUTEUIL.rouge;
          ctx.fillRect(w * 0.15, h * 0.15 + i * 40 + 22, w * 0.55, 10);
        }
        tag("ACCES 314", w * 0.72, h * 0.35, "#fff", 36);
        tag("VIRAGE", w * 0.72, h * 0.7, AUTEUIL.rouge, 40);
        break;
      }
      case "ville": {
        paintBg("#0c1830", "#1a2848");
        // sièges stylisés
        for (let row = 0; row < 6; row++) {
          for (let col = 0; col < 10; col++) {
            ctx.fillStyle = col % 2 === 0 ? AUTEUIL.bleu : AUTEUIL.rouge;
            ctx.globalAlpha = 0.55;
            ctx.fillRect(40 + col * 45, 80 + row * 55, 36, 28);
          }
        }
        ctx.globalAlpha = 1;
        tag("VILLE LUMIÈRE", w / 2, h * 0.55, "#f0d78c", 52);
        tag("PARIS EST MAGIQUE", w / 2, h * 0.72, "#fff", 36);
        break;
      }
      case "pitch": {
        paintBg("#2a3038", "#101418");
        // ouverture lumineuse
        const g = ctx.createRadialGradient(w / 2, h * 0.4, 20, w / 2, h * 0.4, w * 0.45);
        g.addColorStop(0, "#f5f8ff");
        g.addColorStop(0.4, "#9eb6d8");
        g.addColorStop(1, "rgba(16,20,24,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#0a0a0a";
        ctx.fillRect(w * 0.1, h * 0.72, w * 0.8, h * 0.14);
        tag("ICI ON CHANTE 90 MINUTES", w / 2, h * 0.8, "#fff", 34);
        tag("312 ACCÈS", w / 2, h * 0.2, "#7ec8ff", 40);
        break;
      }
      case "parisGraff": {
        paintBg("#3a424c", "#1e242c");
        for (let i = 0; i < 6; i++) {
          ctx.fillStyle = i % 2 ? AUTEUIL.rouge : AUTEUIL.bleu;
          ctx.globalAlpha = 0.4;
          ctx.fillRect(0, i * (h / 6), w, h / 6);
        }
        ctx.globalAlpha = 1;
        tag("PARIS", w / 2, h * 0.35, "#7dffb3", 88);
        tag("ST-GERMAIN", w / 2, h * 0.55, "#fff", 56);
        tag("TM 93 CREW", w * 0.7, h * 0.82, "#c084fc", 32);
        sprayDots(160);
        break;
      }
      case "uclMunich": {
        paintBg("#0a1628", "#1a2840");
        ctx.fillStyle = "#d4af37";
        ctx.beginPath();
        ctx.arc(w / 2, h * 0.42, 70, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#0a1628";
        ctx.font = "bold 48px Impact, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("5-0", w / 2, h * 0.48);
        tag("MUNICH", w / 2, h * 0.75, "#f0d78c", 48);
        tag("HOMAGE FANS", w / 2, h * 0.88, "#9aa8b8", 28);
        break;
      }
      case "uclPodium": {
        paintBg("#1a1410", "#2a2018");
        ctx.fillStyle = "#d4af37";
        ctx.fillRect(w * 0.35, h * 0.45, w * 0.3, h * 0.35);
        ctx.fillRect(w * 0.15, h * 0.55, w * 0.2, h * 0.25);
        ctx.fillRect(w * 0.65, h * 0.55, w * 0.2, h * 0.25);
        tag("CHAMPIONS", w / 2, h * 0.28, "#f0d78c", 48);
        tag("2025", w / 2, h * 0.4, "#fff", 40);
        break;
      }
      case "cortegeCapo": {
        paintBg("#101820", "#281018");
        // drapeaux stylisés
        for (let i = 0; i < 5; i++) {
          ctx.fillStyle = i % 2 ? AUTEUIL.rouge : AUTEUIL.bleu;
          ctx.fillRect(60 + i * 80, 80, 50, 180);
          ctx.strokeStyle = "#000";
          ctx.strokeRect(60 + i * 80, 80, 50, 180);
        }
        tag("CAPO", w / 2, h * 0.75, "#fff", 64);
        tag("ULTRAS PARIS", w / 2, h * 0.88, AUTEUIL.rouge, 36);
        break;
      }
      case "cortegeDrum": {
        paintBg("#1a1e24", "#0c1014");
        ctx.fillStyle = "#c9a227";
        ctx.beginPath();
        ctx.ellipse(w / 2, h * 0.48, 110, 70, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 8;
        ctx.stroke();
        ctx.fillStyle = AUTEUIL.rouge;
        ctx.fillRect(w / 2 - 8, h * 0.2, 16, h * 0.35);
        tag("BATTEUR", w / 2, h * 0.82, "#fff", 48);
        break;
      }
      case "cortegeBanner": {
        paintBg("#0a0a0a", "#1a1010");
        ctx.fillStyle = AUTEUIL.bleu;
        ctx.beginPath();
        ctx.arc(w / 2, h * 0.42, 70, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = AUTEUIL.rouge;
        ctx.beginPath();
        ctx.arc(w / 2, h * 0.42, 40, 0, Math.PI * 2);
        ctx.fill();
        tag("PARIS", w / 2, h * 0.78, "#f0a020", 64);
        break;
      }
      default:
        paintBg("#333", "#111");
    }
  }, 1024);
}
