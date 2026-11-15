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
        forestGreen: {
          50: '#f4faf3',
          100: '#e6f4e4',
          200: '#cce9c9',
          300: '#a4d69f',
          400: '#73bb6d',
          500: '#509e49',
          600: '#418a3b',
          700: '#32672e',
          800: '#2c5229',
          900: '#254423',
          950: '#10240f',
        },
        sketch: {
          primary: '#418a3b',      // Forest Green 600
          primaryDark: '#32672e',  // Forest Green 700
          primaryLight: '#e6f4e4', // Forest Green 100
          primaryDeep: '#254423',  // Forest Green 900
          secondary: '#e6f4e4',    // Forest Green 100
          tint: '#cce9c9',         // Forest Green 200
          paper: '#f4faf3',        // Forest Green 50 canvas paper
          charcoal: '#10240f',     // Forest Green 950 deep pine ink
          surface: '#FFFFFF',
          success: '#16A34A',
          warning: '#D97706',
          danger: '#DC2626',
        },
      },
      boxShadow: {
        'pencil-xs': '1.5px 1.5px 0px #10240f',
        'pencil-sm': '2px 2px 0px #10240f',
        'pencil': '3px 3px 0px #10240f',
        'pencil-md': '4px 4px 0px #10240f',
        'pencil-lg': '6px 6px 0px #10240f',
        'subtle': '0 1px 3px 0 rgba(16, 36, 15, 0.05)',
      },
    },
  },
  plugins: [],
};
