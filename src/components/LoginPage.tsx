"use client";

import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function LoginPage() {
  const { login } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password) {
      setError('Password is required');
      return;
    }
    
    const success = login(password);
    if (!success) {
      setError('Invalid password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg-surface">
      <div className="w-full max-w-md p-8 space-y-8 bg-bg-controls rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-content-primary">Design System Demo</h1>
          <p className="mt-2 text-content-secondary">Please enter the password to continue</p>
        </div>
        
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-content-secondary">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter the site password"
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 