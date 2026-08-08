// Ensure this is at the top
const { heroui } = require('@heroui/theme');

const v3Colors = require('./config/tailwind-v3-palette');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Tailwind v4 shipped a re-tuned P3 palette that shifts the orange brand
      // colour; pin the v3 values so the upgrade is visually neutral.
      colors: v3Colors,
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      animation: {
        marquee: 'marquee 10s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
};
