/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '120': '480px',
        '144': '576px',
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        'iuc-blue': '#003366', // IUC koyu mavi
        'iuc-blue-dark': '#001f3f',
        'iuc-yellow': '#FFD700', // IUC altın sarısı
        'iuc-yellow-dark': '#FFC700',
      },
    },
  },
  plugins: [],
}


