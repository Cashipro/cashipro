/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        buy: "#0ecb81",
        sell: "#f6465d",
        binance: {
          bg: "#0a0b0e",
          card: "#1e1f24",
          input: "#2a2b30",
          border: "#2b2d33",
          text: "#eaecef",
          muted: "#848e9c",
        },
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
