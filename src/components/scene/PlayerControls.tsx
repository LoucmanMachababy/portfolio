"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import * as THREE from "three";
import { CORRIDOR_BOUNDS, PLAYER_SPAWN } from "./Corridor";
import type { StandTable } from "@/content/tables";

const SPEED = 4.2;
const PLAYER_HEIGHT = PLAYER_SPAWN[1];
const MAX_PITCH = Math.PI / 2 - 0.18;
const MIN_PITCH = -Math.PI / 2 + 0.35;

type LockControls = {
  lock: () => void;
  unlock: () => void;
  isLocked: boolean;
};

type Props = {
  enabled: boolean;
  tables: StandTable[];
  onNearbyChange: (id: StandTable["id"] | null) => void;
  onInteract: () => void;
  panelOpen: boolean;
  onLockChange?: (locked: boolean) => void;
};

export function PlayerControls({
  enabled,
  tables,
  onNearbyChange,
  onInteract,
  panelOpen,
  onLockChange,
}: Props) {
  const { camera, gl } = useThree();
  const controlsRef = useRef<LockControls | null>(null);
  const keys = useRef<Record<string, boolean>>({});
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const nearbyRef = useRef<StandTable["id"] | null>(null);
  const euler = useRef(new THREE.Euler(0, 0, 0, "YXZ"));

  useEffect(() => {
    camera.position.set(...PLAYER_SPAWN);
    camera.near = 0.08;
    camera.far = 80;
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = 72;
      camera.updateProjectionMatrix();
    }
    camera.lookAt(0, PLAYER_HEIGHT, -8);
  }, [camera]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      keys.current[e.code] = true;
      if ((e.code === "KeyE" || e.code === "Enter") && !panelOpen) onInteract();
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

  useEffect(() => {
    const el = gl.domElement;
    const tryLock = () => {
      if (!enabled || panelOpen) return;
      controlsRef.current?.lock();
    };
    const onPointerLockChange = () => {
      const locked = document.pointerLockElement === el;
      document.body.style.cursor = locked ? "none" : "";
      onLockChange?.(locked);
    };
    el.addEventListener("click", tryLock);
    document.addEventListener("pointerlockchange", onPointerLockChange);
    return () => {
      el.removeEventListener("click", tryLock);
      document.removeEventListener("pointerlockchange", onPointerLockChange);
      document.body.style.cursor = "";
    };
  }, [gl, enabled, panelOpen, onLockChange]);

  useEffect(() => {
    if ((!enabled || panelOpen) && controlsRef.current?.isLocked) {
      controlsRef.current.unlock();
    }
  }, [enabled, panelOpen]);

  useFrame((_, delta) => {
    euler.current.setFromQuaternion(camera.quaternion);
    euler.current.x = THREE.MathUtils.clamp(euler.current.x, MIN_PITCH, MAX_PITCH);
    camera.quaternion.setFromEuler(euler.current);

    if (!enabled || panelOpen) {
      camera.position.y = PLAYER_HEIGHT;
      return;
    }

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

    camera.position.x = THREE.MathUtils.clamp(camera.position.x, CORRIDOR_BOUNDS.minX, CORRIDOR_BOUNDS.maxX);
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, CORRIDOR_BOUNDS.minZ, CORRIDOR_BOUNDS.maxZ);

    let closest: StandTable["id"] | null = null;
    let best = 2.85;
    for (const t of tables) {
      const d = Math.hypot(camera.position.x - t.position[0], camera.position.z - t.position[2]);
      if (d < best) {
        best = d;
        closest = t.id;
      }
    }
    if (closest !== nearbyRef.current) {
      nearbyRef.current = closest;
      onNearbyChange(closest);
    }
  }, 1);

  return (
    <PointerLockControls
      ref={controlsRef as never}
      makeDefault
      selector="#enter-auteuil"
      enabled={enabled && !panelOpen}
    />
  );
}
