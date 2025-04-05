'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ThemeDemo() {
  return (
    <div className="w-full max-w-3xl mx-auto font-inter">
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-bold text-content-primary">Theme Demo</h2>

        {/* Demo Tabs */}
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="p-4 border rounded-md mt-2">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-content-primary mb-1">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-800"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-content-primary mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-800"
                  placeholder="Enter your email"
                />
              </div>
              <button className="px-4 py-2 rounded-md bg-primary-6 text-white">
                Save changes
              </button>
            </div>
          </TabsContent>
          <TabsContent value="password" className="p-4 border rounded-md mt-2">
            <div className="space-y-4">
              <div>
                <label htmlFor="current" className="block text-sm font-medium text-content-primary mb-1">
                  Current password
                </label>
                <input
                  id="current"
                  type="password"
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-800"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label htmlFor="new" className="block text-sm font-medium text-content-primary mb-1">
                  New password
                </label>
                <input
                  id="new"
                  type="password"
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-800"
                  placeholder="Enter new password"
                />
              </div>
              <button className="px-4 py-2 rounded-md bg-primary-6 text-white">
                Change password
              </button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Color Samples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-md p-4">
            <h3 className="text-lg font-semibold text-content-primary mb-3">Content Colors</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-content-primary"></div>
                <span className="text-content-primary">Primary</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-content-secondary"></div>
                <span className="text-content-secondary">Secondary</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-content-placeholder"></div>
                <span className="text-content-placeholder">Placeholder</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-content-action"></div>
                <span className="text-content-action">Action</span>
              </div>
            </div>
          </div>

          <div className="border rounded-md p-4">
            <h3 className="text-lg font-semibold text-content-primary mb-3">Status Colors</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-content-positive"></div>
                <span className="text-content-positive">Positive</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-content-warning"></div>
                <span className="text-content-warning">Warning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-content-negative"></div>
                <span className="text-content-negative">Negative</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-content-disabled"></div>
                <span className="text-content-disabled">Disabled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Background Samples */}
        <div className="border rounded-md p-4">
          <h3 className="text-lg font-semibold text-content-primary mb-3">Background Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="h-12 rounded bg-bg-surface border flex items-center justify-center text-xs">Surface</div>
              <div className="h-12 rounded bg-bg-elevation border flex items-center justify-center text-xs">Elevation</div>
              <div className="h-12 rounded bg-bg-section border flex items-center justify-center text-xs">Section</div>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded bg-bg-action border flex items-center justify-center text-xs text-white">Action</div>
              <div className="h-12 rounded bg-bg-action-hover border flex items-center justify-center text-xs text-white">Action Hover</div>
              <div className="h-12 rounded bg-bg-light border flex items-center justify-center text-xs">Light</div>
              <div className="h-12 rounded bg-bg-light-hover border flex items-center justify-center text-xs">Light Hover</div>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded bg-bg-positive border flex items-center justify-center text-xs">Positive</div>
              <div className="h-12 rounded bg-bg-warning border flex items-center justify-center text-xs">Warning</div>
              <div className="h-12 rounded bg-bg-negative border flex items-center justify-center text-xs">Negative</div>
              <div className="h-12 rounded bg-bg-disabled border flex items-center justify-center text-xs">Disabled</div>
            </div>
          </div>
        </div>

        {/* Border Samples */}
        <div className="border rounded-md p-4">
          <h3 className="text-lg font-semibold text-content-primary mb-3">Border Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="h-12 rounded bg-white dark:bg-dark-7 border-2 border-border-default flex items-center justify-center text-xs">Default</div>
              <div className="h-12 rounded bg-white dark:bg-dark-7 border-2 border-border-controls flex items-center justify-center text-xs">Controls</div>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded bg-white dark:bg-dark-7 border-2 border-border-action flex items-center justify-center text-xs">Action</div>
              <div className="h-12 rounded bg-white dark:bg-dark-7 border-2 border-border-positive flex items-center justify-center text-xs">Positive</div>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded bg-white dark:bg-dark-7 border-2 border-border-warning flex items-center justify-center text-xs">Warning</div>
              <div className="h-12 rounded bg-white dark:bg-dark-7 border-2 border-border-negative flex items-center justify-center text-xs">Negative</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 