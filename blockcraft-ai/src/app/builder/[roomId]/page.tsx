'use client';
import React, { useState } from 'react';
import { CameraFeed } from '@/components/builder/CameraFeed';
import { BuilderCanvas } from '@/components/builder/BuilderCanvas';
import { useBuilderStore } from '@/lib/store/builder-store';
import { HandTrackingResult } from '@/types/gesture';

export default function BuilderPage() {
  const { currentBrickType, currentBrickColor, setCurrentBrickType, setCurrentBrickColor } = useBuilderStore();
  const [handTrackingResult, setHandTrackingResult] = useState<HandTrackingResult>({ hands: [], timestamp: Date.now() });

  return (
    <div className="min-h-screen gradient-bg text-foreground flex flex-col">
      {/* 顶部导航栏 */}
      <header className="glass-panel border-b border-border py-4 px-8 flex justify-between items-center relative overflow-hidden">
        {/* 装饰元素 */}
        <div className="decorative-element bg-primary w-40 h-40 -translate-x-20 -translate-y-20"></div>
        <div className="decorative-element bg-secondary w-60 h-60 translate-x-30 -translate-y-30"></div>
        
        <div className="flex items-center gap-3 relative z-10">
          <div className="text-2xl">🧱</div>
          <h1 className="text-xl font-bold tracking-tight gradient-text">
            BlockCraft AI
          </h1>
        </div>
        
        <div className="flex items-center gap-4 relative z-10">
          <button className="btn-secondary px-4 py-2 text-sm font-medium">
            Save
          </button>
          <button className="btn-primary px-4 py-2 text-sm font-medium">
            Share
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-sm font-semibold">U</span>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧面板 */}
        <div className="w-72 glass-panel border-r border-border p-5 flex flex-col gap-8">
          <div className="relative glass-panel inner-border">
            <div className="absolute -top-3 left-4 bg-card px-2 text-sm font-medium">
              Brick Types
            </div>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {['1x1', '1x2', '2x2', '2x4', 'plate-1x2', 'plate-2x4'].map((type) => (
                <button 
                  key={type} 
                  className={`relative overflow-hidden group px-4 py-3 rounded-lg text-center text-sm font-medium transition-all duration-300 ${currentBrickType === type ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground' : 'btn-secondary'}`}
                  onClick={() => setCurrentBrickType(type as any)}
                >
                  {currentBrickType === type && (
                    <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                  )}
                  <span className="relative z-10">{type}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="relative glass-panel inner-border">
            <div className="absolute -top-3 left-4 bg-card px-2 text-sm font-medium">
              Colors
            </div>
            <div className="grid grid-cols-5 gap-2 mt-2">
              {['#E3000B', '#0057A8', '#00852B', '#FFD700', '#FF6600', '#FFFFFF', '#1B2A34', '#A5499B', '#00BCD4', '#795548'].map((color) => (
                <button 
                  key={color} 
                  className={`w-10 h-10 rounded-lg border-2 transition-all duration-300 ${currentBrickColor === color ? 'border-white shadow-lg shadow-white/20 scale-110' : 'border-transparent hover:border-white/50'}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setCurrentBrickColor(color as any)}
                />
              ))}
            </div>
          </div>
          
          <div className="relative glass-panel inner-border">
            <div className="absolute -top-3 left-4 bg-card px-2 text-sm font-medium">
              Tools
            </div>
            <div className="flex flex-col gap-2 mt-2">
              {['Undo', 'Redo', 'Delete', 'Clear'].map((tool) => (
                <button 
                  key={tool} 
                  className="btn-secondary px-4 py-3 text-center text-sm font-medium"
                >
                  {tool}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 中间 3D 画布 */}
        <div className="flex-1 relative">
          {/* 装饰背景 */}
          <div className="absolute inset-0 bg-background overflow-hidden">
            <div className="decorative-element bg-primary w-96 h-96 top-1/4 left-1/4"></div>
            <div className="decorative-element bg-secondary w-80 h-80 bottom-1/4 right-1/4"></div>
          </div>
          
          {/* 摄像头预览窗口（左上角） */}
          <div className="absolute top-6 left-6 z-10 glass-panel inner-border shadow-lg shadow-black/30">
            <div className="absolute -top-3 left-4 bg-card px-2 text-xs font-medium">
              Camera
            </div>
            <CameraFeed onResults={setHandTrackingResult} />
          </div>
          
          <BuilderCanvas handTrackingResult={handTrackingResult} />
        </div>

        {/* 右侧面板 */}
        <div className="w-72 glass-panel border-l border-border p-5 flex flex-col gap-8">
          <div className="relative glass-panel inner-border">
            <div className="absolute -top-3 left-4 bg-card px-2 text-sm font-medium">
              Collaborators
            </div>
            <div className="space-y-3 mt-2">
              {['User 1', 'User 2', 'User 3'].map((user, index) => (
                <div key={user} className="flex items-center gap-3 p-2 rounded-lg hover:bg-card/80 transition-all duration-300">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold" style={{ 
                    background: index === 0 ? 'linear-gradient(135deg, #6366F1, #8B5CF6)' : 
                              index === 1 ? 'linear-gradient(135deg, #EC4899, #F43F5E)' : 
                              'linear-gradient(135deg, #10B981, #3B82F6)'
                  }}>
                    {user.charAt(0)}
                  </div>
                  <span className="text-sm font-medium">{user}</span>
                  <div className="ml-auto w-2 h-2 rounded-full bg-success"></div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative glass-panel inner-border flex-1">
            <div className="absolute -top-3 left-4 bg-card px-2 text-sm font-medium">
              Chat
            </div>
            <div className="bg-card/50 rounded-lg p-3 h-64 mb-3 overflow-y-auto mt-2 scrollbar-hide">
              <div className="space-y-3">
                {['User 1: Hello everyone!', 'User 2: Let\'s start building', 'User 3: Okay'].map((message, index) => (
                  <div key={index} className="p-2 rounded-lg bg-card/80">
                    <div className="text-sm">{message}</div>
                    <div className="text-xs text-muted-foreground mt-1">10:30 AM</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Type message..." 
                className="flex-1 px-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
              />
              <button className="btn-primary px-4 py-2 text-sm font-medium">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 底部工具栏 */}
      <footer className="glass-panel border-t border-border py-3 px-8 flex justify-center gap-4">
        {['Gesture Guide', 'Undo', 'Redo', 'Save', 'Share', 'Fullscreen'].map((item) => (
          <button 
            key={item} 
            className="btn-secondary px-4 py-2 text-sm font-medium"
          >
            {item}
          </button>
        ))}
      </footer>
    </div>
  );
}