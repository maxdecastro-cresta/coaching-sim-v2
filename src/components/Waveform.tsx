"use client";

import React, { useState, useEffect } from 'react';

interface WaveformProps {
  isAISpeaking?: boolean;
  isUserSpeaking?: boolean; // kept for backwards compatibility but no longer used
}

const Waveform: React.FC<WaveformProps> = ({ 
  isAISpeaking = false,
}) => {
  const [tick, setTick] = useState(0);

  // Simple animation ticker - only runs when AI is speaking
  useEffect(() => {
    if (!isAISpeaking) return;

    const interval = setInterval(() => {
      setTick(prev => prev + 1);
    }, 150);

    return () => clearInterval(interval);
  }, [isAISpeaking]);

  // Determine colors - now only blue for AI speaking or gray for silence
  const isActive = isAISpeaking;
  const barColor = isAISpeaking ? 'bg-blue-600' : 'bg-gray-400';

  // Generate bars with simple animation
  const bars = Array.from({ length: 30 }, (_, i) => {
    let height = 8; // Base height
    
    if (isActive) {
      // Simple wave animation
      const wave1 = Math.sin((tick + i) * 0.5) * 8;
      const wave2 = Math.sin((tick * 1.5 + i * 0.3)) * 4;
      height = Math.max(4, 8 + wave1 + wave2);
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