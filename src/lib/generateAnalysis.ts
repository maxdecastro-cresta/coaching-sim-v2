import { TranscriptMessage } from '@/lessons/evaluation';

// === Analysis configuration constants ===
export const ANALYSIS_COUNT = 3; // Easily tweakable max number of analysis items to return

export const SCORECARD_CRITERIA = [
  // Preliminaries
  'Who am I and Establish Right to Ask Questions',
  'Did they transition to a sales conversation? (From a non-sales call reason)',
  'Did they demonstrate call control by focusing on needs-based questions?',
  // Situation Questions
  'Understand Coverage Goals',
  'Understand Existing Coverage',
  'Understand Budget',
  'Understand Overall Health',
  'Understand Beneficiary',
  'Did they position situation questions?',
  'Did they ask additional situation questions?',
  // Elevate Related Questions
  'Did they provide Advantage Statements before their offer?',
  'Are they using information gathered from Discovery/Situation Questions for a benefit statement?',
  'Present an Offer',
  'Did they close/attempt to close?',
  'Did agent use ARC?',
  'Talked Past Indecision Point',
  'Did they pivot to additional product offerings?',
  'Did the agent complete a needs-based assessment and make the right recommendation?'
] as const;

export interface AnalysisItem {
  prompt: string;
  feedback: string; // <=20 words
  criterion: string; // exact criterion name from SCORECARD_CRITERIA
}

/**
 * Given the transcript, uses OpenAI to pick up to ANALYSIS_COUNT notable messages and generate succinct
 * feedback (≤20 words each). Each item is tied to a specific scorecard criterion.
 */
export async function generateAnalysis(transcript: TranscriptMessage[]): Promise<AnalysisItem[]> {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!apiKey) throw new Error('Missing NEXT_PUBLIC_OPENAI_API_KEY env var');

  const transcriptText = transcript
    .map((m) => `${m.role === 'user' ? 'Agent' : 'Customer'}: ${m.content}`)
    .join('\n');

  const criteriaList = SCORECARD_CRITERIA.map((c) => `- ${c}`).join('\n');

  const prompt = `You are a sales-conversation coach.

1. Read the full transcript (seller = "Agent", buyer = "Customer").
2. Select up to ${ANALYSIS_COUNT} of the most coachable utterances—prioritize seller lines; include a buyer line only if it exposes a missed cue.
3. For each selected utterance, create a JSON object with exactly **three** keys:
   "prompt": the verbatim utterance (omit speaker label),
   "feedback": ≤20 words, actionable, starting with a coaching verb (e.g., "Ask", "Acknowledge", "Clarify"),
   "criterion": the **exact** name of the single most relevant scorecard criterion from the list below.
4. Return an array of 1–${ANALYSIS_COUNT} objects and NOTHING else—no extra keys, no commentary outside the JSON.

Scorecard criteria (use exact text):
${criteriaList}

Example format:
[
  {"prompt": "...", "feedback": "...", "criterion": "Understand Budget"},
  {"prompt": "...", "feedback": "...", "criterion": "Did agent use ARC?"}
]

TRANSCRIPT:
${transcriptText}`;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that outputs valid JSON only.'
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 200,
      temperature: 0.3,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI error: ${errText}`);
  }

  const data = await res.json();
  const content: string | undefined = data.choices?.[0]?.message?.content;

  if (!content) throw new Error('No content in OpenAI response');

  // Extract JSON array
  const jsonMatch = content.match(/\[([\s\S]*)\]/);
  if (!jsonMatch) throw new Error('Failed to parse analysis JSON');

  let items: AnalysisItem[] = [];
  try {
    items = JSON.parse(jsonMatch[0]);
  } catch {
    throw new Error('Invalid JSON from analysis LLM');
  }

  // Ensure we don't exceed ANALYSIS_COUNT
  if (items.length > ANALYSIS_COUNT) {
    items = items.slice(0, ANALYSIS_COUNT);
  }

  return items;
} 