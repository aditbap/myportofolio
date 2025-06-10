// src/components/portfolio/hero-section.tsx
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section
      id="intro"
      className="container mx-auto px-4 sm:px-6 lg:px-8 text-left min-h-[calc(100vh-7rem)] sm:min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-8rem)]"
    >
      <div className="max-w-3xl"> {/* Removed pt-16 */}
        <h1 className="font-jakarta text-3xl sm:text-4xl md:text-4xl text-foreground mb-1 sm:mb-2 animate-fadeInUp">
          i&apos;m rocky <span role="img" aria-label="victory hand">✌️</span>
        </h1>
        <p className="font-jakarta text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-1 sm:mb-2 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          product designer unfolding stories
        </p>
        <p className="font-jakarta text-2xl sm:text-3xl md:text-3xl text-foreground/80 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          @instagram through prototypes
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
