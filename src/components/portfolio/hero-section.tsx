// src/components/portfolio/hero-section.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDownToLine } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section 
      id="intro" 
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col justify-center items-center text-center min-h-[calc(80vh-8rem)]"
    >
      <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary mb-4 animate-fadeInUp">
        Hello, I'm <span className="text-accent">John Doe</span>
      </h1>
      <p className="font-body text-lg md:text-2xl text-foreground/80 mb-8 max-w-2xl animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
        A passionate Full-Stack Developer crafting seamless digital experiences.
      </p>
      <div className="flex space-x-4 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
        <Button size="lg" asChild className="bg-primary hover:bg-accent text-primary-foreground">
          <a href="#projects">View My Work</a>
        </Button>
        <Button variant="outline" size="lg" asChild className="border-primary text-primary hover:bg-primary/10 hover:text-accent">
          <a href="/resume.pdf" download>
            <ArrowDownToLine className="mr-2 h-5 w-5" /> Download CV
          </a>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
