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
  const renderTechItem = (tech: { name: string; icon: JSX.Element }, keyPrefix: string = "") => (
    <li
      key={`${keyPrefix}${tech.name}`}
      className="flex items-center font-code text-xs sm:text-sm text-foreground bg-card p-2 px-3 rounded-lg shadow-sm border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300 cursor-default"
    >
      {React.cloneElement(tech.icon, { className: "h-4 w-4 mr-2 text-foreground/70 flex-shrink-0" })}
      <span className="whitespace-nowrap">{tech.name}</span>
    </li>
  );

  return (
    <section id="tech-stack" className="py-8 md:py-12 bg-background">
      <div className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl mx-auto px-4 overflow-hidden">
        <div className="flex animate-scroll-left">
          <ul className="flex flex-none whitespace-nowrap gap-3 sm:gap-4 py-2">
            {technologies.map((tech) => renderTechItem(tech, "original-"))}
          </ul>
          <ul className="flex flex-none whitespace-nowrap gap-3 sm:gap-4 py-2" aria-hidden="true">
            {technologies.map((tech) => renderTechItem(tech, "clone-"))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
