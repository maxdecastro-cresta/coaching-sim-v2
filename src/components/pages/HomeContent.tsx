import React from 'react';
import { HomeHeader } from '@/components/HomeHeader';
import { DueLessons } from '@/components/DueLessons';
import { PastLessons } from '@/components/PastLessons';
import './HomeContent.css';

export function HomeContent() {
  return (
    <main className="home-main">
      {/* Top 1/3 Header Section */}
      <HomeHeader />
      
      {/* Bottom 2/3 Content Section */}
      <div className="home-body">
        <div className="home-body-wrapper">
          <div className="home-content">
            <div className="lessons-container">
              <DueLessons />
              <PastLessons />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 