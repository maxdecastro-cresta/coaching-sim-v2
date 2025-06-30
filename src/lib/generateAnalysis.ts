import { TranscriptMessage } from '@/lessons/evaluation';

export interface AnalysisItem {
  prompt: string;
  feedback: string; // <=20 words
}

/**
 * Given the transcript, uses OpenAI to pick two notable messages and generate succinct feedback
 * (≤20 words each). Returns an array of exactly two AnalysisItem objects.
 */
export async function generateAnalysis(transcript: TranscriptMessage[]): Promise<AnalysisItem[]> {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!apiKey) throw new Error('Missing NEXT_PUBLIC_OPENAI_API_KEY env var');

  const transcriptText = transcript
    .map((m) => `${m.role === 'user' ? 'Agent' : 'Customer'}: ${m.content}`)
    .join('\n');

  const prompt = `You are a sales-conversation coach.

1. Read the full transcript (seller = "Agent", buyer = "Customer").
2. Select the TWO most coachable utterances—prioritize seller lines; use a buyer line only if it exposes a missed cue.
3. For each, create a JSON object with exactly:
   "prompt": the verbatim utterance (omit speaker label),
   "feedback": ≤20 words, actionable, starting with a coaching verb (e.g., "Ask", "Acknowledge", "Clarify").
4. Return an array of exactly two objects and NOTHING else—no extra keys, no text outside the JSON.

Example format:
[
  {"prompt": "...", "feedback": "..."},
  {"prompt": "...", "feedback": "..."}
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
      max_tokens: 150,
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
  } catch (err) {
    throw new Error('Invalid JSON from analysis LLM');
  }

  // Enforce exactly two
  if (items.length !== 2) {
    // Fallback: slice or pad to ensure 2 items
    items = items.slice(0, 2);
  }

  return items;
} 