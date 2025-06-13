// src/components/portfolio/tech-stack-section.tsx
'use client';

import React, { useRef, useCallback, useEffect } from 'react';
import { Layers, Database, Wind, Brain, Code } from 'lucide-react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

const technologies = [
  { name: "Next.js", icon: <Layers className="h-4 w-4 mr-2 text-foreground/70" /> },
  { name: "React", icon: <Layers className="h-4 w-4 mr-2 text-foreground/70" /> },
  { name: "TypeScript", icon: <Code className="h-4 w-4 mr-2 text-foreground/70" /> },
  { name: "Tailwind CSS", icon: <Wind className="h-4 w-4 mr-2 text-foreground/70" /> },
  { name: "Framer Motion", icon: <Wind className="h-4 w-4 mr-2 text-foreground/70" /> },
  { name: "GSAP", icon: <Wind className="h-4 w-4 mr-2 text-foreground/70" /> },
  { name: "Shadcn UI", icon: <Layers className="h-4 w-4 mr-2 text-foreground/70" /> },
  { name: "Genkit", icon: <Brain className="h-4 w-4 mr-2 text-foreground/70" /> },
  { name: "Firebase", icon: <Database className="h-4 w-4 mr-2 text-foreground/70" /> },
  { name: "Node.js", icon: <Code className="h-4 w-4 mr-2 text-foreground/70" /> },
  { name: "PostgreSQL", icon: <Database className="h-4 w-4 mr-2 text-foreground/70" /> }
];

const TechStackSection: React.FC = () => {
  const renderTechItem = (tech: { name: string; icon: JSX.Element }, keyPrefix: string = "") => (
    <li
      key={`${keyPrefix}${tech.name}`}
      className="flex items-center font-code text-xs sm:text-sm text-foreground bg-card p-2 px-3 rounded-lg shadow-sm border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300 cursor-default"
    >
      {React.cloneElement(tech.icon, { className: "h-4 w-4 mr-2 text-foreground/70 flex-shrink-0" })}
      <span className="whitespace-nowrap">{tech.name}</span>
    </li>
  );

  const scrollContainerRef = useRef<HTMLDivElement>(null); 
  const contentWrapperRef = useRef<HTMLDivElement>(null); 

  const isDraggingRef = useRef(false);
  const startXMouseRef = useRef(0); 
  const startTranslateXContentRef = useRef(0); 

  const animationFrameIdRef = useRef<number | null>(null);
  const currentTranslateXRef = useRef(0); 
  const autoScrollSpeed = -0.5; 

  const performAutoScrollStep = useCallback(() => {
    if (!contentWrapperRef.current || !contentWrapperRef.current.children[0]) {
      animationFrameIdRef.current = requestAnimationFrame(performAutoScrollStep);
      return;
    }
    
    const singleListWidth = (contentWrapperRef.current.children[0] as HTMLElement).offsetWidth;
    if (singleListWidth === 0) { 
      animationFrameIdRef.current = requestAnimationFrame(performAutoScrollStep);
      return;
    }

    currentTranslateXRef.current += autoScrollSpeed;

    if (currentTranslateXRef.current <= -singleListWidth) {
      currentTranslateXRef.current += singleListWidth; 
    }
    gsap.set(contentWrapperRef.current, { x: currentTranslateXRef.current });
    animationFrameIdRef.current = requestAnimationFrame(performAutoScrollStep);
  }, [autoScrollSpeed]);

  const startAutoScroll = useCallback(() => {
    if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
    animationFrameIdRef.current = requestAnimationFrame(performAutoScrollStep);
  }, [performAutoScrollStep]);

  const stopAutoScroll = useCallback(() => {
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }
  }, []);
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingRef.current || !contentWrapperRef.current || !contentWrapperRef.current.children[0]) return;
    e.preventDefault();

    const singleListWidth = (contentWrapperRef.current.children[0] as HTMLElement).offsetWidth;
    if (singleListWidth <= 0) return; // Guard against zero or negative width

    const mouseDeltaX = e.pageX - startXMouseRef.current;
    // 'raw' target X position based on where the drag started and how much mouse moved
    const rawTargetX = startTranslateXContentRef.current + mouseDeltaX; 

    // Normalize this rawTargetX to the canonical display range, e.g., [-singleListWidth, 0)
    // This normalized value is what GSAP will use and what auto-scroll should resume from.
    const displayX = ((rawTargetX % singleListWidth) - singleListWidth) % singleListWidth;

    gsap.set(contentWrapperRef.current, { x: displayX });
    currentTranslateXRef.current = displayX; // Update ref to the normalized, displayed position
  }, []);


  const handleMouseUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    
    isDraggingRef.current = false;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
    }
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    startAutoScroll();
  }, [handleMouseMove, startAutoScroll]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!contentWrapperRef.current || !scrollContainerRef.current) return;
    
    stopAutoScroll();
    isDraggingRef.current = true;
    startXMouseRef.current = e.pageX;
    const currentX = gsap.getProperty(contentWrapperRef.current, "x");
    startTranslateXContentRef.current = typeof currentX === 'number' ? currentX : 0;
    
    scrollContainerRef.current.style.cursor = 'grabbing';

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [stopAutoScroll, handleMouseMove, handleMouseUp]); 

  useEffect(() => {
    if (contentWrapperRef.current && contentWrapperRef.current.children && contentWrapperRef.current.children.length > 0) {
      const initialDelay = setTimeout(() => {
        gsap.set(contentWrapperRef.current, { x: 0 });
        currentTranslateXRef.current = 0;
        startAutoScroll();
      }, 100); 
       return () => clearTimeout(initialDelay);
    }
  }, [startAutoScroll]);
  
  useEffect(() => {
    return () => {
      stopAutoScroll();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [stopAutoScroll, handleMouseMove, handleMouseUp]);


  return (
    <motion.section 
      id="tech-stack" 
      className="py-8 md:py-12 bg-background"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
    >
      <div
        ref={scrollContainerRef}
        className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl mx-auto px-4 overflow-hidden cursor-grab no-scrollbar"
        onMouseDown={handleMouseDown}
      >
        <div ref={contentWrapperRef} className="flex">
          <ul className="flex flex-none whitespace-nowrap gap-3 sm:gap-4 py-2">
            {technologies.map((tech) => renderTechItem(tech, "original-"))}
          </ul>
          <ul className="flex flex-none whitespace-nowrap gap-3 sm:gap-4 py-2" aria-hidden="true">
            {technologies.map((tech) => renderTechItem(tech, "clone-"))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
};

export default TechStackSection;
