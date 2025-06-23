"use client";

import { FC } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import "./QuizPanel.css";

export const QuizPanel: FC = () => {
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
            src="/QuizImage.png"
            alt="Quiz reference"
            width={300}
            height={200}
            className="quiz-image"
          />
        </div>

        {/* Input fields */}
        <div className="quiz-inputs">
          <label className="quiz-input-label" htmlFor="serviceTypes">Service Types</label>
          <input
            id="serviceTypes"
            type="text"
            className="quiz-input"
            placeholder="Enter the information"
          />

          <label className="quiz-input-label" htmlFor="alarmGroups">Alarm Groups</label>
          <input
            id="alarmGroups"
            type="text"
            className="quiz-input"
            placeholder="Enter the information"
          />
        </div>
      </div>

      {/* Submit button */}
      <div className="quiz-submit-wrapper">
        <button className="quiz-submit-button">
          <span>Submit Quiz</span>
          <ChevronRight className="quiz-submit-icon" />
        </button>
      </div>
    </div>
  );
}; 