'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SunIcon, MoonIcon, ZapIcon } from 'lucide-react';

type Theme = 'light' | 'dark' | 'high-contrast';

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before accessing localStorage to avoid hydration errors
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      applyTheme('dark');
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;

    // Remove all theme classes first
    root.classList.remove('light', 'dark', 'high-contrast');

    // Add the new theme class
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else if (newTheme === 'high-contrast') {
      root.classList.add('high-contrast');
    }

    localStorage.setItem('theme', newTheme);
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) {
    return null; // Avoid rendering during SSR to prevent hydration errors
  }

  return (
    <Tabs defaultValue={theme} onValueChange={(value) => handleThemeChange(value as Theme)}>
      <TabsList className="border border-controls rounded-base p-xxs gap-xxs">
        <TabsTrigger 
          value="light" 
          className="flex items-center gap-xs text-base font-base rounded-sharp px-md py-sm transition-colors
            data-[state=active]:bg-bg-surface data-[state=active]:text-content-primary
            data-[state=inactive]:text-content-secondary hover:bg-bg-controls-hover"
        >
          <SunIcon className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:inline-block">Light</span>
        </TabsTrigger>
        <TabsTrigger
          value="dark"
          className="flex items-center gap-xs text-base font-base rounded-sharp px-md py-sm transition-colors
            data-[state=active]:bg-bg-elevation data-[state=active]:text-content-contrast
            data-[state=inactive]:text-content-secondary hover:bg-bg-controls-hover"
        >
          <MoonIcon className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:inline-block">Dark</span>
        </TabsTrigger>
        <TabsTrigger
          value="high-contrast"
          className="flex items-center gap-xs text-base font-base rounded-sharp px-md py-sm transition-colors
            data-[state=active]:bg-bg-action data-[state=active]:text-content-contrast
            data-[state=inactive]:text-content-secondary hover:bg-bg-action-hover"
        >
          <ZapIcon className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:inline-block">High Contrast</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
