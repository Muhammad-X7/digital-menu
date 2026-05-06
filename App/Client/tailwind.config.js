/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,jsx,mdx}",
    "./components/**/*.{js,jsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ["var(--font-noto-arabic)", "serif"],
        latin: ["var(--font-playfair)", "serif"],
      },
      colors: {
        brand: {
          50: "#fdf8f0",
          100: "#f9edda",
          200: "#f2d9b0",
          300: "#e8be7e",
          400: "#dba04e",
          500: "#c8862e",
          600: "#a86a22",
          700: "#8a531c",
          800: "#6f421a",
          900: "#5a3618",
        },
        cream: {
          50: "#fefcf8",
          100: "#fdf7ee",
          200: "#f9edd8",
          300: "#f3dfbb",
        },
        ink: {
          900: "#1a1208",
          800: "#2e2010",
          700: "#46321c",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        shimmer: "shimmer 1.5s infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
