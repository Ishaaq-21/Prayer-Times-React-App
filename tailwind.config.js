/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "640px",
        md: "768px", // Currently stops here
        lg: "1024px", // Not being applied
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    extend: {
      colors: {
        primary: {
          500: "#1A2A44", // for bg
          600: "#131F33",
        },
        secondary: {
          //used for text, icons and accents
          500: "#FFC107",
          600: "#DAA520",
        },
        accent: {
          //used for buttons, border
          500: "#FF9800",
          600: "#CC7A00",
        },
        islamicGreen: {
          500: "#009688",
          600: "#00796B",
        },
        dark: "#0f172a",
        light: "#f9fafb",
      },
    },
  },
  plugins: [],
};
