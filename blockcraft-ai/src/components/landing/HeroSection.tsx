'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export function HeroSection() {
  const router = useRouter();

  const handleStartBuilding = () => {
    // 生成一个随机的 roomId 并导航到搭建页面
    const roomId = Math.random().toString(36).substring(2, 15);
    router.push(`/builder/${roomId}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background-primary to-background-secondary z-0"></div>
      
      {/* 3D 动画背景占位 */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-64 h-64">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-16 h-16 bg-accent-primary rounded-md opacity-70"
                initial={{ position: 'absolute', rotate: 0 }}
                animate={{
                  rotate: 360,
                  x: Math.sin(i * 0.5) * 100,
                  y: Math.cos(i * 0.5) * 100,
                }}
                transition={{
                  duration: 10 + i,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-accent-primary to-accent-secondary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          BlockCraft AI
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-text-secondary mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          通过摄像头手势识别，在 3D 空间中搭建乐高风格积木，支持多人实时协作
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button 
            className="glass-button px-8 py-4 text-lg font-semibold text-white rounded-full hover:bg-accent-primary transition-all"
            onClick={handleStartBuilding}
          >
            开始搭建
          </button>
        </motion.div>
      </div>
    </section>
  );
}