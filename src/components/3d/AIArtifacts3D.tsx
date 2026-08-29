import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- 1. GPU / NEURAL ACCELERATOR SILICON CHIP ---
export const GPUChip3D: React.FC<{ position?: [number, number, number]; scale?: number; color?: string }> = ({
  position = [0, 0, 0],
  scale = 1,
  color = '#8B5CF6'
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const innerDieRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.4;
      groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.2 + 0.3;
      groupRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.8;
    }
    if (innerDieRef.current) {
      const p = 1 + Math.sin(t * 3) * 0.08;
      innerDieRef.current.scale.set(p, 1, p);
    }
  });

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {/* Outer Ceramic Substrate */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[1.8, 0.15, 1.8]} />
        <meshStandardMaterial color="#0F172A" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Silicon Die */}
      <mesh ref={innerDieRef} position={[0, 0.1, 0]}>
        <boxGeometry args={[1.2, 0.08, 1.2]} />
        <meshStandardMaterial color="#1E293B" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Glowing AI Neural Core */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.7, 0.05, 0.7]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Rotating Tensor Accelerator Ring */}
      <mesh ref={ringRef} position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.9, 0.02, 16, 32]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.8} />
      </mesh>

      {/* Gold Heat Pins / Connectors */}
      {[-0.8, -0.4, 0, 0.4, 0.8].map((x, i) => (
        <React.Fragment key={i}>
          <mesh position={[x, -0.08, 0.95]}>
            <boxGeometry args={[0.1, 0.05, 0.1]} />
            <meshStandardMaterial color="#F59E0B" metalness={1} roughness={0.2} />
          </mesh>
          <mesh position={[x, -0.08, -0.95]}>
            <boxGeometry args={[0.1, 0.05, 0.1]} />
            <meshStandardMaterial color="#F59E0B" metalness={1} roughness={0.2} />
          </mesh>
        </React.Fragment>
      ))}
      <pointLight position={[0, 0.5, 0]} color={color} intensity={2} distance={2.5} />
    </group>
  );
};

// --- 2. STACKED DATASET & VECTOR EMBEDDING CARDS ---
export const DatasetStack3D: React.FC<{ position?: [number, number, number]; scale?: number; color?: string }> = ({
  position = [0, 0, 0],
  scale = 1,
  color = '#3B82F6'
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.3;
      groupRef.current.position.y = position[1] + Math.sin(t * 1.8) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {[0, 1, 2, 3].map((layerIndex) => {
        const yOffset = (layerIndex - 1.5) * 0.28;
        return (
          <group key={layerIndex} position={[0, yOffset, 0]} rotation={[0, layerIndex * 0.25, 0]}>
            {/* Glass Data Sheet */}
            <mesh>
              <boxGeometry args={[1.4, 0.04, 1.4]} />
              <meshStandardMaterial
                color="#0F172A"
                roughness={0.1}
                metalness={0.6}
                transparent
                opacity={0.85}
              />
            </mesh>
            {/* Glowing Edge Border */}
            <mesh>
              <boxGeometry args={[1.42, 0.02, 1.42]} />
              <meshBasicMaterial color={color} transparent opacity={0.6} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// --- 3. FLOATING TECH PARTICLES / ORBITING SATELLITES ---
export const OrbitingTechParticles: React.FC<{ count?: number; radius?: number }> = ({
  count = 28,
  radius = 6
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05;
      groupRef.current.rotation.x = Math.sin(t * 0.03) * 0.05;
    }
  });

  const particles = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const x = radius * Math.cos(theta) * Math.sin(phi) + (Math.random() - 0.5) * 2;
      const y = (radius * 0.6) * Math.sin(theta) * Math.sin(phi) + (Math.random() - 0.5) * 2;
      const z = radius * Math.cos(phi) + (Math.random() - 0.5) * 2;
      const colors = ['#8B5CF6', '#3B82F6', '#F59E0B', '#10B981', '#38BDF8'];
      const color = colors[i % colors.length];
      const particleScale = 0.04 + Math.random() * 0.06;
      return { pos: [x, y, z] as [number, number, number], color, scale: particleScale };
    });
  }, [count, radius]);

  return (
    <group ref={groupRef}>
      {particles.map((p, idx) => (
        <mesh key={idx} position={p.pos}>
          <sphereGeometry args={[p.scale, 8, 8]} />
          <meshBasicMaterial color={p.color} transparent opacity={0.75} />
        </mesh>
      ))}
    </group>
  );
};
