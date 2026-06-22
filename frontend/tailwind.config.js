/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // enable class‑based dark mode
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9', // cyan‑500
        darkBg: '#0f172a', // slate‑900
        glass: 'rgba(255,255,255,0.1)',
      },
    },
  },
  plugins: [],
};