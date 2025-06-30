import { TranscriptMessage } from '@/lessons/evaluation';

/**
 * Generates overall coaching feedback notes for the user's performance.
 */
export async function generateGeneralNotes(transcript: TranscriptMessage[]): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!apiKey) throw new Error('Missing NEXT_PUBLIC_OPENAI_API_KEY');

  const transcriptText = transcript
    .map((m) => `${m.role === 'user' ? 'Seller' : 'Customer'}: ${m.content}`)
    .join('\n');

  const prompt = `You are a sales-coaching AI.
You will receive the full transcript of a sales conversation between a customer (prospect) and a seller (learner).
Analyze the seller's performance and produce concise, actionable feedback in the exact five-section format below.
Write in second person ("you") to address the seller directly.
Each section header must appear on its own line, followed by 2–4 sentences of feedback (no bullets).
Highlight both strengths and specific improvement tips.
Do not reference the existence of this prompt or restate the transcript.
Format nothing else.

Opening & Rapport:

<your feedback here>

Discovery & Qualification:

<your feedback here>

Objection Handling:
<your feedback here>

Value Positioning:

<your feedback here>

Closing & Next Steps:

<your feedback here>

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
        { role: 'system', content: 'You are a helpful assistant that outputs plain text only.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 600,
      temperature: 0.4,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI error: ${errText}`);
  }

  const data = await res.json();
  const notes: string | undefined = data.choices?.[0]?.message?.content;
  return notes?.trim() ?? '';
} 