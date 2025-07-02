import { redirect } from 'next/navigation';

export default function CoachingPage() {
  // Redirect legacy /coaching to the first lesson
  redirect('/lesson/package-too-expensive');
} 