import React from 'react';
import { Book } from 'lucide-react';
import './LessonFrame.css';

interface LessonFrameProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}

export function LessonFrame({ title, subtitle, children, className = '' }: LessonFrameProps) {
  return (
    <section className={`lesson-frame ${className}`}>
      <div className="lesson-frame-header">
        <div className="lesson-frame-header-content">
          <div className="lesson-frame-icon">
            <Book size={20} />
          </div>
          <div className="lesson-frame-text">
            <h2 className="lesson-frame-title">{title}</h2>
            <p className="lesson-frame-subtitle">{subtitle}</p>
          </div>
        </div>
      </div>
      <div className="lesson-frame-divider"></div>
      <div className="lesson-frame-content">
        {children}
      </div>
    </section>
  );
} 