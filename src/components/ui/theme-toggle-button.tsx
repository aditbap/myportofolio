
'use client';

import React from 'react'; 
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/theme-provider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-9 w-9 sm:h-10 sm:w-10" />; 
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        "text-muted-foreground hover:text-foreground transition-colors",
        "h-auto w-auto p-0 aspect-square flex items-center justify-center" 
      )}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}
