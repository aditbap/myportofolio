
// src/components/portfolio/hero-section.tsx
'use client';

import React, { useEffect, useRef } from 'react'; // Added useEffect, useRef
import SplitText from '@/components/effects/SplitText';
import { gsap } from 'gsap'; // Import gsap
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger

gsap.registerPlugin(ScrollTrigger); // Register plugin

const HeroSection: React.FC = () => {
  const textStyle = "font-jakarta font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#dedede] leading-relaxed";
  const lineWrapperStyle = "mb-1 sm:mb-2"; // Applies to the div wrapping SplitText and emoji

  const firstLineContainerRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLSpanElement>(null);

  const commonSplitTextFrom = { opacity: 0, y: 30, scale: 0.8, rotateX: -45 };
  const commonSplitTextTo = { opacity: 1, y: 0, scale: 1, rotateX: 0 };
  const commonSplitTextDuration = 0.5;
  const commonSplitTextEase = "power2.out";

  useEffect(() => {
    // GSAP animation for the emoji on the first line
    if (firstLineContainerRef.current && emojiRef.current) {
      // Ensure initial state for emoji (important for reverse animation)
      gsap.set(emojiRef.current, commonSplitTextTo);

      ScrollTrigger.create({
        trigger: firstLineContainerRef.current,
        start: "top bottom", // When the top of the line hits the bottom of the viewport
        // markers: true, // for debugging
        onEnter: () => {
          gsap.to(emojiRef.current, {
            ...commonSplitTextTo,
            duration: commonSplitTextDuration,
            ease: commonSplitTextEase,
          });
        },
        onLeaveBack: () => {
          gsap.to(emojiRef.current, {
            ...commonSplitTextFrom,
            duration: commonSplitTextDuration,
            ease: "power2.in", // Ease in for out-animation
          });
        },
      });
    }
    
    // Cleanup for ScrollTriggers created in this component
    return () => {
      // Kill ScrollTriggers associated with firstLineContainerRef to avoid memory leaks
      const triggers = ScrollTrigger.getAll();
      triggers.forEach(trigger => {
        if (trigger.trigger === firstLineContainerRef.current) {
          trigger.kill();
        }
      });
      gsap.killTweensOf(emojiRef.current); // Kill any active tweens on the emoji
    };
  }, []); // Empty dependency array, runs once on mount

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
        {/* Line 1 */}
        <div ref={firstLineContainerRef} className={`flex items-baseline ${lineWrapperStyle}`}>
          <SplitText
            text="i'm adit "
            className={textStyle} // Apply base style to SplitText's <p>
            delay={30}
            duration={commonSplitTextDuration}
            ease={commonSplitTextEase}
            splitType="chars"
            from={commonSplitTextFrom}
            to={commonSplitTextTo}
            textAlign="left"
            onAnimationComplete={handleFirstLineComplete}
            // rootMargin for SplitText is relative to its own trigger.
            // Default rootMargin in SplitText is "0px" (top bottom)
          />
          <span ref={emojiRef} className={`${textStyle} ml-1 sm:ml-2 hover:animate-wobble inline-block cursor-pointer`}>
            ✌️
          </span>
        </div>
        
        {/* Line 2 */}
        <div className={lineWrapperStyle}>
          <SplitText
            text="student at computer science"
            className={textStyle}
            delay={30}
            duration={commonSplitTextDuration}
            ease={commonSplitTextEase}
            splitType="chars"
            from={commonSplitTextFrom}
            to={commonSplitTextTo}
            textAlign="left"
            rootMargin="-150px" // Start animation 150px later
            onAnimationComplete={handleSecondLineComplete}
          />
        </div>

        {/* Line 3 */}
        <div className={lineWrapperStyle}>
          <SplitText
            text="@scrolldown through prototypes"
            className={textStyle}
            delay={30}
            duration={commonSplitTextDuration}
            ease={commonSplitTextEase}
            splitType="chars"
            from={commonSplitTextFrom}
            to={commonSplitTextTo}
            textAlign="left"
            rootMargin="-200px" // Start animation 200px later
            onAnimationComplete={handleThirdLineComplete}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
