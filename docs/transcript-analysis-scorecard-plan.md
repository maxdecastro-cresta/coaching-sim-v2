# Transcript Analysis → Scorecard Integration – Implementation Plan

> **Goal**  
> Replace the temporary "Scorecard coming soon" placeholder with real criterion names from the sales scorecard *and* ensure each transcript-level coaching item is explicitly tied to a criterion.

---

## 0 . Summary
We currently generate **general notes** (all criteria, `N/A` allowed) and a separate **transcript analysis** (two coachable utterances).  We need to:

1. Bump the analysis selection to **3 utterances** (editable constant).  
2. Have the LLM output a JSON object per utterance that includes a new `criterion` field.  
3. Render that criterion inside `TranscriptFrame.tsx`, replacing the "(coming soon)" copy.

This doc covers the code changes, file-by-file.

---

## 1 . Files & Responsibilities
| File | Responsibility |
| ---- | -------------- |
| `src/lib/generateAnalysis.ts` | OpenAI call that selects utterances & returns feedback + criterion |
| `src/components/TranscriptFrame.tsx` | Renders analysis items – must now show the criterion |
| `src/components/TranscriptFrame.css` | Minor tweak (if needed) to style criterion text |

---

## 2 . Constants & Shared Data
```ts
// src/lib/generateAnalysis.ts
const ANALYSIS_COUNT = 3;          // easy to tweak
const SCORECARD_CRITERIA = [       // exact text, duplicated from generateGeneralNotes
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
```

---

## 3 . `generateAnalysis.ts` Changes
1. **Interface** – add criterion:
   ```ts
   export interface AnalysisItem {
     prompt: string;
     feedback: string;  // ≤20 words
     criterion: string; // exact criterion name
   }
   ```
2. **Prompt** – rewrite so the LLM:
   * Receives the same criteria list (paste verbatim in the prompt).
   * Selects **up to `ANALYSIS_COUNT`** coachable utterances (prioritise seller).  
   * For each, returns JSON with `prompt`, `feedback`, `criterion`.
   * Must choose **one** criterion per utterance (most relevant).
3. **Post-processing** – parse JSON, slice to ≤`ANALYSIS_COUNT` if more, keep <3 allowed.

---

## 4 . `TranscriptFrame.tsx` Changes
1. **Prop rendering** – map `analysisItem.criterion` into the UI.
   ```tsx
   <div className="scorecard-section">
     <span className="bullet-point">•</span>
     <span className="criterion-text">{item.criterion}</span>
   </div>
   ```
2. **Remove** hard-coded "(coming soon)" copy.
3. **Optional**: emphasise criterion name (e.g. bold) in CSS.

---

## 5 . CSS (optional)
If desired, add:
```css
.criterion-text {
  font-weight: 600; /* bolder */
}
```

---

## 6 . Testing Checklist
- [ ] AI returns array length ≤ 3 with `criterion` field.
- [ ] UI shows criterion bullet for each analysis item.
- [ ] No console errors when fewer than 3 items.
- [ ] Easy toggle: change `ANALYSIS_COUNT` to 2 → verify only 2 items rendered.

---

## 7 . Follow-ups
- Future iteration: colour-code criteria by category (Prelim/Situation/Elevate).  
- Consider extracting criteria into a shared module to avoid duplication. 