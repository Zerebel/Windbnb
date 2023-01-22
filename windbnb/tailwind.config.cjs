/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./index.html", "./src/**/*.{jsx,js}"],
  theme: {
    screens: {
      md: "640px",
      // => @media (min-width: 640px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
        mulish: ["Mulish", ...defaultTheme.fontFamily.sans],
        montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xxs: "0.625rem",
      },
      boxShadow: {
        box: "0px 1px 6px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
