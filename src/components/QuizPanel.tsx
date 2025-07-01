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
  const [inputValue, setInputValue] = useState<string>("");
  const [inputValues, setInputValues] = useState<string[]>([]);

  const isMultipleChoice = quiz.type !== 'freeform';
  const hasMultipleInputs = quiz.inputs && quiz.inputs.length > 0;
  
  // Initialize input values array if needed
  if (hasMultipleInputs && inputValues.length !== quiz.inputs!.length) {
    setInputValues(new Array(quiz.inputs!.length).fill(""));
  }

  const canSubmit = isMultipleChoice 
    ? selectedIndex !== null 
    : hasMultipleInputs 
      ? inputValues.every(val => val.trim() !== "")
      : inputValue.trim() !== "";

  const handleInputChange = (index: number, value: string) => {
    const newValues = [...inputValues];
    newValues[index] = value;
    setInputValues(newValues);
  };

  const handleSubmit = () => {
    if (!canSubmit) return;

    let isCorrect = false;
    let resultIndex = -1;

    if (isMultipleChoice) {
      // Multiple choice logic
      isCorrect = selectedIndex === quiz.correctChoiceIndex;
      resultIndex = selectedIndex!;
    } else if (hasMultipleInputs) {
      // Multiple inputs logic
      isCorrect = quiz.inputs!.every((input, index) => {
        if (input.correctAnswer === 'any') return true;
        const userAnswer = inputValues[index].trim().toLowerCase();
        const correctAnswers = Array.isArray(input.correctAnswer) 
          ? input.correctAnswer.map(a => a.toLowerCase())
          : [input.correctAnswer.toLowerCase()];
        return correctAnswers.includes(userAnswer);
      });
      resultIndex = isCorrect ? 0 : -1;
    } else {
      // Single freeform logic
      const userAnswer = inputValue.trim().toLowerCase();
      const correctAnswers = Array.isArray(quiz.correctAnswer) 
        ? quiz.correctAnswer.map(a => a.toLowerCase())
        : [quiz.correctAnswer!.toLowerCase()];
      
      isCorrect = correctAnswers.includes(userAnswer);
      resultIndex = isCorrect ? 0 : -1;
    }

    // Store result in context
    setResult(resultIndex, isCorrect);

    // Show completion animation
    setIsCompleted(true);

    // After 2 seconds call onComplete
    setTimeout(() => {
      setIsCompleted(false);
      setSelectedIndex(null);
      setInputValue("");
      setInputValues([]);
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
        <p className="quiz-subtitle">
          {isMultipleChoice ? "Select the best answer" : "Enter your answer"}
        </p>

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

        {/* Input/Choices */}
        <div className="quiz-inputs" role={isMultipleChoice ? "radiogroup" : undefined}>
          {isMultipleChoice ? (
            // Multiple choice rendering
            quiz.choices?.map((choice, idx) => (
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
            ))
          ) : hasMultipleInputs ? (
            // Multiple freeform inputs rendering
            quiz.inputs!.map((input, idx) => (
              <div key={idx} className="quiz-input-group">
                <label className="quiz-input-title">{input.label}</label>
                <input
                  type="text"
                  value={inputValues[idx] || ""}
                  onChange={(e) => handleInputChange(idx, e.target.value)}
                  placeholder={input.placeholder}
                  className="quiz-text-input"
                />
              </div>
            ))
          ) : (
            // Single freeform input rendering
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your answer here..."
              className="quiz-text-input"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && canSubmit) {
                  handleSubmit();
                }
              }}
            />
          )}
        </div>
      </div>

      {/* Submit button */}
      <div className="quiz-submit-wrapper">
        <button
          className="quiz-submit-button"
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          <span>Complete Quiz</span>
          <ChevronRight className="quiz-submit-icon" />
        </button>
      </div>
    </div>
  );
}; 