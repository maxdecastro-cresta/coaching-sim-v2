"use client";

import React from 'react';
import './PerformanceFrame.css'; // Re-use existing styles for sizing/position
import './LeaderboardBox.css'; // Custom overrides

interface StatChipProps {
  value: number;
  label: string;
  type: 'lessons' | 'points';
}

function StatChip({ value, label, type }: StatChipProps) {
  return (
    <div className="leaderboard-stat-chip">
      <span className={`leaderboard-stat-chip__badge ${type}`}>{value}</span>
      <span className="leaderboard-stat-label">{label}</span>
    </div>
  );
}

interface LeaderboardRowProps {
  rank: number;
  initials: string;
  name: string;
  lessonsCompleted: number;
  crestaPoints: number;
}

function LeaderboardRow({ rank, initials, name, lessonsCompleted, crestaPoints }: LeaderboardRowProps) {
  return (
    <div className="leaderboard-row">
      <span className="rank-number">{rank}</span>
      <div className="user-avatar">{initials}</div>
      <span className="user-name">{name}</span>
      <div className="user-stats">
        <StatChip value={lessonsCompleted} label="Lessons Completed" type="lessons" />
        <StatChip value={crestaPoints} label="CrestaPoints" type="points" />
      </div>
    </div>
  );
}

export function LeaderboardBox() {
  // Sample data - this would come from props or API in real implementation
  const leaderboardData = [
    { rank: 4, initials: 'PW', name: 'Phoebe Wang', lessonsCompleted: 2, crestaPoints: 21 },
    { rank: 5, initials: 'YP', name: 'Yue Peng', lessonsCompleted: 2, crestaPoints: 20 },
    { rank: 6, initials: 'PS', name: 'Patrick Ryan Soutar', lessonsCompleted: 2, crestaPoints: 19 },
    { rank: 7, initials: 'LT', name: 'Linh Tran', lessonsCompleted: 1, crestaPoints: 18 },
    { rank: 8, initials: 'JD', name: 'John Doe', lessonsCompleted: 1, crestaPoints: 17 },
    { rank: 9, initials: 'AS', name: 'Alice Smith', lessonsCompleted: 1, crestaPoints: 16 },
    { rank: 10, initials: 'RJ', name: 'Robert Johnson', lessonsCompleted: 1, crestaPoints: 15 },
    { rank: 11, initials: 'EW', name: 'Emma Wilson', lessonsCompleted: 1, crestaPoints: 14 },
    { rank: 12, initials: 'MB', name: 'Michael Brown', lessonsCompleted: 1, crestaPoints: 13 }
  ];

  return (
    <div className="performance-frame leaderboard-box">
      <div className="leaderboard-header">
        <h2 className="leaderboard-title">Leaderboard</h2>
        <p className="leaderboard-average">
          Average Points: <strong>12 CrestaPoints</strong>
        </p>
      </div>

      <div className="leaderboard-divider" />

      <div className="leaderboard-table">
        {leaderboardData.map((user) => (
          <LeaderboardRow
            key={user.rank}
            rank={user.rank}
            initials={user.initials}
            name={user.name}
            lessonsCompleted={user.lessonsCompleted}
            crestaPoints={user.crestaPoints}
          />
        ))}
      </div>
    </div>
  );
} 