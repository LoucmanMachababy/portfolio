"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { AUTEUIL, makeBannerTexture, makeStylizedMural, makeTeeTexture } from "./textures";
import { chantBeat } from "@/lib/chants";

/** Bout de coursive (length 30) — hors axe central. */
const CROWD_Z = -27.2;

function CrowdPerson({
  position,
  primary,
  secondary,
  label,
  phase = 0,
  pose = "clap",
}: {
  position: [number, number, number];
  primary: string;
  secondary: string;
  label: string;
  phase?: number;
  pose?: "clap" | "drum" | "capo" | "cheer";
}) {
  const group = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const tee = useMemo(() => makeTeeTexture(label, primary, secondary), [label, primary, secondary]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + phase;
    if (group.current) group.current.position.y = position[1] + Math.sin(t * 2.4) * 0.02;
    if (pose === "clap" || pose === "cheer") {
      if (armL.current) armL.current.rotation.x = -0.8 + Math.sin(t * 5) * 0.5;
      if (armR.current) armR.current.rotation.x = -0.8 + Math.sin(t * 5 + 0.4) * 0.5;
    }
    if (pose === "drum" && armR.current) {
      // Sync batteur seulement si beat clair ; sinon balancier souple
      if (chantBeat.hasClearBeat) {
        armR.current.rotation.x = -0.35 - chantBeat.pulse * 0.85;
      } else {
        armR.current.rotation.x = -0.45 + Math.sin(t * 2.2) * 0.25;
      }
    }
    if (pose === "capo") {
      if (armR.current) armR.current.rotation.x = -1.1 + Math.sin(t * 1.5) * 0.15;
      if (armL.current) armL.current.rotation.z = 0.4 + Math.sin(t * 2) * 0.1;
    }
  });

  return (
    <group ref={group} position={position}>
      <mesh position={[0, 0.45, 0]} castShadow>
        <boxGeometry args={[0.28, 0.5, 0.18]} />
        <meshStandardMaterial color="#1a1f28" roughness={0.85} />
      </mesh>
      <mesh position={[0, 1.0, 0]} castShadow>
        <boxGeometry args={[0.36, 0.48, 0.22]} />
        <meshStandardMaterial map={tee} roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.4, 0]} castShadow>
        <boxGeometry args={[0.22, 0.24, 0.2]} />
        <meshStandardMaterial color="#c68642" roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.55, 0]} castShadow>
        <sphereGeometry args={[0.13, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={primary} roughness={0.65} />
      </mesh>
      <group ref={armL} position={[-0.24, 1.15, 0]}>
        <mesh position={[0, -0.16, 0]}>
          <boxGeometry args={[0.09, 0.36, 0.09]} />
          <meshStandardMaterial color={primary} roughness={0.8} />
        </mesh>
      </group>
      <group ref={armR} position={[0.24, 1.15, 0]}>
        <mesh position={[0, -0.16, 0]}>
          <boxGeometry args={[0.09, 0.36, 0.09]} />
          <meshStandardMaterial color={primary} roughness={0.8} />
        </mesh>
        {pose === "capo" && (
          <mesh position={[0.02, -0.38, 0.12]} rotation={[0.5, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.07, 0.18, 10]} />
            <meshStandardMaterial color="#222" metalness={0.4} roughness={0.5} />
          </mesh>
        )}
        {pose === "drum" && (
          <mesh position={[0, -0.42, 0.1]}>
            <cylinderGeometry args={[0.12, 0.12, 0.14, 12]} />
            <meshStandardMaterial color="#f5f0e6" roughness={0.7} />
          </mesh>
        )}
      </group>
    </group>
  );
}

function CortegePoster({
  kind,
  position,
  rotation,
  size,
}: {
  kind: "cortegeCapo" | "cortegeDrum" | "cortegeBanner";
  position: [number, number, number];
  rotation: [number, number, number];
  size: [number, number];
}) {
  const map = useMemo(() => makeStylizedMural(kind), [kind]);
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshStandardMaterial map={map} roughness={0.75} side={THREE.DoubleSide} />
    </mesh>
  );
}

