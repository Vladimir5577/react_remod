/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'rgb(var(--color-bg) / <alpha-value>)',
          secondary: 'rgb(var(--color-bg-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--color-bg-tertiary) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--color-ink) / <alpha-value>)',
          muted: 'rgb(var(--color-ink-muted) / <alpha-value>)',
          faint: 'rgb(var(--color-ink-faint) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'rgb(var(--color-border) / <alpha-value>)',
          strong: 'rgb(var(--color-border-strong) / <alpha-value>)',
        },
        accent: {
          DEFAULT: '#D3FF1A',
          hover: '#BEE816',
          light: 'rgb(var(--color-accent-light) / <alpha-value>)',
        },
        featured: {
          DEFAULT: 'rgb(var(--color-featured) / <alpha-value>)',
          border: 'rgb(var(--color-featured-border) / <alpha-value>)',
        },
        whatsapp: {
          DEFAULT: 'rgb(var(--color-whatsapp) / <alpha-value>)',
          bg: 'rgb(var(--color-whatsapp-bg) / <alpha-value>)',
        },
        telegram: {
          DEFAULT: 'rgb(var(--color-telegram) / <alpha-value>)',
          bg: 'rgb(var(--color-telegram-bg) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-onest)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem,6vw,5.25rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.25rem,4.5vw,3.75rem)', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.75rem,3vw,2.5rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.5rem,2.5vw,2rem)', { lineHeight: '1.15', letterSpacing: '-0.018em' }],
        heading: ['clamp(1.375rem,2.2vw,1.75rem)', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
        subheading: ['clamp(1.125rem,1.8vw,1.3125rem)', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        body: ['1rem', { lineHeight: '1.65' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        caption: ['0.8125rem', { lineHeight: '1.5' }],
        label: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.06em' }],
      },
      maxWidth: {
        container: '1280px',
        prose: '680px',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
        pill: '999px',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,0.04), 0 1px 2px -1px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 16px -4px rgba(0,0,0,0.1), 0 2px 6px -2px rgba(0,0,0,0.05)',
        elevated: '0 8px 28px -6px rgba(0,0,0,0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.55s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
