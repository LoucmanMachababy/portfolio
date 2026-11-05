"use client";

import { useMemo } from "react";
import { Text, useTexture } from "@react-three/drei";
import * as THREE from "three";
import {
  AUTEUIL,
  makeAccessSignTexture,
  makeBannerTexture,
  makeConcreteTexture,
  makeFloorTexture,
} from "./textures";

const CORRIDOR_LENGTH = 30;
const CORRIDOR_WIDTH = 7.2;
const WALL_HEIGHT = 3.45;

function AccessSign({
  position,
  rotation = [0, 0, 0],
  title,
  seats,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  title: string;
  seats?: string;
}) {
  const map = useMemo(() => makeAccessSignTexture(title, seats), [title, seats]);
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[1.35, 0.7]} />
      <meshStandardMaterial map={map} roughness={0.55} metalness={0.1} />
    </mesh>
  );
}

function Banner({
  position,
  rotation = [0, 0, 0],
  text,
  width = 5.5,
  fg,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  text: string;
  width?: number;
  fg?: string;
}) {
  const map = useMemo(() => makeBannerTexture(text, "#0a0a0a", fg ?? "#f0a020"), [text, fg]);
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[width, 0.38]} />
      <meshStandardMaterial map={map} roughness={0.7} />
    </mesh>
  );
}

function Fluorescent({ z }: { z: number }) {
  return (
    <group position={[0, WALL_HEIGHT - 0.08, z]}>
      <mesh>
        <boxGeometry args={[CORRIDOR_WIDTH - 1.2, 0.06, 0.22]} />
        <meshStandardMaterial
          color={AUTEUIL.fluo}
          emissive="#fff6c8"
          emissiveIntensity={2.8}
          toneMapped={false}
        />
      </mesh>
      <pointLight intensity={1.15} distance={8} color="#fff1c2" position={[0, -0.35, 0]} />
    </group>
  );
}

function CeilingPipes() {
  return (
    <group>
      {Array.from({ length: 5 }, (_, i) => {
        const x = -2.4 + i * 1.15;
        return (
          <mesh key={x} position={[x, WALL_HEIGHT - 0.28, -CORRIDOR_LENGTH / 2]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, CORRIDOR_LENGTH - 1, 8]} />
            <meshStandardMaterial color="#5c6570" metalness={0.55} roughness={0.35} />
          </mesh>
        );
      })}
      {/* Chemin de câbles */}
      <mesh position={[2.6, WALL_HEIGHT - 0.35, -CORRIDOR_LENGTH / 2]}>
        <boxGeometry args={[0.35, 0.12, CORRIDOR_LENGTH - 2]} />
        <meshStandardMaterial color="#2f3540" metalness={0.4} roughness={0.5} />
      </mesh>
    </group>
  );
}

function RedBlueStairs() {
  return (
    <group position={[-2.55, 0, -1.2]}>
      {Array.from({ length: 7 }, (_, i) => (
        <group key={i} position={[0, i * 0.22, -i * 0.28]}>
          <mesh castShadow>
            <boxGeometry args={[1.6, 0.2, 0.32]} />
            <meshStandardMaterial color={AUTEUIL.bleu} roughness={0.7} />
          </mesh>
          <mesh position={[0, -0.02, 0.14]}>
            <boxGeometry args={[1.6, 0.18, 0.06]} />
            <meshStandardMaterial color={AUTEUIL.rouge} roughness={0.65} />
          </mesh>
        </group>
      ))}
      <mesh position={[-0.85, 1.0, -0.9]}>
        <boxGeometry args={[0.06, 2.0, 0.06]} />
        <meshStandardMaterial color={AUTEUIL.rouge} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0.85, 1.0, -0.9]}>
        <boxGeometry args={[0.06, 2.0, 0.06]} />
        <meshStandardMaterial color={AUTEUIL.rouge} metalness={0.3} roughness={0.4} />
      </mesh>
    </group>
  );
}

