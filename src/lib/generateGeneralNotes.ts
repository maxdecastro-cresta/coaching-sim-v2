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

Your task is to evaluate the seller's performance using a defined sales scorecard. The scorecard includes many criteria, but not all are relevant to every call. However, your job is to:
1. Identify the **most relevant criteria** based on what the conversation was about (this one is about "Handling Customer Objections").
2. Include any criteria that were clearly **demonstrated**, **poorly executed**, or **should have been demonstrated but were missing**.
3. Rank those criteria by their importance and relevance in this specific conversation.
4. Use **each criterion's exact name as a section header**, followed by 2–4 sentences of second-person feedback.
5. For each, explain what you did well or what you missed, with actionable feedback. Use the scorecard's language where appropriate.

The scorecard criteria you can use are:

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

Include **only the most relevant criteria** to this conversation — whether the seller did them well, poorly, or not at all when they should have. Focus especially on objection handling-related behaviors such as "Talked Past Indecision Point," "Did agent use ARC," "Did they pivot," or "Close/attempt to close" — but adapt based on transcript evidence.

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