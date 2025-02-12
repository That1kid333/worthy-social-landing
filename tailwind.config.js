/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./styles.css"
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          600: '#D4AF37',
          700: '#D4AF37'
        },
        'forward': {
          'background': '#0F0F0F',
          'text-primary': '#FFFFFF',
          'text-secondary': '#888888',
          'accent': '#D4AF37',
          'border': '#1F1F1F'
        }
      }
    },
  },
  plugins: [],
}
