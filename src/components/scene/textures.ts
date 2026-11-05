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

/** Rideau métallique ondulé jaune + bandes rouge/bleu. */
export function makeShutterTexture(base: string = AUTEUIL.jauneVolet, accent: string = AUTEUIL.rouge) {
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
    // Bandes verticales PSG-like
    ctx.fillStyle = accent;
    ctx.fillRect(size * 0.12, 0, size * 0.08, size);
    ctx.fillStyle = AUTEUIL.bleu;
    ctx.fillRect(size * 0.22, 0, size * 0.08, size);
    ctx.fillStyle = accent;
    ctx.fillRect(size * 0.7, 0, size * 0.08, size);
    ctx.fillStyle = AUTEUIL.bleu;
    ctx.fillRect(size * 0.8, 0, size * 0.08, size);
    // Tags
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.font = "bold 42px sans-serif";
    ctx.rotate(-0.2);
    ctx.fillText("TM 93", size * 0.35, size * 0.55);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    ctx.font = "28px sans-serif";
    ctx.fillText("VA", size * 0.55, size * 0.82);
  });
}

export function makeFloorTexture() {
  return canvasTex((ctx, size) => {
    ctx.fillStyle = AUTEUIL.solRouge;
    ctx.fillRect(0, 0, size, size);
    // Usure
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
    // Tag sol 1970
    ctx.save();
    ctx.translate(size * 0.35, size * 0.55);
    ctx.rotate(-0.35);
    ctx.font = "bold 96px Impact, sans-serif";
    ctx.strokeStyle = AUTEUIL.bleu;
    ctx.lineWidth = 8;
    ctx.strokeText("1970", 0, 0);
    ctx.fillStyle = AUTEUIL.rouge;
    ctx.fillText("1970", 0, 0);
    ctx.restore();
    ctx.fillStyle = "rgba(0,40,80,0.35)";
    ctx.font = "bold 48px sans-serif";
    ctx.fillText("COMMANDO", size * 0.55, size * 0.3);
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
    // Coffrage lines
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
    ctx.font = "bold 72px Impact, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(title, size / 2, size * 0.42);
    if (seats) {
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.font = "28px sans-serif";
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
  ctx.font = "bold 52px Impact, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, w / 2, h / 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}
