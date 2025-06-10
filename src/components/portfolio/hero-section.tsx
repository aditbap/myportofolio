// src/components/portfolio/hero-section.tsx
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section 
      id="intro" 
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col justify-center items-start text-left min-h-[calc(100vh-12rem)] md:min-h-[calc(100vh-15rem)]" // Adjusted min-height
    >
      <div className="max-w-3xl"> {/* Added max-width for text block */}
        <h1 className="font-jakarta text-4xl sm:text-5xl md:text-6xl text-foreground mb-3 sm:mb-4 animate-fadeInUp">
          i&apos;m rocky <span role="img" aria-label="waving hand">👋</span>
        </h1>
        <p className="font-jakarta text-5xl sm:text-6xl md:text-8xl font-bold text-foreground mb-3 sm:mb-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          product designer unfolding stories
        </p>
        <p className="font-jakarta text-3xl sm:text-4xl md:text-5xl text-foreground/80 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          @instagram through prototypes
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
