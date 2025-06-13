// src/components/portfolio/projects-section.tsx
"use client";

import { Globe } from 'lucide-react';
import SpotlightCard from '@/components/effects/SpotlightCard'; 
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { motion } from 'framer-motion';

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

const projects: Project[] = [
  {
    title: "Event Hub",
    description: "A platform that helps user to search a event and help event organizer to create an event. This app built for mobile first but deploying at website to make a easy acces",
    imageUrl: "https://placehold.co/600x375.png", // Aspect ratio 16:10 (600/375 = 1.6)
    imageHint: "educational platform UI",
    technologies: ["Next.js", "Typescript", "Firebase Database", "TailwindCSS", "Midtrans", "React",],
    liveLink: "https://eventhub-tawny.vercel.app",
    date: "June 2025"
  },
  {
    title: "Data Visualization Dashboard",
    description: "An interactive dashboard for visualizing complex datasets, providing insights through charts and graphs. Features real-time data updates and customizable views.",
    imageUrl: "https://placehold.co/600x375.png",
    imageHint: "dashboard chart",
    technologies: ["React", "D3.js", "Node.js", "MongoDB", "WebSocket"],
    liveLink: "#",
    date: "March 2023"
  },
  {
    title: "Mobile Task Manager",
    description: "A cross-platform mobile application for task management, featuring offline sync, reminders, and collaborative workspaces. Designed for productivity on the go.",
    imageUrl: "https://placehold.co/600x375.png",
    imageHint: "mobile app",
    technologies: ["React Native", "Firebase", "Redux", "SQLite"],
    liveLink: "#",
    date: "August 2022"
  },
];

const ProjectsSection: React.FC = () => (
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
        <span className="inline-block rounded-full bg-primary-foreground text-background px-4 py-1.5 text-sm font-semibold mb-6 shadow-md">
          Selected Projects
        </span>
        <h2 className="font-body text-4xl md:text-5xl font-bold text-foreground mb-4">
          Check out my latest work
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          I've worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <SpotlightCard
            key={index}
            className="flex flex-col group" 
            spotlightColor="rgba(0, 229, 255, 0.2)" 
          >
            {/* Image Section */}
            <div className="relative w-full aspect-[16/10] bg-muted overflow-hidden">
              <Image
                src={project.imageUrl}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint={project.imageHint}
                className="group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content Section - Retains its own padding */}
            <div className="p-4 md:p-6 flex-grow flex flex-col">
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-1">{project.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">{project.date}</p>
              <p className="text-sm text-foreground/90 mb-4 line-clamp-3 sm:line-clamp-none flex-grow">{project.description}</p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map(tech => (
                  <span key={tech} className="font-sans text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-md">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <div className="mt-auto">
                {project.liveLink && (
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    asChild 
                    className="w-full sm:w-auto transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white hover:text-black"
                  >
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      <Globe className="mr-2 h-4 w-4" /> Website
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  </motion.section>
);

export default ProjectsSection;
