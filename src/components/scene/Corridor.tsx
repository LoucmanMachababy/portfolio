"use client";

import { Suspense, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import {
  AUTEUIL,
  makeAccessSignTexture,
  makeBannerTexture,
  makeConcreteTexture,
  makeCrewFlagTexture,
  makeFloorTexture,
  makeHeritageSticker,
} from "./textures";

export const CORRIDOR_LENGTH = 30;
export const CORRIDOR_WIDTH = 7.2;
const WALL_HEIGHT = 3.45;
const WALL_TINT = "#b4bac2";

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
  bg,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  text: string;
  width?: number;
  fg?: string;
  bg?: string;
}) {
  const map = useMemo(
    () => makeBannerTexture(text, bg ?? "#0a0a0a", fg ?? "#f0a020"),
    [text, fg, bg],
  );
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[width, 0.38]} />
      <meshStandardMaterial map={map} roughness={0.7} />
    </mesh>
  );
}

function CrewFlag({
  position,
  rotation = [0, 0, 0],
  name,
  accent,
  width = 1.4,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  name: string;
  accent: string;
  width?: number;
}) {
  const map = useMemo(() => makeCrewFlagTexture(name, accent), [name, accent]);
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[width, width * 0.65]} />
      <meshStandardMaterial map={map} roughness={0.75} />
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
          emissiveIntensity={3.2}
          toneMapped={false}
        />
      </mesh>
      {/* Plafond + lessivage des murs (sinon sol seul lit) */}
      <pointLight intensity={2.4} distance={11} decay={2} color="#fff1c2" position={[0, -0.35, 0]} />
      <pointLight intensity={1.1} distance={7} decay={2} color="#ffe8b0" position={[-2.4, -1.1, 0]} />
      <pointLight intensity={1.1} distance={7} decay={2} color="#ffe8b0" position={[2.4, -1.1, 0]} />
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

function MuralFallback({
  position,
  rotation,
  size,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  size: [number, number];
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshStandardMaterial color="#6a7180" roughness={0.9} metalness={0.02} />
    </mesh>
  );
}

function MuralPlaneTextured({
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
      <meshStandardMaterial map={texture} roughness={0.85} metalness={0.02} side={THREE.DoubleSide} />
    </mesh>
  );
}

function MuralPlane(props: {
  url: string;
  position: [number, number, number];
  rotation: [number, number, number];
  size: [number, number];
}) {
  const { position, rotation, size } = props;
  return (
    <Suspense fallback={<MuralFallback position={position} rotation={rotation} size={size} />}>
      <MuralPlaneTextured {...props} />
    </Suspense>
  );
}

/** Mur « Vieille garde » — Supras / ATK / VA91 (hommage patrimoine). */
function HeritageWall() {
  const supras = useMemo(() => makeHeritageSticker("SUPRAS", "supras"), []);
  const atk = useMemo(() => makeHeritageSticker("ATK", "atk"), []);
  const va91 = useMemo(() => makeHeritageSticker("VA91", "va91"), []);
  const z = -24.2;
  const x = CORRIDOR_WIDTH / 2 - 0.22;

  return (
    <group>
      <Banner
        position={[x, 2.85, z]}
        rotation={[0, -Math.PI / 2, 0]}
        text="VIEILLE GARDE · HOMAGE"
        width={3.4}
        fg="#e8eef6"
        bg="#1a1010"
      />
      <mesh position={[x, 1.55, z - 1.1]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[1.15, 1.15]} />
        <meshStandardMaterial map={supras} roughness={0.8} />
      </mesh>
      <mesh position={[x, 1.55, z]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[1.0, 1.0]} />
        <meshStandardMaterial map={atk} roughness={0.8} />
      </mesh>
      <mesh position={[x, 1.55, z + 1.1]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[1.2, 1.0]} />
        <meshStandardMaterial map={va91} roughness={0.75} />
      </mesh>
      <Banner
        position={[x - 0.02, 0.75, z]}
        rotation={[0, -Math.PI / 2, 0]}
        text="Héritage du virage — hommage"
        width={3.2}
        fg="#c8d0da"
        bg="#1a1e24"
      />
    </group>
  );
}

