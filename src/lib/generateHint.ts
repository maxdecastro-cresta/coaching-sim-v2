/**
 * Generates a coaching hint for the agent based on the conversation messages.
 * The hint returned is context-aware, encouraging, and ≤10 words.
 */
export async function generateHint(messages: Message[]): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing NEXT_PUBLIC_OPENAI_API_KEY environment variable");
  }

  // Format the conversation into the prompt
  const conversationText = messages
    .map((msg) => `${msg.role === "user" ? "Agent" : "Customer"}: ${msg.content}`)
    .join("\n");

  const prompt = `You are a coaching assistant helping a call center agent-in-training during a simulated customer conversation.

The agent has clicked \"Stuck – Need a Hint\" because they're unsure how to proceed.

Below is the conversation so far between the agent and the customer:

---

CONVERSATION SO FAR:
${conversationText}

---

Give the agent a helpful hint that encourages what they should do or ask the customer next to help resolve their issue.

\u{1F9E0} Your response must be:
- No more than **10 words**
- NOT a script or full reply

\u{2705} Example:  
"Ask how long the bag has been missing."  
\u{274C} Avoid:  
"Say: 'Can you tell me your baggage tag number?'"

---

Hint (10 words max):`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful coaching assistant. Provide brief, actionable hints to help call center agents improve their customer service skills.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 50,
        temperature: 0.7,
        top_p: 0.9,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenAI request failed: ${errText}`);
    }

    const data = await response.json();
    const hint = data.choices?.[0]?.message?.content as string | undefined;

    if (!hint) {
      throw new Error("No hint returned by OpenAI");
    }

    return hint.trim();
  } catch (error: any) {
    console.error("OpenAI Hint Generation Error:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred while generating a hint.");
  }
}

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
} 