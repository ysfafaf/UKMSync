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
        sketch: {
          primary: '#1DAD97',      // Soft teal brand accent
          primaryDark: '#148B79',
          primaryLight: '#E8F7F5',
          secondary: '#F4EDE0',    // Warm cream paper
          paper: '#FAF6EE',        // Warm sketchbook paper background
          charcoal: '#111827',     // Pencil line outline
          surface: '#FFFFFF',
          success: '#16A34A',
          warning: '#D97706',
          danger: '#DC2626',
        },
      },
      boxShadow: {
        'pencil-xs': '1.5px 1.5px 0px #111827',
        'pencil-sm': '2px 2px 0px #111827',
        'pencil': '3px 3px 0px #111827',
        'pencil-md': '4px 4px 0px #111827',
        'pencil-lg': '6px 6px 0px #111827',
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
