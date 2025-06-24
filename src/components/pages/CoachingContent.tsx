import React, { useState, Dispatch, SetStateAction } from 'react';
import { ChevronRight } from "lucide-react";
import { TranscriptPane } from "@/components/TranscriptPane";
import { SidePane } from "@/components/SidePane";
import { Message } from "@/components/MessageBubble";
import './CoachingContent.css';

export function CoachingContent() {
  const [duration, setDuration] = useState<string>("0:00");
  const [restartSignal, setRestartSignal] = useState<number>(0);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleRestart = () => {
    setRestartSignal(prev => prev + 1);
    setMessages([]); // Clear messages on restart
  };

  return (
    <main className="lesson-main">
      {/* wrapper to centre on big screens */}
      <div className="lesson-wrapper">
        
        {/* breadcrumb + title block */}
        <div className="lesson-header">
          {/* A. breadcrumb */}
          <nav className="lesson-breadcrumb">
            <span>United Customer Care - Baggage&nbsp;</span>
            <ChevronRight className="chevron" />
            <span className="current">Lesson&nbsp;Three</span>
          </nav>

          {/* B. lesson title */}
          <header className="lesson-title-header">
            <h2 className="lesson-title">
              Handling Missing Baggage Claims
            </h2>
          </header>
        </div>

        {/* two-column grid (flexible height) */}
        <div className="lesson-grid">
          <TranscriptPane 
            duration={duration} 
            setDuration={setDuration} 
            onRestart={handleRestart}
            messages={messages}
            setMessages={setMessages}
          />
          <SidePane 
            duration={duration} 
            resetSignal={restartSignal} 
            messages={messages}
          />
        </div>

      </div>
    </main>
  );
} 