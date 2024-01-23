import type { Config } from "tailwindcss";

// const px0_50 = { ...Array.from(Array(51)).map((_, i) => `${i}px`) };
// const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
// const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };
// const px0_400 = { ...Array.from(Array(401)).map((_, i) => `${i}px`) };

type AccType = Record<string, string>;

const range = (start: number, end: number): number[] => {
  let array = [];
  for (let i = start; i <= end; ++i) {
    array.push(i);
  }
  return array;
};

const pxToRem = (px: number, base = 16) => `${px / base}rem`;

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    spacing: {
      ...range(0, 2000).reduce((acc: AccType, px: number) => {
        acc[`${px}pxr`] = pxToRem(px);
        return acc;
      }, {}),
    },
    fontSize: {
      ...range(0, 2000).reduce((acc: AccType, px: number) => {
        acc[`${px}pxr`] = pxToRem(px);
        return acc;
      }, {}),
    },
    fontWeight: {
      light: "400",
      normal: "500",
      bold: "700",
    },
    borderRadius: {
      sm: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      full: "9999px",
    },
    colors: {
      transparent: "transparent",
      primary: {
        DEFAULT: "rgb(var(--primary) / <alpha-value>)",
        light: "rgb(var(--primary-light) / <alpha-value>)",
      },
      red: "rgb(var(--red) / <alpha-value>)",
      green: {
        DEFAULT: "rgb(var(--green) / <alpha-value>)",
        light: "rgb(var(--green-light) / <alpha-value>)",
      },
      purple: {
        DEFAULT: "rgb(var(--purple) / <alpha-value>)",
        light: "rgb(var(--purple-light) / <alpha-value>)",
      },
      orange: {
        DEFAULT: "rgb(var(--orange) / <alpha-value>)",
        light: "rgb(var(--orange-light) / <alpha-value>)",
      },
      blue: {
        DEFAULT: "rgb(var(--blue) / <alpha-value>)",
        light: "rgb(var(--blue-light) / <alpha-value>)",
        hoverLight: "rgb(var(--blue-hover-light) / <alpha-value>)",
      },
      pink: {
        DEFAULT: "rgb(var(--pink) / <alpha-value>)",
        light: "rgb(var(--pink-light) / <alpha-value>)",
      },
      black: "rgb(var(--black) / <alpha-value>)",
      white: "rgb(var(--white) / <alpha-value>)",
      WHITE: "rgb(var(--WHITE) / <alpha-value>)",
      gray: {
        1: "rgb(var(--gray-1) / <alpha-value>)",
        2: "rgb(var(--gray-2) / <alpha-value>)",
        3: "rgb(var(--gray-3) / <alpha-value>)",
        4: "rgb(var(--gray-4) / <alpha-value>)",
        5: "rgb(var(--gray-5) / <alpha-value>)",
        6: "rgb(var(--gray-6) / <alpha-value>)",
        7: "rgb(var(--gray-7) / <alpha-value>)",
      },
    },
    screens: {
      // tablet: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      mobile: { max: "375px" },
      // => @media (max-width: 375px) { ... }
    },
    extend: {},
  },
  plugins: [],
};
export default config;
