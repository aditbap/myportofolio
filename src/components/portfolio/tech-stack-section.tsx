// src/components/portfolio/tech-stack-section.tsx
import React from 'react';
import { Layers, Database, Wind, Brain, Code } from 'lucide-react'; // Example icons

const technologies = [
  { name: "Next.js", icon: <Layers className="h-4 w-4 mr-2 text-primary" /> },
  { name: "React", icon: <Layers className="h-4 w-4 mr-2 text-primary" /> },
  { name: "TypeScript", icon: <Code className="h-4 w-4 mr-2 text-primary" /> },
  { name: "Tailwind CSS", icon: <Wind className="h-4 w-4 mr-2 text-primary" /> },
  { name: "Framer Motion", icon: <Wind className="h-4 w-4 mr-2 text-primary" /> },
  { name: "GSAP", icon: <Wind className="h-4 w-4 mr-2 text-primary" /> },
  { name: "Shadcn UI", icon: <Layers className="h-4 w-4 mr-2 text-primary" /> },
  { name: "Genkit", icon: <Brain className="h-4 w-4 mr-2 text-primary" /> },
  { name: "Firebase", icon: <Database className="h-4 w-4 mr-2 text-primary" /> },
  { name: "Node.js", icon: <Code className="h-4 w-4 mr-2 text-primary" /> },
  { name: "PostgreSQL", icon: <Database className="h-4 w-4 mr-2 text-primary" /> }
];

const TechStackSection: React.FC = () => {
  return (
    <section id="tech-stack" className="py-8 md:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
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
