"use client";

import React, { useState, useEffect } from 'react';

interface WaveformProps {
  isAISpeaking?: boolean;
  isUserSpeaking?: boolean;
  isLessonComplete?: boolean;
}

const Waveform: React.FC<WaveformProps> = ({ 
  isAISpeaking = false,
  isUserSpeaking = false,
  isLessonComplete = false,
}) => {
  const [tick, setTick] = useState(0);

  // Animation ticker - runs when either AI or user is speaking AND lesson is not complete
  useEffect(() => {
    if (isLessonComplete || (!isAISpeaking && !isUserSpeaking)) return;

    const interval = setInterval(() => {
      setTick(prev => prev + 1);
    }, 150);

    return () => clearInterval(interval);
  }, [isAISpeaking, isUserSpeaking, isLessonComplete]);

  // If lesson is complete, always show inactive state
  if (isLessonComplete) {
    const bars = Array.from({ length: 30 }, (_, i) => (
      <div
        key={i}
        className="w-1 rounded-full bg-gray-300"
        style={{ height: '4px' }}
      />
    ));

    return (
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg px-4 py-2 z-10 opacity-50">
        <div className="flex items-center justify-center gap-1 h-10">
          {bars}
        </div>
      </div>
    );
  }

  // Determine colors and activity state (only when lesson is active)
  const isActive = isAISpeaking || isUserSpeaking;
  const barColor = isAISpeaking 
    ? 'bg-blue-600' 
    : isUserSpeaking 
      ? 'bg-green-600' 
      : 'bg-gray-400';

  // Generate bars with animation
  const bars = Array.from({ length: 30 }, (_, i) => {
    let height = 8; // Base height
    
    if (isActive) {
      // Different animation patterns for AI vs User
      if (isAISpeaking) {
        // AI speaking - smooth waves
        const wave1 = Math.sin((tick + i) * 0.5) * 8;
        const wave2 = Math.sin((tick * 1.5 + i * 0.3)) * 4;
        height = Math.max(4, 8 + wave1 + wave2);
      } else if (isUserSpeaking) {
        // User speaking - more dynamic/choppy pattern
        const wave1 = Math.sin((tick + i) * 0.7) * 6;
        const wave2 = Math.cos((tick * 1.2 + i * 0.4)) * 8;
        const noise = Math.random() * 3; // Add some randomness for user speech
        height = Math.max(4, 8 + wave1 + wave2 + noise);
      }
    }
    
    return (
      <div
        key={i}
        className={`w-1 rounded-full transition-all duration-300 ${barColor}`}
        style={{ 
          height: `${height}px`,
        }}
      />
    );
  });

  return (
    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg px-4 py-2 z-10">
      <div className="flex items-center justify-center gap-1 h-10">
        {bars}
      </div>
    </div>
  );
};

export default Waveform; 