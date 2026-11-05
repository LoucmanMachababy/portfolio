"use client";

import { useMemo } from "react";
import * as THREE from "three";

const CORRIDOR_LENGTH = 30;
const CORRIDOR_WIDTH = 7;
const WALL_HEIGHT = 3.6;

function ConcreteMaterial({ color = "#6a6e74" }: { color?: string }) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={0.92}
      metalness={0.05}
      flatShading={false}
    />
  );
}

export function Corridor() {
  const neonPositions = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        z: -2 - i * 3.5,
        side: i % 2 === 0 ? -1 : 1,
      })),
    [],
  );

  return (
    <group>
      {/* Sol */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -CORRIDOR_LENGTH / 2]} receiveShadow>
        <planeGeometry args={[CORRIDOR_WIDTH, CORRIDOR_LENGTH]} />
        <ConcreteMaterial color="#3d4248" />
      </mesh>

      {/* Bandes de peinture au sol (style ultra) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1.8, 0.01, -CORRIDOR_LENGTH / 2]}>
        <planeGeometry args={[0.18, CORRIDOR_LENGTH]} />
        <meshStandardMaterial color="#e11d48" roughness={0.6} emissive="#7f1d1d" emissiveIntensity={0.25} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.8, 0.01, -CORRIDOR_LENGTH / 2]}>
        <planeGeometry args={[0.18, CORRIDOR_LENGTH]} />
        <meshStandardMaterial color="#2563eb" roughness={0.6} emissive="#1e3a8a" emissiveIntensity={0.3} />
      </mesh>

      {/* Plafond */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, WALL_HEIGHT, -CORRIDOR_LENGTH / 2]}>
        <planeGeometry args={[CORRIDOR_WIDTH, CORRIDOR_LENGTH]} />
        <ConcreteMaterial color="#2a2e33" />
      </mesh>

      {/* Murs */}
      <mesh position={[-CORRIDOR_WIDTH / 2, WALL_HEIGHT / 2, -CORRIDOR_LENGTH / 2]} receiveShadow>
        <boxGeometry args={[0.35, WALL_HEIGHT, CORRIDOR_LENGTH]} />
        <ConcreteMaterial color="#5c6168" />
      </mesh>
      <mesh position={[CORRIDOR_WIDTH / 2, WALL_HEIGHT / 2, -CORRIDOR_LENGTH / 2]} receiveShadow>
        <boxGeometry args={[0.35, WALL_HEIGHT, CORRIDOR_LENGTH]} />
        <ConcreteMaterial color="#5c6168" />
      </mesh>

      {/* Frise peinture murale */}
      <mesh position={[-CORRIDOR_WIDTH / 2 + 0.2, 1.4, -CORRIDOR_LENGTH / 2]}>
        <boxGeometry args={[0.05, 0.35, CORRIDOR_LENGTH]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.85} />
      </mesh>
      <mesh position={[CORRIDOR_WIDTH / 2 - 0.2, 1.4, -CORRIDOR_LENGTH / 2]}>
        <boxGeometry args={[0.05, 0.35, CORRIDOR_LENGTH]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.85} />
      </mesh>

      {/* Fond de coursive */}
      <mesh position={[0, WALL_HEIGHT / 2, -CORRIDOR_LENGTH]}>
        <boxGeometry args={[CORRIDOR_WIDTH, WALL_HEIGHT, 0.4]} />
        <ConcreteMaterial color="#4a4f55" />
      </mesh>

      {/* Entrée (derrière le joueur) */}
      <mesh position={[0, WALL_HEIGHT / 2, 1.2]}>
        <boxGeometry args={[CORRIDOR_WIDTH, WALL_HEIGHT, 0.4]} />
        <ConcreteMaterial color="#3a3f44" />
      </mesh>

      {/* Piliers / barrières */}
      {Array.from({ length: 6 }, (_, i) => {
        const z = -3 - i * 4.5;
        return (
          <group key={z}>
            <mesh position={[-CORRIDOR_WIDTH / 2 + 0.55, 1.1, z]} castShadow>
              <boxGeometry args={[0.25, 2.2, 0.25]} />
              <ConcreteMaterial color="#70757c" />
            </mesh>
            <mesh position={[CORRIDOR_WIDTH / 2 - 0.55, 1.1, z]} castShadow>
              <boxGeometry args={[0.25, 2.2, 0.25]} />
              <ConcreteMaterial color="#70757c" />
            </mesh>
            {/* Panneau grillagé style tribune */}
            <mesh position={[-CORRIDOR_WIDTH / 2 + 0.55, 2.35, z]}>
              <boxGeometry args={[0.8, 0.5, 0.05]} />
              <meshStandardMaterial color="#111827" metalness={0.4} roughness={0.5} />
            </mesh>
          </group>
        );
      })}

      {/* Néons */}
      {neonPositions.map(({ z, side }) => (
        <group key={`${z}-${side}`} position={[(CORRIDOR_WIDTH / 2 - 0.4) * side, 2.9, z]}>
          <mesh>
            <boxGeometry args={[0.08, 0.08, 2.2]} />
            <meshStandardMaterial
              color={side < 0 ? "#38bdf8" : "#fb7185"}
              emissive={side < 0 ? "#0ea5e9" : "#e11d48"}
              emissiveIntensity={2.2}
              toneMapped={false}
            />
          </mesh>
          <pointLight
            intensity={1.4}
            distance={6}
            color={side < 0 ? "#7dd3fc" : "#fda4af"}
            position={[side * -0.2, -0.3, 0]}
          />
        </group>
      ))}

      {/* Stickers / tags abstraits */}
      {[
        [-3.2, 2.1, -6, "#ef4444"],
        [3.2, 1.8, -10, "#3b82f6"],
        [-3.2, 2.4, -15, "#fbbf24"],
        [3.2, 2.0, -19, "#22c55e"],
      ].map(([x, y, z, color], i) => (
        <mesh key={i} position={[x as number, y as number, z as number]} rotation={[0, x as number > 0 ? -Math.PI / 2 : Math.PI / 2, 0]}>
          <planeGeometry args={[0.9, 0.55]} />
          <meshStandardMaterial color={color as string} roughness={0.7} />
        </mesh>
      ))}

      <ambientLight intensity={0.22} />
      <hemisphereLight args={["#94a3b8", "#1e293b", 0.45]} />
      <directionalLight
        position={[2, 8, 2]}
        intensity={0.35}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <fog attach="fog" args={["#0b0f14", 8, 32]} />
      <color attach="background" args={["#0b0f14"]} />
    </group>
  );
}

export const CORRIDOR_BOUNDS = {
  minX: -CORRIDOR_WIDTH / 2 + 0.7,
  maxX: CORRIDOR_WIDTH / 2 - 0.7,
  minZ: -CORRIDOR_LENGTH + 1.2,
  maxZ: 0.4,
};
