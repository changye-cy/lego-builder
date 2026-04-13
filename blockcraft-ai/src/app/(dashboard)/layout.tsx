import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background-primary">
      <header className="glass-panel sticky top-0 z-10 py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="text-2xl">🧱</div>
          <h1 className="text-xl font-bold">BlockCraft AI</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="glass-button px-4 py-2 rounded-md">
            创建项目
          </button>
          <div className="w-8 h-8 rounded-full bg-accent-primary flex items-center justify-center">
            <span className="text-sm font-semibold">U</span>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}