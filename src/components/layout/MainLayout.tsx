"use client";

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  IconChartPie,
  IconMessage,
  IconUserCog,
  IconMoodSmile,
  IconBook2,
  IconBrandOpera
} from "@tabler/icons-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from './Sidebar';
import { NavBar } from './NavBar';


type Theme = 'light' | 'dark' | 'high-contrast';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
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

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar 
          currentTheme={theme}
          onThemeChange={handleThemeChange}
        />
        
        {/* Navigation bar */}
        <NavBar />
        
        {/* Main content area - positioned to start below navbar and after sidebar */}
        <div className="flex-1 relative">
          <div className="overflow-auto bg-bg-page h-full" style={{ marginTop: '96px' }}>
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
} 