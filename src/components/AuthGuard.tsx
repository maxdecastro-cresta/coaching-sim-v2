"use client";

import { ReactNode } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { LoginPage } from './LoginPage';

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <>{children}</>;
} 