/**
 * Cortège CUP en bout de coursive — capo + mégaphone, batteur, foule qui clap.
 * Hook audio chants : `userData.chantHook` (à brancher plus tard).
 */
export function CortegeCrowd() {
  const root = useRef<THREE.Group>(null);
  const parisBanner = useMemo(
    () => makeBannerTexture("PARIS", AUTEUIL.bleu, "#ffffff"),
    [],
  );
  const cupBanner = useMemo(
    () => makeBannerTexture("COLLECTIF ULTRAS PARIS", "#0a0a0a", "#f0a020"),
    [],
  );

  // Hook futur pour les chants
  useFrame(() => {
    if (root.current) {
      root.current.userData.chantHook = {
        id: "cortege-cup",
        ready: false,
        note: "Audio chants CUP — à brancher",
      };
    }
  });

  const crowd: Array<{
    p: [number, number, number];
    primary: string;
    secondary: string;
    label: string;
    pose: "clap" | "drum" | "capo" | "cheer";
    phase: number;
  }> = [
    { p: [0, 0, 0.2], primary: AUTEUIL.rouge, secondary: AUTEUIL.bleu, label: "CUP", pose: "capo", phase: 0 },
    { p: [-0.7, 0, 0.35], primary: AUTEUIL.bleu, secondary: AUTEUIL.rouge, label: "K-SOCE", pose: "drum", phase: 0.4 },
    { p: [0.75, 0, 0.4], primary: AUTEUIL.rouge, secondary: "#111", label: "LCC", pose: "cheer", phase: 0.8 },
    { p: [-1.35, 0, 0.55], primary: AUTEUIL.bleu, secondary: AUTEUIL.rouge, label: "URBAN", pose: "clap", phase: 1.1 },
    { p: [1.4, 0, 0.5], primary: "#111", secondary: AUTEUIL.rouge, label: "BERIZ", pose: "clap", phase: 1.4 },
    { p: [-0.35, 0, 0.7], primary: AUTEUIL.rouge, secondary: AUTEUIL.bleu, label: "VA91", pose: "clap", phase: 0.2 },
    { p: [0.4, 0, 0.75], primary: AUTEUIL.bleu, secondary: "#f0a020", label: "CUP", pose: "cheer", phase: 0.6 },
    { p: [-1.7, 0, 0.9], primary: AUTEUIL.rouge, secondary: AUTEUIL.bleu, label: "K-SOCE", pose: "clap", phase: 1.7 },
    { p: [1.75, 0, 0.85], primary: AUTEUIL.bleu, secondary: AUTEUIL.rouge, label: "UP17", pose: "cheer", phase: 1.9 },
  ];

  return (
    <group ref={root} position={[0, 0, CROWD_Z]} userData={{ chantHook: { id: "cortege-cup", ready: false } }}>
      {/* Banderole PARIS au-dessus — laisse le passage central libre */}
      <mesh position={[0, 2.85, -0.4]}>
        <planeGeometry args={[3.2, 0.55]} />
        <meshStandardMaterial map={parisBanner} roughness={0.65} emissive={AUTEUIL.bleu} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, 2.35, -0.35]}>
        <planeGeometry args={[4.2, 0.32]} />
        <meshStandardMaterial map={cupBanner} roughness={0.7} />
      </mesh>

      {crowd.map((c, i) => (
        <CrowdPerson
          key={i}
          position={c.p}
          primary={c.primary}
          secondary={c.secondary}
          label={c.label}
          pose={c.pose}
          phase={c.phase}
        />
      ))}

      <pointLight position={[0, 2.5, 1]} intensity={3.5} distance={10} color="#fff1d0" />

      <CortegePoster
        kind="cortegeCapo"
        position={[-2.9, 1.7, 0.2]}
        rotation={[0, Math.PI / 2, 0]}
        size={[1.6, 1.2]}
      />
      <CortegePoster
        kind="cortegeDrum"
        position={[2.9, 1.7, 0.2]}
        rotation={[0, -Math.PI / 2, 0]}
        size={[1.6, 1.2]}
      />
      <CortegePoster
        kind="cortegeBanner"
        position={[0, 1.9, -1.1]}
        rotation={[0, 0, 0]}
        size={[2.4, 1.0]}
      />
    </group>
  );
}
