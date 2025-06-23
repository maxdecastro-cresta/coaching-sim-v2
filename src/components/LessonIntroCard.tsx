"use client";

import { FC, ReactNode } from "react";
import { Clock, ChevronRight } from "lucide-react";
import "./LessonIntroCard.css";

interface LessonIntroCardProps {
  illustration?: ReactNode;
  points: number;
  minutes: number;
  title: string;
  module: string;
  paragraphs: string[];
  onStart?: () => void;
}

export const LessonIntroCard: FC<LessonIntroCardProps> = ({
  illustration,
  points,
  minutes,
  title,
  module,
  paragraphs,
  onStart,
}) => (
  <div className="lesson-intro-card">
    <div className="lesson-intro-main-content">
      {/* illustration */}
      {illustration ? (
        <div className="lesson-intro-illustration">{illustration}</div>
      ) : (
        <div className="lesson-intro-illustration">
          <div className="lesson-intro-illustration-placeholder">
            🎯
          </div>
        </div>
      )}

      {/* headline */}
      <div className="lesson-intro-headline">
        <h2>{title}</h2>
        <p className="lesson-intro-subtitle">{module}</p>
      </div>

      {/* meta badges */}
      <div className="lesson-intro-badges">
        <span className="lesson-intro-badge points">
          <span className="lesson-intro-points-pill">
            {points}
          </span>
          CrestaPoints
        </span>
        <span className="lesson-intro-badge duration">
          <Clock className="lesson-intro-badge-icon" />
          {minutes}&nbsp;mins
        </span>
      </div>

      {/* description */}
      <div className="lesson-intro-description">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className={i === 0 ? "primary" : "secondary"}
          >
            {p}
          </p>
        ))}
      </div>
    </div>

    {/* CTA */}
    <button
      type="button"
      onClick={onStart}
      className="lesson-intro-cta"
    >
      Begin Lesson
      <ChevronRight className="lesson-intro-cta-icon" />
    </button>
  </div>
); 