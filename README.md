# Design System Demo

This project demonstrates a design system implementation with theme switching capabilities using Next.js, Tailwind CSS, and Shadcn UI.

## Features

- **Semantic Tokens**: Design tokens organized by function (content, background, border) rather than just color
- **Theme Switching**: Support for three themes - Light, Dark, and High Contrast
- **Shadcn UI Integration**: Uses Shadcn UI components like Tabs for the theme switcher
- **Responsive Design**: Works well on mobile and desktop

## Semantic Tokens

The design system uses semantic tokens that reference primitive color values:

### Content Tokens

Content tokens are used for text and content elements:

- `--content-primary`: Primary text (gray-9 in light, white in dark)
- `--content-secondary`: Secondary text (gray-7 in light, dark-0 in dark)
- `--content-placeholder`: Placeholder text (gray-5 in light, dark-3 in dark)
- `--content-action`: Action text for links and buttons (primary-6 in light, primary-4 in dark)
- `--content-contrast`: High contrast text against dark backgrounds (white in all modes)
- `--content-disabled`: Text for disabled elements (gray-5 in light, dark-3 in dark)
- `--content-positive`: Text for positive/success states (teal-6 in light, teal-4 in dark)
- `--content-warning`: Text for warning states (yellow-8 in light, yellow-4 in dark)
- `--content-negative`: Text for negative/error states (red-6 in light, red-4 in dark)

## Theme Implementation

The theme system is implemented using CSS variables and Tailwind CSS:

1. Primitive colors are defined as CSS variables (e.g., `--red-6: #FA5252`)
2. Semantic tokens reference these primitives (e.g., `--content-negative: var(--red-6)`)
3. Different values are set for different modes (light, dark, high-contrast)
4. Tailwind configuration uses these tokens (e.g., `text-content-negative`)

## Usage

### Installing Dependencies

```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Using the Theme Switcher

The `ThemeSwitcher` component provides theme switching functionality:

```jsx
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export default function MyPage() {
  return (
    <div>
      <ThemeSwitcher />
      {/* Your content here */}
    </div>
  );
}
```

### Using Semantic Tokens

Semantic tokens are available as Tailwind classes:

```jsx
<p className="text-content-primary">Primary text</p>
<p className="text-content-secondary">Secondary text</p>
<p className="text-content-action">Action text</p>
<p className="text-content-negative">Error message</p>
```

## Extending

To add more semantic tokens, update:

1. The CSS variables in `globals.css`
2. The Tailwind configuration in `tailwind.config.js`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
