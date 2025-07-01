import React from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import Image from 'next/image';
import './CongratsBanner.css';

interface CongratsBannerProps {
  onBegin?: () => void;
  height?: number; // height in pixels
  gap?: number; // gap in pixels between items
}

export function CongratsBanner({ 
  onBegin, 
  height = 180, 
  gap = 8 // default 8px (0.5rem) gap
}: CongratsBannerProps) {
  return (
    <div className="congrats-banner" style={{ height: `${height}px` }}>
      <Image
        src="/Sun.png"
        alt="Sun"
        className="congrats-sun"
        width={60}
        height={60}
      />
      
      <div className="congrats-content" style={{ gap: `${gap}px` }}>
        <h2 className="congrats-title">
          🏅 Congrats, Max! 🏅
        </h2>
        <p className="congrats-text">
          You finished the situation. Ready to start the next?
        </p>
        <button
          className="begin-button"
          onClick={onBegin}
        >
          See Feedback
          <IconChevronRight size={14} stroke={2} />
        </button>
      </div>
    </div>
  );
} 