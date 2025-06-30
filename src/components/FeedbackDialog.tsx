import React from 'react';
import { useSidebar } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import './FeedbackDialog.css';

function StatChip({ type, value, label }: {type:'points'|'turns'|'time'; value:number|string; label:string}) {
  const colorMap = {
    points: '#C565FF',
    turns:  '#2ECE81',
    time:   '#7366FF',
  } as const;

  return (
    <div className="stat-chip">
      <span
        className="stat-chip__badge"
        style={{ backgroundColor: colorMap[type] }}
      >
        {value}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

interface LessonResultProps {
  passed: boolean | null;
  score: number | null;
}

export function LessonResult({ passed, score }: LessonResultProps) {
  return (
    <div className="result-container" role="dialog" aria-modal="true">
      <h2 className="result-title">Your Lesson</h2>

      <div className="result-stats">
        <StatChip type="points" value={25}   label="CrestaPoints" />
        <StatChip type="turns"  value={8}    label="Message Turns" />
        <StatChip type="time"   value="1m 24s" label="Time" />
      </div>

      <div className="result-illustration">
        <div className="circle-bg"></div>
        <img className="happy-sun" src="/Sun.png" alt="" />
        {passed ? (
          <img className="checkmark" src="/checkmark.png" alt="" />
        ) : (
          <img className="checkmark" src="/xmark.png" alt="" />
        )}
      </div>

      <h3 className="result-heading">
        {passed ? 'Congratulations you successfully handled the customer objection!' : 'You have failed the lesson.'}
      </h3>

      {passed !== null && (
        <p className="result-subtext">
          {passed ? `Overall score: ${score ?? '--'}%` : `Overall score: ${score ?? '--'}%`}
        </p>
      )}
    </div>
  );
}

interface FeedbackDialogProps {
  passed: boolean | null;
  score: number | null;
}

export function FeedbackDialog({ passed, score }: FeedbackDialogProps) {
  const { state } = useSidebar();
  const isMobile = useIsMobile();

  const dialogClasses = [
    'feedback-dialog',
    state === 'collapsed' ? 'sidebar-collapsed' : 'sidebar-expanded',
    isMobile ? 'mobile' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={dialogClasses}>
      <div className="feedback-dialog-content">
        <LessonResult passed={passed} score={score} />
      </div>
    </div>
  );
} 