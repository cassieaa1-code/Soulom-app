/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        soulom: {
          bg: '#0B0713',
          text: '#F8F9FA',
          muted: '#9CA3AF',
          border: 'rgba(229, 169, 149, 0.08)',
          panel: 'rgba(35, 21, 58, 0.35)',
          headerBg: 'rgba(11, 7, 19, 0.85)',
          tabBg: 'rgba(11, 7, 19, 0.9)',
          inputBg: 'rgba(35, 21, 58, 0.25)',
          cardPanelBg: 'rgba(35, 21, 58, 0.2)',
          headerBorder: 'rgba(229, 169, 149, 0.08)',
          tabBorder: 'rgba(0, 0, 0, 0.6)',
          gold: '#E5A995',
          pearl: '#F8F9FA',
          malt: '#E8D8C8',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
