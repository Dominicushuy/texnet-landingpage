import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: [
          "var(--font-inter)",
          "Inter",
          "Montserrat",
          "Roboto",
          ...defaultTheme.fontFamily.sans,
        ],
        body: [
          "var(--font-open-sans)",
          "Open Sans",
          "Lato",
          "Source Sans Pro",
          ...defaultTheme.fontFamily.sans,
        ],
      },
      fontSize: {
        "fluid-h1": "clamp(2rem, 5vw + 1rem, 3rem)",
        "fluid-h2": "clamp(1.75rem, 4vw + 0.75rem, 2.25rem)",
        "fluid-h3": "clamp(1.5rem, 3vw + 0.5rem, 1.75rem)",
        "fluid-h4": "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
        "fluid-p": "clamp(1rem, 1vw + 0.5rem, 1.125rem)",
        "fluid-small": "clamp(0.875rem, 0.5vw + 0.5rem, 0.875rem)",
      },
      lineHeight: {
        tight: "1.1",
        snug: "1.2",
        normal: "1.3",
        relaxed: "1.4",
        loose: "1.6",
      },
      letterSpacing: {
        tighter: "-0.5px",
        tight: "-0.25px",
        normal: "0",
        wide: "0.15px",
        wider: "0.25px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};

export default config;
