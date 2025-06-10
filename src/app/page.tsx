
import HeroSection from '@/components/portfolio/hero-section';
import Link from 'next/link';
import { Linkedin, Mail } from 'lucide-react'; // Github icon removed from import

export default function BentoPortfolioPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl px-4">
        {/* Classes bg-neutral-800 and shadow-xl removed from the div below */}
        <div className="rounded-full px-6 py-6 flex items-center justify-between w-full shrink-0 outline-none">
          <Link href="/" className="font-jakarta text-sm sm:text-base text-neutral-500 hover:opacity-80 transition-opacity tracking-[0.15em]">
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
            {/* GitHub icon link removed */}
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
      
      <main className="flex-grow pt-32"> 
        <HeroSection />
        {/* Other sections (WorkExperience, Projects, Contact) and Footer remain removed to match the image's initial view */}
      </main>
      
      {/* Footer remains removed */}
    </div>
  );
}
