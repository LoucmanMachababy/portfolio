"use client";

import { Component, Suspense, useCallback, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Corridor } from "./Corridor";
import { StandTableMesh } from "./StandTable";
import { PlayerControls } from "./PlayerControls";
import { ChampionsShrine } from "./ChampionsShrine";
import { CortegeCrowd } from "./CortegeCrowd";
import { standTables, type TableId } from "@/content/tables";

type Props = {
  activeTable: TableId | null;
  panelOpen: boolean;
  controlsEnabled: boolean;
  onOpenTable: (id: TableId) => void;
  onNearbyChange: (id: TableId | null) => void;
  onLockChange?: (locked: boolean) => void;
};

/** Empêche un crash texture/font de laisser le canvas noir. */
class SceneErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) return this.props.fallback ?? null;
    return this.props.children;
  }
}

function RootLights() {
  return (
    <>
      <color attach="background" args={["#2a3340"]} />
      <fog attach="fog" args={["#3a4552", 28, 55]} />
      <ambientLight intensity={0.95} />
      <hemisphereLight args={["#f0e6d4", "#4a5562", 0.85]} />
      <directionalLight position={[3, 7, -2]} intensity={0.75} color="#fff6e8" />
      <directionalLight position={[-4, 5, -16]} intensity={0.45} color="#d8e6ff" />
    </>
  );
}

/** Coque toujours visible (hors Suspense) — anti écran noir si textures/fonts pètent. */
function VisibleCorridorShell() {
  const L = 30;
  const W = 7.2;
  const H = 3.45;
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -L / 2]} receiveShadow>
        <planeGeometry args={[W, L]} />
        <meshStandardMaterial color="#8a4a3a" roughness={0.95} />
      </mesh>
      <mesh position={[W / 2, H / 2, -L / 2]} receiveShadow>
        <boxGeometry args={[0.45, H, L]} />
        <meshStandardMaterial color="#b4bac2" roughness={0.85} emissive="#6a7380" emissiveIntensity={0.25} />
      </mesh>
      <mesh position={[-W / 2, H / 2, -L / 2]} receiveShadow>
        <boxGeometry args={[0.45, H, L]} />
        <meshStandardMaterial color="#b4bac2" roughness={0.85} emissive="#6a7380" emissiveIntensity={0.25} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, H, -L / 2]}>
        <planeGeometry args={[W, L]} />
        <meshStandardMaterial color="#d2c8ba" roughness={0.95} />
      </mesh>
      <mesh position={[0, H / 2, 1.4]}>
        <boxGeometry args={[W + 0.6, H, 0.45]} />
        <meshStandardMaterial color="#6a717a" roughness={0.9} />
      </mesh>
    </group>
  );
}

export function AuteuilScene({
  activeTable,
  panelOpen,
  controlsEnabled,
  onOpenTable,
  onNearbyChange,
  onLockChange,
}: Props) {
  const [nearby, setNearby] = useState<TableId | null>(null);

  const handleNearby = useCallback(
    (id: TableId | null) => {
      setNearby(id);
      onNearbyChange(id);
    },
    [onNearbyChange],
  );

  const handleInteract = useCallback(() => {
    if (nearby) onOpenTable(nearby);
  }, [nearby, onOpenTable]);

  return (
    <Canvas
      className="auteuil-canvas"
      shadows
      dpr={[1, 1.5]}
      camera={{ fov: 72, near: 0.08, far: 80, position: [0, 1.68, -1.8] }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMappingExposure = 1.25;
        gl.setClearColor("#2a3340");
      }}
      style={{ cursor: controlsEnabled && !panelOpen ? "crosshair" : "default" }}
    >
      {/* Toujours montés — ne dépendent pas de Suspense (fonts/textures) */}
      <RootLights />
      <PlayerControls
        enabled={controlsEnabled}
        tables={standTables}
        onNearbyChange={handleNearby}
        onInteract={handleInteract}
        panelOpen={panelOpen}
        onLockChange={onLockChange}
      />

      <SceneErrorBoundary fallback={<VisibleCorridorShell />}>
        <Suspense fallback={<VisibleCorridorShell />}>
          <Corridor />
        </Suspense>
      </SceneErrorBoundary>

      <SceneErrorBoundary>
        <Suspense fallback={null}>
          {standTables.map((table) => (
            <StandTableMesh
              key={table.id}
              table={table}
              active={activeTable === table.id}
              nearby={nearby === table.id}
              onSelect={onOpenTable}
            />
          ))}
          <ChampionsShrine />
          <CortegeCrowd />
        </Suspense>
      </SceneErrorBoundary>
    </Canvas>
  );
}
