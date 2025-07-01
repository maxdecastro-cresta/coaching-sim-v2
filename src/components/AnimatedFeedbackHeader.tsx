import React, { useState, useEffect } from 'react';
import './AnimatedFeedbackHeader.css';

interface AnimatedFeedbackHeaderProps {
  onAnimationComplete?: () => void;
}

export function AnimatedFeedbackHeader({ onAnimationComplete }: AnimatedFeedbackHeaderProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Start animation after component mounts
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 100);

    // Call onAnimationComplete after all animations finish
    const completeTimer = setTimeout(() => {
      onAnimationComplete?.();
    }, 2000); // Total animation duration

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onAnimationComplete]);

  return (
    <section className={`animated-feedback-header-section ${isAnimating ? 'animating' : ''}`}>
      {/* Decorative background shapes with staggered animations */}
      <div className="animated-bg-shape animated-bg-blue"></div>
      <div className="animated-bg-shape animated-bg-pink"></div>
      <div className="animated-bg-shape animated-bg-green"></div>
      <div className="animated-bg-shape animated-bg-yellow"></div>
      <div className="animated-bg-shape animated-bg-orange"></div>
    </section>
  );
} 