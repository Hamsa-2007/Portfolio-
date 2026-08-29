import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { RobotAgent } from './RobotAgent';
import { NeuralNetwork3D } from './NeuralNetwork3D';
import { GPUChip3D, DatasetStack3D, OrbitingTechParticles } from './AIArtifacts3D';

interface Scene3DProps {
  scrollProgress: number; // 0.0 to 1.0
  activeSection: string;
  activeProjectIndex?: number;
}

// Camera Rig that smoothly shifts camera position and rotation based on scroll progress
const CameraRig: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  const { camera, pointer } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 8));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    if (scrollProgress < 0.20) {
      // HERO
      const localP = scrollProgress / 0.20;
      targetPos.current.set(
        THREE.MathUtils.lerp(0, 0.4, localP),
        THREE.MathUtils.lerp(0, 0.2, localP),
        THREE.MathUtils.lerp(7.8, 8.2, localP)
      );
      targetLookAt.current.set(0, 0, 0);
    } else if (scrollProgress < 0.55) {
      // PROJECTS (Curved drift through 3D chips & neural core)
      const localP = (scrollProgress - 0.20) / 0.35;
      targetPos.current.set(
        Math.sin(localP * Math.PI) * 2.2,
        THREE.MathUtils.lerp(0.2, -0.3, localP),
        THREE.MathUtils.lerp(8.2, 8.0, localP)
      );
      targetLookAt.current.set(0, 0, 0);
    } else if (scrollProgress < 0.78) {
      // SKILLS
      const localP = (scrollProgress - 0.55) / 0.23;
      targetPos.current.set(
        THREE.MathUtils.lerp(1.2, 0, localP),
        THREE.MathUtils.lerp(-0.3, 0.6, localP),
        THREE.MathUtils.lerp(8.0, 7.5, localP)
      );
      targetLookAt.current.set(0, 0, 0);
    } else if (scrollProgress < 0.90) {
      // MILESTONES / EXPERIENCE
      const localP = (scrollProgress - 0.78) / 0.12;
      targetPos.current.set(
        THREE.MathUtils.lerp(0, -0.8, localP),
        THREE.MathUtils.lerp(0.6, 0.2, localP),
        THREE.MathUtils.lerp(7.5, 7.2, localP)
      );
      targetLookAt.current.set(0, 0, 0);
    } else {
      // CONTACT
      const localP = (scrollProgress - 0.90) / 0.10;
      targetPos.current.set(
        THREE.MathUtils.lerp(-0.8, 0, localP),
        THREE.MathUtils.lerp(0.2, 0.2, localP),
        THREE.MathUtils.lerp(7.2, 6.2, localP)
      );
      targetLookAt.current.set(0, 0.4, 0);
    }

    const parallaxX = pointer.x * 0.35;
    const parallaxY = pointer.y * 0.25;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetPos.current.x + parallaxX, 4, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetPos.current.y + parallaxY, 4, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetPos.current.z, 4, delta);

    camera.lookAt(targetLookAt.current);
  });

  return null;
};

// Internal 3D Scene Actors
const SceneContent: React.FC<Scene3DProps> = ({ scrollProgress, activeProjectIndex = 0 }) => {
  const robotState = useMemo(() => {
    if (scrollProgress < 0.22) {
      return {
        pos: [2.5, 0.1, 0.5] as [number, number, number],
        scale: 1.15,
        accent: '#8B5CF6',
        waving: true,
        visible: true
      };
    } else if (scrollProgress < 0.58) {
      const projectColors = ['#8B5CF6', '#3B82F6', '#F59E0B', '#10B981', '#EC4899'];
      return {
        pos: [3.4, -0.6, 0.2] as [number, number, number],
        scale: 0.95,
        accent: projectColors[activeProjectIndex] || '#8B5CF6',
        waving: false,
        visible: true
      };
    } else if (scrollProgress < 0.80) {
      return {
        pos: [-3.8, 1.2, -1.0] as [number, number, number],
        scale: 0.85,
        accent: '#F59E0B',
        waving: false,
        visible: true
      };
    } else if (scrollProgress < 0.90) {
      return {
        pos: [3.6, 0.8, -0.5] as [number, number, number],
        scale: 0.8,
        accent: '#10B981',
        waving: false,
        visible: true
      };
    } else {
      return {
        pos: [0, 0.2, 1.5] as [number, number, number],
        scale: 1.35,
        accent: '#8B5CF6',
        waving: true,
        visible: true
      };
    }
  }, [scrollProgress, activeProjectIndex]);

  const neuralNetworkScale = useMemo(() => {
    if (scrollProgress < 0.20) return 0.55;
    if (scrollProgress < 0.58) return 0.85;
    if (scrollProgress < 0.80) return 0.75;
    return 0.45;
  }, [scrollProgress]);

  const neuralNetworkPosition = useMemo((): [number, number, number] => {
    if (scrollProgress < 0.20) return [0, -1.8, -3];
    if (scrollProgress < 0.58) return [-3.8, 1.2, -3.5];
    if (scrollProgress < 0.80) return [0, 0.5, -2.5];
    return [0, -2.5, -5];
  }, [scrollProgress]);

  return (
    <>
      <CameraRig scrollProgress={scrollProgress} />

      {/* --- LIGHTING & ENVIRONMENT --- */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[10, 15, 10]} intensity={1.4} color="#FFFFFF" />
      <directionalLight position={[-10, 10, -5]} intensity={0.9} color="#8B5CF6" />
      <pointLight position={[0, -5, 5]} intensity={1.5} color="#38BDF8" />
      <pointLight position={[5, 5, 2]} intensity={1.2} color="#F59E0B" />

      {/* Starfield in background */}
      <Stars radius={40} depth={30} count={900} factor={3} saturation={0.5} fade speed={1.2} />

      {/* Ambient Orbiting Tech Particles */}
      <OrbitingTechParticles count={32} radius={7.5} />

      {/* --- 1. 3D ROBOT AGENT --- */}
      {robotState.visible && (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
          <RobotAgent
            position={robotState.pos}
            scale={robotState.scale}
            scrollProgress={scrollProgress}
            accentColor={robotState.accent}
            isWaving={robotState.waving}
            interactiveLookAt={true}
          />
        </Float>
      )}

      {/* --- 2. 3D NEURAL NETWORK --- */}
      <NeuralNetwork3D
        position={neuralNetworkPosition}
        scale={neuralNetworkScale}
        activeLayer={-1}
        showLabels={false}
      />

      {/* --- 3. PROJECT AI ARTIFACTS --- */}
      {scrollProgress >= 0.18 && scrollProgress <= 0.65 && (
        <group>
          <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
            <GPUChip3D position={[3.2, 0.3, 0.5]} scale={0.85} color="#8B5CF6" />
          </Float>

          <Float speed={2.2} rotationIntensity={0.3} floatIntensity={0.5}>
            <DatasetStack3D position={[-3.4, -0.6, 0.2]} scale={0.9} color="#3B82F6" />
          </Float>
        </group>
      )}
    </>
  );
};

export const Scene3D: React.FC<Scene3DProps> = (props) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <SceneContent {...props} />
      </Canvas>
    </div>
  );
};
