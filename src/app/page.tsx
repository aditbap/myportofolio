
import HeroSection from '@/components/portfolio/hero-section';
import FooterSection from '@/components/portfolio/footer-section';
import Link from 'next/link';
import { Linkedin, Mail } from 'lucide-react'; 

export default function BentoPortfolioPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="fixed top-6 sm:top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl sm:max-w-4xl md:max-w-5xl px-4">
        <div className="bg-neutral-800 rounded-full shadow-xl px-6 py-6 flex items-center justify-between w-full shrink-0 outline-none">
          <Link href="/" className="font-jakarta font-bold text-xs sm:text-sm text-neutral-500 hover:opacity-80 transition-opacity tracking-[0.15em]">
            BENEDIKTUS ADIT
          </Link>
          
          <div className="flex items-center space-x-3 sm:space-x-4">
            <a 
              href="https://linkedin.com/in/aditbap" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn Profile" 
              className="text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="mailto:aditbaps@gmail.com" 
              aria-label="Email Benediktus Adit"
              className="text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </header>
      
      <main className="flex-grow pt-28 sm:pt-32 md:pt-32"> {/* Adjusted top padding */}
        <HeroSection />
        {/* You can add other sections like ProjectsSection, WorkExperienceSection etc. here */}
      </main>
      
      <FooterSection />
    </div>
  );
}
