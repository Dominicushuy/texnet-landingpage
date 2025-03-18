// tailwind.config.ts
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2B4C7E',
          light: '#3A65A4',
          dark: '#1F3859',
        },
        secondary: {
          DEFAULT: '#5B8C5A',
          light: '#7AAD79',
          dark: '#426642',
        },
        accent: {
          DEFAULT: '#FF6B35',
          light: '#FF8F66',
          dark: '#E54E18',
        },
        text: {
          DEFAULT: '#333333',
          light: '#666666',
          lighter: '#999999',
        },
        background: {
          DEFAULT: '#F8F9FA',
          dark: '#E9ECEF',
          light: '#FFFFFF',
        },
      },
      fontFamily: {
        heading: [
          'var(--font-inter)',
          'Inter',
          'Montserrat',
          'Roboto',
          ...defaultTheme.fontFamily.sans,
        ],
        body: [
          'var(--font-open-sans)',
          'Open Sans',
          'Lato',
          'Source Sans Pro',
          ...defaultTheme.fontFamily.sans,
        ],
      },
      fontSize: {
        'fluid-h1': 'clamp(2rem, 5vw + 1rem, 3rem)',
        'fluid-h2': 'clamp(1.75rem, 4vw + 0.75rem, 2.25rem)',
        'fluid-h3': 'clamp(1.5rem, 3vw + 0.5rem, 1.75rem)',
        'fluid-h4': 'clamp(1.25rem, 2vw + 0.5rem, 1.5rem)',
        'fluid-p': 'clamp(1rem, 1vw + 0.5rem, 1.125rem)',
        'fluid-small': 'clamp(0.875rem, 0.5vw + 0.5rem, 0.875rem)',
      },
      spacing: {
        '2xs': '0.25rem', // 4px
        xs: '0.5rem', // 8px
        sm: '1rem', // 16px
        md: '1.5rem', // 24px
        lg: '2rem', // 32px
        xl: '3rem', // 48px
        '2xl': '4rem', // 64px
        '3xl': '6rem', // 96px
      },
      lineHeight: {
        tight: '1.1',
        snug: '1.2',
        normal: '1.3',
        relaxed: '1.4',
        loose: '1.6',
      },
      letterSpacing: {
        tighter: '-0.5px',
        tight: '-0.25px',
        normal: '0',
        wide: '0.15px',
        wider: '0.25px',
      },
      boxShadow: {
        'primary-sm': '0 1px 2px 0 rgba(43, 76, 126, 0.05)',
        primary: '0 1px 3px 0 rgba(43, 76, 126, 0.1), 0 1px 2px 0 rgba(43, 76, 126, 0.06)',
        'primary-md':
          '0 4px 6px -1px rgba(43, 76, 126, 0.1), 0 2px 4px -1px rgba(43, 76, 126, 0.06)',
        'primary-lg':
          '0 10px 15px -3px rgba(43, 76, 126, 0.1), 0 4px 6px -2px rgba(43, 76, 126, 0.05)',
        'primary-xl':
          '0 20px 25px -5px rgba(43, 76, 126, 0.1), 0 10px 10px -5px rgba(43, 76, 126, 0.04)',
      },
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
      },
      maxWidth: {
        prose: '70ch',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};

export default config;
