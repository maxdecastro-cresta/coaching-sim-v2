"use client";

import React, { createContext, useCallback, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { LessonConfig } from '@/lessons';
import type { TranscriptMessage } from '@/lessons/evaluation';

interface SessionContextValue {
  /** Currently active lesson, if any */
  lesson?: LessonConfig;
  /** Set the active lesson; typically called once at lesson page mount */
  setLesson: (lesson: LessonConfig) => void;

  /** Running transcript for the session */
  messages: TranscriptMessage[];
  /** Push a new message into the transcript */
  addMessage: (msg: TranscriptMessage) => void;

  /** Call when the user ends the lesson; navigates to /feedback */
  endLesson: () => void;
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [lesson, setLessonState] = useState<LessonConfig | undefined>();
  const [messages, setMessages] = useState<TranscriptMessage[]>([]);

  const setLesson = useCallback((l: LessonConfig) => {
    setLessonState(l);
  }, []);

  const addMessage = useCallback((msg: TranscriptMessage) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  const endLesson = useCallback(() => {
    router.push('/feedback');
  }, [router]);

  return (
    <SessionContext.Provider value={{ lesson, setLesson, messages, addMessage, endLesson }}>
      {children}
    </SessionContext.Provider>
  );
};

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within SessionProvider');
  return ctx;
} 