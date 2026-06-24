"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  
  void main() {
    vUv = uv;
    vPosition = position;
    
    // Displacement based on sine wave and time
    vec3 pos = position;
    float displacement = sin(pos.x * 5.0 + uTime) * cos(pos.y * 5.0 + uTime) * 0.2;
    pos += normal * displacement;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  
  void main() {
    // Iridescent color effect
    vec3 color1 = vec3(0.5, 0.0, 1.0); // Purple
    vec3 color2 = vec3(0.0, 1.0, 0.8); // Cyan
    
    float mixFactor = (sin(vPosition.x * 2.0 + uTime) + 1.0) * 0.5;
    vec3 finalColor = mix(color1, color2, mixFactor);
    
    // Add some noise or glow
    float glow = smoothstep(0.0, 1.0, 1.0 - length(vUv - 0.5) * 2.0);
    finalColor += vec3(glow * 0.2);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function ShaderMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      // Remove automatic rotation so the user can drag it freely
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <PresentationControls
      global={false} // Only allow dragging when hovering the object
      cursor={true}
      snap={false} // Don't snap back when released
      speed={2} // Rotation speed
      zoom={1.2}
      polar={[-Infinity, Infinity]} // Full vertical rotation
      azimuth={[-Infinity, Infinity]} // Full horizontal rotation
    >
      <mesh ref={meshRef} position={[0, 0, 0]} scale={1.5}>
        <icosahedronGeometry args={[1, 64]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          wireframe={false}
        />
      </mesh>
    </PresentationControls>
  );
}
