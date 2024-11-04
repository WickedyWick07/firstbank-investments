/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#051622",
        secondBlue: "#1BA098",
        primaryGold: "#DEB992",
      },
      screens: {
        'xs': '309px',
        'sm': '412px',
        'md': '768px',
      },
    },
  },
  plugins: [],
}
