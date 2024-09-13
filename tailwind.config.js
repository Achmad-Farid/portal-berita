/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Warna utama yang cocok dengan logo
        "primary-pink": "#FF69B4", // Pink cerah dari logo
        "primary-blue": "#00BFFF", // Biru cerah dari logo
        "secondary-purple": "#E6E6FA", // Lavender atau Light Purple
        "secondary-blue": "#ADD8E6", // Soft Blue

        // Warna background
        "background-light": "#F2F2F2", // Light Grey

        // Warna teks
        "text-dark": "#333333", // Dark Grey untuk teks
        "text-light": "#000000", // Hitam untuk kontras yang lebih kuat
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Font default, bisa disesuaikan
      },
    },
  },
  plugins: [require("daisyui")],
};
