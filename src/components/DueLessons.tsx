"use client";

import React from 'react';
import { LessonFrame } from './LessonFrame';
import { LessonCard } from './LessonCard';
import { useRouter } from 'next/navigation';

export function DueLessons() {
  const router = useRouter();
  return (
    <LessonFrame 
      title="Assigned Lessons"
      subtitle="Your manager has assigned you these lessons."
      className="due-lessons"
    >
      <div className="lessons-row">
        <LessonCard
          status="Incomplete"
          duration="5 mins"
          title="Sales - Training: Handle Objection"
          dueDate="June 20th 2025"
          difficulty="Easy"
          creditPoints={20}
          onBeginLesson={() => router.push('/lesson/package-too-expensive')}
        />
        <LessonCard
          status="Incomplete"
          duration="20 mins"
          title="Sales - Training: Empathy"
          dueDate="June 17th 2025"
          difficulty="Easy"
          creditPoints={25}
          onBeginLesson={() => router.push('/lesson/need-to-consult-spouse')}
        />
        <LessonCard
          status="In progress"
          duration="30 mins"
          title="Sales - Training: Assume the Sale"
          dueDate="June 18th 2025"
          difficulty="Medium"
          creditPoints={30}
          onBeginLesson={() => router.push('/lesson/price-too-high')}
        />
        <LessonCard
          status="Incomplete"
          duration="18 mins"
          title="Sales - Training: Empathy"
          dueDate="June 19th 2025"
          difficulty="Hard"
          creditPoints={35}
          onBeginLesson={() => router.push('/lesson/considering-other-options')}
        />
      </div>
    </LessonFrame>
  );
} 