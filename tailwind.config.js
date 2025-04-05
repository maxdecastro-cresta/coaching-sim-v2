/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
      './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
    	extend: {
    		fontFamily: {
    			sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
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
            negative: 'var(--content-negative)',
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
            'controls-hover': 'var(--background-controls-hover)',
          },
          border: {
            default: 'var(--border-default)',
            controls: 'var(--border-controls)',
            action: 'var(--border-action)',
            positive: 'var(--border-positive)',
            warning: 'var(--border-warning)',
            negative: 'var(--border-negative)',
          },
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
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		}
    	}
    },
    plugins: [require("tailwindcss-animate")],
  };