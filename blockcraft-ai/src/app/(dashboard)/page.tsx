'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  
  // 模拟项目数据
  const projects = [
    {
      id: '1',
      name: 'My Little House',
      thumbnailUrl: null,
      createdAt: '2026-04-13',
    },
    {
      id: '2',
      name: 'Space Station',
      thumbnailUrl: null,
      createdAt: '2026-04-12',
    },
    {
      id: '3',
      name: 'Car Model',
      thumbnailUrl: null,
      createdAt: '2026-04-11',
    },
  ];

  const handleCreateProject = () => {
    const roomId = Math.random().toString(36).substring(2, 15);
    router.push(`/builder/${roomId}`);
  };

  return (
    <div className="relative">
      {/* Decorative elements */}
      <div className="decorative-element bg-primary w-[300px] h-[300px] -top-40 -right-40"></div>
      <div className="decorative-element bg-secondary w-[200px] h-[200px] bottom-40 -left-20"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">My Projects</h1>
            <p className="text-muted-foreground">Manage and access your 3D block creations</p>
          </div>
          <button 
            className="btn-primary px-6 py-3 text-sm font-semibold rounded-lg"
            onClick={handleCreateProject}
          >
            Create New Project
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="glass-panel p-6 rounded-xl inner-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: '0 12px 28px rgba(99, 102, 241, 0.15)' }}
            >
              <div className="aspect-video bg-card rounded-lg mb-6 flex items-center justify-center relative overflow-hidden">
                {/* Background animation */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-4 h-4 bg-primary rounded-md"
                      initial={{ 
                        x: Math.random() * 100 + '%', 
                        y: Math.random() * 100 + '%'
                      }}
                      animate={{
                        x: Math.random() * 100 + '%',
                        y: Math.random() * 100 + '%'
                      }}
                      transition={{
                        duration: 8 + i,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                    />
                  ))}
                </div>
                <div className="text-5xl relative z-10 animate-float">🧱</div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{project.name}</h3>
              <p className="text-sm text-muted-foreground mb-6">Created on {project.createdAt}</p>
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 btn-primary text-sm rounded-lg">
                  Edit
                </button>
                <button className="px-4 py-2 btn-secondary text-sm rounded-lg">
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {projects.length === 0 && (
          <motion.div 
            className="glass-panel py-20 text-center inner-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-6xl mb-6">🧱</div>
            <h3 className="text-xl font-semibold mb-3">No Projects Yet</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Start building your first 3D creation with BlockCraft AI
            </p>
            <button 
              className="btn-primary px-6 py-3 text-sm font-semibold rounded-lg"
              onClick={handleCreateProject}
            >
              Get Started
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}