export interface QuizSpec {
  /** Keyword in the transcript that triggers the quiz to appear */
  triggerKeyword: string;
  /** The quiz question shown in the header */
  question: string;
  /** Three answer choices, exactly one is correct */
  choices: string[];
  /** Index (0-based) of the correct choice in the `choices` array */
  correctChoiceIndex: number;
  /** Image displayed above the choices */
  imageSrc: string;
}

export interface LessonConfig {
  /** URL slug / identifier (e.g. "baggage-missing") */
  id: string;
  /** Full lesson title shown to the user */
  title: string;
  /** Module or category (e.g. "United Customer Care – Baggage") */
  module: string;
  /** Estimated duration in minutes */
  durationMins: number;
  /** Points rewarded on completion */
  points: number;
  /** Difficulty rating */
  difficulty: 'Easy' | 'Medium' | 'Hard';
  /** ElevenLabs agent ID specific to this lesson */
  agentId: string;
  /** Introductory content shown in LessonIntroCard */
  intro: {
    illustrationSrc?: string;
    paragraphs: string[];
  };
  /** Hints displayed in the SidePane */
  hints?: string[];
  /** Quiz / test specification */
  quiz: QuizSpec;

  /**
   * Bullet-list style criteria describing what counts as successful completion.
   * Used by the feedback page to decide pass / fail using an LLM.
   */
  completionCriteria?: string;
} 