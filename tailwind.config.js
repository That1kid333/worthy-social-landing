/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'forward': {
          'background': '#0F0F0F',
          'text-primary': '#FFFFFF',
          'text-secondary': '#888888',
          'accent': '#D4AF37',
          'border': '#1F1F1F'
        },
        blue: {
          600: '#D4AF37',
          700: '#D4AF37'
        }
      }
    }
  },
  plugins: [],
}
