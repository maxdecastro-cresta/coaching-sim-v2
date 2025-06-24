"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { ChevronRight, Check } from "lucide-react";
import "./QuizPanel.css";

interface QuizPanelProps {
  onComplete?: () => void;
}

export const QuizPanel: FC<QuizPanelProps> = ({ onComplete }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerIssue, setCustomerIssue] = useState("");

  const handleSubmit = () => {
    // Show completion state
    setIsCompleted(true);
    
    // After 2 seconds, trigger the completion callback and reset
    setTimeout(() => {
      setIsCompleted(false);
      setCustomerName("");
      setCustomerIssue("");
      if (onComplete) {
        onComplete();
      }
    }, 2000);
  };

  // Show completion view
  if (isCompleted) {
    return (
      <div className="quiz-content">
        <div className="quiz-completion">
          <div className="quiz-completion-icon">
            <Check className="quiz-checkmark" />
          </div>
          <h3 className="quiz-completion-title">Quiz Complete!</h3>
        </div>
      </div>
    );
  }
  return (
    <div className="quiz-content">
      <div className="quiz-main-content">
        {/* Header */}
        <div className="quiz-header">
          <div className="quiz-header-left">
            <span className="quiz-header-title">Finding information for an upsell</span>
          </div>
        </div>
        <p className="quiz-subtitle">Fill in the fields below</p>

        {/* Question image */}
        <div className="quiz-image-wrapper">
          <Image
            src="/QuizTestImage.png"
            alt="Quiz reference"
            width={300}
            height={200}
            className="quiz-image"
          />
        </div>

        {/* Input fields */}
        <div className="quiz-inputs">
          <label className="quiz-input-label" htmlFor="customerName">Customer Name</label>
          <input
            id="customerName"
            type="text"
            className="quiz-input"
            placeholder="Enter the information"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <label className="quiz-input-label" htmlFor="customerIssue">Customer Issue</label>
          <input
            id="customerIssue"
            type="text"
            className="quiz-input"
            placeholder="Enter the information"
            value={customerIssue}
            onChange={(e) => setCustomerIssue(e.target.value)}
          />
        </div>
      </div>

      {/* Submit button */}
      <div className="quiz-submit-wrapper">
        <button 
          className="quiz-submit-button"
          onClick={handleSubmit}
          disabled={!customerName.trim() || !customerIssue.trim()}
        >
          <span>Complete Quiz</span>
          <ChevronRight className="quiz-submit-icon" />
        </button>
      </div>
    </div>
  );
}; 