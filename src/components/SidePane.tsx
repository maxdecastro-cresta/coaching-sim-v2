"use client";

import { FC, useState, useEffect } from "react";
import { BookOpen, Lightbulb, ClipboardCheck, Target } from "lucide-react";
import Image from "next/image";
import './SidePane.css';
import { generateHint, Message } from "../lib/generateHint";
import { QuizPanel } from "./QuizPanel";

type TabType = 'quizzes' | 'hints' | 'feedback';

interface SidePaneProps {
  duration?: string;
  messages?: Message[];
  resetSignal?: number;
}

export const SidePane: FC<SidePaneProps> = ({ duration = "0:00", messages = [], resetSignal }) => {
  const [activeTab, setActiveTab] = useState<TabType>('quizzes');
  const [hints, setHints] = useState<string[]>([]);
  const [loadingHint, setLoadingHint] = useState(false);
  const [hintError, setHintError] = useState<string | null>(null);

  // Clear hints when resetSignal changes
  useEffect(() => {
    setHints([]);
  }, [resetSignal]);

  const handleGenerateHint = async () => {
    try {
      setLoadingHint(true);
      setHintError(null);
      const hint = await generateHint(messages);
      setHints(prev => [hint, ...prev]);
    } catch (err: any) {
      setHintError(err.message || 'Failed to generate hint');
    } finally {
      setLoadingHint(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'quizzes':
        // For demo purposes we always show the quiz panel. Toggle this flag to false to restore the original empty state.
        const showQuizDemo = true;
        if (showQuizDemo) {
          return <QuizPanel />;
        }

        // Empty state retained for future use
        return (
          <div className="quizzes-empty">
            <Image
              src="/TestBlank.png"
              alt="No quizzes available"
              width={80}
              height={80}
              className="quizzes-empty-image"
            />
            <div className="quizzes-empty-text">
              <p className="quizzes-empty-title">Nothing to see here!</p>
              <p className="quizzes-empty-subtitle">Quizzes will appear as the lesson progresses</p>
            </div>
          </div>
        );
      case 'hints':
        return (
          <div className="feedback-content">
            <div className="feedback-header">
              <h3 className="feedback-title">Hints</h3>
              <p className="feedback-subtitle">Use hints when you're not sure what to do next</p>
            </div>

            <button
              className="hints-button"
              onClick={handleGenerateHint}
              disabled={loadingHint}
            >
              <div className="performance-item-left">
                <Lightbulb className="performance-item-icon" />
                <span className="performance-item-text">
                  {loadingHint ? 'Generating…' : 'Need a hint?'}
                </span>
              </div>
            </button>

            {hintError && (
              <p className="quizzes-empty-subtitle" style={{ marginTop: 8, color: '#dc2626' }}>
                {hintError}
              </p>
            )}

            <div className="hints-list">
              {hints.map((hint, idx) => (
                <div key={idx} className="hint-container">
                  <div className="performance-item-left">
                    <Lightbulb className="performance-item-icon" />
                    <span className="performance-item-text">{hint}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'feedback':
        return (
          <div className="feedback-content">
            <div className="feedback-header">
              <h3 className="feedback-title">Feedback</h3>
              <p className="feedback-subtitle">Get instant feedback on your performance.</p>
            </div>

            <div className="talk-time-section">
              <h4 className="talk-time-title">Talk time</h4>
              <div className="talk-time-display">
                <span className="talk-time-value">{duration}</span>
                <span className="talk-time-change">▲ 27%</span>
              </div>
              <p className="talk-time-average">8m 23s Average Lesson Length</p>
            </div>

            <div className="performance-section">
              <h4 className="performance-title">Performance</h4>
              <div className="performance-items">
                <div className="performance-item">
                  <div className="performance-item-left">
                    <Target className="performance-item-icon" />
                    <span className="performance-item-text">Conveying empathy</span>
                  </div>
                  <span className="performance-badge satisfactory">
                    Satisfactory
                  </span>
                </div>
                
                <div className="performance-item">
                  <div className="performance-item-left">
                    <Target className="performance-item-icon" />
                    <span className="performance-item-text">Building rapport</span>
                  </div>
                  <span className="performance-badge missing">
                    Missing
                  </span>
                </div>
                
                <div className="performance-item">
                  <div className="performance-item-left">
                    <Target className="performance-item-icon" />
                    <span className="performance-item-text">Building rapport</span>
                  </div>
                  <span className="performance-badge percentage">
                    68%
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="side-pane">
      {/* tabstrip */}
      <nav className="side-pane-nav">
        <button 
          type="button" 
          onClick={() => setActiveTab('quizzes')}
          className={`side-pane-tab ${activeTab === 'quizzes' ? 'active' : 'inactive'}`}
        >
          <BookOpen className="side-pane-tab-icon" />
          Quizzes
        </button>

        <button 
          type="button" 
          onClick={() => setActiveTab('hints')}
          className={`side-pane-tab ${activeTab === 'hints' ? 'active' : 'inactive'}`}
        >
          <Lightbulb className="side-pane-tab-icon" />
          Hints
        </button>

        <button 
          type="button" 
          onClick={() => setActiveTab('feedback')}
          className={`side-pane-tab ${activeTab === 'feedback' ? 'active' : 'inactive'}`}
        >
          <ClipboardCheck className="side-pane-tab-icon" />
          Feedback
        </button>
      </nav>

      {/* body with tab content */}
      <div className="side-pane-content">
        {renderTabContent()}
      </div>

      {/* Bottom toolbar */}
      <footer className="side-pane-footer">
        <div className="side-pane-footer-left">
          <span className="side-pane-footer-title">Learning Tools</span>
        </div>
        <div className="side-pane-footer-right">
        </div>
      </footer>
    </section>
  );
}; 