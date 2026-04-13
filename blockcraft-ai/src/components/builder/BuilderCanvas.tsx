'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier';
import * as THREE from 'three';
import { useBuilderStore } from '@/lib/store/builder-store';
import { BrickType, BrickColor, BRICK_TEMPLATES } from '@/types/brick';
import { createLegoBrickGeometry } from '@/lib/three/brick-geometry';

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

export function BuilderCanvas() {
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
    <div className="absolute inset-0">
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
        </Physics>
        <OrbitControls enableDamping dampingFactor={0.1} />
      </Canvas>
    </div>
  );
}