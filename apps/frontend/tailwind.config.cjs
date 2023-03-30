/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'library': "url('../public/image/kmutt_library.jpg')",
      },
    },
  },
  plugins: [],
}
