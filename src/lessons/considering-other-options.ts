import { LessonConfig } from './types';

export const consideringOtherOptionsLesson: LessonConfig = {
  id: 'considering-other-options',
  title: 'Handle Objection – Considering Other Options',
  module: 'Sales Objections',
  durationMins: 18,
  points: 18,
  difficulty: 'Medium',
  agentId: process.env.NEXT_PUBLIC_ELEVEN_AGENT_CONSIDER || 'AGENT_CONSIDERING_OPTIONS',
  intro: {
    illustrationSrc: '/LessonIntro.png',
    paragraphs: [
      'Marketing lead Jessica Brown is evaluating three automation platforms with a decision due in two weeks.',
      'She values Salesforce integration, ease of use, and deep analytics, and arrives curious but non-committal.',
      'The learner must elicit her criteria, map product strengths to them, highlight differentiators and success stories, and secure a next step—demo, proposal, or purchase—without aggressive closing.'
    ]
  },
  quiz: {
    triggerKeyword: 'Jessica',
    question: 'What is a good response when a prospect says they are considering other options?',
    choices: [
      'Press them to buy immediately.',
      'Ask what factors are most important in their decision.',
      'Offer a random discount without explanation.'
    ],
    correctChoiceIndex: 1,
    imageSrc: '/QuizTestImage.png'
  }
}; 