/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        // Refined dark palette
        bg: {
          base:    '#06080f',
          surface: '#0b1020',
          card:    '#101630',
          raised:  '#141b39',
        },
        border: {
          subtle: '#1c2444',
          strong: '#2d3a6b',
        },
        // Brand accents
        violet:  { DEFAULT: '#7c3aed', soft: '#a78bfa' },
        cyan:    { DEFAULT: '#22d3ee', soft: '#67e8f9' },
        lime:    { DEFAULT: '#a3e635', soft: '#bef264' },
        // Back-compat aliases used by older parts of the code
        primary: '#7c3aed',
        accent:  '#22d3ee',
        dark:    '#06080f',
        surface: '#0b1020',
        card:    '#101630',
      },
      boxShadow: {
        'glow-violet':  '0 0 32px rgba(124, 58, 237, 0.35)',
        'glow-cyan':    '0 0 32px rgba(34, 211, 238, 0.30)',
        'glow-lime':    '0 0 24px rgba(163, 230, 53, 0.30)',
        'inner-border': 'inset 0 0 0 1px rgba(124, 58, 237, 0.20)',
      },
      backgroundImage: {
        'grid-faint': "linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)",
        'gradient-brand': 'linear-gradient(135deg, #7c3aed 0%, #22d3ee 100%)',
        'gradient-brand-soft': 'linear-gradient(135deg, rgba(124,58,237,0.20), rgba(34,211,238,0.18))',
      },
      animation: {
        'gradient-x':  'gradient-x 6s ease infinite',
        'float':       'float 6s ease-in-out infinite',
        'pulse-glow':  'pulse-glow 2.2s ease-in-out infinite',
        'spin-slow':   'spin 8s linear infinite',
        'aurora':      'aurora 18s ease-in-out infinite',
        'shimmer':     'shimmer 2.5s linear infinite',
        'marquee':     'marquee 30s linear infinite',
        'pulse-dot':   'pulse-dot 1.6s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-14px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 18px rgba(124,58,237,0.35)' },
          '50%':      { boxShadow: '0 0 36px rgba(124,58,237,0.65)' },
        },
        'aurora': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)',   opacity: 0.45 },
          '50%':      { transform: 'translate3d(2%, -2%, 0) scale(1.05)', opacity: 0.65 },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'marquee': {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%':      { opacity: 0.5, transform: 'scale(0.85)' },
        },
      },
    },
  },
  plugins: [],
}
