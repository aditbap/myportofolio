
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/contexts/theme-provider';

export const metadata: Metadata = {
  title: 'aditbap',
  description: 'A personal portfolio of Adit student majoring in Computer Science focusing at AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Space+Grotesk:wght@400;700&family=Source+Code+Pro:wght@400&family=Plus+Jakarta+Sans:wght@400;700;800&display=swap" rel="stylesheet"/>
      </head>
      <body className="font-body antialiased">
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
