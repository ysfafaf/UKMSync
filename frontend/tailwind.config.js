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
        malibu: {
          50: '#f2f8fc',
          100: '#e2eef7',
          200: '#cbe2f2',
          300: '#a7cfe9',
          400: '#84b9de',
          500: '#5f9bd2',
          600: '#4b82c5',
          700: '#416fb4',
          800: '#3a5b93',
          900: '#334d75',
          950: '#233148',
        },
        sketch: {
          primary: '#4b82c5',      // Malibu 600 - Main brand accent
          primaryDark: '#416fb4',  // Malibu 700 - Hover / active
          primaryLight: '#e2eef7', // Malibu 100 - Soft tint
          secondary: '#e2eef7',    // Malibu 100 - Secondary surface
          paper: '#f2f8fc',        // Malibu 50 - Fresh canvas paper
          charcoal: '#233148',     // Malibu 950 - Deep ink pencil outline
          surface: '#FFFFFF',
          success: '#16A34A',
          warning: '#D97706',
          danger: '#DC2626',
        },
      },
      boxShadow: {
        'pencil-xs': '1.5px 1.5px 0px #233148',
        'pencil-sm': '2px 2px 0px #233148',
        'pencil': '3px 3px 0px #233148',
        'pencil-md': '4px 4px 0px #233148',
        'pencil-lg': '6px 6px 0px #233148',
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
