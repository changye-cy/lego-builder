'use client';
import React, { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 登录逻辑
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Decorative elements */}
      <div className="decorative-element bg-primary w-80 h-80 -top-40 -left-40"></div>
      <div className="decorative-element bg-secondary w-96 h-96 -bottom-40 -right-40"></div>
      
      <div className="glass-panel p-8 md:p-12 w-full max-w-md relative z-10 animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <div className="text-4xl mb-3">🧱</div>
          <h1 className="text-2xl font-bold gradient-text text-shadow">Welcome Back</h1>
          <p className="text-muted-foreground mt-2 text-center">Sign in to your BlockCraft AI account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="inner-border">
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
              placeholder="your.email@example.com"
              required
            />
          </div>
          
          <div className="inner-border">
            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
              placeholder="••••••••"
              required
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border border-border bg-card focus:ring-primary/50"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-muted-foreground">Remember me</label>
            </div>
            <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
          </div>
          
          <button
            type="submit"
            className="btn-primary w-full py-3 text-sm font-semibold"
          >
            Sign In
          </button>
          
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account? <a href="/signup" className="text-primary hover:underline">Sign Up</a>
          </div>
        </form>
      </div>
    </div>
  );
}