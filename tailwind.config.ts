import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
  plugins: [require("daisyui")],
};

export default config;
