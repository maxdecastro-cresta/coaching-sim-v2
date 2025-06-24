"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  IconLogout,
  IconChevronDown,
  IconChartBar,
  IconMessageCircle,
  IconUsers,
  IconProgressCheck,
  IconBook,
  IconSTurnRight,
  IconMicrophone,
  IconBuildingStore,
  IconClipboardList,
  IconSchool,
  IconLibrary,
  IconEye,
  IconSettings,
  IconLifebuoy
} from "@tabler/icons-react";
import { Logo } from "@/components/icons";
import { LogoIcon } from "@/components/icons/LogoIcon";
import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";


interface SidebarProps {}

function SidebarLogoSection() {
  const { state, toggleSidebar } = useSidebar();
  
  return (
    <SidebarHeader className="px-6 py-6 flex flex-col items-start transition-all duration-300 ease-in-out group-data-[collapsible=icon]:px-1" style={{ backgroundColor: '#001529' }}>
      <div className="h-[48px] w-full flex items-center transition-all duration-300 ease-in-out group-data-[collapsible=icon]:justify-center">
        {state === "expanded" ? (
          <Logo width={120} height={43} color="white" className="transition-all duration-300 ease-in-out text-left" />
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className="cursor-pointer transition-all duration-300 ease-in-out hover:opacity-80"
                  onClick={toggleSidebar}
                >
                  <LogoIcon width={24} height={24} color="white" className="transition-all duration-300 ease-in-out" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                Expand sidebar
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </SidebarHeader>
  );
}

// Function to create a sidebar toggle button with tooltip
function SidebarToggleButton() {
  const { toggleSidebar } = useSidebar();
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button 
            onClick={toggleSidebar}
            className="h-8 w-8 flex items-center justify-center text-white hover:bg-blue-800 rounded transition-all duration-300 ease-in-out"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 12h18M3 6h18M3 18h18"/>
            </svg>
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">
          Collapse sidebar
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Function to create a sidebar footer toggle button
function SidebarFooterToggle() {
  const { state, toggleSidebar } = useSidebar();
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button 
            onClick={toggleSidebar}
            className="w-full h-10 flex items-center justify-center rounded transition-all duration-300 ease-in-out hover:opacity-80"
            style={{ backgroundColor: '#06213F' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="none">
              {state === "expanded" ? (
                <path d="M15 18l-6-6 6-6"/> // Left-pointing chevron (collapse)
              ) : (
                <path d="M9 18l6-6-6-6"/> // Right-pointing chevron (expand)
              )}
            </svg>
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">
          {state === "expanded" ? "Collapse sidebar" : "Expand sidebar"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Function to format a user's name (FirstName LastInitial if too long)
function formatUserName(fullName: string, maxLength: number = 15): string {
  if (fullName.length <= maxLength) return fullName;
  
  const nameParts = fullName.split(' ');
  if (nameParts.length >= 2) {
    const firstName = nameParts[0];
    const lastInitial = nameParts[nameParts.length - 1][0].toUpperCase();
    return `${firstName} ${lastInitial}`;
  }
  
  return fullName;
}

export function AppSidebar(props: SidebarProps) {
  // User profile information
  const userName = "Max de Castro";
  const formattedName = formatUserName(userName);
  const userInitials = userName.split(' ').map(name => name[0]).join('').substring(0, 2);

  return (
    <UISidebar 
      className="border-r border-[var(--border-default)] transition-all duration-300 ease-in-out group-data-[state=collapsed]:px-1" 
      style={{ backgroundColor: '#001529' }}
      collapsible="icon"
    >
      <SidebarLogoSection />
      <SidebarContent className="w-full transition-all duration-300 ease-in-out" style={{ backgroundColor: '#001529' }}>
        <SidebarMenu className="space-y-1 gap-0 transition-all duration-300 ease-in-out px-3">
          <SidebarMenuButton asChild tooltip="Conversations">
            <Link href="#" legacyBehavior>
              <a className="flex items-center justify-start gap-3 px-3 py-2 h-[40px] text-white hover:bg-blue-800 hover:text-white group group-data-[collapsible=icon]:px-1 group-data-[collapsible=icon]:justify-center transition-all duration-300 ease-in-out rounded-md">
                <IconMessageCircle size={18} className="text-white transition-all duration-300 ease-in-out flex-shrink-0" />
                <span className="body-regular-text group-data-[collapsible=icon]:hidden whitespace-nowrap transition-all duration-300 ease-in-out text-white">Conversations</span>
              </a>
            </Link>
          </SidebarMenuButton>

          <SidebarMenuButton asChild tooltip="Coaching">
            <Link href="/coaching" legacyBehavior>
              <a className="flex items-center justify-start gap-3 px-3 py-2 h-[40px] bg-blue-600 text-white hover:bg-blue-700 group group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:hover:bg-blue-800 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:justify-center transition-all duration-300 ease-in-out rounded-md group-data-[collapsible=icon]:rounded-none border-l-4 border-blue-400">
                <IconUsers size={18} className="text-white transition-all duration-300 ease-in-out flex-shrink-0" />
                <span className="body-regular-text group-data-[collapsible=icon]:hidden whitespace-nowrap transition-all duration-300 ease-in-out text-white font-semibold">Coaching</span>
              </a>
            </Link>
          </SidebarMenuButton>

          <SidebarMenuButton asChild tooltip="Coaching Hub">
            <Link href="#" legacyBehavior>
              <a className="flex items-center justify-start gap-3 px-3 py-2 h-[40px] text-white hover:bg-blue-800 hover:text-white group group-data-[collapsible=icon]:px-1 group-data-[collapsible=icon]:justify-center transition-all duration-300 ease-in-out rounded-md">
                <IconBuildingStore size={18} className="text-white transition-all duration-300 ease-in-out flex-shrink-0" />
                <span className="body-regular-text group-data-[collapsible=icon]:hidden whitespace-nowrap transition-all duration-300 ease-in-out text-white">Coaching Hub</span>
              </a>
            </Link>
          </SidebarMenuButton>

          <SidebarMenuButton asChild tooltip="Trainer">
            <Link href="#" legacyBehavior>
              <a className="flex items-center justify-start gap-3 px-3 py-2 h-[40px] text-white hover:bg-blue-800 hover:text-white group group-data-[collapsible=icon]:px-1 group-data-[collapsible=icon]:justify-center transition-all duration-300 ease-in-out rounded-md">
                <IconSchool size={18} className="text-white transition-all duration-300 ease-in-out flex-shrink-0" />
                <span className="body-regular-text group-data-[collapsible=icon]:hidden whitespace-nowrap transition-all duration-300 ease-in-out text-white">Trainer</span>
              </a>
            </Link>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="group-data-[collapsible=icon]:px-1 transition-all duration-300 ease-in-out py-4" style={{ backgroundColor: '#001529' }}>
        <SidebarFooterToggle />
      </SidebarFooter>
    </UISidebar>
  );
} 