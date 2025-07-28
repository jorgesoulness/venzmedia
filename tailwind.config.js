module.exports = {
  content: [
    './src/views/**/*.html',
    './src/assets/js/**/*.{html,js}',
    './src/assets/scss/**/*.scss'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#369ED8',
          200: '#418FC4',
          300: '#3481C0',
          400: '#0060AC', // Principal
          500: '#00447A',
          600: '#002E53',
          700: '#001729',
        },
        grey: {
          100: '#7A7A7A',
          200: '#434142',
          300: '#272727',
          400: '#171717',
        },
        greennew: '#61CE70',
        purplenew: '#4054B2',
      },
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
        heading: ['"Poppins"', 'sans-serif'],
        paragraph: ['"Roboto"', 'sans-serif'],
        custompara: ['"Lora"', 'serif'],
        button: ['"Montserrat"', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
