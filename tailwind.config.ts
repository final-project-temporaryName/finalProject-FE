import type { Config } from 'tailwindcss';

const createPxEntries = (size: number) => {
  return {
    0: '0',
    ...Array.from(Array(size + 1)).reduce((accumulator, _, i) => {
      return { ...accumulator, [`${i}`]: `${i / 16}rem` };
    }),
  };
};

const PX_ENTRIES_10 = createPxEntries(10);
const PX_ENTRIES_100 = createPxEntries(100);
const PX_ENTRIES_1000 = createPxEntries(1000);

/* type AccType = Record<string, string>;

const range = (start: number, end: number): number[] => {
  let array = [];
  for (let i = start; i <= end; ++i) {
    array.push(i);
  }
  return array;
};

const pxToRem = (px: number, base = 16) => `${px / base}rem`; */

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    borderWidth: PX_ENTRIES_10,
    fontSize: PX_ENTRIES_100,
    // spacing values are inherited by the 'padding', 'margin', 'height', 'maxHeight', 'flex-basis', 'gap', 'inset', 'space', 'translate', 'scrollMargin', 'scrollPadding', and 'textIndent'.
    spacing: PX_ENTRIES_1000,
    fontWeight: {
      light: '400',
      normal: '500',
      bold: '700',
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px',
    },
    colors: {
      transparent: 'transparent',
      primary: {
        DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
        light: 'rgb(var(--primary-light) / <alpha-value>)',
      },
      red: 'rgb(var(--red) / <alpha-value>)',
      green: {
        DEFAULT: 'rgb(var(--green) / <alpha-value>)',
        light: 'rgb(var(--green-light) / <alpha-value>)',
      },
      purple: {
        DEFAULT: 'rgb(var(--purple) / <alpha-value>)',
        light: 'rgb(var(--purple-light) / <alpha-value>)',
      },
      orange: {
        DEFAULT: 'rgb(var(--orange) / <alpha-value>)',
        light: 'rgb(var(--orange-light) / <alpha-value>)',
      },
      blue: {
        DEFAULT: 'rgb(var(--blue) / <alpha-value>)',
        light: 'rgb(var(--blue-light) / <alpha-value>)',
        hoverLight: 'rgb(var(--blue-hover-light) / <alpha-value>)',
      },
      pink: {
        DEFAULT: 'rgb(var(--pink) / <alpha-value>)',
        light: 'rgb(var(--pink-light) / <alpha-value>)',
      },
      black: 'rgb(var(--black) / <alpha-value>)',
      white: 'rgb(var(--white) / <alpha-value>)',
      WHITE: 'rgb(var(--WHITE) / <alpha-value>)',
      gray: {
        1: 'rgb(var(--gray-1) / <alpha-value>)',
        2: 'rgb(var(--gray-2) / <alpha-value>)',
        3: 'rgb(var(--gray-3) / <alpha-value>)',
        4: 'rgb(var(--gray-4) / <alpha-value>)',
        5: 'rgb(var(--gray-5) / <alpha-value>)',
        6: 'rgb(var(--gray-6) / <alpha-value>)',
        7: 'rgb(var(--gray-7) / <alpha-value>)',
      },
    },
    screens: {
      // tablet: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      mobile: { max: '375px' },
      // => @media (max-width: 375px) { ... }
    },
    extend: {
      height: {
        screen: '100dvh', //dvh를 애용합시다!
      },
    },
  },
  plugins: [],
};
export default config;
