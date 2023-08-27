const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./web/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        "sans": ["Tektur", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}

