
// src/components/portfolio/projects-section.tsx
"use client";

import type { Project } from '@/types/portfolio';
import { Globe } from 'lucide-react';
import SpotlightCard from '@/components/effects/SpotlightCard';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/theme-provider';
import React, { useEffect, useState } from 'react'; // Added React and useState, useEffect

const projectsData: Project[] = [
  {
    title: "Event Hub",
    description: "A platform that helps user to search a event and help event organizer to create an event. This app built for mobile first but deploying at website to make a easy acces",
    imageUrl: "https://placehold.co/600x375.png",
    imageHint: "event platform UI",
    technologies: ["Next.js", "Typescript", "Firebase Database", "TailwindCSS", "Midtrans", "React",],
    liveLink: "https://upjevent.vercel.app",
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
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderProjectCard = (project: Project, index: number) => {
    const cardSpotlightColor = mounted
      ? theme === 'dark'
        ? "rgba(255, 255, 255, 0.3)"
        : "rgba(0, 0, 0, 0.08)"
      : undefined; // Pass undefined if not mounted, SpotlighCard will use its default

    return (
      <SpotlightCard
        key={`${project.title}-${index}`}
        className="flex flex-col group w-[350px] mx-auto"
        spotlightColor={cardSpotlightColor}
      >
        <div className="relative w-full aspect-[16/10] bg-muted overflow-hidden rounded-t-lg">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
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
                className="w-full sm:w-auto transition-all duration-300 ease-in-out hover:scale-105 hover:bg-primary hover:text-primary-foreground"
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
  };


  return (
    <motion.section
      id="projects"
      className="w-full max-w-lg md:max-w-3xl xl:max-w-6xl mx-auto px-4 py-16 md:py-24 bg-background"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
    >
      <div>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projectsData.map((project, index) => renderProjectCard(project, index))}
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectsSection;

// Define the Project type (can be moved to a separate types file, e.g., src/types/portfolio.ts)
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
