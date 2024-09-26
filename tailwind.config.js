/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1f2937', // Example primary color
        secondary: '#4b5563', // Example secondary color
        hover: '#374151', // Example hover color
        active: '#6b7280', // Example active color
        word: '#fff',
        'logout-bg': '#e53e3e', // Background color for logout button
        'logout-hover-bg': '#c53030', // Background color on hover for logout button
      },
    },
  },
  plugins: [],
}

