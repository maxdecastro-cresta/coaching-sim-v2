import React from 'react';
import './HomeHeader.css';

export function HomeHeader() {
  return (
    <section className="home-header-section">
      <div className="home-header-content">
        <div className="home-header-welcome">
          <div className="welcome-row">
            <img 
              src="/MaxHeader.png" 
              alt="Max Avatar"
              className="max-avatar"
            />
            <div className="welcome-text">
              <h1 className="home-header-title">
                Welcome back, Max
              </h1>
              <p className="home-header-subtitle">
                Let's get to some coaching
              </p>
            </div>
          </div>
          
          <div className="stats-section">
            <div className="stat-item">
              <span className="stat-number">24</span>
              <span className="stat-label">CrestaPoints</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">3rd</span>
              <span className="stat-label">Leaderboard</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="home-header-image">
        <img 
          src="/HomeImage.png" 
          alt="Coaching illustration"
          className="header-image"
        />
      </div>
    </section>
  );
} 