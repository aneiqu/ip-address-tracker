import colors from "tailwindcss/colors";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      ...colors,
      Green200: "hsl(148, 38%, 91%)",
      Green600: "hsl(169, 82%, 27%)",
      Grey500: "hsl(186, 15%, 59%)",
      Grey900: "hsl(187, 24%, 22%)",
      Red: "hsl(0, 66%, 54%)",
    },
    extend: {
      backgroundImage: {
        patternBgDesktop: "url('./assets/images/pattern-bg-desktop.png')",
        patternBgMobile: "url('./assets/images/pattern-bg-mobile.png')",
      },
    },
  },
  plugins: [],
};
