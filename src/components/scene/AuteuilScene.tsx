"use client";

import { Suspense, useCallback, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Corridor } from "./Corridor";
import { StandTableMesh } from "./StandTable";
import { PlayerControls } from "./PlayerControls";
import { standTables, type TableId } from "@/content/tables";

type Props = {
  activeTable: TableId | null;
  panelOpen: boolean;
  controlsEnabled: boolean;
  onOpenTable: (id: TableId) => void;
  onNearbyChange: (id: TableId | null) => void;
};

export function AuteuilScene({
  activeTable,
  panelOpen,
  controlsEnabled,
  onOpenTable,
  onNearbyChange,
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
      dpr={[1, 1.75]}
      camera={{ fov: 70, near: 0.1, far: 60, position: [0, 1.65, 0] }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <Corridor />
        {standTables.map((table) => (
          <StandTableMesh
            key={table.id}
            table={table}
            active={activeTable === table.id}
            nearby={nearby === table.id}
            onSelect={onOpenTable}
          />
        ))}
        <PlayerControls
          enabled={controlsEnabled}
          tables={standTables}
          onNearbyChange={handleNearby}
          onInteract={handleInteract}
          panelOpen={panelOpen}
        />
      </Suspense>
    </Canvas>
  );
}
