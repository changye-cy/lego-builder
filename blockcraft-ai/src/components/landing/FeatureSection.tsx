'use client';
import React from 'react';
import { motion } from 'framer-motion';

export function FeatureSection() {
  const features = [
    {
      title: 'Gesture Control',
      description: 'Real-time hand tracking with MediaPipe, supporting pinch-to-grab, move, rotate, place, and delete operations',
      icon: '🖐️',
    },
    {
      title: '3D Physical Blocks',
      description: 'Lego-style blocks with realistic physics (gravity, collision, friction) for authentic building experience',
      icon: '🧱',
    },
    {
      title: 'Real-time Collaboration',
      description: 'Multiple users can build together in the same 3D scene with live synchronization',
      icon: '👥',
    },
    {
      title: 'Project System',
      description: 'Save, load, and share your block creations with ease',
      icon: '💾',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="decorative-element bg-primary w-[400px] h-[400px] top-1/4 -left-200"></div>
      <div className="decorative-element bg-secondary w-[300px] h-[300px] bottom-1/4 -right-150"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-16 text-center gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Key Features
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass-panel p-8 text-center inner-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: '0 12px 28px rgba(99, 102, 241, 0.15)' }}
            >
              <div className="text-5xl mb-6 animate-float">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}