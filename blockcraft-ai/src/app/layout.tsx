import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BlockCraft AI - 手势搭积木实时协作平台',
  description: '通过摄像头手势识别，在 3D 空间中搭建乐高风格积木，支持多人实时协作',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={inter.className}>
      <body className="min-h-screen bg-background-primary text-text-primary">
        {children}
      </body>
    </html>
  );
}