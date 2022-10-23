const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
   textColor: {
      "primary": "var(--color-primary)",
      "light": "var(--color-light)",
      "dark": "var(--color-dark)",
      ...colors
   },
   backgroundColor: {
      "primary": "var(--color-primary)",
      "light": "var(--color-light)",
      "dark": "var(--color-dark)",
      ...colors
   },
    extend: {},
  },
  plugins: [],
};
