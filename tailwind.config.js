/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#034378',
        'san-juan': '#2d4e68',
        'bermuda': '#77d7b9',
      },
      fontFamily: {
        'sans': ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

