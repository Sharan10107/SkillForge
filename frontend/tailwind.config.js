/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-raised': 'var(--surface-raised)',
        border: 'var(--border)',
        ink: 'var(--ink)',
        'ink-muted': 'var(--ink-muted)',
        ember: {
          300: 'var(--ember-300)',
          500: 'var(--ember-500)',
          600: 'var(--ember-600)',
        },
        steel: {
          400: 'var(--steel-400)',
          500: 'var(--steel-500)',
        },
        success: 'var(--success)',
        danger: 'var(--danger)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(20, 18, 15, 0.06), 0 8px 24px -8px rgba(20, 18, 15, 0.12)',
        raised: '0 2px 4px rgba(20, 18, 15, 0.08), 0 16px 40px -12px rgba(20, 18, 15, 0.22)',
        glow: '0 0 0 1px rgba(255, 122, 48, 0.25), 0 8px 30px -8px rgba(255, 122, 48, 0.35)',
      },
      backgroundImage: {
        blueprint:
          'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
        'ember-gradient': 'linear-gradient(135deg, var(--ember-500), var(--ember-300))',
      },
      backgroundSize: {
        grid: '32px 32px',
      },
      keyframes: {
        'fade-up': { '0%': { opacity: 0, transform: 'translateY(12px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        'ember-pulse': { '0%,100%': { opacity: 0.55 }, '50%': { opacity: 1 } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'ember-pulse': 'ember-pulse 2.4s ease-in-out infinite',
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
