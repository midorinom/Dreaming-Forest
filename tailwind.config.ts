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
        pastel: {
          ...require("daisyui/src/theming/themes")["pastel"],
          "base-100": "#ABC4A1",
          primary: "#BBDB9B",
          neutral: "#9DB4AB",
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".underline-pink": {
          "text-decoration": "underline",
          "text-decoration-color": "pink",
        },
      });
    }),
  ],
};

export default config;
