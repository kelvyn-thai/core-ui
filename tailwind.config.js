/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f9fa',
          100: '#ccf0f3',
          200: '#99e1e7',
          300: '#66d2db',
          400: '#33c3cf',
          500: '#0f6d77',
          600: '#0c5a62',
          700: '#09474d',
          800: '#063439',
          900: '#032124',
          DEFAULT: '#0f6d77',
          foreground: '#ffffff',
        },
        secondary: {
          50: '#f8f9fa',
          100: '#f1f3f4',
          200: '#e8eaed',
          300: '#dadce0',
          400: '#c0c8d0',
          500: '#9aa0a6',
          600: '#80868b',
          700: '#5f6368',
          800: '#3c4043',
          900: '#202124',
          DEFAULT: '#9aa0a6',
          foreground: '#ffffff',
        },
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
        },
        text: {
          primary: '#000000d9',
          secondary: '#5f6368',
          muted: '#9aa0a6',
        },
        background: '#ffffff',
        foreground: '#000000',
        card: {
          DEFAULT: '#ffffff',
          foreground: '#000000',
        },
        muted: {
          DEFAULT: '#f1f3f4',
          foreground: '#5f6368',
        },
        accent: {
          DEFAULT: '#f1f3f4',
          foreground: '#000000',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        border: '#dadce0',
        input: '#dadce0',
        ring: '#0f6d77',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        button: '0 2px 0 rgba(0,0,0,0.045)',
      },
    },
  },
  plugins: [],
};
