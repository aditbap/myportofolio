// src/components/portfolio/hero-section.tsx
"use client"; // Required for useEffect used for staggering animation
import React, { useEffect, useState } from 'react';

const nameChars = ['J', 'O', 'H', 'N', ' ', 'D', 'O', 'E'];

const HeroSection: React.FC = () => {
  const [renderAnimation, setRenderAnimation] = useState(false);

  useEffect(() => {
    // Ensure this runs only on client-side after mount for animations
    setRenderAnimation(true);
  }, []);


  return (
    <section id="intro" className="py-16 md:py-24 text-center min-h-[calc(100vh-4rem)] flex flex-col justify-center">
      <div className="mb-8">
        {renderAnimation && nameChars.map((char, index) => (
          <span
            key={index}
            className="font-headline text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-primary inline-block animate-fadeInUp"
            style={{ animationDelay: `${index * 0.07}s`, opacity: 0 }} // Initial opacity 0, animation will change it
          >
            {char === ' ' ? '\u00A0' : char} {/* Non-breaking space for ' ' */}
          </span>
        ))}
      </div>
      <div className="space-y-[-1.5rem] sm:space-y-[-2rem] md:space-y-[-3rem] mb-10">
        <p className="font-headline text-5xl sm:text-6xl md:text-8xl font-bold text-primary/80 opacity-80 tracking-tighter">JOHN DOE</p>
        <p className="font-headline text-5xl sm:text-6xl md:text-8xl font-bold text-primary/60 opacity-60 ml-2 md:ml-4 tracking-tighter">JOHN DOE</p>
        <p className="font-headline text-5xl sm:text-6xl md:text-8xl font-bold text-primary/40 opacity-40 ml-4 md:ml-8 tracking-tighter">JOHN DOE</p>
      </div>
      <h2 className="font-headline text-3xl md:text-4xl text-accent mb-6">
        Creative Full Stack Developer <span role="img" aria-label="rocket">🚀</span>
      </h2>
      <p className="font-body text-lg md:text-xl max-w-2xl mx-auto text-foreground/80">
        Hello! I'm John, a passionate developer crafting unique and performant web experiences. 
        Currently fascinated by the intersection of brutalist design principles and dynamic typography.
        Let's build something awesome together! <span role="img" aria-label="handshake">🤝</span>
      </p>
    </section>
  );
};

export default HeroSection;
