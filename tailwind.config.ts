import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'playwrite': ['Playwrite GB S', 'sans-serif'],
        'faculty': ['Faculty Glyphic', 'serif']
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        'in2xl': { max: '1536px' },
        'inxl': { max: '1280px' },
        'inlg': { max: '1024px' },
        'inmd': { max: '768px' },
        'insm': { max: '640px' },
      },
      fontSize: {
        '2xs': '0.55rem'
      }
    },
  },
  plugins: [],
  darkMode: "class"
};
export default config;