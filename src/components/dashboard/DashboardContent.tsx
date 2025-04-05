import React from 'react';

export function DashboardContent() {
  return (
    <>
      <h1 className="title-page-text mb-8 text-content-primary">
        Dashboard
      </h1>
      <p className="text-content-secondary mb-6">
        Welcome to your prototype dashboard. This is the main content area template that you can use as a starting point.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-bg-surface rounded-lg p-6 shadow-sm">
          <h2 className="title-section-text mb-4">Section Title</h2>
          <p className="text-content-secondary">Replace this content with your actual dashboard content when building a prototype.</p>
        </div>
        <div className="bg-bg-surface rounded-lg p-6 shadow-sm">
          <h2 className="title-section-text mb-4">Another Section</h2>
          <p className="text-content-secondary">You can add more sections, charts, tables, or other components as needed.</p>
        </div>
      </div>
    </>
  );
} 