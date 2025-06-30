"use client";

import React, { useEffect, useState } from 'react';
import { FeedbackHeader } from '@/components/FeedbackHeader';
import { FeedbackDialog } from '@/components/FeedbackDialog';
import { PerformanceFrame } from '@/components/PerformanceFrame';
import { TranscriptFrame } from '@/components/TranscriptFrame';
import { useSession } from '@/contexts/SessionContext';
import { evaluateLesson } from '@/lib/evaluateLesson';
import { generateAnalysis, AnalysisItem } from '@/lib/generateAnalysis';
import { generateGeneralNotes } from '@/lib/generateGeneralNotes';
import { getLessonEvaluationData } from '@/lessons/evaluation';
import './FeedbackContent.css';

export function FeedbackContent() {
  const { lesson, messages } = useSession();

  const [loading, setLoading] = useState(true);
  const [passed, setPassed] = useState<boolean | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisItem[]>([]);
  const [notes, setNotes] = useState<string>('');

  // Run LLM evaluations once on mount (or when messages freeze)
  useEffect(() => {
    async function run() {
      if (!lesson) return;
      try {
        setLoading(true);

        // --- Pass / fail
        const { criteria } = getLessonEvaluationData(lesson.id, messages);
        const result = await evaluateLesson(messages, criteria);
        setPassed(result.passed);
        setScore(result.score);

        // --- Analysis items
        const aiAnalysis = await generateAnalysis(messages);
        setAnalysis(aiAnalysis);

        // --- General notes
        const genNotes = await generateGeneralNotes(messages);
        setNotes(genNotes);
      } catch (err) {
        console.error('Feedback generation error', err);
      } finally {
        setLoading(false);
      }
    }

    // Trigger when we reach feedback page (messages frozen)
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="feedback-main">
      {/* Top 1/3 Header Section */}
      <FeedbackHeader />
      
      {/* Result dialog overlay */}
      {!loading && passed !== null && (
        <FeedbackDialog passed={passed} score={score} />
      )}
      
      {loading && (
        <div className="loading-overlay">
          <img src="/Sun.png" alt="Loading" className="loading-sun" />
          <div className="loading-text">Loading...</div>
        </div>
      )}
      
      {/* Bottom 2/3 Content Section */}
      <div className="feedback-body">
        <div className="feedback-body-wrapper">
          <div className="feedback-content">
            <div className="frames-container">
              <PerformanceFrame scorePct={score} notes={notes} />
              <TranscriptFrame analysis={analysis} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 