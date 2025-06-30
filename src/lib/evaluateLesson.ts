import { TranscriptMessage } from '@/lessons/evaluation';

/**
 * Calls OpenAI to decide if the lesson passes the provided completion criteria.
 * Returns both the boolean and a pseudo-random score derived from that result.
 */
export async function evaluateLesson(
  transcript: TranscriptMessage[],
  criteria: string
): Promise<{ passed: boolean; score: number }> {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!apiKey) throw new Error('Missing NEXT_PUBLIC_OPENAI_API_KEY env var');

  // Render transcript into plain text for the prompt
  const transcriptText = transcript
    .map((m) => `${m.role === 'user' ? 'Agent' : 'Customer'}: ${m.content}`)
    .join('\n');

  const prompt = `You are a senior sales coaching evaluator. Your job is to judge whether the agent met ALL of the completion criteria during the conversation.  
  
COMPLETION CRITERIA (Markdown bullet list):\n${criteria}\n\nCONVERSATION TRANSCRIPT:\n${transcriptText}\n\n===\nRespond **only** with a JSON object of the form {\"passed\": true|false}. No additional keys, no commentary.`;

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
          content:
            'You are a helpful assistant that strictly follows the user instruction and returns JSON only.'
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 20,
      temperature: 0,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI error: ${errText}`);
  }

  const data = await res.json();
  const content: string | undefined = data.choices?.[0]?.message?.content;

  let passed = false;
  if (content) {
    try {
      // Ensure we parse only JSON substring in case model adds anything
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        passed = Boolean(parsed.passed);
      }
    } catch {
      // fall through to default false
    }
  }

  const score = generateScore(passed);
  return { passed, score };
}

function generateScore(passed: boolean): number {
  const mean = passed ? 90 : 70;
  const score = Math.round(clamp(randomNormal(mean, 5), 60, 99));
  return score;
}

function randomNormal(mean = 0, stdDev = 1): number {
  // Box–Muller transform
  const u = 1 - Math.random();
  const v = 1 - Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return z * stdDev + mean;
}

function clamp(x: number, min: number, max: number) {
  return Math.max(min, Math.min(max, x));
} 