'use client';
import React from 'react';
import { motion } from 'framer-motion';

export function DemoPreview() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="decorative-element bg-primary w-[500px] h-[500px] top-1/3 -right-250"></div>
      <div className="decorative-element bg-secondary w-[400px] h-[400px] bottom-1/3 -left-200"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-16 text-center gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Interactive Demo
        </motion.h2>

        <motion.div 
          className="glass-panel p-4 md:p-8 inner-border"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="aspect-video bg-card rounded-xl flex items-center justify-center relative overflow-hidden">
            {/* Background animation */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-8 h-8 bg-primary rounded-md"
                  initial={{ 
                    x: Math.random() * 100 + '%', 
                    y: Math.random() * 100 + '%',
                    opacity: 0.3
                  }}
                  animate={{
                    x: Math.random() * 100 + '%',
                    y: Math.random() * 100 + '%',
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 15 + i,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              ))}
            </div>
            
            <div className="text-center relative z-10">
              <motion.div 
                className="text-6xl mb-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🧱
              </motion.div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">3D Block Demo</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Mouse controls: Drag to rotate view, scroll to zoom
              </p>
              <div className="mt-8">
                <button className="btn-primary px-6 py-3 text-sm font-semibold rounded-lg">
                  Try Live Demo
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}