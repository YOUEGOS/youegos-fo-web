/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        'sky-light': '#E0F7FA', // Bleu ciel clair
        'sky': '#81D4FA',       // Bleu ciel
        'mint-light': '#D0F0E0',// Vert menthe clair
        'mint': '#98FF98',      // Vert menthe
        'gray-800': '#1F2937',  // Gris foncé
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
        bold: '700',
      },
      fontSize: {
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
      },
    },
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
};
