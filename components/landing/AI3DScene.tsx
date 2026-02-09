"use client";


import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Ring, Trail } from "@react-three/drei";
import * as THREE from "three";

// Core orb with refined glow and dynamic pulsing
const CoreOrb = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.12;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.18;
      
      // Dynamic scale pulsing
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[0.95, 128, 128]}>
        <MeshDistortMaterial
          color="#2dd4bf"
          attach="material"
          distort={0.4}
          speed={1.8}
          roughness={0.1}
          metalness={0.9}
          emissive="#14b8a6"
          emissiveIntensity={0.4}
        />
      </Sphere>
    </Float>
  );
};

// Inner glow sphere with enhanced dynamics
const InnerGlow = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.1;
      meshRef.current.scale.setScalar(scale);
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group>
      <Sphere ref={meshRef} args={[0.55, 48, 48]}>
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#8b5cf6"
          emissiveIntensity={2}
          transparent
          opacity={0.6}
        />
      </Sphere>
      {/* Secondary inner core */}
      <Sphere args={[0.35, 32, 32]}>
        <meshStandardMaterial
          color="#2dd4bf"
          emissive="#14b8a6"
          emissiveIntensity={2.5}
          transparent
          opacity={0.4}
        />
      </Sphere>
    </group>
  );
};

// Orbiting ring with refined styling
const OrbitRing = ({ 
  radius, 
  rotationSpeed, 
  tilt, 
  color,
  opacity = 0.25
}: { 
  radius: number; 
  rotationSpeed: number; 
  tilt: [number, number, number];
  color: string;
  opacity?: number;
}) => {
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * rotationSpeed;
    }
  });

  return (
    <group ref={ringRef} rotation={tilt}>
      <Ring args={[radius - 0.015, radius, 80]}>
        <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} />
      </Ring>
    </group>
  );
};

// Orbiting particle with trail
const OrbitingParticle = ({ 
  radius, 
  speed, 
  offset, 
  size,
  color 
}: { 
  radius: number; 
  speed: number; 
  offset: number;
  size: number;
  color: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed + offset;
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.z = Math.sin(t) * radius;
      meshRef.current.position.y = Math.sin(t * 1.5) * 0.2;
    }
  });

  return (
    <Trail
      width={0.2}
      length={5}
      color={color}
      attenuation={(t) => t * t}
    >
      <Sphere ref={meshRef} args={[size, 16, 16]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.5}
        />
      </Sphere>
    </Trail>
  );
};

// Background particles
const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = 60;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.2 + Math.random() * 1.5;
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#2dd4bf"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Main scene with enhanced dynamics
const Scene = () => {
  return (
    <>
      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#2dd4bf" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[0, 10, 0]} intensity={0.3} color="#ffffff" />
      <spotLight
        position={[0, 5, 0]}
        angle={0.5}
        penumbra={1}
        intensity={0.8}
        color="#2dd4bf"
        castShadow
      />
      <spotLight
        position={[-5, 0, 5]}
        angle={0.4}
        penumbra={0.8}
        intensity={0.4}
        color="#8b5cf6"
      />

      {/* Core elements */}
      <CoreOrb />
      <InnerGlow />

      {/* Multiple orbiting rings with varied dynamics */}
      <OrbitRing radius={1.5} rotationSpeed={0.25} tilt={[0.5, 0, 0]} color="#2dd4bf" opacity={0.25} />
      <OrbitRing radius={1.9} rotationSpeed={-0.18} tilt={[0.2, 0.5, 0]} color="#8b5cf6" opacity={0.2} />
      <OrbitRing radius={2.3} rotationSpeed={0.12} tilt={[-0.35, 0.2, 0]} color="#2dd4bf" opacity={0.15} />
      <OrbitRing radius={2.7} rotationSpeed={-0.08} tilt={[0.15, -0.3, 0.1]} color="#8b5cf6" opacity={0.1} />

      {/* More orbiting particles for dynamic feel */}
      <OrbitingParticle radius={1.5} speed={1.4} offset={0} size={0.07} color="#2dd4bf" />
      <OrbitingParticle radius={1.9} speed={-1.1} offset={Math.PI} size={0.055} color="#8b5cf6" />
      <OrbitingParticle radius={2.3} speed={0.7} offset={Math.PI / 2} size={0.06} color="#2dd4bf" />
      <OrbitingParticle radius={2.7} speed={-0.5} offset={Math.PI * 1.5} size={0.05} color="#8b5cf6" />
      <OrbitingParticle radius={1.7} speed={0.9} offset={Math.PI / 3} size={0.045} color="#2dd4bf" />

      {/* Background particles */}
      <FloatingParticles />
    </>
  );
};

const AI3DScene = () => {
  return (
    <div 
      className="w-full h-full min-h-[350px] lg:min-h-[450px]"
      data-component="3d-scene"
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default AI3DScene;

