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
