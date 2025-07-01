"use client";

import React from 'react';
import { useSidebar } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import './LeaderboardDialog.css';

interface TeamStatChipProps {
  value: number;
  label: string;
  type: 'points' | 'agents' | 'lessons';
}

function TeamStatChip({ value, label, type }: TeamStatChipProps) {
  return (
    <div className="team-stat-chip">
      <span className={`team-stat-badge ${type}`}>{value}</span>
      <span className="team-stat-label">{label}</span>
    </div>
  );
}

interface PodiumPersonProps {
  name: string;
  points: number;
  rank: number;
  className?: string;
}

function PodiumPerson({ name, points, rank, className }: PodiumPersonProps) {
  // Determine image source based on rank/className
  let imageSrc = "/Sun.png"; // default for first place
  if (className === "second") {
    imageSrc = "/eleanore.png";
  } else if (className === "third") {
    imageSrc = "/zewen.png";
  }

  return (
    <div className={`podium-person ${className || ''}`}>
      <div className="character-container">
        <div className={`character-bg ${className || ''}`}>
          <img src={imageSrc} alt={name} className="character-image" />
        </div>
        <div className={`rank-badge ${className || ''}`}>{rank}</div>
      </div>
      <div className="person-name">{name}</div>
      <div className="person-stat">
        <span className="person-stat-badge">{points}</span>
        <span className="person-stat-label">CrestaPoints</span>
      </div>
    </div>
  );
}

export function LeaderboardDialog() {
  const { state } = useSidebar();
  const isMobile = useIsMobile();

  const dialogClasses = [
    'leaderboard-dialog',
    state === 'collapsed' ? 'sidebar-collapsed' : 'sidebar-expanded',
    isMobile ? 'mobile' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={dialogClasses}>
      <div className="leaderboard-dialog-content">
        <div className="team-header">
          <h2 className="team-title">Tinglin L.'s Team</h2>
          <div className="team-stats">
            <TeamStatChip value={123} label="CrestaPoints" type="points" />
            <TeamStatChip value={13} label="Agents" type="agents" />
            <TeamStatChip value={144} label="Lessons Completed" type="lessons" />
          </div>
        </div>

        <div className="podium-container">
          <PodiumPerson 
            name="Eleanore A." 
            points={25} 
            rank={2} 
            className="second"
          />
          <PodiumPerson 
            name="Max d." 
            points={47} 
            rank={1}
          />
          <PodiumPerson 
            name="Zewen L." 
            points={22} 
            rank={3} 
            className="third"
          />
        </div>
      </div>
    </div>
  );
} 