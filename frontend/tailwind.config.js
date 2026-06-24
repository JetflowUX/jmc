/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        background: '#F8F7F4',
        surface: '#FCFBF9',
        surfaceHighlight: '#F1EFEA',
        primary: '#1F5C3D', // Deep British racing green
        primaryHover: '#16432C',
        text: '#1A1A18', // Warm near-black
        textMuted: '#6B6B66',
        border: '#E5E3DE',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Outfit', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass': 'linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.4) 100%)',
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(26, 26, 24, 0.04)',
        'glow': '0 0 20px rgba(31, 92, 61, 0.12)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out forwards',
        'slide-in': 'slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slide-down 0.25s ease-out forwards',
      }
    },
  },
  plugins: [],
}