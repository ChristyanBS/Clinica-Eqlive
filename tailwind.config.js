/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./condicoes/**/*.html", "./src/**/*.{js,css}"],
  theme: {
    extend: {
      colors: {
        eqlive: {
          base: "#F9F7F3",
          green: "#3E6B5B",
          dark: "#1F3A34",
          sand: "#EFE7DD",
          accent: "#A7C6B6",
          peach: "#E6DCCF",
          light: "#F9F7F3",
          link: "#2E5C4E"
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"]
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))"
      }
    }
  },
  plugins: []
};
