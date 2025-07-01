"use client";

import React from 'react';
import { AnimatedFeedbackHeader } from '@/components/AnimatedFeedbackHeader';
import { LeaderboardDialog } from '@/components/LeaderboardDialog';
import { LeaderboardBox } from '@/components/LeaderboardBox';
import './LeaderboardContent.css';

export function LeaderboardContent() {
  return (
    <main className="leaderboard-main">
      {/* Top Header Section */}
      <AnimatedFeedbackHeader />

      {/* Dialog overlay (placeholder) */}
      <LeaderboardDialog />

      {/* Body section */}
      <div className="leaderboard-body">
        <div className="leaderboard-body-wrapper">
          <div className="leaderboard-content">
            <div className="frames-container">
              <LeaderboardBox />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 