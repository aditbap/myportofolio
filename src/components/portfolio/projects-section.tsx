// src/components/portfolio/projects-section.tsx
import { Layers, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  technologies: string[];
  liveLink?: string;
  repoLink?: string;
  emoji: string;
}

const projects: Project[] = [
  {
    title: "E-commerce Platform",
    description: "A full-featured online store with a custom CMS, payment gateway integration, and advanced product filtering. Built with scalability and user experience in mind.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "online store",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
    liveLink: "#",
    repoLink: "#",
    emoji: "🛒"
  },
  {
    title: "Data Visualization Dashboard",
    description: "An interactive dashboard for visualizing complex datasets, providing insights through charts and graphs. Features real-time data updates and customizable views.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "dashboard chart",
    technologies: ["React", "D3.js", "Node.js", "MongoDB", "WebSocket"],
    liveLink: "#",
    emoji: "📊"
  },
  {
    title: "Mobile Task Manager",
    description: "A cross-platform mobile application for task management, featuring offline sync, reminders, and collaborative workspaces. Designed for productivity on the go.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "mobile app",
    technologies: ["React Native", "Firebase", "Redux", "SQLite"],
    repoLink: "#",
    emoji: "📱"
  },
];

const ProjectsSection: React.FC = () => (
  <section id="projects" className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary text-center mb-16">
        My Projects <Layers className="inline-block ml-3 h-10 w-10" />
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <Card key={index} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-accent overflow-hidden group">
            <div className="relative w-full h-48 sm:h-56">
              <Image
                src={project.imageUrl}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint={project.imageHint}
                className="group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader className="pb-4">
              <CardTitle className="font-headline text-xl text-accent group-hover:text-primary transition-colors">
                {project.title} <span role="img" aria-label="project emoji">{project.emoji}</span>
              </CardTitle>
              <CardDescription className="font-body text-sm text-muted-foreground pt-1 h-16 overflow-hidden">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <div>
                <h4 className="font-body text-xs font-semibold text-primary mb-2">Key Technologies:</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map(tech => (
                    <span key={tech} className="font-code text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2 mt-auto pt-4 border-t border-border">
                {project.liveLink && (
                  <Button variant="outline" size="sm" asChild className="flex-1 border-primary text-primary hover:bg-primary/10 hover:text-accent">
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-1.5 h-4 w-4" /> Live Demo
                    </a>
                  </Button>
                )}
                {project.repoLink && (
                  <Button variant="ghost" size="sm" asChild className="flex-1 text-primary hover:text-accent hover:bg-primary/5">
                    <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                      <Layers className="mr-1.5 h-4 w-4" /> View Code
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
