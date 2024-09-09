/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  daisyui: {
    themes: ["cupcake", "dark", "nord"],
  },
 
  plugins: [require('daisyui')],
}

