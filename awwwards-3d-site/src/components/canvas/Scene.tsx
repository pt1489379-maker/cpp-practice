"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Preload } from "@react-three/drei";
import ScrollCamera from "./ScrollCamera";
import ShaderMesh from "./ShaderMesh";
import Particles from "./Particles";
import { Suspense } from "react";

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10 bg-transparent">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          
          <ScrollCamera />
          <ShaderMesh />
          <Particles />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
