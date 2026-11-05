"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Html } from "@react-three/drei";
import type { Mesh } from "three";
import type { StandTable as StandTableType } from "@/content/tables";

type Props = {
  table: StandTableType;
  active: boolean;
  nearby: boolean;
  onSelect: (id: StandTableType["id"]) => void;
};

export function StandTableMesh({ table, active, nearby, onSelect }: Props) {
  const glowRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!glowRef.current) return;
    const pulse = 0.15 + Math.sin(clock.elapsedTime * 2.5) * 0.08;
    const mat = glowRef.current.material as import("three").MeshStandardMaterial;
    mat.emissiveIntensity = nearby || active || hovered ? 0.55 + pulse : 0.12;
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
      {/* Plateau */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <boxGeometry args={[2.2, 0.08, 1.1]} />
        <meshStandardMaterial color="#2b2f36" roughness={0.7} metalness={0.15} />
      </mesh>

      {/* Nappe / matos */}
      <mesh ref={glowRef} position={[0, 1.0, 0]} castShadow>
        <boxGeometry args={[2.05, 0.04, 0.95]} />
        <meshStandardMaterial
          color={table.clothColor}
          emissive={table.accent}
          emissiveIntensity={0.15}
          roughness={0.85}
        />
      </mesh>

      {/* Pieds */}
      {[
        [-0.9, 0.45, -0.4],
        [0.9, 0.45, -0.4],
        [-0.9, 0.45, 0.4],
        [0.9, 0.45, 0.4],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <boxGeometry args={[0.08, 0.9, 0.08]} />
          <meshStandardMaterial color="#1f2937" metalness={0.3} roughness={0.5} />
        </mesh>
      ))}

      {/* Objets sur table (écharpes / piles) */}
      <mesh position={[-0.55, 1.12, 0.1]} rotation={[0.1, 0.4, 0.2]}>
        <boxGeometry args={[0.7, 0.12, 0.35]} />
        <meshStandardMaterial color={table.accent} roughness={0.65} />
      </mesh>
      <mesh position={[0.5, 1.14, -0.15]} rotation={[0, -0.3, 0]}>
        <boxGeometry args={[0.55, 0.18, 0.4]} />
        <meshStandardMaterial color="#e5e7eb" roughness={0.8} />
      </mesh>
      <mesh position={[0.15, 1.18, 0.25]}>
        <cylinderGeometry args={[0.12, 0.12, 0.28, 16]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.2} />
      </mesh>

      <Text
        position={[0, 1.55, 0]}
        fontSize={0.18}
        color={table.accent}
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        outlineWidth={0.012}
        outlineColor="#000000"
      >
        {table.title}
      </Text>

      {(nearby || active) && (
        <Html position={[0, 2.05, 0]} center distanceFactor={8} style={{ pointerEvents: "none" }}>
          <div className="table-hint">
            {active ? "Ouvert" : "E — ouvrir"}
          </div>
        </Html>
      )}
    </group>
  );
}
