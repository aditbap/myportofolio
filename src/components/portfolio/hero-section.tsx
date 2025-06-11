// src/components/portfolio/hero-section.tsx
'use client'; // Required because SplitText is a client component with hooks

import React from 'react';
import SplitText from '@/components/effects/SplitText'; // Adjusted path

const HeroSection: React.FC = () => {
  // Definisikan gaya teks dan wrapper baris secara terpisah
  const textStyle = "font-jakarta font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#dedede] leading-relaxed";
  const lineWrapperStyle = "mb-1 sm:mb-2";

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
        <div className={`flex items-baseline ${lineWrapperStyle}`}>
          <SplitText
            text="i'm adit "
            className={textStyle}
            delay={30} 
            duration={0.5}
            ease="power2.out"
            splitType="chars"
            from={{ opacity: 0, y: 30, scale: 0.8, rotateX: -45 }}
            to={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            textAlign="left"
            onAnimationComplete={handleFirstLineComplete}
          />
          <span className={`${textStyle} ml-1 sm:ml-2 hover:animate-wobble inline-block cursor-pointer`}>
            ✌️
          </span>
        </div>
        
        <div className={lineWrapperStyle}>
          <SplitText
            text="student at computer science"
            className={textStyle}
            delay={30}
            duration={0.5}
            ease="power2.out"
            splitType="chars"
            from={{ opacity: 0, y: 30, scale: 0.8, rotateX: -45 }}
            to={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            textAlign="left"
            rootMargin="-150px" 
            onAnimationComplete={handleSecondLineComplete}
          />
        </div>

        <div className={lineWrapperStyle}>
          <SplitText
            text="@scrolldown through prototypes"
            className={textStyle}
            delay={30}
            duration={0.5}
            ease="power2.out"
            splitType="chars"
            from={{ opacity: 0, y: 30, scale: 0.8, rotateX: -45 }}
            to={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            textAlign="left"
            rootMargin="-200px" 
            onAnimationComplete={handleThirdLineComplete}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
