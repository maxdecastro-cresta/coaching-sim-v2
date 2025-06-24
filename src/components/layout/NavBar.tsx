"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSidebar } from "@/components/ui/sidebar";
import './NavBar.css';

export function NavBar() {
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
        <a href="#" className="navbar-tab">
          Home
        </a>
        <a href="#" className="navbar-tab active">
          Coaching
        </a>
        <a href="#" className="navbar-tab">
          Rewards
        </a>
      </div>
    </nav>
  );
} 