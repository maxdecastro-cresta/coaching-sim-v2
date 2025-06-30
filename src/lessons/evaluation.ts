import { lessons } from './index';

export interface TranscriptMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * Returns the completion criteria for the lesson along with the provided transcript.
 * The transcript itself is passed through unchanged so callers can forward the
 * entire object into an LLM prompt without extra plumbing.
 */
export function getLessonEvaluationData(lessonId: string, transcript: TranscriptMessage[]) {
  const lesson = lessons[lessonId];

  if (!lesson) {
    throw new Error(`Unknown lessonId "${lessonId}"`);
  }

  return {
    criteria: lesson.completionCriteria ?? '',
    transcript,
  } as const;
} 