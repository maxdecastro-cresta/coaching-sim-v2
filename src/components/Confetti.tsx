import React, { useEffect, useState } from 'react';
import './Confetti.css';

interface ConfettiProps {
  show: boolean;
  duration?: number; // duration in milliseconds
}

interface ConfettiPiece {
  id: number;
  color: string;
  left: number;
  delay: number;
  duration: number;
  rotation: number;
  size: number;
}

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8', '#f7dc6f'];

export function Confetti({ show, duration = 3000 }: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!show) {
      setPieces([]);
      return;
    }

    // Generate confetti pieces
    const newPieces: ConfettiPiece[] = [];
    const pieceCount = 150; // Increased from 50 to 150 for more confetti

    for (let i = 0; i < pieceCount; i++) {
      newPieces.push({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        left: Math.random() * 100, // Random horizontal position (0-100%)
        delay: Math.random() * 200, // Stagger the start times slightly
        duration: 2000 + Math.random() * 1000, // Random fall duration (2-3s)
        rotation: Math.random() * 360, // Random initial rotation
        size: 6 + Math.random() * 4, // Random size (6-10px)
      });
    }

    setPieces(newPieces);

    // Clean up after animation completes
    const cleanup = setTimeout(() => {
      setPieces([]);
    }, duration);

    return () => clearTimeout(cleanup);
  }, [show, duration]);

  if (!show || pieces.length === 0) return null;

  return (
    <div className="confetti-container">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            backgroundColor: piece.color,
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}ms`,
            animationDuration: `${piece.duration}ms`,
            transform: `rotate(${piece.rotation}deg)`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
          }}
        />
      ))}
    </div>
  );
} 