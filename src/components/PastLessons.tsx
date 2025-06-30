"use client";

import React from 'react';
import { LessonFrame } from './LessonFrame';
import { LessonCard } from './LessonCard';
import { useRouter } from 'next/navigation';

export function PastLessons() {
  const router = useRouter();
  return (
    <LessonFrame 
      title="Past Lessons"
      subtitle="View feedback from past lessons."
      className="past-lessons"
    >
      <div className="lessons-row">
        <LessonCard
          status="Complete"
          duration="25 mins"
          title="Basic Customer Communication Skills"
          dueDate="Completed May 15th 2025"
          difficulty="Easy"
          creditPoints={25}
          onBeginLesson={() => router.push('/lesson/need-to-consult-spouse')}
        />
        <LessonCard
          status="Complete"
          duration="35 mins"
          title="Advanced Problem Resolution"
          dueDate="Completed May 12th 2025"
          difficulty="Medium"
          creditPoints={40}
          onBeginLesson={() => router.push('/lesson/price-too-high')}
        />
        <LessonCard
          status="Complete"
          duration="40 mins"
          title="Leadership in Customer Service"
          dueDate="Completed May 8th 2025"
          difficulty="Hard"
          creditPoints={50}
          onBeginLesson={() => router.push('/lesson/price-too-high')}
        />
      </div>
    </LessonFrame>
  );
} 