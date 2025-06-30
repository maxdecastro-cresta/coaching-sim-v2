"use client";

import React, { createContext, useContext } from 'react';
import type { LessonConfig } from '@/lessons';

const LessonContext = createContext<LessonConfig | undefined>(undefined);

interface LessonProviderProps {
  lesson: LessonConfig;
  children: React.ReactNode;
}

export const LessonProvider: React.FC<LessonProviderProps> = ({ lesson, children }) => {
  return (
    <LessonContext.Provider value={lesson}>{children}</LessonContext.Provider>
  );
};

export function useLesson(): LessonConfig {
  const ctx = useContext(LessonContext);
  if (!ctx) {
    throw new Error('useLesson must be used within a LessonProvider');
  }
  return ctx;
} 