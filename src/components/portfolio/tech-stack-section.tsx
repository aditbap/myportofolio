// src/components/portfolio/tech-stack-section.tsx
'use client';

import React, { useRef, useCallback, useEffect } from 'react';
import { Layers, Database, Wind, Brain, Code } from 'lucide-react';

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
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX; // Record initial mouse position on the page
    scrollLeftStartRef.current = scrollContainerRef.current.scrollLeft;
    scrollContainerRef.current.style.cursor = 'grabbing';
    scrollContainerRef.current.style.userSelect = 'none';

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []); // Empty dependency array for stable function reference

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return;
    e.preventDefault(); // Prevent text selection during drag
    const mouseDelta = e.pageX - startXRef.current;
    const scrollSpeedMultiplier = 1.5; // Adjust for faster/slower drag scroll
    scrollContainerRef.current.scrollLeft = scrollLeftStartRef.current - (mouseDelta * scrollSpeedMultiplier);
  }, []); // Empty dependency array for stable function reference

  const handleMouseUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
      scrollContainerRef.current.style.userSelect = 'auto';
    }
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]); // handleMouseMove is stable

  useEffect(() => {
    const currentContainer = scrollContainerRef.current;
    // Cleanup function to remove event listeners if component unmounts while dragging
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      if (currentContainer && isDraggingRef.current) {
        currentContainer.style.cursor = 'grab';
        currentContainer.style.userSelect = 'auto';
      }
    };
  }, [handleMouseMove, handleMouseUp]);


  return (
    <section id="tech-stack" className="py-8 md:py-12 bg-background">
      <div
        ref={scrollContainerRef}
        className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl mx-auto px-4 overflow-x-auto cursor-grab no-scrollbar"
        onMouseDown={handleMouseDown}
      >
        {/* Inner div that is wider than the container, allowing scrolling */}
        <div className="flex"> 
          <ul className="flex flex-none whitespace-nowrap gap-3 sm:gap-4 py-2">
            {technologies.map((tech) => renderTechItem(tech, "original-"))}
          </ul>
          {/* Duplicate for seamless "infinite" feel when dragging far */}
          <ul className="flex flex-none whitespace-nowrap gap-3 sm:gap-4 py-2" aria-hidden="true">
            {technologies.map((tech) => renderTechItem(tech, "clone-"))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
