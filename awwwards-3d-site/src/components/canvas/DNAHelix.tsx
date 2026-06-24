"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);
  const sphereCount = 40;

  const spheres = useMemo(() => {
    const items = [];
    for (let i = 0; i < sphereCount; i++) {
      const t = (i / sphereCount) * Math.PI * 4;
      // Two strands
      items.push({
        id: `a-${i}`,
        strand: 0,
        index: i,
        baseAngle: t,
        yBase: (i / sphereCount) * 6 - 3,
      });
      items.push({
        id: `b-${i}`,
        strand: 1,
        index: i,
        baseAngle: t + Math.PI,
        yBase: (i / sphereCount) * 6 - 3,
      });
    }
    return items;
  }, []);

  // Create connector lines between strands every few pairs
  const connectorIndices = useMemo(() => {
    const indices = [];
    for (let i = 0; i < sphereCount; i += 4) {
      indices.push(i);
    }
    return indices;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    groupRef.current.rotation.y = time * 0.3;

    groupRef.current.children.forEach((child) => {
      const data = child.userData;
      if (data.type === "sphere") {
        const angle = data.baseAngle + time * 0.5;
        const radius = 0.8;
        child.position.x = Math.cos(angle) * radius;
        child.position.z = Math.sin(angle) * radius;
        child.position.y = data.yBase;

        // Pulsing scale
        const scale = 0.08 + Math.sin(time * 2 + data.index * 0.3) * 0.02;
        child.scale.setScalar(scale);
      }
    });
  });

  return (
    <group ref={groupRef} position={[3.5, 0, -2]}>
      {spheres.map((s) => (
        <mesh
          key={s.id}
          userData={{ type: "sphere", ...s }}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color={s.strand === 0 ? "#00ffcc" : "#aa55ff"}
            emissive={s.strand === 0 ? "#00ffcc" : "#aa55ff"}
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      ))}
      {connectorIndices.map((i) => {
        const t = (i / sphereCount) * Math.PI * 4;
        const y = (i / sphereCount) * 6 - 3;
        return (
          <mesh key={`conn-${i}`} position={[0, y, 0]} rotation={[0, t, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 1.6, 8]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.3}
              transparent
              opacity={0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
}
