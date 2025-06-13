
'use client';

import React from 'react'; // Added React import
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/theme-provider';
import { Button } from '@/components/ui/button';

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  // Avoid rendering on server or until theme is determined to prevent hydration mismatch
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Render a placeholder or null to avoid flash of incorrect icon
    return <div className="h-9 w-9 sm:h-10 sm:w-10" />; // Matches Button size="icon"
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="text-neutral-500 hover:text-neutral-300 transition-colors h-auto w-auto p-0 aspect-square flex items-center justify-center" // Adjusted for better icon centering in Dock
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}
