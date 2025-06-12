
import HeroSection from '@/components/portfolio/hero-section';
import FooterSection from '@/components/portfolio/footer-section';
import ProjectsSection from '@/components/portfolio/projects-section'; 
import Link from 'next/link';
import { Linkedin, Mail } from 'lucide-react'; 
import { Dock, DockIcon } from '@/components/ui/dock';

export default function BentoPortfolioPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="fixed top-6 sm:top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl sm:max-w-4xl md:max-w-5xl px-4">
        <Dock
          className="bg-neutral-800 rounded-full shadow-xl px-6 py-6 flex items-center justify-between w-full shrink-0 outline-none !gap-0" // Added !gap-0 to ensure justify-between works as expected
          iconSize={32} // Base size for DockIcon to comfortably fit 20px icons + padding
          iconMagnification={48} // Magnified size (1.5x of 32)
          iconDistance={100} // Distance for mouse interaction
          direction="middle"
        >
          <Link href="/" className="font-jakarta font-bold text-xs sm:text-sm text-neutral-500 hover:opacity-80 transition-opacity tracking-[0.15em] no-underline">
            BENEDIKTUS ADIT
          </Link>
          
          <div className="flex items-center space-x-2 sm:space-x-3"> {/* Adjusted space-x slightly */}
            <DockIcon>
              <a 
                href="https://linkedin.com/in/aditbap" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn Profile" 
                className="text-neutral-500 hover:text-neutral-300 transition-colors flex items-center justify-center w-full h-full"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </DockIcon>
            <DockIcon>
              <a 
                href="mailto:aditbaps@gmail.com" 
                aria-label="Email Benediktus Adit"
                className="text-neutral-500 hover:text-neutral-300 transition-colors flex items-center justify-center w-full h-full"
              >
                <Mail className="h-5 w-5" />
              </a>
            </DockIcon>
          </div>
        </Dock>
      </header>
      
      <main className="flex-grow pt-28 sm:pt-32 md:pt-32"> {/* Adjusted top padding */}
        <HeroSection />
        <ProjectsSection />
      </main>
      
      <FooterSection />
    </div>
  );
}
