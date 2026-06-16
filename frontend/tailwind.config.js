/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#121212',
        darkCard: '#1E1E1E',
        darkBorder: '#2E2E2E',
        primaryOrange: '#FF7A00',
        primaryOrangeHover: '#E56D00'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
