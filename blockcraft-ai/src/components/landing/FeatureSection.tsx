'use client';
import React from 'react';
import { motion } from 'framer-motion';

export function FeatureSection() {
  const features = [
    {
      title: '手势驱动',
      description: '通过 MediaPipe 实时识别手部 21 个关键点，支持捏合抓取、移动、旋转、放置、删除等操作',
      icon: '🖐️',
    },
    {
      title: '3D 物理积木',
      description: '乐高风格积木，具备真实物理堆叠效果（重力、碰撞、摩擦）',
      icon: '🧱',
    },
    {
      title: '实时协作',
      description: '多人可同时在一个 3D 场景中搭建积木，实时同步操作',
      icon: '👥',
    },
    {
      title: '作品系统',
      description: '保存、加载、分享积木作品',
      icon: '💾',
    },
  ];

  return (
    <section className="py-20 bg-background-secondary">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          核心特性
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass-panel p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)' }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-text-secondary">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}