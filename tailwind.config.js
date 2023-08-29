/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,vue}'],
  theme: {
    extend: {
      screens: {
        xs: '450px'
      }
    }
  },
  plugins: [require('tailwindcss'), require('autoprefixer')]
};
