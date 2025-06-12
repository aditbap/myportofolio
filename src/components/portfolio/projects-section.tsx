// src/components/portfolio/projects-section.tsx
import { Layers, ExternalLink, Globe } from 'lucide-react'; // Added Globe
import { Card, CardContent } from '@/components/ui/card'; // Removed CardHeader, CardTitle, CardDescription as direct imports for this component's usage
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  technologies: string[];
  liveLink?: string;
  repoLink?: string; // Kept in interface if needed elsewhere, but won't be used for buttons in this version
  emoji?: string; // Kept in interface, but won't be rendered
  date: string; // Added date field
}

const projects: Project[] = [
  {
    title: "Studifai",
    description: "A platform that helps academics with active learning by utilizing OpenAI's GPT models.",
    imageUrl: "https://placehold.co/600x375.png", // 16:10 aspect ratio
    imageHint: "educational platform UI",
    technologies: ["Next.js", "Typescript", "PostgreSQL", "Prisma", "TailwindCSS", "Midtrans", "Shadcn UI", "Langchain"],
    liveLink: "#",
    date: "July 2024"
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
    liveLink: "#", // Changed from repoLink to liveLink to show the "Website" button
    date: "August 2022"
  },
];

const ProjectsSection: React.FC = () => (
  <section id="projects" className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center mb-16">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary text-center">
          My Projects
        </h2>
        <Layers className="ml-3 h-10 w-10 text-primary" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <Card key={index} className="flex flex-col bg-card text-card-foreground shadow-md overflow-hidden rounded-lg group">
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

            {/* Content Section */}
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
              <div className="mt-auto"> {/* Removed pt-4 to rely on flex-grow from description and mb-6 from tech */}
                {project.liveLink && (
                  <Button variant="secondary" size="sm" asChild className="w-full sm:w-auto">
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      <Globe className="mr-2 h-4 w-4" /> Website
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
