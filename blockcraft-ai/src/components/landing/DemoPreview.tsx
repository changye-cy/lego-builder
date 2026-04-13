'use client';
import React from 'react';
import { motion } from 'framer-motion';

export function DemoPreview() {
  return (
    <section className="py-20 bg-background-primary">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          体验预览
        </motion.h2>

        <div className="glass-panel p-4 md:p-8">
          <div className="aspect-video bg-background-tertiary rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🧱</div>
              <h3 className="text-xl font-semibold mb-2">3D 积木演示</h3>
              <p className="text-text-secondary">鼠标控制：拖动旋转视角，滚轮缩放</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}