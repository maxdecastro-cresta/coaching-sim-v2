# TranscriptFrame Component Structure

## Overview
The TranscriptFrame component is designed to display transcript-related content in a structured, two-column layout. It consists of a header section and two main content sections: TranscriptFeedback (60%) and TranscriptAnalysis (40%).

## Component Layout

```
TranscriptFrame
├── Header Section
│   ├── Title ("Conversation Analysis")
│   └── Duration Display ("Transcript: {duration}")
└── Content Sections (60-40 split)
    ├── TranscriptFeedback (60%)
    │   ├── Section Header ("Transcript Feedback")
    │   └── Message Container
    │       └── MessageBubbles (scrollable)
    └── TranscriptAnalysis (40%)
        ├── Section Header ("Transcript Analysis")
        └── Analysis Container (scrollable)
            └── Analysis Items
                ├── Prompt (yellow background)
                ├── AI Evaluation Header
                │   ├── AI Avatar
                │   ├── "AI Evaluation" text
                │   └── Menu dots
                ├── Feedback Text
                └── Scorecard
                    ├── "Scorecard Evaluation" caption
                    └── Criterion with bullet point
```

## CSS Structure

### Main Container
- `.performance-frame`: Main container with white background and shadow
  - Padding: 20px
  - Min-height: 400px
  - Border radius: 12px

### Grid Layout
- `.transcript-sections`: Grid container for the two main sections
  - Grid layout: 60fr 40fr split
  - Gap between sections: 20px
  - Full height

### Section Structure
- `.transcript-section`: Common styling for both sections
  - Height: 500px (fixed)
  - Display: flex column
  - Background: Light grey (#F9FAFB)
  - Border radius: 12px
  - Overflow: hidden

### Section Headers
- `.transcript-section-header`
  - Height: 44px (fixed)
  - White background
  - Border bottom
  - Full width
  - Centered content

### Content Areas
- `.transcript-section-content`
  - Flex: 1 (fills remaining space)
  - Overflow-y: auto (scrollable)
  - Padding: 1rem 1.5rem

### Analysis Items
- `.analysis-item`
  - White background
  - Border radius: 8px
  - Border: 1px solid #E5E7EB
  
- `.analysis-prompt`
  - Yellow background (#FFF9E6)
  - Left border: 4px solid #FFD600
  - Italic text
  
- `.scorecard-section`
  - Light grey background
  - Bullet point with criterion text
  - Caption: "Scorecard Evaluation"

## Responsive Behavior
- On mobile devices (max-width: 768px):
  - Sections stack vertically
  - Gap reduces to 16px
  - Maintains scrollable content areas

## Usage
```tsx
<TranscriptFrame />
```

## Key Features
1. Fixed height sections with independent scrolling
2. 60-40 width distribution for optimal content display
3. Consistent header styling across sections
4. Message bubbles in left section
5. Structured analysis cards in right section
6. Responsive design for mobile viewing

The component is designed to be a container for transcript-related content. The TranscriptFeedback section (60%) displays the conversation messages, while the TranscriptAnalysis section (40%) shows structured feedback and evaluations. 