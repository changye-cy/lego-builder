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
      {/* Decorative elements */}
      <div className="decorative-element bg-primary w-[600px] h-[600px] -top-40 -left-40"></div>
      <div className="decorative-element bg-secondary w-[500px] h-[500px] -bottom-40 -right-40"></div>
      
      {/* 3D 动画背景占位 */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-64 h-64">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-16 h-16 bg-primary rounded-md opacity-70"
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
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <div className="text-5xl mb-2">🧱</div>
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 gradient-text text-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          BlockCraft AI
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Build Lego-style blocks in 3D space using camera gesture recognition, with real-time multiplayer collaboration
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button 
            className="btn-primary px-8 py-4 text-lg font-semibold rounded-full"
            onClick={handleStartBuilding}
          >
            Start Building
          </button>
          <button 
            className="btn-secondary px-8 py-4 text-lg font-semibold rounded-full"
          >
            Watch Demo
          </button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 text-sm text-muted-foreground"
        >
          <p>Powered by AI & WebXR Technology</p>
        </motion.div>
      </div>
    </section>
  );
}