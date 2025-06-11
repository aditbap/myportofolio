'use client';

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number; // Stagger delay between elements (chars, words, lines) in milliseconds
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: React.CSSProperties["textAlign"];
  onAnimationComplete?: () => void; // Changed prop name for clarity
  staggerDelay?: number; // Overall delay before the animation for this instance starts (not used by current component)
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 30, // Default stagger delay between characters
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "left", // Defaulting to left for portfolio
  onAnimationComplete,
}) => {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Ensure GSAPSplitText is available (it might not be in free GSAP)
    if (!GSAPSplitText) {
      console.warn("GSAP SplitText plugin is not available. Animation will not run.");
      el.textContent = text; // Show text normally if plugin is missing
      return;
    }
    
    const timeoutId = setTimeout(() => {
      if (!ref.current) return; // Check if component is still mounted

      const absoluteLines = splitType === "lines";
      if (absoluteLines) el.style.position = "relative";

      const splitter = new GSAPSplitText(el, {
        type: splitType,
        absolute: absoluteLines,
        linesClass: "split-line",
      });

      let targets: Element[];
      switch (splitType) {
        case "lines":
          targets = splitter.lines;
          break;
        case "words":
          targets = splitter.words;
          break;
        case "words, chars":
          targets = [...splitter.words, ...splitter.chars];
          break;
        default: // chars
          targets = splitter.chars;
      }

      targets.forEach((t) => {
        (t as HTMLElement).style.willChange = "transform, opacity";
      });

      const startPct = (1 - threshold) * 100;
      const m = /^(-?\d+)px$/.exec(rootMargin);
      const raw = m ? parseInt(m[1], 10) : 0;
      const sign = raw < 0 ? `-=${Math.abs(raw)}px` : `+=${raw}px`;
      const start = `top ${startPct}%${sign}`;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
          once: true,
        },
        smoothChildTiming: true,
        onComplete: onAnimationComplete,
      });

      tl.set(targets, { ...from, immediateRender: false, force3D: true });
      tl.to(targets, {
        ...to,
        duration,
        ease,
        stagger: delay / 1000, // Convert ms to seconds for GSAP stagger
        force3D: true,
      });

      return () => {
        tl.kill();
        // Check if splitter and ScrollTrigger are defined before trying to use them
        if (splitter && typeof splitter.revert === 'function') {
          splitter.revert();
        }
        ScrollTrigger.getAll().forEach((instance) => instance.kill());
        gsap.killTweensOf(targets);
      };
    }, 0); // Delay execution slightly to allow DOM to settle

    return () => {
      clearTimeout(timeoutId);
      // Cleanup logic from GSAP timeline will be handled by its return function
    };
  }, [
    text,
    delay,
    duration,
    ease,
    splitType,
    from,
    to,
    threshold,
    rootMargin,
    onAnimationComplete,
    textAlign // Added textAlign to dependency array
  ]);

  return (
    <p
      ref={ref}
      className={`split-parent overflow-hidden ${className}`} // Removed inline-block, whitespace-normal
      style={{
        textAlign,
        // wordWrap: "break-word", // This can be handled by Tailwind's `break-words` if needed
        display: 'block', // Ensure it behaves like a block element
      }}
    >
      {text}
    </p>
  );
};

export default SplitText;
