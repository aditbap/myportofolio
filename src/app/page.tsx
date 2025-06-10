
import HeroSection from '@/components/portfolio/hero-section';
import Link from 'next/link';
import { Linkedin, Mail } from 'lucide-react'; // Github icon removed as it's not used in the header anymore

export default function BentoPortfolioPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="fixed top-6 sm:top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl sm:max-w-3xl md:max-w-4xl px-4">
        <div className="bg-neutral-800 rounded-full shadow-xl px-6 py-5 flex items-center justify-between w-full shrink-0 outline-none">
          <Link href="/" className="font-jakarta font-bold text-sm sm:text-base text-neutral-500 hover:opacity-80 transition-opacity tracking-[0.15em]">
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
            {/* GitHub icon link removed as per previous request for image matching */}
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
      
      <main className="flex-grow pt-32 sm:pt-36 md:pt-40"> {/* Adjusted top padding to accommodate header if needed */}
        <HeroSection />
      </main>
      
      {/* Footer and other sections removed as per the image focusing on hero */}
    </div>
  );
}
