import type { Config } from "tailwindcss";

export default {
	darkMode: "class",
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
		"./index.html",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '1rem',
			screens: {
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// Monochrome design system colors
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				
				surface: {
					DEFAULT: 'hsl(var(--surface))',
					hover: 'hsl(var(--surface-hover))',
					active: 'hsl(var(--surface-active))',
				},
				
				border: {
					DEFAULT: 'hsl(var(--border))',
					light: 'hsl(var(--border-light))',
				},
				
				text: {
					primary: 'hsl(var(--text-primary))',
					secondary: 'hsl(var(--text-secondary))',
					muted: 'hsl(var(--text-muted))',
				},
				
				message: {
					outgoing: 'hsl(var(--message-outgoing))',
					incoming: 'hsl(var(--message-incoming))',
				},
				
				sidebar: {
					background: 'hsl(var(--sidebar-background))',
					'item-hover': 'hsl(var(--sidebar-item-hover))',
					'item-active': 'hsl(var(--sidebar-item-active))',
				},
				
				status: {
					online: 'hsl(var(--status-online))',
					offline: 'hsl(var(--status-offline))',
				},

				// Standard Tailwind grays for monochrome palette
				gray: {
					50: '#fafafa',
					100: '#f5f5f5',
					200: '#e5e5e5',
					300: '#d4d4d4',
					400: '#a3a3a3',
					500: '#737373',
					600: '#525252',
					700: '#404040',
					800: '#262626',
					900: '#171717',
					950: '#0a0a0a',
				},
			},
			fontFamily: {
				sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
			},
			borderRadius: {
				// Sharp edges only - override default rounded corners
				none: '0',
				DEFAULT: '0',
			},
			boxShadow: {
				// No shadows allowed - override defaults
				none: 'none',
				DEFAULT: 'none',
			},
			transitionDuration: {
				'fast': '150ms',
				'normal': '250ms',
			},
			keyframes: {
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'slide-in': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				'slide-out': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-100%)' },
				},
			},
			animation: {
				'fade-in': 'fade-in 250ms ease-out',
				'slide-in': 'slide-in 250ms ease-out',
				'slide-out': 'slide-out 250ms ease-out',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
