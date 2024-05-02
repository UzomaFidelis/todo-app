/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "selector",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-gray": "hsl(0, 0%, 98%)",
        "bright-blue": "hsl(220, 98%, 61%)",
        "gray-blue": {
          50: "hsl(236, 33%, 92%)",
          100: "hsl(233, 11%, 84%)",
          200: "hsl(234, 39%, 85%)",
          300: "hsl(236, 33%, 92%)",
          400: "hsl(236, 9%, 61%)",
          500: "hsl(234, 11%, 52%)",
          600: "hsl(235, 19%, 35%)",
          700: "hsl(233, 14%, 35%)",
          800: "hsl(237, 14%, 26%)",
        },
      },
      fontFamily: {
        "josefin-sans": ["Josefin Sans", "sans-serif"],
      },
      backgroundImage: {
        "moon-icon": "url('/src/assets/images/icon-moon.svg')",
        "sun-icon": "url('/src/assets/images/icon-sun.svg')",
        "mobile-light": "url('/src/assets/images/bg-mobile-light.jpg')",
        "mobile-dark": "url('/src/assets/images/bg-mobile-dark.jpg')",
        "desktop-light": "url('/src/assets/images/bg-desktop-light.jpg')",
        "desktop-dark": "url('/src/assets/images/bg-desktop-dark.jpg')",
      },
    },
  },
  plugins: [],
};
