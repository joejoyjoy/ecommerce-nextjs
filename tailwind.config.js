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
        yellow: "#FBBC05",
        "gray-0": "#FFF",
        "gray-1": "#FDFDFE",
        "gray-2": "#FBFBFB",
        "gray-3": "#F7F7F7",
        "gray-03": "#EAEAEA",
        "gray-4": "#ACACAC",
        "gray-05": "#5F5F5F",
        "gray-5": "#2B2B38",
        "gray-6": "#000000",
        "slate-1": "#858B94",
        "slate-2": "#3B4C60",
      },
      boxShadow: {
        "3xl": "0 4px 20px 0 rgb(25 25 34/24%);",
        "4xl": "0 10px 10px -5px rgba(0, 0, 0, 0.2)"
      },
      animation: {
        bounce: "bounce 0.25s",
      },
      keyframes: {
        bounce: {
          "0%, 100%": {
            transform: "none",
            animationTimingFunction: "linear",
          },
          "50%": {
            transform: "translateX(50%)",
            animationTimingFunction: "linear",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
