// src/components/portfolio/projects-section.tsx
"use client";

import { Globe } from 'lucide-react';
import SpotlightCard from '@/components/effects/SpotlightCard';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { motion } from 'framer-motion';
import React, { useRef, useCallback, useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  technologies: string[];
  liveLink?: string;
  repoLink?: string;
  emoji?: string;
  date: string;
}

const projectsData: Project[] = [
  {
    title: "Event Hub",
    description: "A platform that helps user to search a event and help event organizer to create an event. This app built for mobile first but deploying at website to make a easy acces",
    imageUrl: "https://placehold.co/600x375.png", // Aspect ratio 16:10 (600/375 = 1.6)
    imageHint: "event platform UI",
    technologies: ["Next.js", "Typescript", "Firebase Database", "TailwindCSS", "Midtrans", "React",],
    liveLink: "https://eventhub-tawny.vercel.app",
    date: "June 2025"
  },
  {
    title: "Personal Portofolio",
    description: "A clean and user-friendly portfolio website designed to showcase projects and skills with smooth animations and a simple, modern interface for an engaging browsing experience.",
    imageUrl: "https://placehold.co/600x375.png",
    imageHint: "portfolio design",
    technologies: ["React", "Next.js", "Typescript", "TailwindCSS", "GSAP"],
    liveLink: "#",
    date: "June 2025"
  },
  {
    title: "Mobile Task Manager",
    description: "A cross-platform mobile application for task management, featuring offline sync, reminders, and collaborative workspaces. Designed for productivity on the go.",
    imageUrl: "https://placehold.co/600x375.png",
    imageHint: "task manager app",
    technologies: ["React Native", "Firebase", "Redux", "SQLite"],
    liveLink: "#",
    date: "August 2022"
  },
];

const ProjectsSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  const isDraggingRef = useRef(false);
  const startXMouseRef = useRef(0);
  const startTranslateXContentRef = useRef(0);
  const currentTranslateXRef = useRef(0);
  const [hasEnoughContentToScroll, setHasEnoughContentToScroll] = useState(false);


  useEffect(() => {
    const checkScrollability = () => {
      if (contentWrapperRef.current && scrollContainerRef.current) {
        const contentWidth = contentWrapperRef.current.scrollWidth;
        const containerWidth = scrollContainerRef.current.offsetWidth;
        setHasEnoughContentToScroll(contentWidth > containerWidth);
      }
    };

    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    
    // Set initial position if needed, though default is 0
    if (contentWrapperRef.current) {
      gsap.set(contentWrapperRef.current, { x: 0 });
      currentTranslateXRef.current = 0;
    }

    return () => {
      window.removeEventListener('resize', checkScrollability);
    };
  }, [projectsData]);


  const renderProjectCard = (project: Project, index: number) => (
    <SpotlightCard
      key={`${project.title}-${index}`}
      className="w-[350px] flex flex-col group" // Fixed width for horizontal scroll
      spotlightColor="rgba(0, 229, 255, 0.2)" // Example color from user
    >
      <div className="relative w-full aspect-[16/10] bg-muted overflow-hidden rounded-t-lg">
        <Image
          src={project.imageUrl}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          data-ai-hint={project.imageHint}
          className="group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 md:p-6 flex-grow flex flex-col">
        <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-1">{project.title}</h3>
        <p className="text-xs text-muted-foreground mb-3">{project.date}</p>
        <p className="text-sm text-foreground/90 mb-4 line-clamp-3 sm:line-clamp-none flex-grow">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map(tech => (
            <span key={tech} className="font-sans text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-md">
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-auto">
          {project.liveLink && (
            <Button
              variant="secondary"
              size="sm"
              asChild
              className="w-full sm:w-auto transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white hover:text-black dark:hover:bg-primary dark:hover:text-primary-foreground"
            >
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                <Globe className="mr-2 h-4 w-4" /> Website
              </a>
            </Button>
          )}
        </div>
      </div>
    </SpotlightCard>
  );

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingRef.current || !contentWrapperRef.current || !scrollContainerRef.current) return;
    e.preventDefault();

    const contentWidth = contentWrapperRef.current.scrollWidth;
    const containerWidth = scrollContainerRef.current.offsetWidth;

    if (contentWidth <= containerWidth) {
        // No need to drag if content doesn't overflow
        if (currentTranslateXRef.current !== 0) {
            gsap.to(contentWrapperRef.current, { x: 0, duration: 0.3, ease: "power1.out" });
            currentTranslateXRef.current = 0;
        }
        return;
    }

    const mouseDeltaX = e.pageX - startXMouseRef.current;
    let targetX = startTranslateXContentRef.current + mouseDeltaX;

    const minTranslateX = containerWidth - contentWidth; // Max scroll left (negative value)
    const maxTranslateX = 0; // Max scroll right (origin)

    targetX = Math.max(minTranslateX, Math.min(maxTranslateX, targetX));

    gsap.set(contentWrapperRef.current, { x: targetX });
    currentTranslateXRef.current = targetX;
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    
    isDraggingRef.current = false;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
    }
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!contentWrapperRef.current || !scrollContainerRef.current) return;

    const contentWidth = contentWrapperRef.current.scrollWidth;
    const containerWidth = scrollContainerRef.current.offsetWidth;

    if (contentWidth <= containerWidth) {
        // Prevent dragging if content doesn't overflow
        return;
    }
    
    isDraggingRef.current = true;
    startXMouseRef.current = e.pageX;
    // Use currentTranslateXRef as it's kept in sync, instead of querying GSAP
    startTranslateXContentRef.current = currentTranslateXRef.current; 
    
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grabbing';
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove, handleMouseUp]); 
  
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <motion.section
      id="projects"
      className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl mx-auto px-4 py-16 md:py-24 bg-background"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
    >
      <div className="px-6">
        <div className="text-center mb-16">
          <span className="inline-block rounded-full bg-secondary text-secondary-foreground px-4 py-1.5 text-sm font-semibold mb-6 shadow-md">
            Selected Projects
          </span>
          <h2 className="font-body text-4xl md:text-5xl font-bold text-foreground mb-4">
            Check out my latest work
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            I've worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites.
          </p>
        </div>
        
        <div
          ref={scrollContainerRef}
          className={`overflow-hidden no-scrollbar ${hasEnoughContentToScroll ? 'cursor-grab' : 'cursor-default'}`}
          onMouseDown={hasEnoughContentToScroll ? handleMouseDown : undefined}
        >
          <div ref={contentWrapperRef} className="flex flex-none whitespace-nowrap gap-8 py-2">
            {projectsData.map((project, index) => renderProjectCard(project, index))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectsSection;
