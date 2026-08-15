/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef8f1',
          100: '#d7f0de',
          500: '#007932',
          600: '#00662a',
          700: '#005222',
        }
      }
    },
  },
  plugins: [],
};
