"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSidebar } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import './NavBar.css';

export function NavBar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/coaching') {
      return pathname === path || pathname.startsWith('/lesson/');
    }
    return pathname === path;
  };

  return (
    <nav className="navbar">
    
      {/* User Header Section */}
      <div className="navbar-header">
        {/* Left: User Name */}
        <h1 className="navbar-user-name">Max de Castro</h1>
        
        {/* Right: User Profile */}
        <div className="navbar-user-profile">
          <span className="navbar-profile-name">Max de Castro</span>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-ext-pink-content text-content-contrast body-small-text">
              MC
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      {/* Navigation Tabs Section */}
      <div className="navbar-tabs">
        <Link href="/home" className={`navbar-tab ${isActive('/home') ? 'active' : ''}`}>
          Home
        </Link>
        <Link href="/coaching" className={`navbar-tab ${isActive('/coaching') ? 'active' : ''}`}>
          Coaching
        </Link>
        <Link href="/sandbox" className={`navbar-tab ${isActive('/sandbox') ? 'active' : ''}`}>
          Sandbox
        </Link>
        <Link href="#" className="navbar-tab">
          Rewards
        </Link>
      </div>
    </nav>
  );
} 