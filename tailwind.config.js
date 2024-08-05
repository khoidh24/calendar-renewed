/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto']
      },
      backgroundImage: {
        glassmorphism:
          'linear-gradient(180deg, rgb(34, 126, 34) 3.8%, rgb(99, 162, 17) 87.1%)'
      }
    }
  },
  plugins: []
}
