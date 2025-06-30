import { LessonConfig } from './types';
import { consultSpouseLesson } from './consult-spouse';
import { priceTooHighLesson } from './price-too-high';
import { consideringOtherOptionsLesson } from './considering-other-options';
import { packageTooExpensiveLesson } from './package-too-expensive';

export const lessons: Record<string, LessonConfig> = {
  [consultSpouseLesson.id]: consultSpouseLesson,
  [priceTooHighLesson.id]: priceTooHighLesson,
  [consideringOtherOptionsLesson.id]: consideringOtherOptionsLesson,
  [packageTooExpensiveLesson.id]: packageTooExpensiveLesson,
};

export type { LessonConfig } from './types'; 