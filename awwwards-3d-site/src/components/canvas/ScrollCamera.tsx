"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export default function ScrollCamera() {
  const { camera } = useThree();
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    // Smoothly interpolate camera position based on scroll
    const targetY = -(scrollY.current * 0.003);
    const targetZ = 5 + scrollY.current * 0.002;
    
    // Lerp camera for smooth cinematic feel
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.position.z += (targetZ - camera.position.z) * 0.05;
    
    // Slight rotation based on scroll
    camera.rotation.x = scrollY.current * 0.0001;
  });

  return null;
}
