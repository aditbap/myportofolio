
// src/components/portfolio/hero-section.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import SplitText from '@/components/effects/SplitText';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const textStyle = "font-jakarta font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#dedede] leading-relaxed";
  const lineWrapperStyle = "mb-1 sm:mb-2"; 

  const firstLineContainerRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLSpanElement>(null);

  const commonSplitTextFrom = { opacity: 0, y: 30, scale: 0.8, rotateX: -45 };
  const commonSplitTextTo = { opacity: 1, y: 0, scale: 1, rotateX: 0 };
  const commonSplitTextDuration = 0.5;
  const commonSplitTextEase = "power2.out";

  useEffect(() => {
    let emojiScrollTrigger: ScrollTrigger | undefined;

    if (firstLineContainerRef.current && emojiRef.current) {
      gsap.set(emojiRef.current, commonSplitTextFrom); // Set initial state for animation consistency

      emojiScrollTrigger = ScrollTrigger.create({
        trigger: firstLineContainerRef.current,
        start: "top bottom", 
        end: "bottom top", // So onLeave and onEnterBack trigger correctly
        // markers: true, // for debugging
        onEnter: () => {
          gsap.to(emojiRef.current, {
            ...commonSplitTextTo,
            duration: commonSplitTextDuration,
            ease: commonSplitTextEase,
          });
        },
        onLeave: () => { // When scrolling down, element leaves viewport top
          gsap.to(emojiRef.current, {
            ...commonSplitTextFrom,
            duration: commonSplitTextDuration,
            ease: "power2.in",
          });
        },
        onEnterBack: () => { // When scrolling up, element re-enters viewport top
           gsap.to(emojiRef.current, {
            ...commonSplitTextTo,
            duration: commonSplitTextDuration,
            ease: commonSplitTextEase,
          });
        },
        onLeaveBack: () => { // When scrolling up, element leaves viewport bottom
          gsap.to(emojiRef.current, {
            ...commonSplitTextFrom,
            duration: commonSplitTextDuration,
            ease: "power2.in",
          });
        },
      });
    }
    
    return () => {
      if (emojiScrollTrigger) {
        emojiScrollTrigger.kill();
      }
      gsap.killTweensOf(emojiRef.current); 
    };
  }, []); 

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
            className={textStyle} 
            delay={30}
            duration={commonSplitTextDuration}
            ease={commonSplitTextEase}
            splitType="chars"
            from={commonSplitTextFrom}
            to={commonSplitTextTo}
            textAlign="left"
            onAnimationComplete={handleFirstLineComplete}
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
            rootMargin="-150px" 
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
            rootMargin="-200px" 
            onAnimationComplete={handleThirdLineComplete}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
