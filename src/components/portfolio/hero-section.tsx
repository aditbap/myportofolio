// src/components/portfolio/hero-section.tsx
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section
      id="intro"
      className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl mx-auto px-4 text-left min-h-[calc(100vh-7rem)] sm:min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-8rem)]"
    >
      <div className="px-6 pt-16"> {/* Added pt-16 here */}
        <p className="font-jakarta font-extrabold text-2xl sm:text-3xl md:text-4xl text-foreground mb-1 sm:mb-2 animate-fadeInUp">
          i&apos;m adit <span role="img" aria-label="victory hand">✌️</span>
        </p>
        <p 
          className="font-jakarta font-extrabold text-3xl sm:text-5xl md:text-6xl text-foreground mb-1 sm:mb-2 animate-fadeInUp" 
          style={{ animationDelay: '0.2s' }}
        >
          student at computer science @scrolldown through prototypes
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
