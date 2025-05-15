"use client";

import { useAuth } from '@/lib/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center gap-2 text-content-secondary hover:text-content-primary"
      onClick={logout}
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
} 