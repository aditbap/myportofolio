
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
  onAnimationComplete?: () => void;
  staggerDelay?: number;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 30,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "0px", 
  textAlign = "left",
  onAnimationComplete,
}) => {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!GSAPSplitText) {
      console.warn("GSAP SplitText plugin is not available. Animation will not run.");
      el.textContent = text;
      return;
    }
    
    let animationFrameId: number;
    const timeoutId = setTimeout(() => {
      animationFrameId = requestAnimationFrame(() => {
        if (!ref.current) return;

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

        const start = `top bottom${parseInt(rootMargin) >= 0 ? '+' : '-'}=${Math.abs(parseInt(rootMargin))}px`;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: start,
            toggleActions: "play reverse play reverse", // Play on enter, reverse on leave (both directions)
            // markers: true, // For debugging
          },
          smoothChildTiming: true,
          onComplete: onAnimationComplete,
        });

        tl.set(targets, { ...from, immediateRender: false, force3D: true });
        tl.to(targets, {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          force3D: true,
        });

        const createdTimeline = tl;
        const createdScrollTrigger = tl.scrollTrigger;
        const createdSplitter = splitter;

        (el as any)._gsapCleanup = () => {
          createdTimeline.kill();
          if (createdScrollTrigger) {
            createdScrollTrigger.kill();
          }
          if (createdSplitter && typeof createdSplitter.revert === 'function') {
            createdSplitter.revert();
          }
        };
      });
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
      if ((el as any)._gsapCleanup) {
        (el as any)._gsapCleanup();
        delete (el as any)._gsapCleanup;
      }
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
    textAlign
  ]);

  return (
    <p
      ref={ref}
      className={`split-parent ${className}`}
      style={{
        textAlign,
        display: 'block',
      }}
    >
      {text}
    </p>
  );
};

export default SplitText;
