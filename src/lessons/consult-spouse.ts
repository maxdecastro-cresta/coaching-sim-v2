import { LessonConfig } from './types';

export const consultSpouseLesson: LessonConfig = {
  id: 'need-to-consult-spouse',
  title: 'Handle Objection – Need to Consult with Spouse',
  module: 'Sales Objections',
  durationMins: 20,
  points: 20,
  difficulty: 'Easy',
  agentId: process.env.NEXT_PUBLIC_ELEVEN_AGENT_SPOUSE || 'AGENT_CONSULT_SPOUSE',
  /**
   * Criteria the evaluation model will use to determine whether the learner
   * successfully handled the objection. Displayed nowhere in the UI; fed to
   * OpenAI during feedback generation.
   */
  completionCriteria: `
  - The user has given materials to share about the package
  - The user has explained top benefits and warranty for the package
  - The user has provided a clear follow-up date or time
  - The customer has agreed to a sale or next steps.`,
  intro: {
    illustrationSrc: '/LessonIntro.png',
    paragraphs: [
      'Eleanore An likes the smart-home security package but insists on running it past her spouse, Alex, who\'s away until Friday.',
      'She\'s friendly yet risk-averse: she wants to know the clear benefits and warranty details for the package, materials to share, and a clear next step.',
      'The learner must validate her needs for more information, reinforce urgency (recent break-ins, expiring promo), and lock a sale while keeping rapport.'
    ],
  },
  quiz: {
    triggerKeyword: 'Eleanore',
    question: 'How can you respond when a buyer needs to consult their spouse?',
    choices: [
      'Provide them with materials and the urgency of the promotion.',
      'Schedule a follow-up and offer to provide information for their spouse.',
      'End the call abruptly.'
    ],
    correctChoiceIndex: 1,
    imageSrc: '/QuizTestImage.png'
  }
}; 