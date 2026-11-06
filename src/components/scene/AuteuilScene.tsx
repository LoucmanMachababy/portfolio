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

class SceneErrorBoundary extends Component<
  { children: ReactNode; label?: string },
  { error: Error | null }
> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error) {
    console.error(`[AuteuilScene ${this.props.label ?? "extras"}]`, error);
  }
  render() {
    if (this.state.error) return null;
    return this.props.children;
  }
}

/** Structure de secours unlit — visible même si Corridor plante. */
function CoreCorridor() {
  const L = 30;
  const W = 7.2;
  const H = 3.45;
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -L / 2]}>
        <planeGeometry args={[W, L]} />
        <meshBasicMaterial color="#8a4a3a" />
      </mesh>
      <mesh position={[W / 2, H / 2, -L / 2]}>
        <boxGeometry args={[0.55, H, L]} />
        <meshBasicMaterial color="#b4bac2" />
      </mesh>
      <mesh position={[-W / 2, H / 2, -L / 2]}>
        <boxGeometry args={[0.55, H, L]} />
        <meshBasicMaterial color="#b4bac2" />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, H, -L / 2]}>
        <planeGeometry args={[W, L]} />
        <meshBasicMaterial color="#d2c8ba" />
      </mesh>
      <mesh position={[0, H / 2, 1.6]}>
        <boxGeometry args={[W + 1, H, 0.55]} />
        <meshBasicMaterial color="#4a5560" />
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
      dpr={[1, 1.5]}
      camera={{ fov: 75, near: 0.05, far: 100, position: [0, 1.7, -1.2] }}
      gl={{ antialias: true, alpha: false, powerPreference: "default" }}
      onCreated={({ gl, camera }) => {
        gl.setClearColor("#5a6a7a", 1);
        camera.lookAt(0, 1.4, -8);
      }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        background: "#5a6a7a",
      }}
    >
      <ambientLight intensity={1.1} />
      <hemisphereLight args={["#fff5e6", "#3a4552", 0.8]} />
      <CoreCorridor />

      <PlayerControls
        enabled={controlsEnabled}
        tables={standTables}
        onNearbyChange={handleNearby}
        onInteract={handleInteract}
        panelOpen={panelOpen}
        onLockChange={onLockChange}
      />

      {/* Stands portfolio TOUJOURS montés (hors extras décoratifs). */}
      <SceneErrorBoundary label="stands">
        {standTables.map((table) => (
          <StandTableMesh
            key={table.id}
            table={table}
            active={activeTable === table.id}
            nearby={nearby === table.id}
            onSelect={onOpenTable}
          />
        ))}
      </SceneErrorBoundary>

      <SceneErrorBoundary label="decor">
        <Suspense fallback={null}>
          <Corridor />
          <ChampionsShrine />
          <CortegeCrowd />
        </Suspense>
      </SceneErrorBoundary>
    </Canvas>
  );
}
