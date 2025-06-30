## Modular Quiz System — Implementation Steps

> This guide walks through integrating a reusable, single-question multiple-choice quiz into each lesson and storing the result in client-side context.

---

### 1. Extend each lesson definition

1. Inside every lesson file (e.g. `consult-spouse.ts`) replace the current `quiz` array with a **single object**:
   ```ts
   quiz: {
     triggerKeyword: "Jessica",          // Word that surfaces the quiz
     question: "How can you respond when a buyer needs to consult their spouse?",
     choices: [
       "Pressure them to decide immediately.",
       "Schedule a follow-up and offer to provide information for their spouse.",
       "End the call abruptly."
     ],
     correctChoiceIndex: 1,
     imageSrc: "/QuizTestImage.png"
   }
   ```
2. Remove any unused `questions` array or nested `choices.{ text }` objects.

---

### 2. Introduce `QuizContext`

1. Create `src/contexts/QuizContext.tsx` exporting:
   * `selectedIndex` – learner's answer ( `number | null` ).
   * `isCorrect` – pass/fail boolean.
   * `setResult(index: number, isCorrect: boolean)`.
2. Wrap the lesson page (already wrapped by `SessionProvider`) with `<QuizProvider>` so the context is available to `QuizPanel` and later feedback.
3. On `SessionContext.endLesson()` call, reset the quiz state to its initial values.

---

### 3. Refactor `QuizPanel`

1. Replace the two text inputs with **three radio buttons** generated from `choices`.
2. Change the subtitle to **"Select the best answer"**.
3. On submit:
   * Evaluate correctness (`selectedIndex === correctChoiceIndex`).
   * Store `{ selectedIndex, isCorrect }` in `QuizContext`.
   * Show the existing **"Quiz Complete!"** animation (no pass/fail reveal).
4. Remove `customerName`/`customerIssue` state – keep only `selectedIndex`.

---

### 4. Wire up trigger logic in `SidePane`

1. Load `triggerKeyword` from the active lesson.
2. When a transcript message includes this keyword **and** the quiz isn't completed:
   * Switch the tab to **Quizzes**.
   * Render `QuizPanel`.
3. Ignore subsequent keyword mentions once the quiz is completed.

---

### 5. Reset behaviour

* When `SessionContext.endLesson()` runs, call `resetQuiz()` inside `QuizContext` so new lessons start clean.

---

### 6. Quick test checklist

1. Start a lesson; send a message containing the keyword.
2. Quiz appears → Select an answer → Click **Complete Quiz** → "Quiz Complete!" flashes.
3. Subsequent keyword mentions do **not** reopen the quiz.
4. End the lesson → Navigate back to a new lesson → Quiz context is empty again.

---

### 7. Future-proofing

* Swap `choices: string[]` for `choices: { id: string; text: string }[]` if analytics / choice IDs are needed later.
* Persist quiz results to localStorage or a back-end API when cross-session tracking becomes important. 