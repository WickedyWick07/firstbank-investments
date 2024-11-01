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
      }
    },
  },
  plugins: [],
}
