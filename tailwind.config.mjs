/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'pr-yellow': '#E45400',
        'pr-yellow-deep': '#A33C00',
        'pr-black': '#0A0A0A',
        'pr-graphite': '#141414',
        'pr-paper': '#F2EFE6',
      },
      fontFamily: {
        display: ['var(--pr-display)'],
        text: ['var(--pr-text)'],
        mono: ['var(--pr-mono)'],
      },
    },
  },
};
