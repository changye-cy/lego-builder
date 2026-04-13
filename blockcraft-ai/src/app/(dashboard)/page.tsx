'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  // 模拟项目数据
  const projects = [
    {
      id: '1',
      name: '我的小房子',
      thumbnailUrl: null,
      createdAt: '2026-04-13',
    },
    {
      id: '2',
      name: '太空站',
      thumbnailUrl: null,
      createdAt: '2026-04-12',
    },
    {
      id: '3',
      name: '汽车模型',
      thumbnailUrl: null,
      createdAt: '2026-04-11',
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">我的作品</h2>
        <button className="bg-accent-primary px-4 py-2 rounded-md hover:bg-accent-secondary transition-colors">
          创建新项目
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="glass-panel p-4 rounded-lg hover:shadow-lg transition-shadow"
            whileHover={{ y: -5 }}
          >
            <div className="aspect-video bg-background-tertiary rounded-md mb-4 flex items-center justify-center">
              <div className="text-4xl">🧱</div>
            </div>
            <h3 className="font-semibold mb-2">{project.name}</h3>
            <p className="text-sm text-text-secondary mb-4">创建于 {project.createdAt}</p>
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-1 bg-accent-primary text-sm rounded-md hover:bg-accent-secondary transition-colors">
                编辑
              </button>
              <button className="px-3 py-1 border border-border-default text-sm rounded-md hover:bg-background-tertiary transition-colors">
                删除
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}