import React from 'react';
import './PerformanceFrame.css';

interface PerformanceFrameProps {
  scorePct: number | null;
  notes: string;
}

export function PerformanceFrame({ scorePct, notes }: PerformanceFrameProps) {
  const duration = '—';

  return (
    <div className="performance-frame">
      <div className="review-header">
        <h2 id="reviewTitle" className="review-title">
          Review your Lesson
        </h2>
        <span className="lesson-duration">
          Lesson Duration:&nbsp;<strong>{duration}</strong>
        </span>
      </div>

      <section
        className="review-card"
        aria-labelledby="reviewTitle"
      >
        {/* Left */}
        <aside className="performance-pane">
          <div className="performance-content">
            <h3 className="pane-title">Your Performance</h3>
            <p className="score-value">
              {scorePct ?? '--'}
              <span className="score-unit">%</span>
            </p>
            <p className="score-label">Overall score</p>
          </div>
          <button className="report-link" type="button">
            Report AI Grading
          </button>
        </aside>

        {/* Right */}
        <article className="feedback-pane">
          <header className="feedback-header">
            <span className="header-icon" aria-hidden />
            <h3>Feedback from the Lesson</h3>
          </header>

          <h4 className="feedback-section-title">General Notes</h4>

          <div className="feedback-box">
            {notes.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
} 