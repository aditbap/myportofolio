// src/components/portfolio/hero-section.tsx
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section
      id="intro"
      className="container mx-auto px-4 sm:px-6 lg:px-8 text-left min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-9rem)] md:min-h-[calc(100vh-10rem)]"
    >
      <div className="max-w-3xl pt-16"> {/* Added pt-16, removed flex from parent section */}
        <h1 className="font-jakarta text-4xl sm:text-5xl md:text-6xl text-foreground mb-1 sm:mb-2 animate-fadeInUp">
          i&apos;m rocky <span role="img" aria-label="victory hand">✌️</span>
        </h1>
        <p className="font-jakarta text-5xl sm:text-6xl md:text-8xl font-bold text-foreground mb-1 sm:mb-2 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
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
