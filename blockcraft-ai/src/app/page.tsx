import React from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeatureSection } from '@/components/landing/FeatureSection';
import { DemoPreview } from '@/components/landing/DemoPreview';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeatureSection />
      <DemoPreview />
      <footer className="bg-background-secondary py-10">
        <div className="container mx-auto px-4 text-center text-text-secondary">
          <p>BlockCraft AI © 2026</p>
        </div>
      </footer>
    </div>
  );
}