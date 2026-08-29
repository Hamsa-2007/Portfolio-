import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RobotAgentProps {
  position?: [number, number, number];
  scale?: number;
  scrollProgress?: number;
  accentColor?: string;
  isWaving?: boolean;
  interactiveLookAt?: boolean;
}

export const RobotAgent: React.FC<RobotAgentProps> = ({
  position = [2.2, 0, 0],
  scale = 1,
  accentColor = '#8B5CF6',
  isWaving = true,
  interactiveLookAt = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const antennaOrbRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Materials & Colors
  const bodyMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#FAFAFA',
    roughness: 0.25,
    metalness: 0.15,
  }), []);

  const darkTrimMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0F172A',
    roughness: 0.2,
    metalness: 0.8,
  }), []);

  const visorMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#020617',
    roughness: 0.1,
    metalness: 0.95,
  }), []);

  const eyeColor = useMemo(() => new THREE.Color('#38BDF8'), []);
  const accentThreeColor = useMemo(() => new THREE.Color(accentColor), [accentColor]);

  // Frame loop for floating physics, cursor tracking & waving
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mouse = state.pointer;

    if (groupRef.current) {
      // Gentle hovering / breathing motion
      groupRef.current.position.y = position[1] + Math.sin(t * 2) * 0.12;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        Math.sin(t * 0.8) * 0.1,
        0.05
      );
    }

    // Head LookAt (following cursor smoothly)
    if (headRef.current && interactiveLookAt) {
      const targetRotX = -mouse.y * 0.35;
      const targetRotY = mouse.x * 0.45;
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotX, 0.08);
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotY, 0.08);
    }

    // Eye blinking animation
    const blinkCycle = Math.sin(t * 1.8);
    const isBlinking = blinkCycle > 0.96;
    const eyeScaleY = isBlinking ? 0.1 : 1.0;
    if (leftEyeRef.current) leftEyeRef.current.scale.y = THREE.MathUtils.lerp(leftEyeRef.current.scale.y, eyeScaleY, 0.3);
    if (rightEyeRef.current) rightEyeRef.current.scale.y = THREE.MathUtils.lerp(rightEyeRef.current.scale.y, eyeScaleY, 0.3);

    // Waving Right Arm
    if (rightArmRef.current) {
      if (isWaving) {
        const waveAngle = Math.sin(t * 4.5) * 0.35;
        rightArmRef.current.rotation.z = -1.2 + waveAngle;
        rightArmRef.current.rotation.x = 0.3 + Math.cos(t * 3) * 0.1;
      } else {
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.2, 0.05);
        rightArmRef.current.rotation.x = 0;
      }
    }

    // Core pulsing & rotating
    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 3.5) * 0.15;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    // Energy halo ring rotating
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.02;
      ringRef.current.rotation.x = 1.2 + Math.sin(t * 2) * 0.1;
    }

    // Antenna glow flicker
    if (antennaOrbRef.current) {
      const glowScale = 1 + Math.sin(t * 5) * 0.2;
      antennaOrbRef.current.scale.set(glowScale, glowScale, glowScale);
    }
  });

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {/* --- HEAD GROUP --- */}
      <group ref={headRef} position={[0, 1.0, 0]}>
        {/* Main Head Shell */}
        <mesh material={bodyMaterial} castShadow receiveShadow>
          <sphereGeometry args={[0.65, 32, 32]} />
        </mesh>

        {/* Visor Screen */}
        <mesh position={[0, 0.05, 0.42]} material={visorMaterial}>
          <cylinderGeometry args={[0.42, 0.45, 0.35, 32, 1, false, -Math.PI / 2, Math.PI]} />
        </mesh>

        {/* Left LED Eye */}
        <mesh ref={leftEyeRef} position={[-0.18, 0.05, 0.58]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color={eyeColor} />
        </mesh>

        {/* Right LED Eye */}
        <mesh ref={rightEyeRef} position={[0.18, 0.05, 0.58]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color={eyeColor} />
        </mesh>

        {/* Cute Headphone/Ear Discs with accent color */}
        <group position={[-0.62, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
          <mesh material={darkTrimMaterial}>
            <cylinderGeometry args={[0.18, 0.18, 0.12, 24]} />
          </mesh>
          <mesh position={[0, 0.07, 0]}>
            <torusGeometry args={[0.14, 0.02, 16, 32]} />
            <meshBasicMaterial color={accentThreeColor} />
          </mesh>
        </group>

        <group position={[0.62, 0.05, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <mesh material={darkTrimMaterial}>
            <cylinderGeometry args={[0.18, 0.18, 0.12, 24]} />
          </mesh>
          <mesh position={[0, 0.07, 0]}>
            <torusGeometry args={[0.14, 0.02, 16, 32]} />
            <meshBasicMaterial color={accentThreeColor} />
          </mesh>
        </group>

        {/* Antenna Pole & Glowing Data Orb */}
        <mesh position={[0, 0.72, 0]} material={darkTrimMaterial}>
          <cylinderGeometry args={[0.02, 0.025, 0.22, 16]} />
        </mesh>
        <mesh ref={antennaOrbRef} position={[0, 0.88, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color={accentThreeColor} />
        </mesh>
      </group>

      {/* --- TORSO & AI POWER CORE --- */}
      <group position={[0, 0, 0]}>
        {/* Floating Neck Joint */}
        <mesh position={[0, 0.42, 0]} material={darkTrimMaterial}>
          <sphereGeometry args={[0.15, 24, 24]} />
        </mesh>

        {/* Upper Body Shell */}
        <mesh position={[0, 0, 0]} material={bodyMaterial} castShadow>
          <capsuleGeometry args={[0.38, 0.35, 16, 24]} />
        </mesh>

        {/* Dark Chest Recess Plate */}
        <mesh position={[0, 0.05, 0.32]} rotation={[Math.PI / 2, 0, 0]} material={darkTrimMaterial}>
          <cylinderGeometry args={[0.22, 0.22, 0.1, 24]} />
        </mesh>

        {/* Pulsing AI Energy Reactor Core */}
        <mesh ref={coreRef} position={[0, 0.05, 0.38]}>
          <sphereGeometry args={[0.1, 24, 24]} />
          <meshBasicMaterial color={accentThreeColor} />
        </mesh>
        <mesh position={[0, 0.05, 0.38]}>
          <torusGeometry args={[0.14, 0.015, 16, 32]} />
          <meshBasicMaterial color="#38BDF8" />
        </mesh>
      </group>

      {/* --- FLOATING ARMS --- */}
      {/* Left Arm */}
      <group position={[-0.55, 0.1, 0]}>
        <mesh material={darkTrimMaterial}>
          <sphereGeometry args={[0.09, 16, 16]} />
        </mesh>
        <mesh position={[-0.1, -0.28, 0]} material={bodyMaterial}>
          <capsuleGeometry args={[0.07, 0.3, 12, 16]} />
        </mesh>
        <mesh position={[-0.12, -0.52, 0.05]} material={darkTrimMaterial}>
          <sphereGeometry args={[0.08, 16, 16]} />
        </mesh>
      </group>

      {/* Right Arm (Waving Arm) */}
      <group ref={rightArmRef} position={[0.55, 0.1, 0]}>
        <mesh material={darkTrimMaterial}>
          <sphereGeometry args={[0.09, 16, 16]} />
        </mesh>
        <mesh position={[0.1, 0.28, 0]} material={bodyMaterial}>
          <capsuleGeometry args={[0.07, 0.3, 12, 16]} />
        </mesh>
        <mesh position={[0.15, 0.52, 0.05]} material={darkTrimMaterial}>
          <sphereGeometry args={[0.09, 16, 16]} />
        </mesh>
      </group>

      {/* --- LEVITATION THRUSTER & HALO RING --- */}
      <mesh ref={ringRef} position={[0, -0.65, 0]}>
        <torusGeometry args={[0.45, 0.02, 16, 48]} />
        <meshBasicMaterial color={accentThreeColor} transparent opacity={0.7} />
      </mesh>
      
      <pointLight position={[0, -0.7, 0]} color={accentColor} intensity={2.5} distance={3} />
    </group>
  );
};
