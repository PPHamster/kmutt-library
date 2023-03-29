/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "library": "url('https://lh3.googleusercontent.com/p/AF1QipNQ3ArxNY1PVrTXdcaUfQBv95pA9iC9DonJO6Hb=w600-k')"
      }
    },
  },
  plugins: [],
}
