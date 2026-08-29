import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface NodeData {
  id: string;
  pos: [number, number, number];
  layerIndex: number;
  layerName: string;
  color: string;
  label: string;
}

interface ConnectionData {
  from: [number, number, number];
  to: [number, number, number];
  fromLayer: number;
  toLayer: number;
  color: string;
}

interface NeuralNetwork3DProps {
  position?: [number, number, number];
  scale?: number;
  activeLayer?: number;
  showLabels?: boolean;
}

export const NeuralNetwork3D: React.FC<NeuralNetwork3DProps> = ({
  position = [0, 0, 0],
  scale = 1,
  activeLayer = -1,
  showLabels = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const pulsesRef = useRef<THREE.InstancedMesh>(null);

  // Layer Configuration
  const layersConfig = useMemo(() => [
    {
      name: 'Input Layer',
      sublabel: 'Raw Features · Vision & Voice',
      count: 4,
      x: -4.2,
      color: '#3B82F6',
      glowColor: '#60A5FA',
      nodeLabels: ['X₁ Audio Signals', 'X₂ Vision Embeddings', 'X₃ Patient Logs', 'X₄ Agro Telemetry']
    },
    {
      name: 'Hidden Layer 1',
      sublabel: 'Self-Attention & Encoders',
      count: 5,
      x: -1.4,
      color: '#8B5CF6',
      glowColor: '#A78BFA',
      nodeLabels: ['h₁ Attention Heads', 'h₂ Latent Vector', 'h₃ Cross-Attention', 'h₄ Feature Map', 'h₅ Context Weights']
    },
    {
      name: 'Hidden Layer 2',
      sublabel: 'Deep Representation & FFN',
      count: 5,
      x: 1.4,
      color: '#C084FC',
      glowColor: '#E879F9',
      nodeLabels: ['z₁ Reasoning Node', 'z₂ Triage Classifier', 'z₃ Yield Predictor', 'z₄ Multi-Agent State', 'z₅ Risk Metric']
    },
    {
      name: 'Output Layer',
      sublabel: 'Decisions · Actions · Triage',
      count: 3,
      x: 4.2,
      color: '#F59E0B',
      glowColor: '#FCD34D',
      nodeLabels: ['Y₁ Clinical Alert', 'Y₂ Voice Triage Action', 'Y₃ Crop Advisory']
    }
  ], []);

  // Compute Nodes
  const nodes = useMemo(() => {
    const list: NodeData[] = [];
    layersConfig.forEach((layer, layerIdx) => {
      const spacingY = 1.35;
      const startY = ((layer.count - 1) * spacingY) / 2;
      for (let i = 0; i < layer.count; i++) {
        const y = startY - i * spacingY;
        const z = Math.sin(i + layerIdx) * 0.45;
        list.push({
          id: `node-${layerIdx}-${i}`,
          pos: [layer.x, y, z],
          layerIndex: layerIdx,
          layerName: layer.name,
          color: layer.color,
          label: layer.nodeLabels[i] || `Node ${i + 1}`
        });
      }
    });
    return list;
  }, [layersConfig]);

  // Compute Synaptic Connections between adjacent layers
  const connections = useMemo(() => {
    const list: ConnectionData[] = [];
    for (let l = 0; l < layersConfig.length - 1; l++) {
      const fromNodes = nodes.filter(n => n.layerIndex === l);
      const toNodes = nodes.filter(n => n.layerIndex === l + 1);
      fromNodes.forEach(fn => {
        toNodes.forEach(tn => {
          list.push({
            from: fn.pos,
            to: tn.pos,
            fromLayer: l,
            toLayer: l + 1,
            color: layersConfig[l].color
          });
        });
      });
    }
    return list;
  }, [nodes, layersConfig]);

  // Data flow pulse particles
  const pulseCount = 36;
  const pulseData = useMemo(() => {
    return Array.from({ length: pulseCount }, () => {
      const connIndex = Math.floor(Math.random() * connections.length);
      return {
        connIndex,
        progress: Math.random(),
        speed: 0.35 + Math.random() * 0.45,
      };
    });
  }, [connections.length]);

  const dummyMatrix = useMemo(() => new THREE.Matrix4(), []);

  // Lines geometry
  const lineGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(connections.length * 6);
    connections.forEach((conn, i) => {
      positions[i * 6] = conn.from[0];
      positions[i * 6 + 1] = conn.from[1];
      positions[i * 6 + 2] = conn.from[2];
      positions[i * 6 + 3] = conn.to[0];
      positions[i * 6 + 4] = conn.to[1];
      positions[i * 6 + 5] = conn.to[2];
    });
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, [connections]);

  // Animation Loop
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.08;
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.08;
    }

    if (pulsesRef.current) {
      pulseData.forEach((p, idx) => {
        p.progress += delta * p.speed;
        if (p.progress > 1) {
          p.progress = 0;
          p.connIndex = Math.floor(Math.random() * connections.length);
        }

        const conn = connections[p.connIndex];
        if (conn) {
          const x = THREE.MathUtils.lerp(conn.from[0], conn.to[0], p.progress);
          const y = THREE.MathUtils.lerp(conn.from[1], conn.to[1], p.progress);
          const z = THREE.MathUtils.lerp(conn.from[2], conn.to[2], p.progress);

          const pulseScale = Math.sin(p.progress * Math.PI) * 0.12 + 0.04;
          dummyMatrix.makeScale(pulseScale, pulseScale, pulseScale);
          dummyMatrix.setPosition(x, y, z);
          pulsesRef.current?.setMatrixAt(idx, dummyMatrix);
        }
      });
      pulsesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {/* Synaptic Connection Lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Flowing Data Pulses */}
      <instancedMesh ref={pulsesRef} args={[undefined, undefined, pulseCount]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.9} />
      </instancedMesh>

      {/* Nodes */}
      {nodes.map((node) => {
        const isLayerActive = activeLayer === -1 || activeLayer === node.layerIndex;
        const nodeColor = isLayerActive ? node.color : '#475569';
        const opacity = isLayerActive ? 1 : 0.4;

        return (
          <group key={node.id} position={node.pos}>
            <mesh scale={[1.35, 1.35, 1.35]}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshBasicMaterial color={nodeColor} transparent opacity={opacity * 0.25} />
            </mesh>

            <mesh castShadow receiveShadow>
              <sphereGeometry args={[0.22, 24, 24]} />
              <meshStandardMaterial
                color={nodeColor}
                emissive={nodeColor}
                emissiveIntensity={isLayerActive ? 0.6 : 0.1}
                roughness={0.2}
                metalness={0.4}
              />
            </mesh>

            <mesh scale={[0.5, 0.5, 0.5]}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
          </group>
        );
      })}

      {/* 3D Floating Layer Labels */}
      {showLabels && layersConfig.map((layer, idx) => {
        const isCurrentActive = activeLayer === -1 || activeLayer === idx;
        return (
          <group key={layer.name} position={[layer.x, 3.4, 0]}>
            <Html center distanceFactor={12} className="pointer-events-none select-none">
              <div className={`flex flex-col items-center px-3 py-1.5 rounded-xl backdrop-blur-md border transition-all duration-500 whitespace-nowrap shadow-lg ${
                isCurrentActive 
                  ? 'bg-slate-900/80 border-slate-700 shadow-purple-500/10 scale-100 opacity-100' 
                  : 'bg-slate-950/40 border-slate-800 scale-95 opacity-60'
              }`}>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: layer.color }}></span>
                  <span className="text-xs font-mono font-bold tracking-wider text-white">
                    {layer.name.toUpperCase()}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-sans mt-0.5">
                  {layer.sublabel}
                </span>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
