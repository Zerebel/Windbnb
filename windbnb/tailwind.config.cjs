/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./index.html", "./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
        mulish: ["Mulish", ...defaultTheme.fontFamily.sans],
        montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xxs: "",
      },
      boxShadow: {
        box: "0px 1px 6px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
