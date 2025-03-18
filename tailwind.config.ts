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
      colors: {
        // Primary color palette with variants
        primary: {
          DEFAULT: "#2B4C7E", // Navy Blue - Trust, stability, professionalism
          light: "#3A65A4", // Lighter variant for hover states
          dark: "#1F3859", // Darker variant for active states
          50: "#EFF3F8", // Extra light for backgrounds
          100: "#D0DCF0", // Very light for cards, hover states
          200: "#A1B9E0", // Light for secondary backgrounds
          300: "#7295D1", // Medium light for borders
          400: "#4372C2", // Medium for accents
          500: "#2B4C7E", // Base color (DEFAULT)
          600: "#234165", // Medium dark for text
          700: "#1B364D", // Dark for headings
          800: "#142A3F", // Very dark for emphasis
          900: "#0E1E2F", // Extra dark for special cases
        },

        // Secondary color palette with variants
        secondary: {
          DEFAULT: "#5B8C5A", // Forest Green - Sustainability, balance
          light: "#7AAD79", // Lighter variant for hover states
          dark: "#426642", // Darker variant for active states
          50: "#F1F6F1", // Extra light for backgrounds
          100: "#DBE9DB", // Very light for cards, hover states
          200: "#B7D4B6", // Light for secondary backgrounds
          300: "#92BE91", // Medium light for borders
          400: "#6EA86D", // Medium for accents
          500: "#5B8C5A", // Base color (DEFAULT)
          600: "#497348", // Medium dark for text
          700: "#375A36", // Dark for headings
          800: "#284126", // Very dark for emphasis
          900: "#1A2A19", // Extra dark for special cases
        },

        // Accent color palette with variants
        accent: {
          DEFAULT: "#FF6B35", // Vibrant Orange - Energy, attention
          light: "#FF8F66", // Lighter variant for hover states
          dark: "#E54E18", // Darker variant for active states
          50: "#FFF1EB", // Extra light for backgrounds
          100: "#FFDACB", // Very light for cards, hover states
          200: "#FFC0A7", // Light for secondary backgrounds
          300: "#FFA683", // Medium light for borders
          400: "#FF8C5F", // Medium for accents
          500: "#FF6B35", // Base color (DEFAULT)
          600: "#F24F15", // Medium dark for text
          700: "#D93A00", // Dark for headings
          800: "#B53000", // Very dark for emphasis
          900: "#8C2500", // Extra dark for special cases
        },

        // Text color palette
        text: {
          DEFAULT: "#333333", // Main text color
          light: "#666666", // Secondary text
          lighter: "#999999", // Tertiary text
        },

        // Background color palette
        background: {
          DEFAULT: "#F8F9FA", // Main background color
          dark: "#E9ECEF", // Darker background variant
          light: "#FFFFFF", // Lighter background variant
        },
      },

      // Gradient presets
      backgroundImage: {
        "gradient-primary": "linear-gradient(to right, #2B4C7E, #3A65A4)",
        "gradient-secondary": "linear-gradient(to right, #5B8C5A, #7AAD79)",
        "gradient-accent": "linear-gradient(to right, #FF6B35, #FF8F66)",
        "gradient-primary-to-accent": "linear-gradient(to right, #2B4C7E, #FF6B35)",
        "gradient-primary-to-secondary": "linear-gradient(to right, #2B4C7E, #5B8C5A)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      // Typography system
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

      // Fluid typography using clamp() for responsive text
      fontSize: {
        // Fluid typography with min, preferred, and max sizes
        "fluid-h1": "clamp(2rem, 5vw + 1rem, 3rem)", // 32px → 48px
        "fluid-h2": "clamp(1.75rem, 4vw + 0.75rem, 2.25rem)", // 28px → 36px
        "fluid-h3": "clamp(1.5rem, 3vw + 0.5rem, 1.75rem)", // 24px → 28px
        "fluid-h4": "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)", // 20px → 24px
        "fluid-p": "clamp(1rem, 1vw + 0.5rem, 1.125rem)", // 16px → 18px
        "fluid-small": "clamp(0.875rem, 0.5vw + 0.5rem, 0.875rem)", // 14px
      },

      // Line heights for better readability
      lineHeight: {
        tight: "1.1", // For headings/display text
        snug: "1.2", // For large headings
        normal: "1.3", // For medium headings
        relaxed: "1.4", // For small headings
        loose: "1.6", // For body text
      },

      // Letter spacing for better typography
      letterSpacing: {
        tighter: "-0.5px", // For large headings
        tight: "-0.25px", // For medium headings
        normal: "0", // Default
        wide: "0.15px", // For body text
        wider: "0.25px", // For small text
      },

      // Shadow system with brand colors
      boxShadow: {
        // Standard shadows
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        none: "none",

        // Brand-colored shadows
        "primary-sm": "0 1px 2px 0 rgba(43, 76, 126, 0.05)",
        primary: "0 2px 4px 0 rgba(43, 76, 126, 0.2)",
        "primary-md": "0 4px 8px -2px rgba(43, 76, 126, 0.25)",
        "primary-lg": "0 8px 16px -4px rgba(43, 76, 126, 0.3)",
        "primary-xl": "0 20px 25px -5px rgba(43, 76, 126, 0.35)",

        "accent-sm": "0 1px 2px 0 rgba(255, 107, 53, 0.05)",
        accent: "0 2px 4px 0 rgba(255, 107, 53, 0.2)",
        "accent-md": "0 4px 8px -2px rgba(255, 107, 53, 0.25)",
        "accent-lg": "0 8px 16px -4px rgba(255, 107, 53, 0.3)",

        // Interactive shadows (hover/focus states)
        hover: "0 6px 24px -8px rgba(43, 76, 126, 0.25), 0 4px 8px -4px rgba(0, 0, 0, 0.1)",
        active: "0 1px 3px 0 rgba(43, 76, 126, 0.2)",
      },

      // Text shadows for headings on complex backgrounds
      textShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.1)",
        DEFAULT: "0 2px 4px rgba(0, 0, 0, 0.1)",
        md: "0 4px 8px rgba(0, 0, 0, 0.12)",
        lg: "0 8px 16px rgba(0, 0, 0, 0.15)",
        none: "none",
      },

      // Border radius system
      borderRadius: {
        none: "0",
        sm: "0.25rem", // 4px
        DEFAULT: "0.375rem", // 6px
        md: "0.5rem", // 8px
        lg: "0.75rem", // 12px
        xl: "1rem", // 16px
        "2xl": "1.5rem", // 24px
        full: "9999px",
      },

      // Spacing system
      spacing: {
        "2xs": "0.25rem", // 4px
        xs: "0.5rem", // 8px
        sm: "1rem", // 16px
        md: "1.5rem", // 24px
        lg: "2rem", // 32px
        xl: "3rem", // 48px
        "2xl": "4rem", // 64px
        "3xl": "6rem", // 96px
      },

      // Animation and transition durations
      transitionDuration: {
        DEFAULT: "300ms",
        fast: "150ms",
        normal: "300ms",
        slow: "500ms",
        "very-slow": "700ms",
      },

      // Animation timing functions (easing)
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
        standard: "cubic-bezier(0.4, 0, 0.2, 1)", // Material standard
        emphasized: "cubic-bezier(0.16, 1, 0.3, 1)", // Ease-out-expo
        decelerated: "cubic-bezier(0, 0, 0.2, 1)", // Ease-out
        accelerated: "cubic-bezier(0.4, 0, 1, 1)", // Ease-in
        sharp: "cubic-bezier(0.4, 0, 0.6, 1)", // Ease-in-out
      },

      // Key frames for custom animations
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "pulse-subtle": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.03)" },
        },
      },

      // Animation presets
      animation: {
        "fade-in-up": "fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-down": "fade-in-down 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-right": "slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
      },

      // Max width for content sections
      maxWidth: {
        prose: "70ch", // Optimal reading length
      },
    },
  },
  plugins: [
    // Add text shadow plugin
    function ({ addUtilities, theme }) {
      const textShadows = theme("textShadow");
      const textShadowUtilities = Object.entries(textShadows).map(([key, value]) => {
        return {
          [`.text-shadow${key === "DEFAULT" ? "" : `-${key}`}`]: {
            textShadow: value,
          },
        };
      });
      addUtilities(textShadowUtilities);
    },

    // Add glass morphism utilities
    function ({ addUtilities }) {
      const glassUtilities = {
        ".glass": {
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(8px)",
          borderRadius: "0.5rem",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        },
        ".glass-dark": {
          backgroundColor: "rgba(43, 76, 126, 0.15)",
          backdropFilter: "blur(8px)",
          borderRadius: "0.5rem",
          border: "1px solid rgba(43, 76, 126, 0.2)",
        },
        ".glass-accent": {
          backgroundColor: "rgba(255, 107, 53, 0.15)",
          backdropFilter: "blur(8px)",
          borderRadius: "0.5rem",
          border: "1px solid rgba(255, 107, 53, 0.2)",
        },
      };
      addUtilities(glassUtilities);
    },

    // Standard Tailwind plugins
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};

export default config;
