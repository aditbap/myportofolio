
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
  threshold?: number; // Deprecated in favor of rootMargin or direct scrollTrigger props
  rootMargin?: string; // Controls start for non-scrub, or part of start for scrub
  textAlign?: React.CSSProperties["textAlign"];
  onAnimationComplete?: () => void;
  staggerDelay?: number; // Alternative prop name for delay, if needed. Use 'delay'.
  scrub?: boolean | number;
  scrollStart?: string; // More direct control over ScrollTrigger start
  scrollEnd?: string; // More direct control over ScrollTrigger end
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 30, // Stagger delay in ms
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  rootMargin = "0px",
  textAlign = "left",
  onAnimationComplete,
  scrub = false,
  scrollStart, // If provided, overrides rootMargin-based start
  scrollEnd = "bottom center", // Default for scrub animations
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

        const defaultStart = `top bottom${parseInt(rootMargin) >= 0 ? '+' : '-'}=${Math.abs(parseInt(rootMargin))}px`;
        const stStart = scrollStart || defaultStart;

        const scrollTriggerConfig: gsap.DOMTarget | ScrollTrigger.Vars = {
          trigger: el,
          start: stStart,
        };

        if (scrub || typeof scrub === 'number') {
          scrollTriggerConfig.scrub = scrub;
          scrollTriggerConfig.end = scrollEnd;
        } else {
          scrollTriggerConfig.toggleActions = "play reverse play reverse";
        }
        // scrollTriggerConfig.markers = true; // For debugging

        const tl = gsap.timeline({
          scrollTrigger: scrollTriggerConfig,
          smoothChildTiming: true,
          onComplete: onAnimationComplete,
        });

        tl.set(targets, { ...from, immediateRender: false, force3D: true });
        tl.to(targets, {
          ...to,
          duration,
          ease,
          stagger: delay / 1000, // GSAP stagger is in seconds
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
    }, 0); // End setTimeout

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
    rootMargin, // Keep as dependency for defaultStart
    scrollStart,
    scrollEnd,
    scrub,
    onAnimationComplete,
    textAlign
  ]);

  return (
    <p
      ref={ref}
      className={`split-parent ${className}`}
      style={{
        textAlign,
        display: 'block', // Ensure it behaves as a block for layout
        // overflow: 'hidden', // Optional: if characters might briefly exceed bounds before animation
      }}
    >
      {text}
    </p>
  );
};

export default SplitText;
