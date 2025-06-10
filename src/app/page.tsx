import HeroSection from '@/components/portfolio/hero-section';
import WorkExperienceSection from '@/components/portfolio/work-experience-section';
import ContactSection from '@/components/portfolio/contact-section';
import { Button } from '@/components/ui/button'; // For navigation buttons
import { Menu } from 'lucide-react'; // For mobile menu icon
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; // For mobile menu
import Link from 'next/link'; // For navigation links

const navItems = [
  { href: '#intro', label: 'Intro' },
  { href: '#work', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export default function BentoPortfolioPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="font-headline text-3xl font-bold text-primary hover:text-accent transition-colors">
            JD.
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <Button key={item.label} variant="ghost" asChild>
                <Link href={item.href} className="font-body text-primary hover:text-accent hover:bg-primary/5 px-3 py-2 rounded-md text-sm font-medium">
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary hover:text-accent">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] bg-background p-6">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                     <SheetTrigger key={item.label} asChild>
                        <Link href={item.href} className="font-body text-lg text-primary hover:text-accent py-2 text-center rounded-md hover:bg-primary/5">
                        {item.label}
                        </Link>
                    </SheetTrigger>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        <HeroSection />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <WorkExperienceSection />
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
