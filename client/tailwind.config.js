/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Add wood texture and stone-like colors
      backgroundImage: {
        "wood-texture": "./src/assets/02D3ZWP-grain-wallpaper.jpg",
      },
      colors: {
        stoneBlack: "#333333",
        stoneWhite: "#f5f5f5",
      },
      // Extend with more custom styles
      // ...
    },
  },
  plugins: [],
};
