'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function ThemeDemo() {
  return (
    <div className="w-full max-w-3xl mx-auto font-inter">
      <div className="flex flex-col gap-8">
        <h2 className="title-section-text text-content-primary">Design System</h2>

        {/* Typography */}
        <div className="border border-border-default rounded-base p-md bg-bg-surface">
          <h3 className="title-regular-text text-content-primary mb-3">Typography</h3>
          
          {/* Element Typography */}
          <div className="mb-6">
            <h4 className="body-small-text text-content-secondary mb-2">Element Styles</h4>
            <div className="space-y-2 ml-4">
              <p className="element-small-text text-content-primary">Element Small - 12px, standard line height, semibold (550)</p>
              <p className="element-regular-text text-content-primary">Element Regular - 14px, standard line height, semibold (550)</p>
              <p className="element-large-text text-content-primary">Element Large - 16px, standard line height, semibold (550)</p>
            </div>
          </div>
          
          {/* Body Typography */}
          <div className="mb-6">
            <h4 className="body-small-text text-content-secondary mb-2">Body Styles</h4>
            <div className="space-y-2 ml-4">
              <p className="body-caption-text text-content-secondary">Body Caption - 11px, standard line height, semibold (550)</p>
              <p className="body-small-text text-content-secondary">Body Small - 12px, standard line height, semibold (550)</p>
              <p className="body-regular-text text-content-secondary">Body Regular - 14px, standard line height, base weight (450)</p>
            </div>
          </div>
          
          {/* Title Typography */}
          <div>
            <h4 className="body-small-text text-content-secondary mb-2">Title Styles</h4>
            <div className="space-y-2 ml-4">
              <p className="title-small-text text-content-primary">Title Small - 12px, standard line height, bold (650)</p>
              <p className="title-regular-text text-content-primary">Title Regular - 14px, standard line height, bold (650)</p>
              <p className="title-large-text text-content-primary">Title Large - 16px, standard line height, bold (650)</p>
              <p className="title-section-text text-content-primary">Title Section - 18px, reduced line height, bold (650)</p>
              <p className="title-page-text text-content-primary">Title Page - 24px, reduced line height, bold (650)</p>
            </div>
          </div>
        </div>

        {/* Spacing */}
        <div className="border border-border-default rounded-base p-md bg-bg-surface">
          <h3 className="title-regular-text text-content-primary mb-3">Spacing</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-full bg-bg-action h-none mb-2"></div>
              <span className="body-small-text">none (0px)</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full bg-bg-action h-xxs mb-2"></div>
              <span className="body-small-text">xxs (2px)</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full bg-bg-action h-xs mb-2"></div>
              <span className="body-small-text">xs (4px)</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full bg-bg-action h-sm mb-2"></div>
              <span className="body-small-text">sm (6px)</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full bg-bg-action h-base mb-2"></div>
              <span className="body-small-text">base (8px)</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full bg-bg-action h-md mb-2"></div>
              <span className="body-small-text">md (12px)</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full bg-bg-action h-lg mb-2"></div>
              <span className="body-small-text">lg (16px)</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full bg-bg-action h-xl mb-2"></div>
              <span className="body-small-text">xl (24px)</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full bg-bg-action h-2xl mb-2"></div>
              <span className="body-small-text">2xl (32px)</span>
            </div>
          </div>
        </div>

        {/* Border Radius */}
        <div className="border border-border-default rounded-base p-md bg-bg-surface">
          <h3 className="title-regular-text text-content-primary mb-3">Border Radius</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <div className="h-20 w-full bg-bg-light rounded-sharp border border-border-default flex items-center justify-center">
                <span className="body-small-text">Sharp (4px)</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-20 w-full bg-bg-light rounded-base border border-border-default flex items-center justify-center">
                <span className="body-small-text">Base (8px)</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-20 w-full bg-bg-light rounded-section border border-border-default flex items-center justify-center">
                <span className="body-small-text">Section (16px)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Color Samples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-border-default rounded-base p-md bg-bg-surface">
            <h3 className="title-regular-text text-content-primary mb-3">Content Colors</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-content-primary"></div>
                <span className="body-regular-text text-content-primary">Primary</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-content-secondary"></div>
                <span className="body-regular-text text-content-secondary">Secondary</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-content-placeholder"></div>
                <span className="body-regular-text text-content-placeholder">Placeholder</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-content-action"></div>
                <span className="body-regular-text text-content-action">Action</span>
              </div>
            </div>
          </div>

          <div className="border border-border-default rounded-base p-md bg-bg-surface">
            <h3 className="title-regular-text text-content-primary mb-3">Status Colors</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-content-positive"></div>
                <span className="body-regular-text text-content-positive">Positive</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-content-warning"></div>
                <span className="body-regular-text text-content-warning">Warning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-content-negative"></div>
                <span className="body-regular-text text-content-negative">Negative</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-content-disabled"></div>
                <span className="body-regular-text text-content-disabled">Disabled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Background Samples */}
        <div className="border border-border-default rounded-base p-md bg-bg-surface">
          <h3 className="title-regular-text text-content-primary mb-3">Background Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="h-12 rounded-base bg-bg-surface border border-border-default flex items-center justify-center body-small-text">
                Surface
              </div>
              <div className="h-12 rounded-base bg-bg-elevation border border-border-default flex items-center justify-center body-small-text">
                Elevation
              </div>
              <div className="h-12 rounded-base bg-bg-section border border-border-default flex items-center justify-center body-small-text">
                Section
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded-base bg-bg-action border border-border-default flex items-center justify-center body-small-text text-content-contrast">
                Action
              </div>
              <div className="h-12 rounded-base bg-bg-action-hover border border-border-default flex items-center justify-center body-small-text text-content-contrast">
                Action Hover
              </div>
              <div className="h-12 rounded-base bg-bg-light border border-border-default flex items-center justify-center body-small-text">
                Light
              </div>
              <div className="h-12 rounded-base bg-bg-light-hover border border-border-default flex items-center justify-center body-small-text">
                Light Hover
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded-base bg-bg-positive border border-border-default flex items-center justify-center body-small-text">
                Positive
              </div>
              <div className="h-12 rounded-base bg-bg-warning border border-border-default flex items-center justify-center body-small-text">
                Warning
              </div>
              <div className="h-12 rounded-base bg-bg-negative border border-border-default flex items-center justify-center body-small-text">
                Negative
              </div>
              <div className="h-12 rounded-base bg-bg-disabled border border-border-default flex items-center justify-center body-small-text">
                Disabled
              </div>
            </div>
          </div>
        </div>

        {/* Border Samples */}
        <div className="border border-border-default rounded-base p-md bg-bg-surface">
          <h3 className="title-regular-text text-content-primary mb-3">Border Colors</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-20 rounded-section bg-bg-surface flex items-center justify-center element-regular-text" style={{ border: '2px solid var(--border-default)' }}>
              Default
            </div>
            <div className="h-20 rounded-section bg-bg-surface flex items-center justify-center element-regular-text" style={{ border: '2px solid var(--border-action)' }}>
              Action
            </div>
            <div className="h-20 rounded-section bg-bg-surface flex items-center justify-center element-regular-text" style={{ border: '2px solid var(--border-warning)' }}>
              Warning
            </div>
            <div className="h-20 rounded-section bg-bg-surface flex items-center justify-center element-regular-text" style={{ border: '2px solid var(--border-controls)' }}>
              Controls
            </div>
            <div className="h-20 rounded-section bg-bg-surface flex items-center justify-center element-regular-text" style={{ border: '2px solid var(--border-positive)' }}>
              Positive
            </div>
            <div className="h-20 rounded-section bg-bg-surface flex items-center justify-center element-regular-text" style={{ border: '2px solid var(--border-negative)' }}>
              Negative
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
