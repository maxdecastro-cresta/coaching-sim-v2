import React, { useState } from 'react';
import { ChevronRight } from "lucide-react";
import { TranscriptPane } from "@/components/TranscriptPane";
import { SidePane } from "@/components/SidePane";
import './CoachingContent.css';

export function CoachingContent() {
  const [duration, setDuration] = useState<string>("0:00");
  const [restartSignal, setRestartSignal] = useState<number>(0);

  const handleRestart = () => {
    setRestartSignal(prev => prev + 1);
  };

  return (
    <main className="lesson-main">
      {/* wrapper to centre on big screens */}
      <div className="lesson-wrapper">
        
        {/* breadcrumb + title block */}
        <div className="lesson-header">
          {/* A. breadcrumb */}
          <nav className="lesson-breadcrumb">
            <span>Handling Customer Objectives&nbsp;</span>
            <ChevronRight className="chevron" />
            <span className="current">Lesson&nbsp;Three</span>
          </nav>

          {/* B. lesson title */}
          <header className="lesson-title-header">
            <h2 className="lesson-title">
              Handling Customer Objections
            </h2>
          </header>
        </div>

        {/* two-column grid (locked to viewport height) */}
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh_-_var(--top-nav-height)_-_120px)]">
          <TranscriptPane duration={duration} setDuration={setDuration} onRestart={handleRestart} />
          <SidePane duration={duration} resetSignal={restartSignal} />
        </div>

      </div>
    </main>
  );
} 