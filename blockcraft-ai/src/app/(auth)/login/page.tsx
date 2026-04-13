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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background-primary to-background-secondary">
      <div className="glass-panel p-8 md:p-12 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">登录</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">邮箱</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-background-tertiary border border-border-default rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">密码</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-background-tertiary border border-border-default rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-accent-primary text-white rounded-md hover:bg-accent-secondary transition-colors"
          >
            登录
          </button>
          <div className="text-center text-sm text-text-secondary">
            还没有账号？ <a href="/signup" className="text-accent-primary hover:underline">注册</a>
          </div>
        </form>
      </div>
    </div>
  );
}