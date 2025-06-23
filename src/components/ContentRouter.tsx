import { usePathname } from 'next/navigation';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { CoachingContent } from '@/components/pages/CoachingContent';

export function ContentRouter() {
  const pathname = usePathname();

  // Return the appropriate content based on the current pathname
  switch (pathname) {
    case '/coaching':
      return <CoachingContent />;
    case '/examples':
      return (
        <>
          <h1 className="title-page-text mb-8 text-content-primary">
            Examples
          </h1>
          <p className="text-content-secondary mb-6">
            This is a placeholder for the Examples page. Add your content here when prototyping.
          </p>
          <div className="bg-bg-surface rounded-lg p-6 shadow-sm">
            <h2 className="title-section-text mb-4">Example Content</h2>
            <p className="text-content-secondary">This is where your examples content would go.</p>
          </div>
        </>
      );
    case '/settings':
      return (
        <>
          <h1 className="title-page-text mb-8 text-content-primary">
            Settings
          </h1>
          <p className="text-content-secondary mb-6">
            This is a placeholder for the Settings page. Add your content here when prototyping.
          </p>
          <div className="bg-bg-surface rounded-lg p-6 shadow-sm">
            <h2 className="title-section-text mb-4">Settings Content</h2>
            <p className="text-content-secondary">This is where your settings content would go.</p>
          </div>
        </>
      );
    case '/':
    default:
      return <DashboardContent />;
  }
} 