/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
      /**
       * FONT FAMILY EXTENSION
       * 
       * Usage:
       * - Default font is Inter (loaded as a variable font)
       * - Apply with standard Tailwind classes: font-sans
       * - Example: <p className="font-sans">Text using Inter font</p>
       */
  		fontFamily: {
  			sans: [
  				'var(--font-inter)',
  				'ui-sans-serif',
  				'system-ui',
  				'sans-serif'
  			]
  		},
      
      /**
       * FONT SIZE EXTENSION
       * 
       * Usage:
       * - Custom semantic font sizes beyond Tailwind defaults
       * - Apply directly with: text-[size]
       * - Examples:
       *   <p className="text-caption">11px text</p>
       *   <p className="text-small">12px text</p>
       *   <p className="text-base">14px text (default)</p>
       *   <p className="text-large">16px text</p>
       *   <p className="text-title-section">18px section title</p>
       *   <p className="text-title-page">24px page title</p>
       */
  		fontSize: {
  			caption: '11px',
  			small: '12px',
  			base: '14px',
  			large: '16px',
  			'title-section': '18px',
  			'title-page': '24px'
  		},
      
      /**
       * FONT WEIGHT EXTENSION
       * 
       * Usage:
       * - Custom semantic font weights
       * - Apply directly with: font-[weight]
       * - Examples:
       *   <p className="font-base">Regular weight (450)</p>
       *   <p className="font-semibold">Medium weight (550)</p>
       *   <p className="font-bold">Bold weight (650)</p>
       */
  		fontWeight: {
  			base: '450',
  			semibold: '550',
  			bold: '650'
  		},
      
      /**
       * LINE HEIGHT EXTENSION
       * 
       * Usage:
       * - Custom line heights for consistent text layout
       * - Apply directly with: leading-[height]
       * - Examples:
       *   <p className="leading-standard">Text with 1.5 line height</p>
       *   <p className="leading-reduced">Text with 1.2 line height (for headlines)</p>
       */
  		lineHeight: {
  			standard: '1.5',
  			reduced: '1.2'
  		},
      
      /**
       * TYPOGRAPHY EXTENSION
       * 
       * This creates combined typography classes that apply font-size, line-height and font-weight in one class.
       * These are converted to usable classes by a custom plugin at the bottom of the config.
       * 
       * Usage:
       * - Apply any of these classes directly to get consistent typography across the app
       * - Important: The actual CSS classes are defined in globals.css with the "-text" suffix
       * - Examples:
       *   <p className="element-small-text">Small UI element text</p>
       *   <p className="element-regular-text">Regular UI element text</p>
       *   <p className="body-regular-text">Regular body text</p>
       *   <p className="title-section-text">Section title</p>
       * 
       * Typography Scale:
       * - element-*: For UI elements and controls
       * - body-*: For body text and content
       * - title-*: For headings and titles
       */
  		typography: {
  			'element-small': ['text-small leading-standard font-semibold'],
  			'element-regular': ['text-base leading-standard font-semibold'],
  			'element-large': ['text-large leading-standard font-semibold'],
  			'body-caption': ['text-caption leading-standard font-semibold'],
  			'body-small': ['text-small leading-standard font-semibold'],
  			'body-regular': ['text-base leading-standard font-base'],
  			'title-small': ['text-small leading-standard font-bold'],
  			'title-regular': ['text-base leading-standard font-bold'],
  			'title-large': ['text-large leading-standard font-bold'],
  			'title-section': ['text-title-section leading-reduced font-bold'],
  			'title-page': ['text-title-page leading-reduced font-bold'],
  		},
      
      /**
       * BORDER RADIUS EXTENSION
       * 
       * Usage:
       * - Custom border radius values for consistent UI
       * - Apply directly with: rounded-[size]
       * - Examples:
       *   <div className="rounded-base">Element with 0.5rem radius</div>
       *   <div className="rounded-sharp">Element with 0.25rem radius</div>
       *   <div className="rounded-section">Element with 1rem radius</div>
       */
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			base: '0.5rem',
  			sharp: '0.25rem',
  			section: '1rem'
  		},
      
      /**
       * SPACING EXTENSION
       * 
       * Usage:
       * - Custom spacing scale for padding, margin, width, height, gap, etc.
       * - Apply with standard Tailwind spacing classes: p-[size], m-[size], gap-[size], etc.
       * - Examples:
       *   <div className="p-base">Element with 0.5rem padding</div>
       *   <div className="m-lg">Element with 1rem margin</div>
       *   <div className="gap-md">Grid with 0.75rem gap</div>
       */
  		spacing: {
  			none: '0rem',
  			xxs: '0.125rem',
  			xs: '0.25rem',
  			sm: '0.375rem',
  			base: '0.5rem',
  			md: '0.75rem',
  			lg: '1rem',
  			xl: '1.5rem',
  			'2xl': '2rem'
  		},
      
      /**
       * COLOR SYSTEM EXTENSION
       * 
       * Usage:
       * - Semantic color tokens that automatically adjust for light/dark mode
       * - Colors are defined as CSS variables in globals.css
       * 
       * Content colors (for text and icons):
       * - text-content-primary: Primary text color
       * - text-content-secondary: Secondary, less emphasized text
       * - text-content-placeholder: Placeholder text in inputs
       * - text-content-action: Interactive text elements
       * - text-content-contrast: Text on colored backgrounds
       * - text-content-disabled: Disabled text
       * - text-content-positive: Success/positive feedback
       * - text-content-warning: Warning messages
       * - text-content-negative: Error messages
       * 
       * Background colors:
       * - bg-surface: Main surface backgrounds
       * - bg-elevation: Slightly elevated surfaces
       * - bg-section: Background for sections/cards
       * - bg-action: Primary action color (buttons)
       * - bg-action-hover: Hover state for actions
       * - bg-light: Subtle background
       * - bg-light-hover: Hover state for subtle background
       * - bg-controls: Background for form controls
       * - bg-controls-hover: Hover state for controls
       * 
       * Border colors:
       * - border-DEFAULT: Default border color
       * - border-controls: Border for form controls
       * - border-action: Border for primary actions
       * - border-positive: Border for success elements
       * - border-warning: Border for warning elements
       * - border-negative: Border for error elements
       * 
       * Extended color palettes:
       * Each extended color has background, background-hover, border, and content variants:
       * - ext-cyan-*: Cyan color palette
       * - ext-green-*: Green color palette
       * - ext-lime-*: Lime color palette
       * - ext-orange-*: Orange color palette
       * - ext-pink-*: Pink color palette
       * - ext-grape-*: Grape/purple color palette
       * - ext-genai-*: AI-specific color palette
       * 
       * Examples:
       * <p className="text-content-primary">Primary text</p>
       * <button className="bg-action text-content-contrast">Button</button>
       * <div className="bg-ext-pink-background border border-ext-pink-border">
       *   <p className="text-ext-pink-content">Themed content</p>
       * </div>
       */
  		colors: {
  			content: {
  				primary: 'var(--content-primary)',
  				secondary: 'var(--content-secondary)',
  				placeholder: 'var(--content-placeholder)',
  				action: 'var(--content-action)',
  				contrast: 'var(--content-contrast)',
  				disabled: 'var(--content-disabled)',
  				positive: 'var(--content-positive)',
  				warning: 'var(--content-warning)',
  				negative: 'var(--content-negative)'
  			},
  			bg: {
  				surface: 'var(--background-surface)',
  				elevation: 'var(--background-elevation)',
  				section: 'var(--background-section)',
  				'action-hover': 'var(--background-action-hover)',
  				action: 'var(--background-action)',
  				light: 'var(--background-light)',
  				'light-hover': 'var(--background-light-hover)',
  				disabled: 'var(--background-disabled)',
  				positive: 'var(--background-positive)',
  				'positive-hover': 'var(--background-positive-hover)',
  				warning: 'var(--background-warning)',
  				'warning-hover': 'var(--background-warning-hover)',
  				negative: 'var(--background-negative)',
  				'negative-hover': 'var(--background-negative-hover)',
  				page: 'var(--background-page)',
  				controls: 'var(--background-controls)',
  				'controls-hover': 'var(--background-controls-hover)'
  			},
  			border: {
  				DEFAULT: 'var(--border-default)',
  				controls: 'var(--border-controls)',
                action: 'var(--border-action)',
                positive: 'var(--border-positive)',
                warning: 'var(--border-warning)',
                negative: 'var(--border-negative)'
  			},
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			card: {
  				DEFAULT: 'var(--card)',
  				foreground: 'var(--card-foreground)'
  			},
  			popover: {
  				DEFAULT: 'var(--popover)',
  				foreground: 'var(--popover-foreground)'
  			},
  			primary: {
  				DEFAULT: 'var(--primary)',
  				foreground: 'var(--primary-foreground)'
  			},
  			secondary: {
  				DEFAULT: 'var(--secondary)',
  				foreground: 'var(--secondary-foreground)'
  			},
  			muted: {
  				DEFAULT: 'var(--muted)',
  				foreground: 'var(--muted-foreground)'
  			},
  			accent: {
  				DEFAULT: 'var(--accent)',
  				foreground: 'var(--accent-foreground)'
  			},
  			destructive: {
  				DEFAULT: 'var(--destructive)',
  				foreground: 'var(--destructive-foreground)'
  			},
  			input: 'var(--input)',
  			ring: 'var(--ring)',
  			chart: {
  				'1': 'var(--chart-1)',
  				'2': 'var(--chart-2)',
  				'3': 'var(--chart-3)',
  				'4': 'var(--chart-4)',
  				'5': 'var(--chart-5)'
  			},
  			sidebar: {
  				DEFAULT: 'var(--sidebar-background)',
  				foreground: 'var(--sidebar-foreground)',
  				primary: 'var(--sidebar-primary)',
  				'primary-foreground': 'var(--sidebar-primary-foreground)',
  				accent: 'var(--sidebar-accent)',
  				'accent-foreground': 'var(--sidebar-accent-foreground)',
  				border: 'var(--sidebar-border)',
  				ring: 'var(--sidebar-ring)'
  			},
  			// Extended colors from globals.css
  			'ext-cyan': {
  				background: 'var(--extended-cyan-background)',
  				'background-hover': 'var(--extended-cyan-background-hover)',
  				border: 'var(--extended-cyan-border)',
  				content: 'var(--extended-cyan-content)'
  			},
  			'ext-green': {
  				background: 'var(--extended-green-background)',
  				'background-hover': 'var(--extended-green-background-hover)',
  				border: 'var(--extended-green-border)',
  				content: 'var(--extended-green-content)'
  			},
  			'ext-lime': {
  				background: 'var(--extended-lime-background)',
  				'background-hover': 'var(--extended-lime-background-hover)',
  				border: 'var(--extended-lime-border)',
  				content: 'var(--extended-lime-content)'
  			},
  			'ext-orange': {
  				background: 'var(--extended-orange-background)',
  				'background-hover': 'var(--extended-orange-background-hover)',
  				border: 'var(--extended-orange-border)',
  				content: 'var(--extended-orange-content)'
  			},
  			'ext-pink': {
  				background: 'var(--extended-pink-background)',
  				'background-hover': 'var(--extended-pink-background-hover)',
  				border: 'var(--extended-pink-border)',
  				content: 'var(--extended-pink-content)'
  			},
  			'ext-grape': {
  				background: 'var(--extended-grape-background)',
  				'background-hover': 'var(--extended-grape-background-hover)',
  				border: 'var(--extended-grape-border)',
  				content: 'var(--extended-grape-content)'
  			},
  			'ext-genai': {
  				background: 'var(--extended-genai-background)',
  				'background-hover': 'var(--extended-genai-background-hover)',
  				border: 'var(--extended-genai-border)',
  				content: 'var(--extended-genai-content)'
  			}
  		}
  	}
  },
  plugins: [
    /**
     * TAILWINDCSS-ANIMATE PLUGIN
     * 
     * Usage:
     * - Adds animation utilities to Tailwind
     * - Examples:
     *   <div className="animate-spin">Spinning element</div>
     *   <div className="animate-fade-in">Fade in animation</div>
     *   <div className="animate-bounce">Bouncing element</div>
     * 
     * Documentation: https://github.com/jamiebuilds/tailwindcss-animate
     */
    require('tailwindcss-animate'),
    
    /**
     * TAILWIND-SCROLLBAR PLUGIN
     * 
     * Usage:
     * - Customizes scrollbar appearance
     * - Classes:
     *   - scrollbar-thin: Thin scrollbar
     *   - scrollbar-thumb-[color]: Scrollbar thumb color
     *   - scrollbar-track-[color]: Scrollbar track color
     *   - scrollbar-thumb-rounded-[size]: Rounded scrollbar thumb
     * 
     * Examples:
     * <div className="scrollbar-thin scrollbar-thumb-border-controls hover:scrollbar-thumb-content-secondary scrollbar-track-transparent">
     *   Content with custom scrollbar
     * </div>
     * 
     * Documentation: https://github.com/adoxography/tailwind-scrollbar
     */
    require('tailwind-scrollbar'),
    
    /**
     * CUSTOM TYPOGRAPHY PLUGIN
     * 
     * This plugin converts the typography definitions into actual CSS classes.
     * Note: The actual CSS classes used in components should include "-text" suffix. 
     * These are defined in globals.css.
     * 
     * Example in globals.css:
     * .element-small-text {
     *   @apply text-small leading-standard font-semibold;
     * }
     * 
     * Usage in components:
     * <p className="element-small-text">Small UI element text</p>
     */
    function({ addUtilities, theme }) {
      const typographyUtilities = {}
      const typography = theme('typography')
      
      for (const [name, styles] of Object.entries(typography)) {
        typographyUtilities[`.${name}`] = {
          '@apply': styles.join(' '),
        }
      }
      
      addUtilities(typographyUtilities)
    },
  ],
};
