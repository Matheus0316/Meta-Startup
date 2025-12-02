/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#A90011",
        "primary-hover": "#8B0000",
        "background-light": "#F8F6F6",
        "background-dark": "#1A1A1A",
        navy: "#0A2B4C",
        gold: "#D4AF37",
        "text-light": "#181111",
        "text-secondary": "#6b7280",
        "card-light": "#FFFFFF",
        "status-pending": "#E1701A",
        "status-signed": "#3A86FF",
        "status-archived": "#6A7280",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Cormorant Garamond", "serif"],
        body: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
}
