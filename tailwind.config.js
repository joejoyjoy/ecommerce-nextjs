/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "yellow": "#FBBC05",
        "gray-0": "#FFF",
        "gray-1": "#FDFDFE",
        "gray-2": "#FBFBFB",
        "gray-3": "#F7F7F7",
        "gray-4": "#ACACAC",
        "gray-5": "#5F5F5F",
        "gray-5": "#2B2B38",
        "gray-6": "#000000",
        "slate-1": "#858B94",
        "slate-2": "#3B4C60",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};