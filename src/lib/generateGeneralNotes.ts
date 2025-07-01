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

Your task is to evaluate the seller's performance using a defined sales scorecard. You must include ALL criteria from the scorecard in your evaluation. For each criterion, your job is to:

1. If the criterion is **not relevant** to this type of conversation, write "N/A" as the feedback.
2. If the criterion **should have been demonstrated** but was missing or poorly executed, provide 2–4 sentences of actionable feedback explaining what should have been done.
3. If the criterion **was demonstrated well**, provide 2–4 sentences of positive feedback with specific examples.
4. If the criterion **was demonstrated poorly**, provide 2–4 sentences explaining what went wrong and how to improve.

Use **each criterion's exact name as a section header**, followed by your feedback. Write in second person ("you") to address the seller directly.

The scorecard criteria you must evaluate are:

Preliminaries:
- Who am I and Establish Right to Ask Questions
- Did they transition to a sales conversation? (From a non-sales call reason)
- Did they demonstrate call control by focusing on needs-based questions?

Situation Questions:
- Understand Coverage Goals
- Understand Existing Coverage
- Understand Budget
- Understand Overall Health
- Understand Beneficiary
- Did they position situation questions?
- Did they ask additional situation questions?

Elevate Related Questions:
- Did they provide Advantage Statements before their offer?
- Are they using information gathered from Discovery/Situation Questions for a benefit statement?
- Present an Offer
- Did they close/attempt to close?
- Did agent use ARC?
- Talked Past Indecision Point
- Did they pivot to additional product offerings?
- Did the agent complete a needs-based assessment and make the right recommendation?

Your output must be formatted exactly as:

**[Criterion Name]:**

<feedback here>

You must include ALL criteria above in your response. Use "N/A" only when the criterion is genuinely not applicable to this conversation type. If something should have been done but wasn't, provide real feedback, not "N/A".

Do not restate the transcript or mention this prompt.

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