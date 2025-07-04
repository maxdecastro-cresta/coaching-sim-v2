import React, { useState } from 'react';
import './SandboxContent.css';
import { CongratsBanner } from '@/components/CongratsBanner';
import { Confetti } from '@/components/Confetti';
import { AnimatedLoader } from '@/components/AnimatedLoader';
import { AnimatedFeedbackHeader } from '@/components/AnimatedFeedbackHeader';
import { SidebarProvider } from '@/components/ui/sidebar';
import { FeedbackDialog } from '@/components/FeedbackDialog';

export function SandboxContent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showAnimatedLoader, setShowAnimatedLoader] = useState(false);
  const [showAnimatedHeader, setShowAnimatedHeader] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [dialogPassed, setDialogPassed] = useState<boolean | null>(null);
  const [dialogScore, setDialogScore] = useState<number | null>(null);

  const handleDemoClick = () => {
    setShowBanner(false);
    // Small delay to ensure animation replays even if clicking button multiple times
    setTimeout(() => setShowBanner(true), 10);
  };

  const handleLoadingClick = () => {
    setShowLoading(true);
    // Auto-hide after 3 seconds for demo purposes
    setTimeout(() => setShowLoading(false), 3000);
  };

  const handleAnimatedLoaderClick = () => {
    setShowAnimatedLoader(true);
    // Auto-hide after 4 seconds for demo purposes
    setTimeout(() => setShowAnimatedLoader(false), 4000);
  };

  const handleAnimatedHeaderClick = () => {
    setShowAnimatedHeader(false);
    // Small delay to ensure animation replays even if clicking button multiple times
    setTimeout(() => setShowAnimatedHeader(true), 10);
  };

  const handleShowFeedbackDialog = (passed: boolean) => {
    setDialogPassed(passed);
    // Random score for demo
    const randomScore = Math.floor(Math.random() * 31) + 70; // 70-100
    setDialogScore(randomScore);
    setShowFeedbackDialog(true);

    // Auto-hide after 4 seconds
    setTimeout(() => setShowFeedbackDialog(false), 4000);
  };

  return (
    <main className="sandbox-main">
      <h1 className="sandbox-title">UI Component Sandbox</h1>
      <p className="sandbox-subtitle">Use this page to experiment with new UI components.</p>

      {/* Demo controls */}
      <div className="sandbox-controls">
        <button 
          onClick={handleDemoClick}
          className="sandbox-demo-button"
        >
          Demo Congrats Animation + Confetti
        </button>
        
        <button 
          onClick={handleLoadingClick}
          className="sandbox-demo-button sandbox-demo-button-secondary"
        >
          Demo Loading State
        </button>

        <button 
          onClick={handleAnimatedLoaderClick}
          className="sandbox-demo-button sandbox-demo-button-tertiary"
        >
          Demo Animated Loader
        </button>

        <button 
          onClick={handleAnimatedHeaderClick}
          className="sandbox-demo-button"
        >
          Demo Animated Feedback Header
        </button>

        <button
          onClick={() => handleShowFeedbackDialog(true)}
          className="sandbox-demo-button sandbox-demo-button-success"
        >
          Show Feedback Dialog (Passed)
        </button>

        <button
          onClick={() => handleShowFeedbackDialog(false)}
          className="sandbox-demo-button sandbox-demo-button-fail"
        >
          Show Feedback Dialog (Failed)
        </button>
      </div>

      {/* Feedback Dialog Demo - positioned at top for visibility */}
      {showFeedbackDialog && (
        <SidebarProvider>
          <div className="feedback-dialog-wrapper">
            <FeedbackDialog passed={dialogPassed} score={dialogScore} />
          </div>
        </SidebarProvider>
      )}

      {/* Sandbox area: place new components below for quick iteration */}
      <div className="sandbox-area">
        {/* Container to match TranscriptPane positioning context */}
        <div className="sandbox-animation-container">
          {showBanner && (
            <div className="congrats-banner-wrapper">
              <CongratsBanner onBegin={() => setShowBanner(false)} />
            </div>
          )}
        </div>

        {/* Animated Feedback Header Demo */}
        {showAnimatedHeader && (
          <div className="animated-header-wrapper">
            <AnimatedFeedbackHeader 
              onAnimationComplete={() => console.log('Feedback header animation complete!')} 
            />
          </div>
        )}
      </div>

      {/* Confetti effect - appears above everything */}
      <Confetti show={showBanner} duration={3000} />

      {/* Loading overlay demo */}
      {showLoading && (
        <div className="loading-overlay">
          <img src="/Sun.png" alt="Loading" className="loading-sun" />
          <div className="loading-text">Loading...</div>
        </div>
      )}

      {/* Animated loader demo */}
      {showAnimatedLoader && (
        <AnimatedLoader />
      )}
    </main>
  );
} 