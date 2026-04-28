import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function ToothBlob({ position, scale = 1, color = "#C5D1D6" }: { position: [number, number, number]; scale?: number; color?: string }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.15;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.25}
          metalness={0.1}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          transmission={0.05}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-5, -3, 2]} intensity={0.3} color="#ffffff" />
      <ToothBlob position={[-3.2, 1.4, -2]} scale={1.2} />
      <ToothBlob position={[3.5, -1.2, -3]} scale={1.6} color="#E8EEF1" />
      <ToothBlob position={[2.4, 2.2, -1]} scale={0.7} />
      <ToothBlob position={[-2.8, -1.8, -2.5]} scale={0.9} color="#D6DEE2" />
      <ToothBlob position={[0, 0, -4]} scale={2.2} color="#EEF2F4" />
      <Environment preset="studio" />
    </>
  );
}

export const HeroScene = () => {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return <div className="absolute inset-0 h-full min-h-[100svh] bg-gradient-fade" />;
  return (
    <div className="absolute inset-0 h-full min-h-[100svh] w-full">
      <Canvas
        className="h-full min-h-[100svh] w-full"
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background pointer-events-none" />
    </div>
  );
};
