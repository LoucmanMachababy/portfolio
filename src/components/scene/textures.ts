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
