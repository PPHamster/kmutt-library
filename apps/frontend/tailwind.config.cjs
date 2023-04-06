/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        //background image
        'library': "url('./image/kmutt_library.jpg')",
      },
      fontFamily: {
        // english font family
        'roboto': ['Roboto', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        // thai font family
        'kanit': ['Kanit', 'sans-serif'],
      },
      dropShadow: {
        'brown': '3px 4px 2px rgb(200, 182, 166, 0.5)',
      },
      colors: {
        //theme blown color
        'whitebrown': '#F9F5EB',
        'brown0': '#F1DEC9',
        'brown1': '#C8B6A6',
        'brown2': '#A4907C',
        'brown3': '#8D7B68',
        ////////////////////////
      },
    },
  },
  plugins: [
    require('@shrutibalasa/tailwind-grid-auto-fit'),
  ],
}
