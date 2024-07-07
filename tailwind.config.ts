import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        elodin_background: "url('/home/first-timer/elodin_background.png')",
        lucid_background: "url('/lucid_background.png')",
      },
    },
  },
  daisyui: {
    themes: [
      {
        elodin: {
          primary: "#BBDB9B",
          secondary: "#B4E9D6",
          accent: "#D1C1D7",
          neutral: "#9DB4AB",
          "base-100": "#ABC4A1",
          warning: "#FFDD89",
          error: "#FF6F70",
        },
      },
      {
        dreamy: {
          primary: "#FFD9F0",
          secondary: "#FFC8C8",
          accent: "#F6C7FF",
          neutral: "#92808F",
          "base-100": "#FF95B9",
          info: "#D1C1D7",
          success: "#00A96F",
          warning: "#FFDD89",
          error: "#FF6F70",
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".underline-elodin-neutral": {
          "text-decoration": "underline",
          "text-decoration-color": "#9DB4AB",
        },
        ".underline-dreamy-accent": {
          "text-decoration": "underline",
          "text-decoration-color": "#F6C7FF",
        },
        ".underline-dreamy-white": {
          "text-decoration": "underline",
          "text-decoration-color": "#FFFFFF",
        },
        ".scrollbar-hide": {
          /* Hide scrollbar for WebKit browsers */
          "&::-webkit-scrollbar": {
            display: "none",
          },
          /* Hide scrollbar for IE and Edge */
          "-ms-overflow-style": "none",
          /* Hide scrollbar for Firefox */
          "scrollbar-width": "none",
        },
      });
    }),
  ],
};

export default config;
