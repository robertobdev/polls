module.exports = {
  prefix: '',
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      flex: {
        0: '1 0 auto',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.{html,ts}'],
  },
};
