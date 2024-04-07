/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'netflix-red': '#E50914',
        'netflix-dark': '#141414',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};


