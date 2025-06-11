// src/components/portfolio/hero-section.tsx
"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="intro"
      className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl mx-auto px-4 text-left min-h-[calc(100vh-7rem)] sm:min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-8rem)]"
    >
      <div className="px-6 pt-64">
        <div className="font-jakarta font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#dedede] mb-1 sm:mb-2 animate-fadeInUpBack leading-relaxed">
          i&apos;m adit{' '}
          <div
            className="inline-block relative cursor-pointer align-middle" // Added align-middle for better baseline
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.span
              aria-label="victory hand"
              className="inline-block"
              initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
              animate={
                isHovered
                  ? { opacity: 0, x: 25, y: 25, rotate: 20, scale: 0.5 }
                  : { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }
              }
              transition={{ type: "spring", stiffness: 200, damping: 15, duration: 0.3 }}
            >
              ✌️
            </motion.span>
            <motion.span
              className="absolute left-0 top-0 inline-block" // Positioned over the emoji spot
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.8 }}
              animate={
                isHovered
                  ? { opacity: 1, x: 0, y: 0, scale: [1, 1.05, 0.98, 1.02, 1], rotate: [0, 2, -2, 1, 0] }
                  : { opacity: 0, x: 0, y: 0, scale: 0.8 }
              }
              transition={{
                duration: 0.6,
                delay: isHovered ? 0.15 : 0, 
                ease: "easeInOut",
              }}
            >
              Hey!
            </motion.span>
          </div>
        </div>
        <p
          className="font-jakarta font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#dedede] mb-1 sm:mb-2 animate-fadeInUp leading-relaxed"
          style={{ animationDelay: '0.2s' }}
        >
          student at computer science
        </p>
        <p
          className="font-jakarta font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#dedede] mb-1 sm:mb-2 animate-fadeInUp leading-relaxed"
          style={{ animationDelay: '0.4s' }}
        >
          @scrolldown through prototypes
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