function SlantedTiers() {
  const concrete = useMemo(() => makeConcreteTexture("#6a6f75"), []);
  return (
    <group position={[-CORRIDOR_WIDTH / 2 + 0.15, WALL_HEIGHT * 0.55, -CORRIDOR_LENGTH / 2]}>
      {Array.from({ length: 10 }, (_, i) => (
        <mesh
          key={i}
          position={[0.15, 0.15, -CORRIDOR_LENGTH / 2 + 1.5 + i * 2.8]}
          rotation={[0, 0, -0.55]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[1.8, 0.18, 2.5]} />
          <meshStandardMaterial map={concrete} roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}

function MuralPlane({
  url,
  position,
  rotation,
  size,
}: {
  url: string;
  position: [number, number, number];
  rotation: [number, number, number];
  size: [number, number];
}) {
  const texture = useTexture(url);
  texture.colorSpace = THREE.SRGBColorSpace;
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshStandardMaterial map={texture} roughness={0.85} metalness={0.02} />
    </mesh>
  );
}

function PitchOpening() {
  return (
    <group position={[0, WALL_HEIGHT / 2, -CORRIDOR_LENGTH + 0.05]}>
      {/* Cadre béton */}
      <mesh position={[0, 0, -0.2]}>
        <boxGeometry args={[CORRIDOR_WIDTH + 0.4, WALL_HEIGHT + 0.4, 0.35]} />
        <meshStandardMaterial color="#555a60" roughness={0.9} />
      </mesh>
      {/* Lumière pelouse */}
      <mesh position={[0, 0.1, 0.05]}>
        <planeGeometry args={[4.2, 2.6]} />
        <meshBasicMaterial color="#e8f0ff" toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.1, 0.02]}>
        <planeGeometry args={[5.2, 3.1]} />
        <meshBasicMaterial color="#9eb6d8" transparent opacity={0.35} toneMapped={false} />
      </mesh>
      <spotLight
        position={[0, 1.2, 1.5]}
        angle={0.7}
        penumbra={0.5}
        intensity={18}
        distance={22}
        color="#dce9ff"
        castShadow={false}
      />
      <pointLight position={[0, 1, 2]} intensity={6} distance={16} color="#f0f6ff" />
      <Banner
        position={[0, 1.35, 0.3]}
        text="ICI ON CHANTE 90 MINUTES"
        width={4.6}
        fg="#ffffff"
      />
    </group>
  );
}

export function Corridor() {
  const floorMap = useMemo(() => {
    const t = makeFloorTexture();
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(3, 8);
    return t;
  }, []);
  const concreteMap = useMemo(() => {
    const t = makeConcreteTexture(AUTEUIL.beton);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(2, 6);
    return t;
  }, []);
  const ceilingMap = useMemo(() => {
    const t = makeConcreteTexture(AUTEUIL.plafond);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(2, 8);
    return t;
  }, []);

  const fluoZs = useMemo(
    () => Array.from({ length: 9 }, (_, i) => -1.5 - i * 3.2),
    [],
  );

  return (
    <group>
      {/* Sol rougeâtre usé */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -CORRIDOR_LENGTH / 2]} receiveShadow>
        <planeGeometry args={[CORRIDOR_WIDTH, CORRIDOR_LENGTH]} />
        <meshStandardMaterial map={floorMap} roughness={0.92} metalness={0.02} />
      </mesh>

      {/* Plafond béton clair + fluos */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, WALL_HEIGHT, -CORRIDOR_LENGTH / 2]}>
        <planeGeometry args={[CORRIDOR_WIDTH, CORRIDOR_LENGTH]} />
        <meshStandardMaterial map={ceilingMap} roughness={0.95} />
      </mesh>
      <CeilingPipes />
      {fluoZs.map((z) => (
        <Fluorescent key={z} z={z} />
      ))}

      {/* Mur droit (béton) — les volets sont des stands séparés */}
      <mesh position={[CORRIDOR_WIDTH / 2, WALL_HEIGHT / 2, -CORRIDOR_LENGTH / 2]} receiveShadow>
        <boxGeometry args={[0.4, WALL_HEIGHT, CORRIDOR_LENGTH]} />
        <meshStandardMaterial map={concreteMap} roughness={0.94} />
      </mesh>

      {/* Mur gauche + sous-tribunes inclinées */}
      <mesh position={[-CORRIDOR_WIDTH / 2, WALL_HEIGHT / 2, -CORRIDOR_LENGTH / 2]} receiveShadow>
        <boxGeometry args={[0.4, WALL_HEIGHT, CORRIDOR_LENGTH]} />
        <meshStandardMaterial map={concreteMap} roughness={0.94} />
      </mesh>
      <SlantedTiers />

      {/* Murals photo (hommage fan-culture) */}
      <MuralPlane
        url="/textures/auteuil/graffiti-paris-st-germain-volets.png"
        position={[-CORRIDOR_WIDTH / 2 + 0.22, 1.55, -7]}
        rotation={[0, Math.PI / 2, 0]}
        size={[5.2, 2.8]}
      />
      <MuralPlane
        url="/textures/auteuil/virage-auteuil-acces-411.png"
        position={[-CORRIDOR_WIDTH / 2 + 0.22, 1.55, -16]}
        rotation={[0, Math.PI / 2, 0]}
        size={[5.4, 2.9]}
      />
      <MuralPlane
        url="/textures/auteuil/coursive-haut-acces-311.png"
        position={[CORRIDOR_WIDTH / 2 - 0.22, 1.7, -2.5]}
        rotation={[0, -Math.PI / 2, 0]}
        size={[3.8, 2.4]}
      />
      <MuralPlane
        url="/textures/auteuil/acces-312-ici-on-chante.png"
        position={[0, 1.6, -CORRIDOR_LENGTH + 0.55]}
        rotation={[0, 0, 0]}
        size={[5.8, 2.7]}
      />

      {/* Escalier rouge/bleu accès haut */}
      <RedBlueStairs />

      {/* Entrée derrière le joueur */}
      <mesh position={[0, WALL_HEIGHT / 2, 1.4]}>
        <boxGeometry args={[CORRIDOR_WIDTH + 0.6, WALL_HEIGHT, 0.45]} />
        <meshStandardMaterial color={AUTEUIL.betonFonce} roughness={0.92} />
      </mesh>

      <PitchOpening />

      {/* Panneaux accès */}
      <AccessSign
        position={[-1.1, 2.85, -3.2]}
        title="← ACCES 311 312"
        seats="108 ← sièges → 77"
      />
      <AccessSign
        position={[1.4, 2.85, -11]}
        title="411 ACCÈS"
        seats="162 ← 128 sièges 127 → 110"
      />
      <AccessSign
        position={[-0.2, 2.85, -18.5]}
        title="312 ACCÈS"
        seats="108 ← 87 sièges 86 → 77"
      />

      <Banner
        position={[0, 3.05, -6.5]}
        text="PARTOUT OÙ TU IRAS, NOUS SERONS TOUJOURS LÀ"
        width={6.2}
        fg="#f0a020"
      />
      <Banner
        position={[-CORRIDOR_WIDTH / 2 + 0.28, 2.55, -20]}
        rotation={[0, Math.PI / 2, 0]}
        text="VIRAGE AUTEUIL"
        width={3.2}
        fg="#ffffff"
      />

      {/* Stickers / tags volume */}
      {[
        { p: [-3.3, 2.2, -4.5] as [number, number, number], c: AUTEUIL.rouge, t: "V91" },
        { p: [3.3, 2.0, -10] as [number, number, number], c: AUTEUIL.bleu, t: "ULTRA" },
        { p: [-3.3, 1.9, -13.5] as [number, number, number], c: "#22c55e", t: "TM 93" },
        { p: [3.3, 2.3, -21] as [number, number, number], c: "#fbbf24", t: "CUP" },
      ].map((s) => (
        <Text
          key={s.t + s.p.join()}
          position={s.p}
          rotation={[0, s.p[0] > 0 ? -Math.PI / 2 : Math.PI / 2, 0]}
          fontSize={0.28}
          color={s.c}
          anchorX="center"
          outlineWidth={0.01}
          outlineColor="#000"
        >
          {s.t}
        </Text>
      ))}

      <ambientLight intensity={0.18} />
      <hemisphereLight args={["#c9b8a0", "#1a1f26", 0.35]} />
      <fog attach="fog" args={["#1a1512", 12, 36]} />
      <color attach="background" args={["#12161c"]} />
    </group>
  );
}

export const CORRIDOR_BOUNDS = {
  minX: -CORRIDOR_WIDTH / 2 + 0.85,
  maxX: CORRIDOR_WIDTH / 2 - 0.85,
  minZ: -CORRIDOR_LENGTH + 1.6,
  maxZ: 0.2,
};
