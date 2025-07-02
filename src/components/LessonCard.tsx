import React from 'react';
import { Clock, Medal, ChevronRight } from 'lucide-react';
import './LessonCard.css';

interface LessonCardProps {
  status: 'Incomplete' | 'Complete' | 'In progress';
  duration: string;
  title: string;
  dueDate: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  creditPoints: number;
  onBeginLesson?: () => void;
}

export function LessonCard({
  status,
  duration,
  title,
  dueDate,
  difficulty,
  creditPoints,
  onBeginLesson
}: LessonCardProps) {
  const getStatusClassName = (status: string) => {
    return status.toLowerCase().replace(' ', '-');
  };

  return (
    <div className="lesson-card">
      {/* Status and Duration Row */}
      <div className="lesson-card-header">
        <div className="lesson-card-badges">
          <span className={`status-badge ${getStatusClassName(status)}`}>
            {status}
          </span>
          <span className="duration-badge">
            <Clock size={12} />
            {duration}
          </span>
        </div>
      </div>

      {/* Lesson Title */}
      <h3 className="lesson-card-title">
        {title}
      </h3>

      {/* Due Date */}
      <p className="lesson-card-due-date">
        Due: {dueDate}
      </p>

      {/* Bottom Row - Difficulty, CP, and Begin Button */}
      <div className="lesson-card-footer">
        <div className="lesson-card-meta">
          <span className={`difficulty-badge ${difficulty.toLowerCase()}`}>
            {difficulty}
          </span>
          <span className="cp-badge">
            <Medal size={12} />
            {creditPoints} CP
          </span>
        </div>
        
        <button 
          className="begin-lesson-btn"
          onClick={onBeginLesson}
          disabled={!onBeginLesson}
        >
          Begin Lesson
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
} 