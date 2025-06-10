
import HeroSection from '@/components/portfolio/hero-section';
import WorkExperienceSection from '@/components/portfolio/work-experience-section';
import ProjectsSection from '@/components/portfolio/projects-section';
import ContactSection from '@/components/portfolio/contact-section';
import Link from 'next/link';
import { Linkedin, Mail, Github } from 'lucide-react'; 

export default function BentoPortfolioPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl px-4">
        <div className="bg-neutral-800 rounded-full shadow-xl px-6 py-5 flex items-center justify-between w-full shrink-0 outline-none">
          <Link href="/" className="font-jakarta text-base sm:text-lg text-neutral-500 hover:opacity-80 transition-opacity">
            ROCKY CHEN
          </Link>
          
          <div className="flex items-center space-x-3 sm:space-x-4">
            <a 
              href="https://linkedin.com/in/johndoe" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn Profile" 
              className="text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="https://github.com/johndoe" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub Profile" 
              className="text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="mailto:john.doe@example.com" 
              aria-label="Email John Doe"
              className="text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </header>
      
      <main className="flex-grow pt-32"> {/* Adjusted padding-top for the new fixed header height */}
        <HeroSection />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <WorkExperienceSection />
          <ProjectsSection />
          <ContactSection />
        </div>
      </main>
      
      <footer className="py-8 text-center bg-muted/50">
        <p className="font-body text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} John Doe. Designed with <span role="img" aria-label="heart">❤️</span> and code.
        </p>
      </footer>
    </div>
  );
}
