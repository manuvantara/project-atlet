/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#071E22',
        secondary: '#1D7874',
        tertiary: '#679289',
        quaternary: '#F4C095',
        quinary: '#EE2E31',
      },
    },
  },
  plugins: [],
};
