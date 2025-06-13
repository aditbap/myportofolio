
// src/components/portfolio/hero-section.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import SplitText from '@/components/effects/SplitText';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const textStyle = "font-jakarta font-extrabold text-3xl sm:text-4xl md:text-5xl text-foreground leading-relaxed";
  const lineWrapperStyle = "mb-1 sm:mb-2";

  const firstLineContainerRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLSpanElement>(null);

  const commonSplitTextFrom = { opacity: 0, y: 30, scale: 0.8, rotateX: -45 };
  const commonSplitTextTo = { opacity: 1, y: 0, scale: 1, rotateX: 0 };
  const commonSplitTextDuration = 2;
  const commonSplitTextEase = "elastic.out(1,0.3)";

  const firstLineDelay = 30;
  const secondLineDelay = 20;
  const thirdLineDelay = 15;

  useEffect(() => {
    let emojiScrollTrigger: ScrollTrigger | undefined;

    if (firstLineContainerRef.current && emojiRef.current) {
      gsap.set(emojiRef.current, commonSplitTextFrom);

      emojiScrollTrigger = ScrollTrigger.create({
        trigger: firstLineContainerRef.current,
        start: "top bottom-=-350px",
        end: "bottom top+=-350px",
        // markers: true,
        onEnter: () => {
          gsap.to(emojiRef.current, {
            ...commonSplitTextTo,
            duration: commonSplitTextDuration,
            ease: commonSplitTextEase,
          });
        },
        onLeave: () => {
          gsap.to(emojiRef.current, {
            ...commonSplitTextFrom,
            duration: commonSplitTextDuration,
            ease: "elastic.out(1,0.3)",
          });
        },
        onEnterBack: () => {
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
            ease: "elastic.out(1,0.3)",
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
      className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl mx-auto px-4 text-left min-h-[calc(100vh-15rem)] sm:min-h-[calc(100vh-16rem)] md:min-h-[calc(100vh-16rem)]"
    >
      <div className="px-6 pt-64">
        {/* Line 1 */}
        <div ref={firstLineContainerRef} className={cn(`flex items-baseline`, lineWrapperStyle)}>
          <SplitText
            text="i'm adit "
            className={textStyle}
            delay={firstLineDelay}
            duration={commonSplitTextDuration}
            ease={commonSplitTextEase}
            splitType="chars"
            from={commonSplitTextFrom}
            to={commonSplitTextTo}
            textAlign="left"
            rootMargin="-50px"
            onAnimationComplete={handleFirstLineComplete}
          />
          <span ref={emojiRef} className={cn(textStyle, "ml-1 sm:ml-2 hover:animate-wobble inline-block cursor-pointer")}>
            ✌️
          </span>
        </div>
        
        {/* Line 2 */}
        <div className={lineWrapperStyle}>
          <SplitText
            text="computer science student"
            className={textStyle}
            delay={secondLineDelay}
            duration={commonSplitTextDuration}
            ease={commonSplitTextEase}
            splitType="chars"
            from={commonSplitTextFrom}
            to={commonSplitTextTo}
            textAlign="left"
            rootMargin="-100px"
            onAnimationComplete={handleSecondLineComplete}
          />
        </div>

        {/* Line 3 */}
        <div className={lineWrapperStyle}>
          <a href="#projects" className="inline-block text-inherit no-underline hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
            <SplitText
              text="@scrolldown through prototypes"
              className={textStyle}
              delay={thirdLineDelay}
              duration={commonSplitTextDuration}
              ease={commonSplitTextEase}
              splitType="chars"
              from={commonSplitTextFrom}
              to={commonSplitTextTo}
              textAlign="left"
              rootMargin="-150px"
              onAnimationComplete={handleThirdLineComplete}
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
