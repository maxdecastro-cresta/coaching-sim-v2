import React, { useEffect, useRef } from 'react';
import './Confetti.css';

interface ConfettiProps {
  show: boolean;
  duration?: number; // duration in milliseconds
}

const CONFETTI_COLORS = [
  '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', 
  '#ffeaa7', '#dda0dd', '#98d8c8', '#f7dc6f'
];

export function Confetti({ show, duration = 3000 }: ConfettiProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!show || !containerRef.current) return;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Clear any existing confetti
    containerRef.current.innerHTML = '';

    // Create confetti pieces
    const createConfetti = () => {
      if (!containerRef.current) return;

      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        
        // Random properties
        const left = Math.random() * 100;
        const delay = Math.random() * 200;
        const fallDuration = 2000 + Math.random() * 1000;
        const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
        const size = 4 + Math.random() * 6;
        const rotation = Math.random() * 360;
        
        // Set styles
        confetti.style.left = `${left}%`;
        confetti.style.backgroundColor = color;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.animationDelay = `${delay}ms`;
        confetti.style.animationDuration = `${fallDuration}ms`;
        confetti.style.transform = `rotate(${rotation}deg)`;
        
        containerRef.current.appendChild(confetti);
      }
    };

    // Start confetti immediately
    createConfetti();

    // Clean up after duration
    timeoutRef.current = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    }, duration);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [show, duration]);

  if (!show) return null;

  return <div ref={containerRef} className="confetti-container" />;
} 