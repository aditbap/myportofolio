// src/components/portfolio/hero-section.tsx
'use client'; // Required because SplitText is a client component with hooks

import React from 'react';
import SplitText from '@/components/effects/SplitText'; // Adjusted path

const HeroSection: React.FC = () => {
  const commonClassName = "font-jakarta font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#dedede] mb-1 sm:mb-2 leading-relaxed";

  const handleFirstLineComplete = () => {
    // console.log('First line animation complete!');
  };
  const handleSecondLineComplete = () => {
    // console.log('Second line animation complete!');
  };
  const handleThirdLineComplete = () => {
    // console.log('Third line (all) animation complete!');
  };

  return (
    <section
      id="intro"
      className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl mx-auto px-4 text-left min-h-[calc(100vh-7rem)] sm:min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-8rem)]"
    >
      <div className="px-6 pt-64">
        <SplitText
          text="i'm adit ✌️"
          className={commonClassName}
          delay={10} // Stagger between characters in ms
          duration={1.7}
          ease="elastic.out(1,0.3)"
          splitType="chars"
          from={{ opacity: 0, y: 40, scale: 0.8, rotateX: -45 }}
          to={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          textAlign="left"
          onAnimationComplete={handleFirstLineComplete}
        />
        <SplitText
          text="student at computer science"
          className={commonClassName}
          delay={10}
          duration={1.7}
          ease="elastic.out(1,0.3)"
          splitType="chars"
          from={{ opacity: 0, y: 40, scale: 0.8, rotateX: -45 }}
          to={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          textAlign="left"
          rootMargin="-150px" // Trigger a bit later
          onAnimationComplete={handleSecondLineComplete}
        />
        <SplitText
          text="@scrolldown through prototypes"
          className={commonClassName}
          delay={10}
          duration={1.7}
          ease="elastic.out(1,0.3)"
          splitType="chars"
          from={{ opacity: 0, y: 40, scale: 0.8, rotateX: -45 }}
          to={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          textAlign="left"
          rootMargin="-200px" // Trigger even later
          onAnimationComplete={handleThirdLineComplete}
        />
      </div>
    </section>
  );
};

export default HeroSection;
