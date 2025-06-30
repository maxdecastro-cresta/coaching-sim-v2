"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

interface QuizResult {
  selectedIndex: number | null;
  isCorrect: boolean | null;
}

interface QuizContextValue extends QuizResult {
  setResult: (index: number, isCorrect: boolean) => void;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextValue | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const setResult = useCallback((index: number, correct: boolean) => {
    setSelectedIndex(index);
    setIsCorrect(correct);
  }, []);

  const resetQuiz = useCallback(() => {
    setSelectedIndex(null);
    setIsCorrect(null);
  }, []);

  return (
    <QuizContext.Provider value={{ selectedIndex, isCorrect, setResult, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) {
    throw new Error('useQuiz must be used within QuizProvider');
  }
  return ctx;
} 