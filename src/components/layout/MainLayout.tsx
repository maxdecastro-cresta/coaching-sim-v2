"use client";

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
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

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  
  // Always use light mode
  useEffect(() => {
    const root = document.documentElement;
    // Remove any theme classes and ensure light mode
    root.classList.remove('dark', 'high-contrast');
    // Clear any saved theme preferences
    localStorage.removeItem('theme');
  }, []);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />
        
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