/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    
    extend: {
      screens: {
        'xg': '400px'
      }
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
}

