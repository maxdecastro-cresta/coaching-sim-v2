import { LessonConfig } from './types';
import { consultSpouseLesson } from './consult-spouse';
import { priceTooHighLesson } from './price-too-high';
import { consideringOtherOptionsLesson } from './considering-other-options';

export const lessons: Record<string, LessonConfig> = {
  [consultSpouseLesson.id]: consultSpouseLesson,
  [priceTooHighLesson.id]: priceTooHighLesson,
  [consideringOtherOptionsLesson.id]: consideringOtherOptionsLesson,
};

export type { LessonConfig } from './types'; 