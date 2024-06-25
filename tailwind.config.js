/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      colors: {
        brand: "#FF0000",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
