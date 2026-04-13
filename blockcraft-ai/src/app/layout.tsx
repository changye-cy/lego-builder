import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'BlockCraft AI - 3D Gesture-Building Platform',
  description: 'Build Lego-style blocks in 3D space using camera gesture recognition, with real-time multiplayer collaboration',
  keywords: ['3D building', 'gesture recognition', 'Lego', 'collaboration', 'AI', 'WebAR'],
  authors: [{ name: 'BlockCraft AI Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#6366F1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body className="min-h-screen gradient-bg text-foreground antialiased">
        {/* Decorative elements */}
        <div className="decorative-element bg-primary w-96 h-96 -top-24 -left-24"></div>
        <div className="decorative-element bg-secondary w-80 h-80 top-1/3 -right-20"></div>
        <div className="decorative-element bg-accent w-72 h-72 bottom-0 left-1/4"></div>
        
        {/* Main content */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}