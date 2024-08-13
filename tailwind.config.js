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
      },
      gridTemplateRows: {
        '48-auto': 'repeat(48, minmax(3.5rem, 1fr))',
        '288-rows-auto': '1.75rem repeat(288, minmax(0px, 1fr)) auto'
      },
      gridRow: {
        'span-full': '1 / -1'
      }
    }
  },
  plugins: []
}
