import { lessons } from '@/lessons';
import { notFound } from 'next/navigation';
import { MainLayout } from '@/components/layout/MainLayout';
import { CoachingContent } from '@/components/pages/CoachingContent';
import { LessonProvider } from '@/contexts/LessonContext';
import { QuizProvider } from '@/contexts/QuizContext';

interface LessonPageProps {
  params: {
    lessonId: string;
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const lesson = lessons[params.lessonId];

  if (!lesson) {
    notFound();
  }

  return (
    <LessonProvider lesson={lesson}>
      <QuizProvider>
        <MainLayout>
          <CoachingContent />
        </MainLayout>
      </QuizProvider>
    </LessonProvider>
  );
} 