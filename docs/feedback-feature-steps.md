# Feedback Page – Product Development Steps

The following checklist breaks the feature down into discrete, incremental stories that can be completed, reviewed, and merged independently.  Work through them **in order**; each step builds on the previous one.

---

## 1. Extend Lesson Schema
1.1  Update `src/lessons/types.ts`
     • Add an optional `completionCriteria: string` field to `LessonConfig`.

1.2  Update *all* lesson files (start with `consult-spouse.ts`) to include the criteria block, e.g.
```ts
completionCriteria: `
- The user has given materials to share about the package
- The user has explained top benefits and warranty for the package
- The user has provided a clear follow-up date or time
- The customer has agreed to a sale or next steps.`
```

1.3  Export a helper that returns `{ criteria, transcript }` for any lesson ID; this will feed the OpenAI evaluation.

---

## 2. Centralise Transcript State Across Pages
2.1  Extend `LessonContext` (or create a new `SessionContext`) to hold:
     • `messages: Message[]` – full transcript
     • `endLesson(): void` – marks the lesson complete and routes to `/feedback`.

2.2  Wrap **both** `/lesson/[id]` and `/feedback` pages in this provider via `app/layout.tsx`, so the transcript survives navigation.

2.3  In the coaching UI, push every user/AI message into `messages`.

---

## 3. Evaluate Pass / Fail with OpenAI (Client-Side)
3.1  Create `src/lib/evaluateLesson.ts`:
     • Accepts `(transcript: Message[], criteria: string)`.
     • Builds a prompt asking GPT-4 to respond with `{"passed": true|false}`.

3.2  Parse the OpenAI JSON answer and return `boolean`.

3.3  Derive an overall score:
     ```ts
     const score = passed
       ? 80 + Math.round(randomNormal(0, 10)) // 80-100
       : 60 + Math.round(randomNormal(0, 10)); // 60-79
     ```
     *(Implement `randomNormal` helper or approximate with `Math.random`.)*

---

## 4. Generate Transcript Analysis Items
4.1  Create `src/lib/generateAnalysis.ts`:
     • Accepts transcript and asks GPT-4 to return *two* items with shape `{ prompt, feedback }`.
     • Limit feedback to ≈20 words.

4.2  Return result to UI for rendering.

---

## 5. Wire Up `/feedback` Page
5.1  On mount, read `messages` & lesson `criteria` from context.

5.2  Call `evaluateLesson` → `passed` / `score`.

5.3  Call `generateAnalysis` → array of two items.

5.4  Store `passed`, `score`, and `analysis` in component state.

---

## 6. Update UI Components
6.1  **FeedbackDialog.tsx**
     • Replace static copy/icon with variants based on `passed`.

6.2  **TranscriptFrame.tsx**
     • Render real transcript.
     • Map over `analysis` array to show the dynamic feedback blocks.

6.3  Leave stats chips as-is for now (future ticket).

---

## 7. QA & Demo Flow
7.1  Manual test: run through a lesson, send messages, click "End Lesson", ensure redirect to `/feedback` with populated data.

7.2  Test both pass & fail paths by tweaking transcript content.

7.3  Verify no sensitive API key leakage in network tab (requests go to `api.openai.com` with Bearer header, acceptable for demo).

---

## 8. Documentation & Cleanup
8.1  Add README section describing the feedback flow and required env var `NEXT_PUBLIC_OPENAI_API_KEY`.

8.2  Remove any leftover console logs before merging to `main`.

8.3  Create follow-up tasks for: stats calculation, persistent storage, enhanced UI for fail state.

---

*End of plan* 