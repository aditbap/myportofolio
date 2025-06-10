// src/components/portfolio/hero-section.tsx
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section
      id="intro"
      className="container mx-auto px-4 sm:px-6 lg:px-8 text-left min-h-[calc(100vh-7rem)] sm:min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-8rem)]"
    >
      <div className="max-w-3xl"> {/* Ensure this div allows text to align under navbar based on main's padding */}
        <h1 className="font-jakarta font-extrabold text-3xl sm:text-4xl md:text-4xl text-foreground mb-1 sm:mb-2 animate-fadeInUp">
          i&apos;m rocky <span role="img" aria-label="victory hand">✌️</span>
        </h1>
        <p className="font-jakarta font-extrabold text-4xl sm:text-5xl md:text-6xl text-foreground mb-1 sm:mb-2 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          product designer unfolding stories
        </p>
        <p className="font-jakarta font-extrabold text-2xl sm:text-3xl md:text-3xl text-foreground animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          @instagram through prototypes
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
