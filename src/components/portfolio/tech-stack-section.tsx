// src/components/portfolio/tech-stack-section.tsx
import React from 'react';
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
  return (
    <section id="tech-stack" className="py-8 md:py-12 bg-background">
      <div className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl mx-auto px-4 overflow-x-auto">
        <ul className="flex whitespace-nowrap justify-start sm:justify-center gap-3 sm:gap-4 py-2">
          {technologies.map((tech, index) => (
            <li 
              key={index} 
              className="flex items-center font-code text-xs sm:text-sm text-foreground bg-card p-2 px-3 rounded-lg shadow-sm border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300 cursor-default"
            >
              {tech.icon}
              {tech.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TechStackSection;
