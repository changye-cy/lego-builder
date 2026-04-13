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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* 顶部导航栏 */}
      <header className="bg-gray-800/80 backdrop-blur-lg border-b border-gray-700 py-3 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="text-xl">🧱</div>
          <h1 className="font-bold">BlockCraft AI</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 px-3 py-1 rounded-md text-sm">
            保存
          </button>
          <button className="bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 px-3 py-1 rounded-md text-sm">
            分享
          </button>
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
            <span className="text-sm font-semibold">U</span>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧面板 */}
        <div className="w-64 bg-gray-800/80 backdrop-blur-lg border-r border-gray-700 p-4 flex flex-col gap-6">
          <div>
            <h3 className="font-semibold mb-3 text-gray-200">积木类型</h3>
            <div className="grid grid-cols-2 gap-2">
              {['1x1', '1x2', '2x2', '2x4', 'plate-1x2', 'plate-2x4'].map((type) => (
                <button 
                  key={type} 
                  className={`bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 p-2 rounded-md text-center text-sm ${currentBrickType === type ? 'bg-indigo-600 text-white' : ''}`}
                  onClick={() => setCurrentBrickType(type as any)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-gray-200">颜色</h3>
            <div className="grid grid-cols-5 gap-2">
              {['#E3000B', '#0057A8', '#00852B', '#FFD700', '#FF6600', '#FFFFFF', '#1B2A34', '#A5499B', '#00BCD4', '#795548'].map((color) => (
                <button 
                  key={color} 
                  className={`w-8 h-8 rounded-md border-2 ${currentBrickColor === color ? 'border-white' : 'border-transparent hover:border-white'}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setCurrentBrickColor(color as any)}
                />
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-gray-200">工具</h3>
            <div className="flex flex-col gap-2">
              {['撤销', '重做', '删除', '清空'].map((tool) => (
                <button key={tool} className="bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 p-2 rounded-md text-center text-sm">
                  {tool}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 中间 3D 画布 */}
        <div className="flex-1 relative">
          {/* 摄像头预览窗口（左上角） */}
          <div className="absolute top-4 left-4 bg-gray-800/80 backdrop-blur-lg border border-gray-700 p-2 rounded-lg z-10">
            <CameraFeed onResults={setHandTrackingResult} />
          </div>
          <BuilderCanvas handTrackingResult={handTrackingResult} />
        </div>

        {/* 右侧面板 */}
        <div className="w-64 bg-gray-800/80 backdrop-blur-lg border-l border-gray-700 p-4 flex flex-col gap-6">
          <div>
            <h3 className="font-semibold mb-3 text-gray-200">协作者</h3>
            <div className="space-y-2">
              {['用户1', '用户2', '用户3'].map((user) => (
                <div key={user} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs">
                    {user.charAt(0)}
                  </div>
                  <span className="text-sm text-gray-200">{user}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-3 text-gray-200">聊天</h3>
            <div className="bg-gray-700 rounded-md p-2 h-48 mb-2 overflow-y-auto">
              <div className="space-y-2">
                {['用户1: 大家好！', '用户2: 开始搭建吧', '用户3: 好的'].map((message, index) => (
                  <div key={index} className="text-sm text-gray-300">{message}</div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <input type="text" placeholder="输入消息..." className="flex-1 px-3 py-1 bg-gray-700 border border-gray-600 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-600 text-white" />
              <button className="px-3 py-1 bg-indigo-600 rounded-md text-sm">发送</button>
            </div>
          </div>
        </div>
      </div>

      {/* 底部工具栏 */}
      <footer className="bg-gray-800/80 backdrop-blur-lg border-t border-gray-700 py-2 px-6 flex justify-center gap-4">
        {['手势指南', '撤销', '重做', '保存', '分享', '全屏'].map((item) => (
          <button key={item} className="bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 px-3 py-1 rounded-md text-sm">
            {item}
          </button>
        ))}
      </footer>
    </div>
  );
}