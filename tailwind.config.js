/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Font utama (tubuh teks)
        heading: ["Poppins", "sans-serif"], // Font untuk judul (heading)
      },
    },
  },
  plugins: [require("daisyui")],
};
