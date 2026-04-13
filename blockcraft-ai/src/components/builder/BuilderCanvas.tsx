'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier';
import * as THREE from 'three';
import { useBuilderStore } from '@/lib/store/builder-store';
import { BrickType, BrickColor, BRICK_TEMPLATES } from '@/types/brick';
import { createLegoBrickGeometry } from '@/lib/three/brick-geometry';
import { HandTrackingResult } from '@/types/gesture';

interface LegoBrickProps {
  id: string;
  type: BrickType;
  color: BrickColor;
  position: [number, number, number];
  rotation: [number, number, number];
  isPlaced: boolean;
  isSelected?: boolean;
}

function LegoBrick({ id, type, color, position, rotation, isPlaced, isSelected }: LegoBrickProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const template = BRICK_TEMPLATES[type];
  const geometry = createLegoBrickGeometry(template.width, template.depth, template.height);

  return (
    <RigidBody
      type={isPlaced ? 'dynamic' : 'kinematicPosition'}
      position={position}
      rotation={rotation}
      linearDamping={0.8}
      angularDamping={0.8}
    >
      <CuboidCollider args={[template.width * 0.4, template.height === 'brick' ? 0.48 : 0.16, template.depth * 0.4]} />
      <mesh
        ref={meshRef}
        geometry={geometry}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.0}
          envMapIntensity={0.8}
        />
      </mesh>
      {isSelected && (
        <mesh scale={[1.02, 1.02, 1.02]}>
          <boxGeometry args={[template.width * 0.8, template.height === 'brick' ? 0.96 : 0.32, template.depth * 0.8]} />
          <meshBasicMaterial color="#00ff88" wireframe transparent opacity={0.5} />
        </mesh>
      )}
    </RigidBody>
  );
}

function BrickGrid() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
      <planeGeometry args={[20, 20, 20, 20]} />
      <meshStandardMaterial
        color="#27272A"
        roughness={0.8}
        metalness={0.1}
        wireframe={false}
      />
      <gridHelper args={[20, 20, '#3F3F46', '#27272A']} />
    </mesh>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-near={0.1}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-5, 5, -5]} intensity={0.5} />
    </>
  );
}

// 手部骨骼组件
function HandSkeleton({ hand }: { hand: { landmarks: { x: number; y: number; z: number }[]; handedness: 'Left' | 'Right' } }) {
  const groupRef = useRef<THREE.Group>(null);
  const { landmarks, handedness } = hand;

  // 缩放和转换手部坐标到 3D 空间
  useEffect(() => {
    if (groupRef.current) {
      // 将手部坐标从 [0,1] 映射到 3D 空间
      const scale = 2;
      const offsetX = landmarks[0].x * scale - scale / 2;
      const offsetY = -landmarks[0].y * scale + scale / 2;
      const offsetZ = 0;
      
      groupRef.current.position.set(offsetX, offsetY, offsetZ);
    }
  }, [landmarks]);

  // 绘制手部骨骼
  return (
    <group ref={groupRef}>
      {/* 骨骼连接 */}
      {[
        [0, 1], [1, 2], [2, 3], [3, 4], // 拇指
        [0, 5], [5, 6], [6, 7], [7, 8], // 食指
        [0, 9], [9, 10], [10, 11], [11, 12], // 中指
        [0, 13], [13, 14], [14, 15], [15, 16], // 无名指
        [0, 17], [17, 18], [18, 19], [19, 20]  // 小指
      ].map(([start, end], index) => (
        <line key={index}>
          <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[
                  new Float32Array([
                    landmarks[start].x * 2 - 1, -landmarks[start].y * 2 + 1, 0,
                    landmarks[end].x * 2 - 1, -landmarks[end].y * 2 + 1, 0
                  ]),
                  3
                ]}
              />
            </bufferGeometry>
          <lineBasicMaterial color={handedness === 'Right' ? '#6366F1' : '#8B5CF6'} linewidth={2} />
        </line>
      ))}
      
      {/* 关键点 */}
      {landmarks.map((landmark, index) => (
        <mesh key={index} position={[landmark.x * 2 - 1, -landmark.y * 2 + 1, 0]}>
          <sphereGeometry args={[0.05]} />
          <meshBasicMaterial color="#10B981" />
        </mesh>
      ))}
    </group>
  );
}

interface BuilderCanvasProps {
  handTrackingResult: HandTrackingResult;
}

export function BuilderCanvas({ handTrackingResult }: BuilderCanvasProps) {
  const { bricks, selectedBrickId, currentBrickType, currentBrickColor, addBrick } = useBuilderStore();
  const [ghostBrick, setGhostBrick] = useState<{
    position: [number, number, number];
    rotation: [number, number, number];
  }>({ position: [0, 1, 0], rotation: [0, 0, 0] });

  // 模拟鼠标移动来控制幽灵积木位置
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 10 - 5;
      const z = (e.clientY / window.innerHeight) * 10 - 5;
      setGhostBrick(prev => ({
        ...prev,
        position: [x, 1, -z]
      }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 模拟鼠标点击来放置积木
  useEffect(() => {
    const handleClick = () => {
      const newBrick = {
        id: `brick-${Date.now()}`,
        type: currentBrickType,
        color: currentBrickColor,
        position: [...ghostBrick.position] as [number, number, number],
        rotation: [0, 0, 0] as [number, number, number],
        isPlaced: true
      };
      addBrick(newBrick);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [ghostBrick.position, currentBrickType, currentBrickColor, addBrick]);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        gl={{ antialias: true }}
      >
        <Environment preset="city" />
        <Physics gravity={[0, -20, 0]}>
          <BrickGrid />
          <Lighting />
          
          {/* 已放置的积木 */}
          {bricks.map(brick => (
            <LegoBrick
              key={brick.id}
              id={brick.id}
              type={brick.type}
              color={brick.color}
              position={brick.position}
              rotation={brick.rotation}
              isPlaced={brick.isPlaced}
              isSelected={brick.id === selectedBrickId}
            />
          ))}
          
          {/* 幽灵积木（预览） */}
          <LegoBrick
            id="ghost"
            type={currentBrickType}
            color={currentBrickColor}
            position={ghostBrick.position}
            rotation={ghostBrick.rotation}
            isPlaced={false}
          />
          
          {/* 手部骨骼 */}
          {handTrackingResult.hands.map((hand, index) => (
            <HandSkeleton key={index} hand={hand} />
          ))}
        </Physics>
        <OrbitControls enableDamping dampingFactor={0.1} />
      </Canvas>
    </div>
  );
}