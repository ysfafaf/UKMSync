/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sketch: ['"Delicious Handrawn"', 'cursive', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        matcha: {
          50: '#f7f8f5',
          100: '#e9eee4',
          200: '#d6e0cf',
          300: '#b8cbb0',
          400: '#8fad84',
          500: '#6d9461',
          600: '#527d48',
          700: '#3d6135',
          800: '#324e2c',
          900: '#274221',
          950: '#192118',
        },
        yuzu: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        sketch: {
          primary: '#527D48',      // Nordic Olive Green 600
          primaryDark: '#3D6135',  // Deep Olive Pine 700
          primaryLight: '#E9EEE4', // Light Matcha Tint 100
          primaryDeep: '#274221',  // Dark Moss 900
          secondary: '#E9EEE4',    // Light Matcha Tint 100
          tint: '#D6E0CF',         // Matcha Sub-Border 200
          accent: '#F59E0B',       // Spiced Yuzu Gold (Signature Sweetener)
          accentDark: '#D97706',   // Honey Gold Hover / Focus
          accentLight: '#FEF3C7',  // Soft Yuzu Foam Tint
          accentDeep: '#78350F',   // Dark Honey Bronze Text
          paper: '#F7F8F5',        // Soft Alabaster Rice Paper 50
          charcoal: '#192118',     // Olive Black Ink 950
          surface: '#FFFFFF',
          success: '#16A34A',
          warning: '#D97706',
          danger: '#DC2626',
        },
      },
      boxShadow: {
        'pencil-xs': '1.5px 1.5px 0px #192118',
        'pencil-sm': '2px 2px 0px #192118',
        'pencil': '3px 3px 0px #192118',
        'pencil-md': '4px 4px 0px #192118',
        'pencil-lg': '6px 6px 0px #192118',
        'subtle': '0 1px 3px 0 rgba(25, 33, 24, 0.05)',
      },
    },
  },
  plugins: [],
};
