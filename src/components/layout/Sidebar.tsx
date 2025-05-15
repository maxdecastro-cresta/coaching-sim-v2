"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  IconSunHigh, 
  IconMoon, 
  IconBolt, 
  IconLogout,
  IconChevronDown,
  IconChartBar,
  IconMessageCircle,
  IconUsers,
  IconProgressCheck,
  IconBook,
  IconSTurnRight
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
import { LogoutButton } from "@/components/LogoutButton";

type Theme = 'light' | 'dark' | 'high-contrast';

interface SidebarProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

function SidebarLogoSection() {
  const { state, toggleSidebar } = useSidebar();
  
  return (
    <SidebarHeader className="px-6 py-4 flex flex-col items-start transition-all duration-300 ease-in-out group-data-[collapsible=icon]:px-1 relative bg-bg-surface">
      <div className="h-[32px] w-full flex items-center transition-all duration-300 ease-in-out group-data-[collapsible=icon]:justify-center">
        {state === "expanded" ? (
          <Logo width={80} height={29} color="var(--content-primary)" className="transition-all duration-300 ease-in-out text-left" />
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className="cursor-pointer transition-all duration-300 ease-in-out hover:opacity-80"
                  onClick={toggleSidebar}
                >
                  <LogoIcon width={20} height={20} color="var(--content-primary)" className="transition-all duration-300 ease-in-out" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                Expand sidebar
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      {state === "expanded" && (
        <div className="absolute top-4 right-4 transition-all duration-300 ease-in-out">
          <SidebarToggleButton />
        </div>
      )}
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
          <SidebarTrigger className="ml-2 h-7 w-7 transition-all duration-300 ease-in-out" />
        </TooltipTrigger>
        <TooltipContent side="right">
          Collapse sidebar
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

export function AppSidebar({ currentTheme, onThemeChange }: SidebarProps) {
  // User profile information
  const userName = "Patrick Soutar";
  const formattedName = formatUserName(userName);
  const userInitials = userName.split(' ').map(name => name[0]).join('').substring(0, 2);

  return (
    <UISidebar className="bg-bg-surface border-r border-[var(--border-default)] transition-all duration-300 ease-in-out group-data-[state=collapsed]:px-1" collapsible="icon">
      <SidebarLogoSection />
      <SidebarContent className="w-full transition-all duration-300 ease-in-out bg-bg-surface">
        <SidebarMenu className="space-y-0 gap-[2px] divide-y divide-transparent transition-all duration-300 ease-in-out">
          <SidebarMenuButton
            asChild
            tooltip="Insights"
          >
            <Link href="#" legacyBehavior>
              <a className="flex items-center justify-start gap-2 px-[14px] py-1 mx-2 my-0.5 h-[38px] text-content-secondary hover:bg-bg-section hover:text-content-primary group group-data-[collapsible=icon]:px-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:mx-2 transition-all duration-300 ease-in-out rounded-md">
                <div className="flex items-center justify-center min-w-[24px] transition-all duration-300 ease-in-out group-data-[collapsible=icon]:ml-0">
                  <div className="w-[24px] h-[24px] flex items-center justify-center rounded">
                    <IconChartBar size={16} className="text-inherit transition-all duration-300 ease-in-out hover:text-content-primary" />
                  </div>
                </div>
                <span className="body-regular-text group-data-[collapsible=icon]:hidden whitespace-nowrap transition-all duration-300 ease-in-out opacity-100 group-data-[collapsible=icon]:opacity-0 hover:element-regular-text">Insights</span>
              </a>
            </Link>
          </SidebarMenuButton>

          <SidebarMenuButton
            asChild
            tooltip="Conversations"
          >
            <Link href="#" legacyBehavior>
              <a className="flex items-center justify-start gap-2 px-[14px] py-1 mx-2 my-0.5 h-[38px] text-content-secondary hover:bg-bg-section hover:text-content-primary group group-data-[collapsible=icon]:px-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:mx-2 transition-all duration-300 ease-in-out rounded-md">
                <div className="flex items-center justify-center min-w-[24px] transition-all duration-300 ease-in-out group-data-[collapsible=icon]:ml-0">
                  <div className="w-[24px] h-[24px] flex items-center justify-center rounded">
                    <IconMessageCircle size={16} className="text-inherit transition-all duration-300 ease-in-out hover:text-content-primary" />
                  </div>
                </div>
                <span className="body-regular-text group-data-[collapsible=icon]:hidden whitespace-nowrap transition-all duration-300 ease-in-out opacity-100 group-data-[collapsible=icon]:opacity-0 hover:element-regular-text">Conversations</span>
              </a>
            </Link>
          </SidebarMenuButton>

          <SidebarMenuButton
            asChild
            tooltip="Coaching"
          >
            <Link href="#" legacyBehavior>
              <a className="flex items-center justify-start gap-2 px-[14px] py-1 mx-2 my-0.5 h-[38px] text-content-secondary hover:bg-bg-section hover:text-content-primary group group-data-[collapsible=icon]:px-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:mx-2 transition-all duration-300 ease-in-out rounded-md">
                <div className="flex items-center justify-center min-w-[24px] transition-all duration-300 ease-in-out group-data-[collapsible=icon]:ml-0">
                  <div className="w-[24px] h-[24px] flex items-center justify-center rounded">
                    <IconUsers size={16} className="text-inherit transition-all duration-300 ease-in-out hover:text-content-primary" />
                  </div>
                </div>
                <span className="body-regular-text group-data-[collapsible=icon]:hidden whitespace-nowrap transition-all duration-300 ease-in-out opacity-100 group-data-[collapsible=icon]:opacity-0 hover:element-regular-text">Coaching</span>
              </a>
            </Link>
          </SidebarMenuButton>

          <SidebarMenuButton
            asChild
            tooltip="Quality management"
          >
            <Link href="#" legacyBehavior>
              <a className="flex items-center justify-start gap-2 px-[14px] py-1 mx-2 my-0.5 h-[38px] text-content-secondary hover:bg-bg-section hover:text-content-primary group group-data-[collapsible=icon]:px-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:mx-2 transition-all duration-300 ease-in-out rounded-md">
                <div className="flex items-center justify-center min-w-[24px] transition-all duration-300 ease-in-out group-data-[collapsible=icon]:ml-0">
                  <div className="w-[24px] h-[24px] flex items-center justify-center rounded">
                    <IconProgressCheck size={16} className="text-inherit transition-all duration-300 ease-in-out hover:text-content-primary" />
                  </div>
                </div>
                <span className="body-regular-text group-data-[collapsible=icon]:hidden whitespace-nowrap transition-all duration-300 ease-in-out opacity-100 group-data-[collapsible=icon]:opacity-0 hover:element-regular-text">Quality management</span>
              </a>
            </Link>
          </SidebarMenuButton>

          <SidebarMenuButton
            asChild
            tooltip="Knowledge search"
          >
            <Link href="#" legacyBehavior>
              <a className="flex items-center justify-start gap-2 px-[14px] py-1 mx-2 my-0.5 h-[38px] text-content-secondary hover:bg-bg-section hover:text-content-primary group group-data-[collapsible=icon]:px-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:mx-2 transition-all duration-300 ease-in-out rounded-md">
                <div className="flex items-center justify-center min-w-[24px] transition-all duration-300 ease-in-out group-data-[collapsible=icon]:ml-0">
                  <div className="w-[24px] h-[24px] flex items-center justify-center rounded">
                    <IconBook size={16} className="text-inherit transition-all duration-300 ease-in-out hover:text-content-primary" />
                  </div>
                </div>
                <span className="body-regular-text group-data-[collapsible=icon]:hidden whitespace-nowrap transition-all duration-300 ease-in-out opacity-100 group-data-[collapsible=icon]:opacity-0 hover:element-regular-text">Knowledge search</span>
              </a>
            </Link>
          </SidebarMenuButton>

          <SidebarMenuButton
            asChild
            isActive
            tooltip="Opera"
          >
            <Link href="#" legacyBehavior>
              <a className="flex items-center justify-start gap-2 px-[14px] py-1 mx-2 my-0.5 h-[38px] text-content-primary hover:bg-transparent group group-data-[collapsible=icon]:px-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:mx-2 transition-all duration-300 ease-in-out rounded-md">
                <div className="flex items-center justify-center min-w-[24px] transition-all duration-300 ease-in-out group-data-[collapsible=icon]:ml-0">
                  <div className="w-[24px] h-[24px] flex items-center justify-center bg-blue-600 rounded">
                    <IconSTurnRight size={16} className="text-white transition-all duration-300 ease-in-out" />
                  </div>
                </div>
                <span className="element-regular-text group-data-[collapsible=icon]:hidden whitespace-nowrap transition-all duration-300 ease-in-out opacity-100 group-data-[collapsible=icon]:opacity-0">Opera</span>
              </a>
            </Link>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="group-data-[collapsible=icon]:px-1 transition-all duration-300 ease-in-out bg-bg-surface">
        <div className="group-data-[collapsible=icon]:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <a className="flex items-center justify-start gap-3 px-[14px] py-1 mx-2 my-0.5 h-[38px] text-content-secondary hover:bg-bg-section hover:text-content-primary group transition-all duration-300 ease-in-out rounded-md cursor-pointer">
                <div className="flex items-center justify-center min-w-[24px] transition-all duration-300 ease-in-out">
                  <div className="w-[24px] h-[24px] flex items-center justify-center rounded">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-ext-pink-content text-content-contrast body-small-text">{userInitials}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <span className="body-regular-text whitespace-nowrap transition-all duration-300 ease-in-out opacity-100 hover:element-regular-text">{formattedName}</span>
                <div className="ml-auto">
                  <IconChevronDown size={16} className="text-sidebar-foreground opacity-70" />
                </div>
              </a>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="body-regular-text">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onThemeChange('light')}
                className="flex items-center gap-2 cursor-pointer"
              >
                <IconSunHigh size={16} stroke={1.5} />
                <span className="body-regular-text">Light</span>
                {currentTheme === 'light' && <span className="ml-auto body-small-text">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onThemeChange('dark')}
                className="flex items-center gap-2 cursor-pointer"
              >
                <IconMoon size={16} stroke={1.5} />
                <span className="body-regular-text">Dark</span>
                {currentTheme === 'dark' && <span className="ml-auto body-small-text">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onThemeChange('high-contrast')}
                className="flex items-center gap-2 cursor-pointer"
              >
                <IconBolt size={16} stroke={1.5} />
                <span className="body-regular-text">High Contrast</span>
                {currentTheme === 'high-contrast' && <span className="ml-auto body-small-text">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </UISidebar>
  );
} 