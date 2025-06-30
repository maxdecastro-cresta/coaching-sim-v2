import { LessonConfig } from './types';

export const priceTooHighLesson: LessonConfig = {
  id: 'price-too-high',
  title: 'Handle Objection – Price Is Too High',
  module: 'Sales Objections',
  durationMins: 20,
  points: 20,
  difficulty: 'Medium',
  agentId: process.env.NEXT_PUBLIC_ELEVEN_AGENT_PRICE || 'AGENT_PRICE_TOO_HIGH',
  intro: {
    illustrationSrc: '/LessonIntro.png',
    paragraphs: [
      'As an operations manager, Jessica Brown questions a $950/month AI transcription plan that exceeds her $700 budget.',
      'She\'s analytical and cost-focused, seeking hard ROI numbers and flexible terms.',
      'The learner must uncover true budget concerns, quantify savings (AHT, compliance), contrast cheaper options, and propose phased or value-aligned pricing that earns a pilot or revised quote.'
    ]
  },
  quiz: {
    triggerKeyword: 'budget',
    question: 'What is an effective first step when a customer says the price is too high?',
    choices: [
      'Ignore the objection and continue the pitch.',
      'Ask follow-up questions to understand their concerns.',
      'Offer an immediate discount without discussion.'
    ],
    correctChoiceIndex: 1,
    imageSrc: '/QuizTestImage.png'
  }
}; 