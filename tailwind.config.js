/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        primary: "#FF66C4",
        secondary: "#5271FF",
        accent: "#38B6FF",
        neutral: {
          light: "#F9F9F9",
          dark: "#333333",
        },
        gray: {
          DEFAULT: "#666666",
        },
        background: {
          light: "#FFFFFF",
          dark: "#1a1a1a",
        },
        text: {
          light: "#333333",
          dark: "#F9F9F9",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
