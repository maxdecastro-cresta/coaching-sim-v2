/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'var(--font-inter)',
  				'ui-sans-serif',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			caption: '11px',
  			small: '12px',
  			base: '14px',
  			large: '16px',
  			'title-section': '18px',
  			'title-page': '24px'
  		},
  		fontWeight: {
  			base: '450',
  			semibold: '550',
  			bold: '650'
  		},
  		lineHeight: {
  			standard: '1.5',
  			reduced: '1.2'
  		},
  		// Typography patterns combining size, line-height, and weight
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
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			base: '0.5rem',
  			sharp: '0.25rem',
  			section: '1rem'
  		},
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
  			border: 'hsl(var(--border))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
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
    require('tailwindcss-animate'),
    // Custom plugin for typography utilities
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
