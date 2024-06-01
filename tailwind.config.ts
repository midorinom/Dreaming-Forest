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
        elodin_background: "url('/elodin_background.png')",
        lucid_background: "url('/lucid_background.png')",
      },
    },
  },
  daisyui: {
    themes: [
      {
        dreamy: {
          primary: "#BBDB9B",
          secondary: "#F6CBD1",
          accent: "#B4E9D6",
          neutral: "#9DB4AB",
          "base-100": "#ABC4A1",
          info: "#00B3F0",
          success: "#00A96F",
          warning: "#FFC22D",
          error: "#FF6F70",
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".underline-neutral": {
          "text-decoration": "underline",
          "text-decoration-color": "#9DB4AB",
        },
      });
    }),
  ],
};

export default config;
