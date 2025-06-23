"use client";

import React from 'react';

const Waveform: React.FC<{ isRecording?: boolean; audioLevel?: number }> = ({ 
  isRecording = false, 
  audioLevel = 0 
}) => {
  const bars = Array.from({ length: 40 }, (_, i) => {
    // Base height with some variation
    let height = Math.random() * 12 + 4; // 4-16px base
    
    // If recording, make it more dynamic based on audio level
    if (isRecording) {
      height = Math.random() * (audioLevel * 20 + 8) + 4; // 4-28px when active
    }
    
    return (
      <div
        key={i}
        className={`w-0.5 rounded-full transition-all duration-200 ease-in-out ${
          isRecording 
            ? 'bg-[#304ffe] animate-pulse' 
            : 'bg-gray-400'
        }`}
        style={{ 
          height: `${height}px`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: '1.5s'
        }}
      />
    );
  });

  return (
    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg px-4 py-2 z-10">
      <div className="flex items-center justify-center gap-1 h-8">
        {bars}
      </div>
    </div>
  );
};

export default Waveform; 