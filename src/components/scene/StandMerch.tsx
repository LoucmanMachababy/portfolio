"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { AUTEUIL, makeScarfTexture, makeTeeTexture } from "./textures";

type Props = {
  accent: string;
  crewTag: string;
  shirtLabel: string;
};

function FoldedTee({
  position,
  rotation = [0, 0, 0],
  map,
  color,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  map: THREE.Texture;
  color: string;
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <boxGeometry args={[0.38, 0.06, 0.32]} />
      <meshStandardMaterial map={map} color={color} roughness={0.85} />
    </mesh>
  );
}

function Cap({
  position,
  rotation = [0, 0, 0],
  color,
  bill,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  bill: string;
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <sphereGeometry args={[0.1, 12, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      <mesh position={[0.08, -0.02, 0]} rotation={[0.15, 0, Math.PI / 2]}>
        <boxGeometry args={[0.14, 0.02, 0.1]} />
        <meshStandardMaterial color={bill} roughness={0.65} />
      </mesh>
    </group>
  );
}

function ScarfStack({
  position,
  map,
}: {
  position: [number, number, number];
  map: THREE.Texture;
}) {
  return (
    <group position={position}>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[i * 0.02, 0.03 + i * 0.045, i * 0.015]}
          rotation={[0.05, 0.2 + i * 0.15, 0.08]}
          castShadow
        >
          <boxGeometry args={[0.55, 0.04, 0.16]} />
          <meshStandardMaterial map={map} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function MiniFlag({
  position,
  rotation = [0, 0, 0],
  accent,
  label,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  accent: string;
  label: string;
}) {
  const map = useMemo(() => makeTeeTexture(label, "#111111", accent), [label, accent]);
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.45, 6]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.4} roughness={0.5} />
      </mesh>
      <mesh position={[0.12, 0.34, 0]}>
        <planeGeometry args={[0.28, 0.18]} />
        <meshStandardMaterial map={map} side={THREE.DoubleSide} roughness={0.75} />
      </mesh>
    </group>
  );
}

function StickerPile({ position, accent }: { position: [number, number, number]; accent: string }) {
  return (
    <group position={position}>
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[(i % 2) * 0.08 - 0.04, 0.01 + i * 0.008, Math.floor(i / 2) * 0.07]}
          rotation={[0, i * 0.4, 0]}
        >
          <boxGeometry args={[0.1, 0.008, 0.1]} />
          <meshStandardMaterial color={i % 2 === 0 ? accent : AUTEUIL.bleu} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

/** Fumigène décoratif stylisé (props scène, pas réalisme). */
function StylizedSmokeCan({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.045, 0.05, 0.14, 10]} />
        <meshStandardMaterial color={color} metalness={0.35} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.09, 0]}>
        <cylinderGeometry args={[0.02, 0.03, 0.04, 8]} />
        <meshStandardMaterial color="#222" roughness={0.7} />
      </mesh>
    </group>
  );
}

/**
 * Empilement « revendeur matos » sur le comptoir devant le volet.
 * Coordonnées locales stand (comptoir ~ y 0.55, z 0.35).
 */
export function StandMerch({ accent, crewTag, shirtLabel }: Props) {
  const scarfMap = useMemo(() => makeScarfTexture(crewTag), [crewTag]);
  const teeMap = useMemo(
    () => makeTeeTexture(shirtLabel, accent === AUTEUIL.bleu ? AUTEUIL.bleu : AUTEUIL.rouge, accent),
    [shirtLabel, accent],
  );
  const teeAlt = useMemo(
    () => makeTeeTexture(crewTag, "#111111", accent),
    [crewTag, accent],
  );

  return (
    <group position={[0, 0.62, 0.42]}>
      <ScarfStack position={[-0.75, 0, 0.05]} map={scarfMap} />
      <FoldedTee position={[-0.25, 0.02, 0.05]} map={teeMap} color="#ffffff" />
      <FoldedTee position={[-0.22, 0.08, 0.02]} rotation={[0, 0.3, 0]} map={teeAlt} color="#ffffff" />
      <FoldedTee position={[-0.28, 0.14, 0.04]} rotation={[0, -0.2, 0]} map={teeMap} color="#f5f5f5" />
      <FoldedTee position={[0.15, 0.02, 0.08]} rotation={[0, 0.5, 0]} map={teeAlt} color="#eee" />
      <FoldedTee position={[0.18, 0.08, 0.05]} map={teeMap} color="#fff" />

      <Cap position={[0.55, 0.08, 0.05]} color={AUTEUIL.bleu} bill="#111" rotation={[0, -0.4, 0]} />
      <Cap position={[0.72, 0.08, -0.02]} color={AUTEUIL.rouge} bill="#1a1a1a" rotation={[0, 0.6, 0]} />
      <Cap position={[0.62, 0.16, 0.08]} color="#111" bill={accent} rotation={[0.1, 0.2, 0]} />

      <MiniFlag position={[0.95, 0, -0.05]} accent={accent} label={crewTag} rotation={[0, -0.35, 0]} />
      <StickerPile position={[-0.05, 0, 0.18]} accent={accent} />
      <StylizedSmokeCan position={[0.35, 0.07, 0.18]} color={AUTEUIL.rouge} />
      <StylizedSmokeCan position={[0.48, 0.07, 0.15]} color={AUTEUIL.bleu} />

      {/* Écharpe drapée sur le bord */}
      <mesh position={[0.05, -0.05, 0.28]} rotation={[0.9, 0.1, 0.4]} castShadow>
        <boxGeometry args={[0.7, 0.035, 0.12]} />
        <meshStandardMaterial map={scarfMap} roughness={0.78} />
      </mesh>
    </group>
  );
}
