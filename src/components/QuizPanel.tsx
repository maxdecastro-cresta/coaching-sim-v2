"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { ChevronRight, Check } from "lucide-react";
import { useLesson } from "@/contexts/LessonContext";
import { useQuiz } from "@/contexts/QuizContext";
import "./QuizPanel.css";

interface QuizPanelProps {
  onComplete?: () => void;
}

export const QuizPanel: FC<QuizPanelProps> = ({ onComplete }) => {
  const { quiz } = useLesson();
  const { setResult } = useQuiz();

  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSubmit = () => {
    if (selectedIndex === null) return;

    // Store result in context
    const isCorrect = selectedIndex === quiz.correctChoiceIndex;
    setResult(selectedIndex, isCorrect);

    // Show completion animation
    setIsCompleted(true);

    // After 2 seconds call onComplete
    setTimeout(() => {
      setIsCompleted(false);
      setSelectedIndex(null);
      if (onComplete) onComplete();
    }, 2000);
  };

  // Completion view
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
            <span className="quiz-header-title">{quiz.question}</span>
          </div>
        </div>
        <p className="quiz-subtitle">Select the best answer</p>

        {/* Image */}
        {quiz.imageSrc && (
          <div className="quiz-image-wrapper">
            <Image
              src={quiz.imageSrc}
              alt="Quiz reference"
              width={300}
              height={200}
              className="quiz-image"
            />
          </div>
        )}

        {/* Choices */}
        <div className="quiz-inputs" role="radiogroup">
          {quiz.choices.map((choice, idx) => (
            <label key={idx} className="quiz-input-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input
                type="radio"
                name="quiz-choice"
                value={idx}
                checked={selectedIndex === idx}
                onChange={() => setSelectedIndex(idx)}
                style={{ marginRight: 6 }}
              />
              {choice}
            </label>
          ))}
        </div>
      </div>

      {/* Submit button */}
      <div className="quiz-submit-wrapper">
        <button
          className="quiz-submit-button"
          onClick={handleSubmit}
          disabled={selectedIndex === null}
        >
          <span>Complete Quiz</span>
          <ChevronRight className="quiz-submit-icon" />
        </button>
      </div>
    </div>
  );
}; 