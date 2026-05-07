/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        russo: ['"Russo One"', 'sans-serif'],
      },
      colors: {
        brand: '#e45400',
      },
      animation: {
        scroll: 'scroll 120s linear infinite',
        'scroll-reverse': 'scrollReverse 120s linear infinite',
        'scroll-slow': 'scroll 240s linear infinite',
        'scroll-reverse-slow': 'scrollReverse 240s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scrollReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
