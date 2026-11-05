"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { AUTEUIL, makeBannerTexture, makeScarfTexture, makeTeeTexture } from "./textures";

export type NpcLook = {
  shirtLabel: string;
  crewTag: string;
  primary: string;
  secondary: string;
  skin?: string;
  cap?: "cap" | "beanie" | "none";
  offset?: [number, number, number];
};

type Props = {
  look: NpcLook;
  /** Position locale (souvent devant le stand, +Z). */
  position?: [number, number, number];
  /** Décalage de phase pour désynchroniser les idle. */
  phase?: number;
};

/**
 * Ultra stylisé low-poly — tee labellisé, casquette, idle « viens voir ».
 */
export function UltraNpc({ look, position = [0, 0, 1.25], phase = 0 }: Props) {
  const armRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const skin = look.skin ?? "#c68642";
  const teeMap = useMemo(
    () => makeTeeTexture(look.shirtLabel, look.primary, look.secondary),
    [look.shirtLabel, look.primary, look.secondary],
  );
  const scarfMap = useMemo(() => makeScarfTexture(look.crewTag), [look.crewTag]);
  const tagMap = useMemo(
    () => makeBannerTexture(look.crewTag, "#0a0a0a", "#f0a020"),
    [look.crewTag],
  );
  const capMode = look.cap ?? "cap";

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + phase;
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(t * 2.1) * 0.015;
      bodyRef.current.rotation.y = Math.sin(t * 0.7) * 0.04;
    }
    if (armRef.current) {
      // Bras droit qui fait signe
      armRef.current.rotation.x = -0.6 + Math.sin(t * 3.2) * 0.55;
      armRef.current.rotation.z = 0.35 + Math.sin(t * 3.2) * 0.25;
    }
  });

  const offset = look.offset ?? [0, 0, 0];

  return (
    <group position={[position[0] + offset[0], position[1] + offset[1], position[2] + offset[2]]}>
      <group ref={bodyRef}>
        {/* Jambes */}
        <mesh position={[-0.1, 0.45, 0]} castShadow>
          <boxGeometry args={[0.14, 0.55, 0.14]} />
          <meshStandardMaterial color="#1a1f28" roughness={0.85} />
        </mesh>
        <mesh position={[0.1, 0.45, 0]} castShadow>
          <boxGeometry args={[0.14, 0.55, 0.14]} />
          <meshStandardMaterial color="#1a1f28" roughness={0.85} />
        </mesh>
        {/* Chaussures */}
        <mesh position={[-0.1, 0.12, 0.04]} castShadow>
          <boxGeometry args={[0.16, 0.1, 0.24]} />
          <meshStandardMaterial color="#111" roughness={0.7} />
        </mesh>
        <mesh position={[0.1, 0.12, 0.04]} castShadow>
          <boxGeometry args={[0.16, 0.1, 0.24]} />
          <meshStandardMaterial color="#111" roughness={0.7} />
        </mesh>

        {/* Torse / tee */}
        <mesh position={[0, 1.05, 0]} castShadow>
          <boxGeometry args={[0.42, 0.55, 0.26]} />
          <meshStandardMaterial map={teeMap} roughness={0.8} />
        </mesh>

        {/* Écharpe drapée */}
        <mesh position={[0, 1.28, 0.14]} rotation={[0.25, 0, 0.15]} castShadow>
          <boxGeometry args={[0.38, 0.08, 0.12]} />
          <meshStandardMaterial map={scarfMap} roughness={0.75} />
        </mesh>
        <mesh position={[0.18, 0.95, 0.08]} rotation={[0.1, 0, 0.6]} castShadow>
          <boxGeometry args={[0.1, 0.45, 0.06]} />
          <meshStandardMaterial map={scarfMap} roughness={0.75} />
        </mesh>

        {/* Tête */}
        <mesh position={[0, 1.48, 0]} castShadow>
          <boxGeometry args={[0.26, 0.28, 0.24]} />
          <meshStandardMaterial color={skin} roughness={0.7} />
        </mesh>

        {capMode === "cap" && (
          <group position={[0, 1.62, 0]}>
            <mesh castShadow>
              <sphereGeometry args={[0.15, 12, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color={look.primary} roughness={0.65} />
            </mesh>
            <mesh position={[0, -0.02, 0.12]} rotation={[0.2, 0, 0]}>
              <boxGeometry args={[0.18, 0.025, 0.12]} />
              <meshStandardMaterial color="#111" roughness={0.6} />
            </mesh>
          </group>
        )}
        {capMode === "beanie" && (
          <mesh position={[0, 1.64, 0]} castShadow>
            <sphereGeometry args={[0.16, 12, 10, 0, Math.PI * 2, 0, Math.PI / 1.7]} />
            <meshStandardMaterial color={look.secondary} roughness={0.9} />
          </mesh>
        )}

        {/* Bras gauche le long du corps */}
        <mesh position={[-0.28, 1.05, 0]} rotation={[0.15, 0, 0.12]} castShadow>
          <boxGeometry args={[0.1, 0.48, 0.1]} />
          <meshStandardMaterial color={look.primary} roughness={0.8} />
        </mesh>
        <mesh position={[-0.28, 0.78, 0.02]} castShadow>
          <boxGeometry args={[0.09, 0.1, 0.09]} />
          <meshStandardMaterial color={skin} roughness={0.7} />
        </mesh>

        {/* Bras droit — signe « viens » */}
        <group ref={armRef} position={[0.28, 1.22, 0]}>
          <mesh position={[0, -0.18, 0]} castShadow>
            <boxGeometry args={[0.1, 0.42, 0.1]} />
            <meshStandardMaterial color={look.primary} roughness={0.8} />
          </mesh>
          <mesh position={[0, -0.4, 0.02]} castShadow>
            <boxGeometry args={[0.09, 0.1, 0.09]} />
            <meshStandardMaterial color={skin} roughness={0.7} />
          </mesh>
        </group>

        <mesh position={[0, 1.95, 0.05]}>
          <planeGeometry args={[0.55, 0.14]} />
          <meshStandardMaterial map={tagMap} roughness={0.65} />
        </mesh>
      </group>
    </group>
  );
}

export const NPC_LOOKS: Record<string, NpcLook[]> = {
  identite: [
    {
      shirtLabel: "K-SOCE\nTEAM",
      crewTag: "K-SOCE",
      primary: AUTEUIL.rouge,
      secondary: AUTEUIL.bleu,
      cap: "cap",
    },
  ],
  projets: [
    {
      shirtLabel: "URBAN\nPARIS",
      crewTag: "URBAN",
      primary: AUTEUIL.bleu,
      secondary: AUTEUIL.rouge,
      cap: "beanie",
      offset: [-0.35, 0, 0],
    },
    {
      shirtLabel: "COLLECTIF\nULTRAS PARIS",
      crewTag: "CUP",
      primary: "#111111",
      secondary: AUTEUIL.rouge,
      cap: "cap",
      skin: "#8d5524",
      offset: [0.4, 0, 0.1],
    },
  ],
  competences: [
    {
      shirtLabel: "LE COMBAT\nCONTINUE",
      crewTag: "LCC",
      primary: AUTEUIL.rouge,
      secondary: "#111",
      cap: "cap",
    },
  ],
  salomon: [
    {
      shirtLabel: "BERIZ\nCREW",
      crewTag: "BERIZ",
      primary: AUTEUIL.bleu,
      secondary: AUTEUIL.rouge,
      cap: "beanie",
      skin: "#e0ac69",
    },
  ],
  contact: [
    {
      shirtLabel: "K-SOCE\nTEAM",
      crewTag: "K-SOCE",
      primary: AUTEUIL.rouge,
      secondary: AUTEUIL.bleu,
      cap: "cap",
      offset: [-0.3, 0, 0],
    },
    {
      shirtLabel: "COLLECTIF\nULTRAS PARIS",
      crewTag: "CUP",
      primary: AUTEUIL.bleu,
      secondary: "#f0a020",
      cap: "cap",
      offset: [0.35, 0, 0.05],
    },
  ],
  staff: [
    {
      shirtLabel: "VIRAGE\nAUTEUIL",
      crewTag: "VA91",
      primary: "#222222",
      secondary: AUTEUIL.rouge,
      cap: "beanie",
    },
  ],
};
