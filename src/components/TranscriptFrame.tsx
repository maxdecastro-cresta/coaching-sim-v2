import React, { useMemo } from 'react';
import './TranscriptFrame.css';
import { MessageBubble, Message } from './MessageBubble';
import { AnalysisItem } from '@/lib/generateAnalysis';
import { useSession } from '@/contexts/SessionContext';

export interface TranscriptFrameProps {
  analysis: AnalysisItem[];
}

export function TranscriptFrame({ analysis }: TranscriptFrameProps) {
  const { messages } = useSession();

  // Convert session messages to MessageBubble-friendly objects (needs id/from/text/time)
  const renderedMessages: Message[] = useMemo(() => {
    return messages.map((m, idx) => ({
      id: String(idx),
      from: m.role === 'user' ? 'user' : 'ai',
      text: m.content,
      time: '',
    }));
  }, [messages]);

  const duration = '—';

  return (
    <div className="performance-frame">
      <div className="review-header">
        <h2 id="reviewTitle" className="review-title">
          Conversation Analysis
        </h2>
        <span className="lesson-duration">
          Transcript:&nbsp;<strong>{duration}</strong>
        </span>
      </div>

      <div className="transcript-sections">
        {/* TranscriptFeedback Section */}
        <section 
          className="transcript-section"
          aria-label="Transcript Feedback"
        >
          <div className="transcript-section-header">
            <span className="transcript-section-title">Transcript Feedback</span>
          </div>
          <div className="transcript-section-content">
            <div className="messages-container">
              {renderedMessages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </div>
          </div>
        </section>

        {/* TranscriptAnalysis Section */}
        <section 
          className="transcript-section"
          aria-label="Transcript Analysis"
        >
          <div className="transcript-section-header">
            <span className="transcript-section-title">Transcript Analysis</span>
          </div>
          <div className="transcript-section-content">
            <div className="analysis-container">
              {analysis.map((item, index) => (
                <div key={index} className="analysis-item">
                  <div className="analysis-prompt">
                    {item.prompt}
                  </div>
                  <div className="analysis-content">
                    <div className="ai-evaluation-header">
                      <div className="ai-avatar">AI</div>
                      <span className="ai-title">AI Evaluation</span>
                      <span className="menu-dots">⋮</span>
                    </div>
                    <p className="feedback-text">
                      {item.feedback}
                    </p>
                    <div className="scorecard-caption">Scorecard Evaluation</div>
                    <div className="scorecard-section">
                      <span className="bullet-point">•</span>
                      <span className="criterion-text">(coming soon)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 