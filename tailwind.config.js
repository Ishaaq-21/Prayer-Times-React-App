import tailwindcssTextshadow from "tailwindcss-textshadow";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
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
          700: "#b5891a",
        },
        accent: {
          //used for buttons, border
          500: "#f17b4c",
          600: "#d96237",
        },
        islamicGreen: {
          500: "#009688",
          600: "#00796B",
        },
        dark: "#0f172a",
        light: "#f9fafb",
      },
      textShadow: {
        sm: "1px 1px 2px rgba(0,0,0,0.25)",
        DEFAULT: "2px 2px 4px rgba(0,0,0,0.25)",
        lg: "4px 4px 8px rgba(0,0,0)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        tajawal: ["tajawal", "sans-serif"],
      },
    },
  },
  plugins: [tailwindcssTextshadow],
};