function PitchOpening() {
  return (
    <group position={[0, WALL_HEIGHT / 2, -CORRIDOR_LENGTH + 0.05]}>
      <mesh position={[0, 0, -0.2]}>
        <boxGeometry args={[CORRIDOR_WIDTH + 0.4, WALL_HEIGHT + 0.4, 0.35]} />
        <meshStandardMaterial color="#555a60" roughness={0.9} />
      </mesh>
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
    const t = makeConcreteTexture(WALL_TINT);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(2, 6);
    return t;
  }, []);
  const ceilingMap = useMemo(() => {
    const t = makeConcreteTexture("#d2c8ba");
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
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -CORRIDOR_LENGTH / 2]} receiveShadow>
        <planeGeometry args={[CORRIDOR_WIDTH, CORRIDOR_LENGTH]} />
        <meshStandardMaterial map={floorMap} roughness={0.92} metalness={0.02} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, WALL_HEIGHT, -CORRIDOR_LENGTH / 2]}>
        <planeGeometry args={[CORRIDOR_WIDTH, CORRIDOR_LENGTH]} />
        <meshStandardMaterial map={ceilingMap} color="#d2c8ba" roughness={0.95} />
      </mesh>
      <CeilingPipes />
      {fluoZs.map((z) => (
        <Fluorescent key={z} z={z} />
      ))}

      <mesh position={[CORRIDOR_WIDTH / 2, WALL_HEIGHT / 2, -CORRIDOR_LENGTH / 2]} receiveShadow>
        <boxGeometry args={[0.45, WALL_HEIGHT, CORRIDOR_LENGTH]} />
        <meshStandardMaterial
          map={concreteMap}
          color={WALL_TINT}
          roughness={0.82}
          metalness={0}
          emissive="#6a7380"
          emissiveIntensity={0.22}
        />
      </mesh>
      <mesh position={[-CORRIDOR_WIDTH / 2, WALL_HEIGHT / 2, -CORRIDOR_LENGTH / 2]} receiveShadow>
        <boxGeometry args={[0.45, WALL_HEIGHT, CORRIDOR_LENGTH]} />
        <meshStandardMaterial
          map={concreteMap}
          color={WALL_TINT}
          roughness={0.82}
          metalness={0}
          emissive="#6a7380"
          emissiveIntensity={0.22}
        />
      </mesh>
      <SlantedTiers />

      {/* Murals — refs Loucman (hommage fan-culture) */}
      <MuralPlane
        url="/textures/auteuil/mural-ksoce-vieille-garde.png"
        position={[-CORRIDOR_WIDTH / 2 + 0.22, 1.55, -5.5]}
        rotation={[0, Math.PI / 2, 0]}
        size={[4.6, 2.7]}
      />
      <MuralPlane
        url="/textures/auteuil/mural-panthere-supras.png"
        position={[-CORRIDOR_WIDTH / 2 + 0.22, 1.55, -11]}
        rotation={[0, Math.PI / 2, 0]}
        size={[4.2, 2.6]}
      />
      <MuralPlane
        url="/textures/auteuil/va91-tags.png"
        position={[-CORRIDOR_WIDTH / 2 + 0.22, 1.7, -17]}
        rotation={[0, Math.PI / 2, 0]}
        size={[3.6, 2.4]}
      />
      <MuralPlane
        url="/textures/auteuil/escalier-virage-auteuil-314.png"
        position={[CORRIDOR_WIDTH / 2 - 0.22, 1.65, -2.8]}
        rotation={[0, -Math.PI / 2, 0]}
        size={[3.6, 2.5]}
      />
      <MuralPlane
        url="/textures/auteuil/ville-lumiere-sieges.png"
        position={[CORRIDOR_WIDTH / 2 - 0.22, 1.65, -14]}
        rotation={[0, -Math.PI / 2, 0]}
        size={[4.0, 2.5]}
      />
      <MuralPlane
        url="/textures/auteuil/coursive-312-pitch-opening.png"
        position={[0, 1.55, -CORRIDOR_LENGTH + 0.55]}
        rotation={[0, 0, 0]}
        size={[5.8, 2.7]}
      />
      <MuralPlane
        url="/textures/auteuil/graffiti-paris-st-germain-volets.png"
        position={[-CORRIDOR_WIDTH / 2 + 0.22, 1.5, -21.5]}
        rotation={[0, Math.PI / 2, 0]}
        size={[3.8, 2.4]}
      />

      <RedBlueStairs />
      <HeritageWall />

      <mesh position={[0, WALL_HEIGHT / 2, 1.4]}>
        <boxGeometry args={[CORRIDOR_WIDTH + 0.6, WALL_HEIGHT, 0.45]} />
        <meshStandardMaterial color="#6a717a" roughness={0.9} emissive="#1a1e24" emissiveIntensity={0.08} />
      </mesh>

      <PitchOpening />

      <AccessSign position={[-1.1, 2.85, -3.2]} title="← ACCES 311 312" seats="108 ← sièges → 77" />
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

      {/* Slogans refs */}
      <Banner
        position={[0, 3.05, -6.5]}
        text="PARTOUT OÙ TU IRAS, NOUS SERONS TOUJOURS LÀ"
        width={6.2}
        fg="#f0a020"
      />
      <Banner
        position={[0, 3.05, -13.5]}
        text="PARIS EST MAGIQUE"
        width={4.2}
        fg="#ffffff"
        bg={AUTEUIL.bleu}
      />
      <Banner
        position={[0, 3.05, -20]}
        text="VILLE LUMIÈRE"
        width={3.8}
        fg="#f0a020"
      />
      <Banner
        position={[-CORRIDOR_WIDTH / 2 + 0.28, 2.7, -14]}
        rotation={[0, Math.PI / 2, 0]}
        text="VIRAGE AUTEUIL"
        width={3.2}
        fg="#ffffff"
      />

      {/* Groupes actuels CUP — drapeaux / bannières au-dessus des zones de stands */}
      <CrewFlag
        position={[CORRIDOR_WIDTH / 2 - 0.28, 2.95, -5]}
        rotation={[0, -Math.PI / 2, 0]}
        name="K-SOCE TEAM"
        accent={AUTEUIL.rouge}
        width={1.6}
      />
      <CrewFlag
        position={[-CORRIDOR_WIDTH / 2 + 0.28, 2.95, -8.5]}
        rotation={[0, Math.PI / 2, 0]}
        name="URBAN PARIS"
        accent={AUTEUIL.bleu}
        width={1.55}
      />
      <CrewFlag
        position={[CORRIDOR_WIDTH / 2 - 0.28, 2.95, -12]}
        rotation={[0, -Math.PI / 2, 0]}
        name="LE COMBAT CONTINUE"
        accent={AUTEUIL.rouge}
        width={1.7}
      />
      <CrewFlag
        position={[-CORRIDOR_WIDTH / 2 + 0.28, 2.95, -15.5]}
        rotation={[0, Math.PI / 2, 0]}
        name="BERIZ CREW"
        accent={AUTEUIL.bleu}
        width={1.5}
      />

      {/* Tags flottants — Banner canvas (pas de Text/drei qui suspend) */}
      {[
        { p: [-3.3, 2.15, -3.8] as [number, number, number], c: AUTEUIL.rouge, t: "K-SOCE" },
        { p: [3.3, 2.05, -9.2] as [number, number, number], c: AUTEUIL.bleu, t: "UP17" },
        { p: [-3.3, 2.1, -12.8] as [number, number, number], c: "#f0a020", t: "LCC" },
        { p: [3.3, 2.2, -17.5] as [number, number, number], c: AUTEUIL.rouge, t: "BERIZ" },
        { p: [-3.3, 2.0, -19.5] as [number, number, number], c: "#ffffff", t: "VA91" },
        { p: [3.3, 2.25, -22] as [number, number, number], c: AUTEUIL.bleu, t: "ATK" },
      ].map((s) => (
        <Banner
          key={s.t + s.p.join()}
          position={s.p}
          rotation={[0, s.p[0] > 0 ? -Math.PI / 2 : Math.PI / 2, 0]}
          text={s.t}
          width={1.1}
          fg={s.c}
          bg="#0a0a0a"
        />
      ))}
    </group>
  );
}

export const CORRIDOR_BOUNDS = {
  minX: -CORRIDOR_WIDTH / 2 + 0.85,
  maxX: CORRIDOR_WIDTH / 2 - 0.85,
  minZ: -CORRIDOR_LENGTH + 1.6,
  maxZ: -0.4,
};

/** Spawn FPS — un peu dans la coursive, regard vers le fond (-Z). */
export const PLAYER_SPAWN: [number, number, number] = [0, 1.68, -1.8];
