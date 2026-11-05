"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Html } from "@react-three/drei";
import type { Mesh } from "three";
import type { StandTable as StandTableType } from "@/content/tables";
import { makeShutterTexture } from "./textures";

type Props = {
  table: StandTableType;
  active: boolean;
  nearby: boolean;
  onSelect: (id: StandTableType["id"]) => void;
};

/**
 * Stand « matos ultra » = volet métallique ondulé (refs Auteuil),
 * pas une table générique de foire.
 */
export function StandTableMesh({ table, active, nearby, onSelect }: Props) {
  const frameRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const shutterMap = useMemo(
    () => makeShutterTexture(table.shutterColor, table.accent),
    [table.shutterColor, table.accent],
  );

  useFrame(({ clock }) => {
    if (!frameRef.current) return;
    const pulse = nearby || active || hovered ? 0.35 + Math.sin(clock.elapsedTime * 3) * 0.15 : 0.05;
    const mat = frameRef.current.material as import("three").MeshStandardMaterial;
    mat.emissiveIntensity = pulse;
  });

  return (
    <group
      position={table.position}
      rotation={[0, table.rotationY, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(table.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
    >
      {/* Encadrement béton / alu du stand */}
      <mesh position={[0, 1.35, -0.22]} castShadow>
        <boxGeometry args={[2.55, 2.75, 0.35]} />
        <meshStandardMaterial color="#3a3f46" roughness={0.85} metalness={0.15} />
      </mesh>

      {/* Rideau ondulé */}
      <mesh position={[0, 1.25, 0]} castShadow>
        <boxGeometry args={[2.35, 2.45, 0.08]} />
        <meshStandardMaterial
          map={shutterMap}
          roughness={0.45}
          metalness={0.55}
          emissive={table.accent}
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Liseré lumineux quand proche */}
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

      {/* Comptoir bas (matos ultra) */}
      <mesh position={[0, 0.55, 0.35]} castShadow>
        <boxGeometry args={[2.2, 0.12, 0.7]} />
        <meshStandardMaterial color="#1f242b" roughness={0.7} metalness={0.2} />
      </mesh>
      <mesh position={[-0.55, 0.68, 0.4]} rotation={[0.15, 0.4, 0]}>
        <boxGeometry args={[0.65, 0.1, 0.3]} />
        <meshStandardMaterial color={table.accent} roughness={0.6} />
      </mesh>
      <mesh position={[0.45, 0.7, 0.35]} rotation={[0, -0.25, 0]}>
        <boxGeometry args={[0.5, 0.14, 0.35]} />
        <meshStandardMaterial color="#e8eef6" roughness={0.75} />
      </mesh>

      {/* Pastille accès */}
      <mesh position={[0.95, 2.35, 0.06]}>
        <planeGeometry args={[0.55, 0.28]} />
        <meshStandardMaterial color="#004170" roughness={0.5} />
      </mesh>
      <Text
        position={[0.95, 2.35, 0.08]}
        fontSize={0.12}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {table.accessLabel}
      </Text>

      <Text
        position={[0, 2.65, 0.1]}
        fontSize={0.16}
        color="#f5f0e6"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.2}
        outlineWidth={0.01}
        outlineColor="#000000"
      >
        {table.title}
      </Text>

      {(nearby || active) && (
        <Html position={[0, 3.05, 0.2]} center distanceFactor={8} style={{ pointerEvents: "none" }}>
          <div className="table-hint">{active ? "Volet ouvert" : "E — lever le volet"}</div>
        </Html>
      )}
    </group>
  );
}
