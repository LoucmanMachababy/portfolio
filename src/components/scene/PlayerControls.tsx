"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import * as THREE from "three";
import { CORRIDOR_BOUNDS } from "./Corridor";
import type { StandTable } from "@/content/tables";

const SPEED = 4.2;
const PLAYER_HEIGHT = 1.65;

type Props = {
  enabled: boolean;
  tables: StandTable[];
  onNearbyChange: (id: StandTable["id"] | null) => void;
  onInteract: () => void;
  panelOpen: boolean;
};

export function PlayerControls({
  enabled,
  tables,
  onNearbyChange,
  onInteract,
  panelOpen,
}: Props) {
  const { camera } = useThree();
  const keys = useRef<Record<string, boolean>>({});
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const nearbyRef = useRef<StandTable["id"] | null>(null);

  useEffect(() => {
    camera.position.set(0, PLAYER_HEIGHT, 0);
  }, [camera]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      keys.current[e.code] = true;
      if ((e.code === "KeyE" || e.code === "Enter") && !panelOpen) {
        onInteract();
      }
    };
    const up = (e: KeyboardEvent) => {
      keys.current[e.code] = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [onInteract, panelOpen]);

  useFrame((_, delta) => {
    if (!enabled || panelOpen) return;

    const forward =
      Number(!!keys.current.KeyW || !!keys.current.ArrowUp) -
      Number(!!keys.current.KeyS || !!keys.current.ArrowDown);
    const strafe =
      Number(!!keys.current.KeyD || !!keys.current.ArrowRight) -
      Number(!!keys.current.KeyA || !!keys.current.ArrowLeft);

    direction.current.set(0, 0, 0);
    const front = new THREE.Vector3();
    camera.getWorldDirection(front);
    front.y = 0;
    front.normalize();
    const right = new THREE.Vector3().crossVectors(front, new THREE.Vector3(0, 1, 0)).normalize();

    direction.current.addScaledVector(front, forward);
    direction.current.addScaledVector(right, strafe);
    if (direction.current.lengthSq() > 0) direction.current.normalize();

    velocity.current.lerp(direction.current.multiplyScalar(SPEED), 1 - Math.exp(-12 * delta));

    camera.position.x += velocity.current.x * delta;
    camera.position.z += velocity.current.z * delta;
    camera.position.y = PLAYER_HEIGHT;

    camera.position.x = THREE.MathUtils.clamp(
      camera.position.x,
      CORRIDOR_BOUNDS.minX,
      CORRIDOR_BOUNDS.maxX,
    );
    camera.position.z = THREE.MathUtils.clamp(
      camera.position.z,
      CORRIDOR_BOUNDS.minZ,
      CORRIDOR_BOUNDS.maxZ,
    );

    let closest: StandTable["id"] | null = null;
    let best = 2.85;
    for (const t of tables) {
      const dx = camera.position.x - t.position[0];
      const dz = camera.position.z - t.position[2];
      const d = Math.hypot(dx, dz);
      if (d < best) {
        best = d;
        closest = t.id;
      }
    }
    if (closest !== nearbyRef.current) {
      nearbyRef.current = closest;
      onNearbyChange(closest);
    }
  });

  return (
    <PointerLockControls
      makeDefault
      selector="#enter-auteuil"
      enabled={enabled && !panelOpen}
    />
  );
}
