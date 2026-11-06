"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeBannerTexture, makeStylizedMural, AUTEUIL } from "./textures";

/** Twin Big Ears — hommage fan (pas une affiliation UEFA/PSG). */
function BigEarsTrophy({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  const gold = "#d4af37";
  const goldDark = "#8a7020";
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.55, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.18, 0.35, 16]} />
        <meshStandardMaterial color={gold} metalness={0.85} roughness={0.25} emissive={goldDark} emissiveIntensity={0.25} />
      </mesh>
      <mesh position={[-0.22, 0.62, 0]} rotation={[0, 0, 0.35]} castShadow>
        <torusGeometry args={[0.14, 0.035, 8, 16, Math.PI]} />
        <meshStandardMaterial color={gold} metalness={0.85} roughness={0.25} emissive={goldDark} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0.22, 0.62, 0]} rotation={[0, Math.PI, -0.35]} castShadow>
        <torusGeometry args={[0.14, 0.035, 8, 16, Math.PI]} />
        <meshStandardMaterial color={gold} metalness={0.85} roughness={0.25} emissive={goldDark} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.1, 0.22, 12]} />
        <meshStandardMaterial color={gold} metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.06, 16]} />
        <meshStandardMaterial color={goldDark} metalness={0.7} roughness={0.35} />
      </mesh>
    </group>
  );
}

function SoftGoldConfetti({ count = 28 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 1.6;
      arr[i * 3 + 1] = Math.random() * 1.8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
    }
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    const pts = ref.current;
    if (!pts) return;
    const pos = pts.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) - dt * (0.15 + (i % 5) * 0.04);
      if (y < 0) y = 1.6 + Math.random() * 0.4;
      pos.setY(i, y);
      pos.setX(i, pos.getX(i) + Math.sin(y * 4 + i) * dt * 0.08);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref} position={[0, 0.9, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#f0d78c" size={0.035} transparent opacity={0.55} depthWrite={false} sizeAttenuation />
    </points>
  );
}

function StylizedPoster({
  kind,
  position,
  rotation,
  size,
}: {
  kind: "uclMunich" | "uclPodium";
  position: [number, number, number];
  rotation: [number, number, number];
  size: [number, number];
}) {
  const map = useMemo(() => makeStylizedMural(kind), [kind]);
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshStandardMaterial map={map} roughness={0.7} emissive="#221800" emissiveIntensity={0.15} />
    </mesh>
  );
}

/**
 * Sanctuaire discret milieu-coursive : 2 oreilles + posters stylisés.
 * Hors axe de marche (légèrement sur le côté droit).
 */
export function ChampionsShrine() {
  const plaque = useMemo(
    () => makeBannerTexture("DEUX OREILLES · HOMAGE FANS", "#1a1410", "#f0d78c"),
    [],
  );

  return (
    <group position={[1.85, 0, -16.2]}>
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.35, 0.7, 0.7]} />
        <meshStandardMaterial color="#2a3038" roughness={0.6} metalness={0.25} />
      </mesh>
      <mesh position={[0, 0.72, 0]}>
        <boxGeometry args={[1.2, 0.04, 0.55]} />
        <meshStandardMaterial color="#1a1e24" roughness={0.4} metalness={0.5} />
      </mesh>

      <BigEarsTrophy position={[-0.28, 0.72, 0]} scale={0.85} />
      <BigEarsTrophy position={[0.28, 0.72, 0]} scale={0.85} />

      <pointLight position={[0, 2.2, 0.5]} intensity={4.5} distance={6} color="#ffe6a8" />
      <pointLight position={[0, 1.5, 0.3]} intensity={2.2} distance={4} color="#ffd9a0" />

      <mesh position={[0, 1.55, -0.28]}>
        <planeGeometry args={[1.15, 0.22]} />
        <meshStandardMaterial map={plaque} roughness={0.55} />
      </mesh>

      <SoftGoldConfetti />

      <StylizedPoster
        kind="uclMunich"
        position={[0.05, 2.15, -0.32]}
        rotation={[0, 0, 0]}
        size={[1.05, 0.7]}
      />
      <StylizedPoster
        kind="uclPodium"
        position={[-1.15, 1.7, 0]}
        rotation={[0, Math.PI / 2.4, 0]}
        size={[0.85, 0.6]}
      />

      <mesh position={[0.55, 1.15, 0.28]} rotation={[0, -0.4, 0]}>
        <planeGeometry args={[0.35, 0.18]} />
        <meshStandardMaterial color={AUTEUIL.bleu} emissive={AUTEUIL.bleu} emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}
