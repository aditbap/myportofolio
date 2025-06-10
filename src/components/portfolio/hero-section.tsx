// src/components/portfolio/hero-section.tsx
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section 
      id="intro" 
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col justify-center items-start text-left min-h-[calc(80vh-8rem)]" // Adjusted min-height and padding
    >
      <div className="space-y-2 md:space-y-3">
        <h1 className="font-jakarta text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">
          i'm rocky <span role="img" aria-label="victory hand">✌️</span>
        </h1>
        <p className="font-jakarta text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">
          product designer unfolding stories
        </p>
        <p className="font-jakarta text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">
          @instagram through prototypes
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
