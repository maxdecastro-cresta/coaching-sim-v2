# Lesson Coaching Pages Refactor – Detailed Implementation Plan

> **Purpose**  
> Provide a step-by-step, referenceable blueprint for turning the existing single coaching page into a scalable system that serves a dedicated coaching experience (intro, transcript, tests, ElevenLabs agent, etc.) for **each** lesson.
>
> This document is intentionally *granular* so you can pick up and complete one discretionary step at a time.

---

## 0. Glossary & Definitions
| Term | Meaning |
| ---- | ------- |
| *Lesson* | A unit of training content (e.g., "Handling Missing Baggage"). |
| *Lesson ID / Slug* | The unique string used in the URL to identify a lesson (e.g., `baggage-missing`). |
| *Coaching Page* | A page that hosts the lesson intro, live coaching transcript, side panes, quiz/test, etc. |
| *Lesson Config* | A TypeScript object that declares all lesson-specific data: titles, images, ElevenLabs agentId, quiz questions, etc. |
| *Dynamic Route* | Next.js file system route that contains `[...]` parameters so one page template can serve many lessons. |

---

## 1. Objectives
1. **One coaching page per lesson** accessible at `/lesson/[lessonId]` (or `/coaching/[lessonId]`).
2. **Lesson content is data-driven** – no hard-coded strings inside components.
3. **Each lesson can point to a different ElevenLabs agent** via `agentId` in the config.
4. **Tests/quizzes are modular** and loaded based on lesson config.
5. **Minimal changes to the existing Home page** – we only adjust links from lesson cards to new routes; completion status logic is *out-of-scope* for this refactor.

---

## 2. High-Level Architecture
```
app/
  └─ lesson/
       └─ [lessonId]/
            ├─ page.tsx        # page template, fetches config by lessonId
            └─ layout.tsx      # (optional) secondary layout if needed
src/
  └─ lessons/                  # Central store for configs & assets
       ├─ index.ts             # export map of lessonId -> config
       └─ baggage-missing.ts   # example config file (title, agentId…)
  └─ components/
       ├─ pages/
       │    └─ CoachingContent.tsx  # Refactored to accept `lesson` prop
       └─ ...
```

---

## 3. Data Model (LessonConfig)
```ts
export interface LessonConfig {
  id: string;          // "baggage-missing"
  title: string;       // "Handling Missing Baggage Claims"
  module: string;      // "United Customer Care – Baggage"
  durationMins: number;
  points: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  agentId: string;     // ElevenLabs agent key (from env or literal)
  intro: {
    paragraphs: string[];
    illustrationSrc?: string;
  };
  quiz: QuizSpec;      // Type describing quiz content
  hints?: string[];    // For SidePane
}
```

> *All configs live under `src/lessons/` and are zero-logic data files.*

---

## 4. Routing Strategy
1. **Dynamic Path**: `app/lesson/[lessonId]/page.tsx` captures `lessonId`.
2. Inside `page.tsx`, look up config via `import { lessons } from '@/lessons';`.
3. If lessonId is invalid, render a 404 or redirect to home.
4. Pass the resolved `lessonConfig` into `MainLayout > CoachingContent`.

---

## 5. Component Refactor Inventory
| Component | Change |
| --------- | ------ |
| `CoachingContent` | Accept `lesson: LessonConfig` prop. Remove hard-coded header text. |
| `TranscriptPane`  | Accept `lesson` & use `lesson.agentId`, intro data, etc. |
| `SidePane`        | Accept `lesson` for hints & quiz. |
| `LessonIntroCard` | Already prop-driven; just pass lesson data. |
| `LessonCard`      | Update `onBeginLesson` to `router.push('/lesson/' + lessonId)`. |

No visual overhaul required – only data wiring.

---

## 6. State & Context
- **Conversation state** (messages, duration, etc.) remains local to `CoachingContent`.
- **Lesson context**: Provide a React Context (`LessonContext`) so deeply nested components (Quiz, Tabs) can access `lesson` without prop drilling.

---

## 7. ElevenLabs Integration per Lesson
1. In `TranscriptPane.startConversation`, replace
   ```ts
   agentId: process.env.NEXT_PUBLIC_ELEVEN_AGENT_ID!
   ```
   with
   ```ts
   agentId: lesson.agentId
   ```
2. Ensure each lesson config's `agentId` is either a full token or a key to env vars (e.g., `process.env[lesson.agentId]`).

---

## 8. Test/Quiz Modularisation
1. Define `QuizSpec` type (questions, choices, answers).
2. Build or refactor existing Quiz components to consume `lesson.quiz`.
3. The quiz tab in `SidePane` will show lesson-specific questions.

---

## 9. Navigation Updates (Home & Sidebar)
- **Home Page**:
  - In `DueLessons` & `PastLessons`, add `lessonId` to card data.
  - `onBeginLesson` => `router.push('/lesson/' + lessonId)`.
- **Sidebar**:
  - The generic "Coaching" link (`/coaching`) can be repurposed to `/lesson/[default]` or removed.

---

## 10. Discretionary Steps (Pick 'n-mix)
| # | Task | Files Touched |
| - | ---- | ------------- |
| 1 | **Create `LessonConfig` type & two sample lesson configs** | `src/lessons/*` |
| 2 | **Export lessons map (`index.ts`)** | `src/lessons/index.ts` |
| 3 | **Add dynamic page** `app/lesson/[lessonId]/page.tsx` | new |
| 4 | **Add optional layout** `app/lesson/[lessonId]/layout.tsx` | new |
| 5 | **Refactor `CoachingContent` to accept lesson prop** | `components/pages/CoachingContent.tsx` |
| 6 | **Introduce `LessonContext` provider** | new `src/contexts/LessonContext.tsx` |
| 7 | **Wire lesson prop into `TranscriptPane`, `SidePane`** | existing files |
| 8 | **Swap ElevenLabs agentId usage** | `TranscriptPane.tsx` |
| 9 | **Update `LessonCard` navigation logic** | `LessonCard.tsx`, `DueLessons.tsx`, `PastLessons.tsx` |
| 10 | **Clean up old `/coaching` page / routes** | remove or deprecate |
| 11 | **Write unit tests (if setup)** for config lookup | tests |
| 12 | **Add README section** on how to add a new lesson | `README.md` |

*(Tackle each step independently; code compiles at each checkpoint).* 

---

## 11. Risks & Mitigation
- **Broken Links**: Ensure all old links to `/coaching` redirect or update.
- **Invalid Configs**: Add runtime guard that a lesson config exists; show 404.
- **Agent Key Leakage**: Store sensitive keys in environment variables or server proxy.

---

## 12. Acceptance Criteria
- Navigating to `/lesson/baggage-missing` renders the same coaching UI with data from the config.
- Starting a lesson uses the lesson's specific ElevenLabs agent.
- Quiz tab populates with lesson-specific questions.
- Adding a new config file and card link is sufficient to create a new coaching page; **no extra code** required.

---

**Ready to iterate!**

> *Use the table in Section 10 to drive pull requests or task tickets. Check off each line as you complete it.* 