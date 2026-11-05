"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type { Mesh } from "three";
import type { StandTable as StandTableType } from "@/content/tables";
import { makeBannerTexture, makeShutterTexture } from "./textures";
import { StandMerch } from "./StandMerch";
import { UltraNpc, NPC_LOOKS } from "./UltraNpc";

type Props = {
  table: StandTableType;
  active: boolean;
  nearby: boolean;
  onSelect: (id: StandTableType["id"]) => void;
};

const SHIRT_LABELS: Record<StandTableType["id"], string> = {
  identite: "K-SOCE TEAM",
  projets: "URBAN PARIS",
  competences: "LE COMBAT CONTINUE",
  salomon: "BERIZ CREW",
  contact: "COLLECTIF ULTRAS PARIS",
  staff: "VIRAGE AUTEUIL",
};

/**
 * Stand « matos ultra » = volet métallique ondulé + comptoir chargé + NPCs.
 * Le crewTag est de l’ambiance murale — le clic / E ouvre le contenu portfolio.
 */
export function StandTableMesh({ table, active, nearby, onSelect }: Props) {
  const frameRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const shutterMap = useMemo(
    () => makeShutterTexture(table.shutterColor, table.accent, table.crewTag),
    [table.shutterColor, table.accent, table.crewTag],
  );
  const accessMap = useMemo(
    () => makeBannerTexture(table.accessLabel, "#004170", "#ffffff"),
    [table.accessLabel],
  );
  const crewMap = useMemo(
    () => makeBannerTexture(table.crewTag, "#111111", "#f0a020"),
    [table.crewTag],
  );
  const titleMap = useMemo(
    () => makeBannerTexture(table.title, "#0a0a0a", "#f5f0e6"),
    [table.title],
  );
  const npcs = NPC_LOOKS[table.id] ?? [];

  useFrame(({ clock }) => {
    if (!frameRef.current) return;
    const pulse = nearby || active || hovered ? 0.35 + Math.sin(clock.elapsedTime * 3) * 0.15 : 0.05;
    const mat = frameRef.current.material as import("three").MeshStandardMaterial;
    mat.emissiveIntensity = pulse;
  });

  return (
    <group position={table.position} rotation={[0, table.rotationY, 0]}>
      <group
        onClick={(e) => {
          e.stopPropagation();
          onSelect(table.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          if (!document.pointerLockElement) document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          if (!document.pointerLockElement) document.body.style.cursor = "default";
        }}
      >
        <mesh position={[0, 1.35, -0.22]} castShadow>
          <boxGeometry args={[2.55, 2.75, 0.35]} />
          <meshStandardMaterial
            color="#5a6270"
            roughness={0.8}
            metalness={0.12}
            emissive="#1a2030"
            emissiveIntensity={0.15}
          />
        </mesh>

        <mesh position={[0, 1.25, 0]} castShadow>
          <boxGeometry args={[2.35, 2.45, 0.08]} />
          <meshStandardMaterial
            map={shutterMap}
            roughness={0.45}
            metalness={0.55}
            emissive={table.accent}
            emissiveIntensity={0.18}
          />
        </mesh>

        <mesh ref={frameRef} position={[0, 1.25, 0.05]}>
          <boxGeometry args={[2.42, 2.52, 0.02]} />
          <meshStandardMaterial
            color="#111"
            emissive={table.accent}
            emissiveIntensity={0.05}
            transparent
            opacity={0.35}
          />
        </mesh>

        <mesh position={[0, 0.55, 0.35]} castShadow>
          <boxGeometry args={[2.2, 0.12, 0.7]} />
          <meshStandardMaterial color="#1f242b" roughness={0.7} metalness={0.2} />
        </mesh>

        <StandMerch
          accent={table.accent}
          crewTag={table.crewTag}
          shirtLabel={SHIRT_LABELS[table.id]}
        />

        {/* Pastille accès + labels — canvas (évite Suspense font drei) */}
        <mesh position={[0.95, 2.35, 0.06]}>
          <planeGeometry args={[0.55, 0.28]} />
          <meshStandardMaterial map={accessMap} roughness={0.5} />
        </mesh>
        <mesh position={[-0.85, 2.35, 0.06]}>
          <planeGeometry args={[0.7, 0.28]} />
          <meshStandardMaterial map={crewMap} roughness={0.55} />
        </mesh>
        <mesh position={[0, 2.65, 0.1]}>
          <planeGeometry args={[2.0, 0.28]} />
          <meshStandardMaterial map={titleMap} roughness={0.6} />
        </mesh>

        {(nearby || active) && (
          <Html position={[0, 3.05, 0.2]} center distanceFactor={8} style={{ pointerEvents: "none" }}>
            <div className="table-hint">{active ? "Volet ouvert" : "E — lever le volet"}</div>
          </Html>
        )}
      </group>

      {npcs.map((look, i) => (
        <UltraNpc key={`${table.id}-npc-${i}`} look={look} phase={i * 1.7 + table.position[2] * 0.1} />
      ))}
    </group>
  );
}
