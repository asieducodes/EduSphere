/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  "#eef0fd",
          100: "#d5d9f9",
          500: "#3a52e0",
          600: "#1a3cc7",
          700: "#1530a8",
          900: "#0c1f6e",
        },
        gold: {
          400: "#f5c842",
          500: "#e8b020",
          600: "#c4900e",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
