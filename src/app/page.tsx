
"use client";

import HeroSection from '@/components/portfolio/hero-section';
import FooterSection from '@/components/portfolio/footer-section';
import ProjectsSection from '@/components/portfolio/projects-section';
import TechStackSection from '@/components/portfolio/tech-stack-section';
import Link from 'next/link';
import { Linkedin, Mail, Github } from 'lucide-react';
import { Dock } from '@/components/ui/dock';
import Lenis from "lenis";
import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button';

export default function BentoPortfolioPage() {
  const [applyShadow, setApplyShadow] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time:any) {
      lenis.raf(time);
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf);

    const handleScroll = () => {
      if (window.scrollY > 280) {
        setApplyShadow(true);
      } else {
        setApplyShadow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="fixed top-6 sm:top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl sm:max-w-4xl md:max-w-5xl px-4">
        <Dock
          className={cn(
            "rounded-full px-6 flex items-center justify-between w-full shrink-0 outline-none !gap-0 !mx-0 !mt-0 transition-shadow duration-300 ease-out",
            "bg-background/60 dark:bg-neutral-800/70 backdrop-blur-md border border-border/70",
            applyShadow ? "shadow-lg dark:shadow-xl" : "shadow-sm dark:shadow-none"
          )}
          direction="middle"
        >
          <Link href="/" className="font-jakarta font-bold text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-opacity tracking-[0.15em] no-underline">
            BENEDIKTUS ADIT
          </Link>
          
          <div className="flex items-center space-x-3 sm:space-x-4">
            <a
              href="https://linkedin.com/in/aditbap"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/aditbap" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="mailto:aditbaps@gmail.com"
              aria-label="Email Benediktus Adit"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center"
            >
              <Mail className="h-5 w-5" />
            </a>
            <ThemeToggleButton />
          </div>
        </Dock>
      </header>
      
      <main className="flex-grow pt-28 sm:pt-32 md:pt-32">
        <HeroSection />
        <TechStackSection />
        <ProjectsSection />
      </main>
      
      <FooterSection />
    </div>
  );
}

