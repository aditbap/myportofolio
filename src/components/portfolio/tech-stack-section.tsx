// src/components/portfolio/tech-stack-section.tsx
import React from 'react';
import { Layers, Database, Wind, Brain, Code } from 'lucide-react'; // Example icons

const technologies = [
  { name: "Next.js", icon: <Layers className="h-5 w-5 mr-3 text-primary" /> },
  { name: "React", icon: <Layers className="h-5 w-5 mr-3 text-primary" /> },
  { name: "TypeScript", icon: <Code className="h-5 w-5 mr-3 text-primary" /> },
  { name: "Tailwind CSS", icon: <Wind className="h-5 w-5 mr-3 text-primary" /> },
  { name: "Framer Motion", icon: <Wind className="h-5 w-5 mr-3 text-primary" /> },
  { name: "GSAP", icon: <Wind className="h-5 w-5 mr-3 text-primary" /> },
  { name: "Shadcn UI", icon: <Layers className="h-5 w-5 mr-3 text-primary" /> },
  { name: "Genkit", icon: <Brain className="h-5 w-5 mr-3 text-primary" /> },
  { name: "Firebase", icon: <Database className="h-5 w-5 mr-3 text-primary" /> },
  { name: "Node.js", icon: <Code className="h-5 w-5 mr-3 text-primary" /> },
  { name: "PostgreSQL", icon: <Database className="h-5 w-5 mr-3 text-primary" /> }
];

const TechStackSection: React.FC = () => {
  return (
    <section id="tech-stack" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
            My Tech Stack <span role="img" aria-label="gears">⚙️</span>
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground mt-3 md:mt-4 max-w-xl mx-auto">
            I leverage a modern stack to build efficient and scalable applications.
          </p>
        </div>
        
        <div className="max-w-lg mx-auto bg-card p-6 sm:p-8 rounded-xl shadow-xl border border-border/50">
          <ul className="space-y-4">
            {technologies.map((tech, index) => (
              <li 
                key={index} 
                className="flex items-center font-code text-lg md:text-xl text-foreground bg-background p-4 rounded-lg shadow-sm border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300"
              >
                {tech.icon}
                {tech.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
