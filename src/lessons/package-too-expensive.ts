import { LessonConfig } from './types';

export const packageTooExpensiveLesson: LessonConfig = {
  id: 'package-too-expensive',
  title: 'Handle Objection – Package Too Expensive',
  module: 'Sales Objections',
  durationMins: 5,
  points: 20,
  difficulty: 'Easy',
  agentId: process.env.NEXT_PUBLIC_ELEVEN_AGENT_INSURANCE || 'AGENT_INSURANCE',
  /**
   * Criteria the evaluation model will use to determine whether the learner
   * successfully handled the objection.
   */
  completionCriteria: `
  - The AI customer has agreed to purchase the package
  - The AI customer has had their objections handled.`,
  intro: {
    illustrationSrc: '/LessonIntro.png',
    paragraphs: [
      'The customer lives off a low fixed income, but is interested in life insurance. He is 60 years old and does not have a plan in place for his final expenses. His main beneficiaries would be his caregiver and his sister. He is open to a cremation at $1200, although he has expressed some interest in life insurance.',
      'You have offered him a $2000 policy although he is unsure if he can afford it. Overcome his objection to the extra $800, and upsell him to a $2000 policy.'
    ]
  },
  quiz: {
    triggerKeyword: 'month',
    question: 'What is $2000 a month per day?',
    type: 'freeform',
    inputs: [
      {
        label: 'Customer name',
        placeholder: 'Enter full name',
        correctAnswer: 'any' // Accept any input for customer name
      },
      {
        label: 'Customer Plan',
        placeholder: 'Enter Customer Plan',
        correctAnswer: 'any' // Accept any input for customer plan
      }
    ],
    imageSrc: '/Test-Objection.png'
  }
}; 