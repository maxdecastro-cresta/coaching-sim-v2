"use client";

import React, { useState, useEffect } from 'react';
import { ChevronRight } from "lucide-react";
import { TranscriptPane } from "@/components/TranscriptPane";
import { SidePane } from "@/components/SidePane";
import { Message } from "@/components/MessageBubble";
import './CoachingContent.css';
import { useLesson } from '@/contexts/LessonContext';
import { useSession } from '@/contexts/SessionContext';

export function CoachingContent() {
  const lesson = useLesson();
  const { setLesson } = useSession();
  const [duration, setDuration] = useState<string>("0:00");
  const [restartSignal, setRestartSignal] = useState<number>(0);
  const [messages, setMessages] = useState<Message[]>([]);

  // Register the active lesson in SessionContext
  useEffect(() => {
    setLesson(lesson);
  }, [lesson, setLesson]);

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
            <span>{lesson.module}&nbsp;</span>
            <ChevronRight className="chevron" />
            <span className="current">{lesson.title}</span>
          </nav>

          {/* B. lesson title */}
          <header className="lesson-title-header">
            <h2 className="lesson-title">
              {lesson.title}
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