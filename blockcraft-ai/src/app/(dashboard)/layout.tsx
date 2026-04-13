import React from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleCreateProject = () => {
    const roomId = Math.random().toString(36).substring(2, 15);
    router.push(`/builder/${roomId}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative elements */}
      <div className="decorative-element bg-primary w-[400px] h-[400px] -top-40 -left-40"></div>
      <div className="decorative-element bg-secondary w-[300px] h-[300px] -bottom-40 -right-40"></div>
      
      <header className="glass-panel sticky top-0 z-50 py-4 px-6 flex justify-between items-center border-b border-border">
        <div className="flex items-center gap-3">
          <div className="text-2xl">🧱</div>
          <h1 className="text-xl font-bold gradient-text">BlockCraft AI</h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            className="btn-secondary px-4 py-2 text-sm font-medium rounded-lg"
            onClick={handleCreateProject}
          >
            New Project
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-sm font-semibold">U</span>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-12 relative z-10">
        {children}
      </main>
    </div>
  );
}