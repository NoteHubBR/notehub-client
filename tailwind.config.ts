import colors from 'tailwindcss/colors';
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
        primary: (({ opacityValue }: { opacityValue?: number }) => {
          return opacityValue !== undefined
            ? `rgba(var(--primary), ${opacityValue})`
            : `rgb(var(--primary))`;
        }) as any,
        secondary: (({ opacityValue }: { opacityValue?: number }) => {
          return opacityValue !== undefined
            ? `rgba(var(--secondary), ${opacityValue})`
            : `rgb(var(--secondary))`;
        }) as any,
        'alpha-d-xs': 'rgba(0,0,0,.15)',
        'alpha-d-sm': 'rgba(0,0,0,.25)',
        'alpha-d-md': 'rgba(0,0,0,.5)',
        'alpha-d-lg': 'rgba(0,0,0,.65)',
        'alpha-d-xl': 'rgba(0,0,0,.75)',
        'alpha-l-xs': 'rgba(255,255,255,.15)',
        'alpha-l-sm': 'rgba(255,255,255,.25)',
        'alpha-l-md': 'rgba(255,255,255,.5)',
        'alpha-l-lg': 'rgba(255,255,255,.65)',
        'alpha-l-xl': 'rgba(255,255,255,.75)',
        middark: colors.neutral[700],
        semidark: colors.neutral[800],
        dark: colors.neutral[900],
        darker: colors.neutral[950],
        midlight: colors.neutral[300],
        semilight: colors.neutral[200],
        light: colors.neutral[100],
        lighter: colors.neutral[50],
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
      },
      dropShadow: {
        'primary': '0 0 22px rgba(var(--secondary), 1)',
        'alpha-d-xs': '0 0 2px rgba(0,0,0,.25)',
        'alpha-d-sm': '0 0 1px rgba(0,0,0,.33)',
        'alpha-d-md': '0 0 1px rgba(0,0,0,.5)',
        'alpha-d': '0 0 1px rgba(0,0,0,1)',
        'alpha-l-xs': '0 0 2px rgba(255,255,255,.25)',
        'alpha-l-sm': '0 0 1px rgba(255,255,255,.33)',
        'alpha-l-md': '0 0 1px rgba(255,255,255,.5)',
        'alpha-l': '0 0 1px rgba(255,255,255,1)',
      },
      keyframes: {
        'background-spin': {
          '100%': {
            transform: 'rotate(-360deg)',
          },
        },
        'shiny': {
          'from': {
            transform: 'translateX(-100%)',
          },
          'to': {
            transform: 'translateX(100%)'
          }
        },
      },
      animation: {
        'background-spin': 'background-spin 3s linear infinite',
        'shiny': 'shiny 2211ms linear infinite',
      },
    },
  },
  plugins: [
    function ({ addVariant }: { addVariant: any }) {
      addVariant('moz', '@-moz-document url-prefix()')
    },
    function ({ addUtilities, theme }: { addUtilities: any, theme: any }) {
      const newUtilities = {
        '.shine': {
          overflow: 'hidden',
          position: 'relative',
          '&::after': {
            content: "''",
            zIndex: '1',
            pointerEvents: 'none',
            position: 'absolute',
            inset: '0',
            transform: 'translateX(-100%)',
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,.25), transparent)',
            transitionProperty: 'transform',
            transitionDuration: '555ms',
            transitionTimingFunction: 'linear',
          },
          '&:hover::after, &:focus::after, &:focus-within::after': {
            transform: 'translateX(100%)',
          }
        },
        '.no-scrollbar': {
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          touchAction: 'pan-y',
          msTouchAction: 'pan-y',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        },
        '.scrollbar-desktop': {
          scrollbarColor: 'transparent transparent',
          scrollbarWidth: 'thin',
          transition: 'scrollbar-color ease-in-out .15s',
          '&:hover': {
            scrollbarColor: `${theme('colors.primary')} transparent`
          }
        },
        '.scrollbar-mobile': {
          scrollbarColor: `${theme('colors.primary')} transparent`,
          scrollbarWidth: 'thin',
        },
        '.gradient-button': {
          'z-index': '0',
          position: 'relative',
          padding: '8px 24px',
          'border-radius': '4px',
          'text-align': 'center',
          'font-weight': '600',
          'font-size': '0.875rem',
          'line-height': '1.25rem',
          color: 'white',
          '&::before': {
            content: "''",
            'z-index': '-1',
            position: 'absolute',
            inset: '0',
            'border-radius': '4px',
            background: 'linear-gradient(to right, #2563EB, #7C3AED, #DC2626)',
          },
          '&::after': {
            content: "''",
            'z-index': '-2',
            position: 'absolute',
            inset: '0',
            'border-radius': '4px',
            background: 'linear-gradient(to right, #2563EB, #7C3AED, #DC2626)',
            filter: 'blur(12px)'
          }
        },
        '.opaque-button': {
          'z-index': '0',
          position: 'relative',
          padding: '8px 24px',
          'border-radius': '4px',
          'text-align': 'center',
          'font-weight': '600',
          'font-size': '0.875rem',
          'line-height': '1.25rem',
          color: 'white',
          '&::after': {
            content: "''",
            'z-index': '-1',
            position: 'absolute',
            inset: '0',
            'border-radius': '4px',
            opacity: '0',
            'transition-property': 'all',
            'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
            'transition-duration': '222ms',
          },
          '&:hover::after': {
            filter: 'blur(12px)',
            opacity: '1'
          }
        },
        '.center': {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        },
        '.top-mid': {
          position: 'absolute',
          top: '0',
          transform: 'translateY(-50%)'
        },
        '.top-mid-center': {
          position: 'absolute',
          top: '0',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        },
        '.bot-mid': {
          position: 'absolute',
          bottom: '0',
          transform: 'translateY(50%)'
        },
        '.bot-mid-center': {
          position: 'absolute',
          bottom: '0',
          left: '50%',
          transform: 'translate(-50%, 50%)'
        },
        '.overlay': {
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: '0',
            backgroundColor: 'rgba(0,0,0,.15)',
            opacity: '0',
            transitionProperty: 'opacity',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDuration: '150ms',
          },
          '&:hover::after': {
            opacity: '1'
          }
        },
        '.overlay-none': {
          '&::after': {
            display: 'none'
          }
        },
        '.bg-d-gradient': {
          background: 'linear-gradient(rgba(0,0,0,.5), #0a0a0a 90%)'
        },
        '.bg-l-gradient': {
          background: 'linear-gradient(rgba(255,255,255,.5), #fafafa 90%)'
        },
        '.text-shadow': {
          textShadow: '0px 1px 2px rgb(0 0 0 / 0.1), 0px 3px 2px rgb(0 0 0 / 0.1), 0px 4px 8px rgb(0 0 0 / 0.1)'
        },
      }
      addUtilities(newUtilities);
    }
  ],
  darkMode: "class"
};
export default config;