// src/components/portfolio/hero-section.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const HeroSection: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const emojiControls = useAnimation();
  const textControls = useAnimation();

  useEffect(() => {
    if (isHovered) {
      // Step 1: Emoji animates
      emojiControls.start({
        y: [-20, 0], // Adjusted to animate from slightly above to current position
        x: [0, 10],   // Slight move to the right
        rotate: [0, 15, -5, 0], // Adjusted rotation
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      }).then(() => {
        // Step 2: Text "Hey!" fades and slides in
        textControls.start({
          y: [10, 0],
          opacity: [0, 1],
          transition: {
            duration: 0.4,
            ease: "easeOut",
            delay: 0.1, // Slight delay for text to appear after emoji's initial move
          },
        });

        // Step 3: Wobble emoji (concurrently or slightly after text appears)
        emojiControls.start({
          rotate: [0, -8, 8, -5, 5, -2, 2, 0],
          transition: {
            duration: 0.5,
            ease: "easeInOut",
            delay: 0.2, // Delay wobble slightly
          },
        });
      });
    } else {
      // Reset state if not hovered
      emojiControls.start({ 
        x: 0, 
        y: 0, 
        rotate: 0,
        transition: { duration: 0.3, ease: "easeOut" }
      });
      textControls.start({ 
        opacity: 0, 
        y: 10,
        transition: { duration: 0.2, ease: "easeOut" }
      });
    }
  }, [isHovered, emojiControls, textControls]);

  return (
    <section
      id="intro"
      className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl mx-auto px-4 text-left min-h-[calc(100vh-7rem)] sm:min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-8rem)]"
    >
      <div className="px-6 pt-64">
        <div className="font-jakarta font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#dedede] mb-1 sm:mb-2 animate-fadeInUpBack leading-relaxed">
          i&apos;m adit{' '}
          <div
            className="inline-block relative cursor-pointer align-middle"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.span
              aria-label="victory hand"
              className="inline-block"
              animate={emojiControls}
              initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            >
              ✌️
            </motion.span>
            <motion.span
              className="absolute left-full top-1/2 -translate-y-1/2 ml-1 inline-block whitespace-nowrap" // Positioned to the right of the emoji
              animate={textControls}
              initial={{ opacity: 0, y: 10 }} // Starts slightly below and invisible
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
